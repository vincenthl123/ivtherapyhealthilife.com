// ============================================================================
// Live FX rates — Healthi Life currency converter (satellite port)
// ----------------------------------------------------------------------------
// Ported from the main site (src/i18n/rates.ts). Self-contained: the static
// fallback table lives in this file so the satellite has no extra dependency.
//
// Source: https://open.er-api.com/v6/latest/THB  (free, no API key, ~166
// currencies, base = THB). Prices on the satellites are authored in THB, so a
// THB-base feed lets us multiply directly: priceTHB * rate = price in target.
//
// Design goals (iPad-in-consultation, flaky wifi):
//   1. Fetch live rates once on app load.
//   2. Cache in localStorage with a 12h TTL.
//   3. ALWAYS fall back to the hand-curated static rates below if the API
//      fails, returns garbage, or we are offline. Never break the price UI.
//   4. Notify subscribers (the currency store) when fresh rates land.
// ============================================================================

const FX_ENDPOINT = 'https://open.er-api.com/v6/latest/THB';
const CACHE_KEY = 'healthilife-fx-rates';
const TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

/** THB-based rate table: { CURRENCY_CODE: number }. 1 THB = rate units. */
export type RateTable = Record<string, number>;

interface RateCache {
  rates: RateTable;
  fetchedAt: number;
}

// ---------------------------------------------------------------------------
// Static fallback (offline). 21 curated currencies — same set as the main site.
// At runtime these get upgraded to ~166 live currencies from open.er-api.com.
// ---------------------------------------------------------------------------
const STATIC_CURRENCIES: { code: string; symbol: string; name: string; rate: number }[] = [
  { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.029 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.027 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.023 },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 0.107 },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', rate: 0.110 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 0.21 },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', rate: 0.227 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 0.039 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 4.45 },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', rate: 40.5 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 2.45 },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', rate: 8.6 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.045 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.040 },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rate: 0.026 },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rate: 0.137 },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', rate: 470 },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', rate: 740 },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', rate: 1.65 },
  { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar', rate: 0.94 },
];

export const STATIC_RATES: RateTable = Object.fromEntries(
  STATIC_CURRENCIES.map((c) => [c.code, c.rate])
);
const STATIC_CURRENCY_META: Record<string, { symbol: string; name: string }> =
  Object.fromEntries(STATIC_CURRENCIES.map((c) => [c.code, { symbol: c.symbol, name: c.name }]));

// ---------------------------------------------------------------------------
// In-memory live table, seeded with the static fallback for the first render.
// ---------------------------------------------------------------------------
let liveRates: RateTable = { ...STATIC_RATES };
let ratesLoaded = false;

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      /* listener errors must not break the fetch flow */
    }
  });
}

/** Subscribe to rate-table updates (used by the currency store to re-render). */
export function subscribeRates(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Current THB-based rate for a currency code.
 * Order of resolution: live/cached table → static fallback → 1 (THB).
 */
export function getRate(code: string): number {
  if (liveRates[code] != null) return liveRates[code];
  if (STATIC_RATES[code] != null) return STATIC_RATES[code];
  return 1;
}

/** All currency codes we currently have a rate for (live or static). */
export function getAvailableCurrencyCodes(): string[] {
  return Object.keys(liveRates);
}

/** Whether a live/cached fetch has populated the table yet. */
export function areRatesLoaded(): boolean {
  return ratesLoaded;
}

// ---------------------------------------------------------------------------
// localStorage cache helpers (guarded — SSR / private-mode safe)
// ---------------------------------------------------------------------------
function readCache(): RateCache | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RateCache;
    if (!parsed?.rates || typeof parsed.fetchedAt !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(cache: RateCache) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* quota / private mode — ignore, we still have in-memory rates */
  }
}

function applyRates(rates: RateTable) {
  liveRates = { ...STATIC_RATES, ...rates, THB: 1 };
  ratesLoaded = true;
  notify();
}

let initStarted = false;

/**
 * One-shot initialiser. Call once on app mount.
 *  - Hydrates from a fresh (< 12h) localStorage cache instantly.
 *  - Otherwise fetches live rates, caches them, and notifies.
 *  - On any failure, silently keeps the static fallback already in memory.
 */
export async function initRates(): Promise<void> {
  if (initStarted || typeof window === 'undefined') return;
  initStarted = true;

  const cached = readCache();
  if (cached) {
    applyRates(cached.rates);
    const fresh = Date.now() - cached.fetchedAt < TTL_MS;
    if (fresh) return;
  }

  try {
    const res = await fetch(FX_ENDPOINT, { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    if (data?.result !== 'success' || !data?.rates || typeof data.rates !== 'object') {
      return;
    }
    const rates = data.rates as RateTable;
    if (!(rates.THB > 0.5 && rates.THB < 1.5)) return;

    applyRates(rates);
    writeCache({ rates, fetchedAt: Date.now() });
  } catch {
    /* offline / blocked — keep the static fallback already in memory */
  }
}

// ---------------------------------------------------------------------------
// Currency metadata (name + symbol) for the picker, resolved from Intl so we
// don't hand-maintain ~166 entries.
// ---------------------------------------------------------------------------
export interface CurrencyMeta {
  code: string;
  symbol: string;
  name: string;
}

let displayNames: Intl.DisplayNames | null = null;
try {
  displayNames = new Intl.DisplayNames(['en'], { type: 'currency' });
} catch {
  displayNames = null;
}

const metaCache = new Map<string, CurrencyMeta>();

function symbolFor(code: string): string {
  try {
    const parts = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 0,
    }).formatToParts(0);
    const sym = parts.find((p) => p.type === 'currency')?.value;
    return sym || code;
  } catch {
    return code;
  }
}

export function getCurrencyMeta(code: string): CurrencyMeta {
  const cached = metaCache.get(code);
  if (cached) return cached;

  const staticMeta = STATIC_CURRENCY_META[code];
  const meta: CurrencyMeta = {
    code,
    symbol: staticMeta?.symbol || symbolFor(code),
    name: staticMeta?.name || displayNames?.of(code) || code,
  };
  metaCache.set(code, meta);
  return meta;
}

/** Full, sorted picker list. THB first, then alphabetical by code. */
export function getCurrencyList(): CurrencyMeta[] {
  const codes = getAvailableCurrencyCodes();
  const list = codes.map(getCurrencyMeta);
  list.sort((a, b) => {
    if (a.code === 'THB') return -1;
    if (b.code === 'THB') return 1;
    return a.code.localeCompare(b.code);
  });
  return list;
}
