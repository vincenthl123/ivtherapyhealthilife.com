import { useSyncExternalStore } from 'react';
import {
  getRate,
  getCurrencyMeta,
  subscribeRates,
  initRates,
} from './rates';

// ============================================================================
// Currency store (satellite port of the main site's i18n store).
// ----------------------------------------------------------------------------
// No zustand on the satellites — we use a tiny module-level store driven by
// React's useSyncExternalStore. It:
//   - holds the selected currency (persisted in localStorage),
//   - bumps a version counter when live FX rates land so <Price> re-renders,
//   - needs no Context provider — works anywhere in the tree.
// Call initCurrency() once on app mount (kicks off the live-rate fetch).
// ============================================================================

const STORAGE_KEY = 'healthilife-currency';
/** Set once we have applied (or deliberately skipped) IP-based auto-selection. */
const GEO_KEY = 'healthilife-currency-geo';

interface CurrencyState {
  currency: string;
  /** Bumped on currency change AND when fresh FX rates arrive. */
  version: number;
}

function readPersisted(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

let state: CurrencyState = { currency: readPersisted() || 'THB', version: 0 };

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getSnapshot(): CurrencyState {
  return state;
}

export function setCurrency(code: string) {
  if (code === state.currency) return;
  state = { currency: code, version: state.version + 1 };
  try {
    window.localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* ignore */
  }
  emit();
}

// Re-render price-bearing components when live rates land / refresh.
if (typeof window !== 'undefined') {
  subscribeRates(() => {
    state = { ...state, version: state.version + 1 };
    emit();
  });
}

// ---------------------------------------------------------------------------
// IP-based currency pre-selection (conversion lever, ported from stemcell).
// ---------------------------------------------------------------------------
// The satellite serves a fly-in international audience: AUD is the #1 market by
// value, then USD, EUR, GBP. Showing them THB first costs a mental conversion
// on the single most important number on the page.
//
// Rules, in order:
//   1. A manual selection (localStorage) ALWAYS wins — we never overwrite it.
//   2. Otherwise resolve the visitor's country over a free, key-less IP API.
//   3. Map the country to a currency the picker offers. Anything else stays THB.
//   4. Anything that goes wrong — network error, timeout (~1.5s), bad payload,
//      blocked by an ad-blocker — leaves THB in place. Never blocks rendering,
//      never throws, never logs to the console.
// The auto-selection is written to localStorage so it survives navigation, and
// a GEO flag records that it was applied (so a manual reset back to THB is
// respected rather than being re-detected on the next page view).
// ---------------------------------------------------------------------------

const GEO_ENDPOINT = 'https://ipapi.co/json/';
const GEO_TIMEOUT_MS = 1500;

/** Country (ISO-3166 alpha-2) → currency. Only currencies the picker offers. */
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  // Australia / NZ — first market by value.
  AU: 'AUD',
  NZ: 'AUD',
  US: 'USD',
  GB: 'GBP',
  // Asia & Gulf fly-in markets.
  SG: 'SGD',
  HK: 'HKD',
  AE: 'AED',
  SA: 'SAR',
  CN: 'CNY',
  KR: 'KRW',
  JP: 'JPY',
  IN: 'INR',
  LK: 'LKR',
  TW: 'TWD',
  MY: 'MYR',
  ID: 'IDR',
  PH: 'PHP',
  VN: 'VND',
  CA: 'CAD',
  CH: 'CHF',
};

/** Eurozone — mapped to EUR (3rd priority). */
const EUROZONE = [
  'FR', 'DE', 'IT', 'ES', 'PT', 'NL', 'BE', 'AT', 'IE', 'FI',
  'GR', 'LU', 'SK', 'SI', 'EE', 'LV', 'LT', 'CY', 'MT', 'HR',
];
for (const cc of EUROZONE) COUNTRY_TO_CURRENCY[cc] = 'EUR';

function hasGeoRun(): boolean {
  try {
    return window.localStorage.getItem(GEO_KEY) === '1';
  } catch {
    return false;
  }
}

function markGeoRun() {
  try {
    window.localStorage.setItem(GEO_KEY, '1');
  } catch {
    /* ignore */
  }
}

/**
 * Resolve the visitor's country and pre-select their currency.
 * Fire-and-forget: resolves silently on every failure path, leaving THB.
 */
async function autoSelectCurrencyByIp(): Promise<void> {
  if (typeof window === 'undefined') return;
  // A stored choice — manual or a previous auto-detect — is authoritative.
  if (readPersisted() || hasGeoRun()) return;

  const controller =
    typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller
    ? window.setTimeout(() => controller.abort(), GEO_TIMEOUT_MS)
    : null;

  try {
    const res = await fetch(GEO_ENDPOINT, {
      signal: controller?.signal,
      cache: 'no-store',
    });
    if (!res.ok) return;
    const data = await res.json();
    const country = typeof data?.country_code === 'string' ? data.country_code : '';
    const mapped = COUNTRY_TO_CURRENCY[country.toUpperCase()];
    // Re-check: the visitor may have picked a currency while we were in flight.
    if (mapped && !readPersisted()) setCurrency(mapped);
  } catch {
    /* offline / blocked / aborted / malformed — stay on THB */
  } finally {
    if (timer != null) window.clearTimeout(timer);
    // Only detect once per browser, whatever the outcome.
    markGeoRun();
  }
}

let inited = false;
/** Call once on app mount. Starts the live-rate fetch (12h cached) + geo-detect. */
export function initCurrency() {
  if (inited) return;
  inited = true;
  initRates();
  // Deliberately not awaited — rendering must never wait on the IP lookup.
  void autoSelectCurrencyByIp();
}

/** Reactive hook: current currency + helpers. Re-renders on change / new rates. */
export function useCurrency() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return {
    currency: snap.currency,
    setCurrency,
    meta: getCurrencyMeta(snap.currency),
    isBaseCurrency: snap.currency === 'THB',
    /** Bumped on currency change AND when live FX rates land. */
    version: snap.version,
  };
}

// ---------------------------------------------------------------------------
// Price-string conversion (ported from the main site's <MenuPrice>).
// ---------------------------------------------------------------------------
// Satellite prices are authored as free-form display strings, e.g.:
//   "6,000 THB"   "4,050 THB (was 4,500)"   "~150,000 THB"   "From 13,900 THB"
// Strategy: find every number, convert each from THB to the selected currency,
// reformat, and swap the literal "THB"/"฿" label for the target code. All
// surrounding words (From, ~, ranges, "was", notes) are preserved verbatim.
// ---------------------------------------------------------------------------

/** A price amount with optional thousands separators, e.g. 1,800,000 or 540.5 */
const AMOUNT = String.raw`\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?`;

// Marker-anchored matches so we ONLY convert amounts that are actual prices,
// never bare numbers like "10%" or "12 months". Two shapes:
//   1. "฿50,000"  / "฿ 50,000"        — symbol then amount
//   2. "8,900 THB" / "8,900THB"        — amount then THB label
const PRICE_RE = new RegExp(
  String.raw`฿\s?(${AMOUNT})|(${AMOUNT})\s?THB\b`,
  'g'
);

function convertNumber(thb: number, currency: string): string {
  const rate = getRate(currency);
  const converted = thb * rate;

  let value = converted;
  if (converted >= 1000) value = Math.round(converted / 10) * 10;
  else if (converted >= 100) value = Math.round(converted);
  else value = Math.round(converted * 10) / 10;

  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: converted < 100 ? 1 : 0,
  });
}

/**
 * Transform a string into the active currency, converting ONLY amounts that
 * carry a THB marker (฿ prefix or THB suffix). Everything else — percentages,
 * "12 months", surrounding words — is preserved verbatim. THB selected → no-op.
 *
 * Examples:
 *   "8,500 THB"                 → "~246 USD"
 *   "฿50,000 treatment credit"  → "~USD 1,450 treatment credit"
 *   "10% member rate"           → "10% member rate"  (untouched)
 */
export function convertPriceString(priceStr: string, currency: string): string {
  if (!priceStr) return priceStr;
  if (currency === 'THB') return priceStr;

  PRICE_RE.lastIndex = 0;
  if (!PRICE_RE.test(priceStr)) return priceStr;
  PRICE_RE.lastIndex = 0;

  const out = priceStr.replace(PRICE_RE, (_m, sym, suf) => {
    const raw = (sym ?? suf) as string;
    const thb = parseFloat(raw.replace(/,/g, ''));
    if (!isFinite(thb)) return _m;
    const converted = convertNumber(thb, currency);
    // Symbol form "฿50,000" → "~USD 1,450"; suffix form "8,500 THB" → "~246 USD".
    return sym != null ? `~${currency} ${converted}` : `~${converted} ${currency}`;
  });
  // Collapse any accidental double "~" (e.g. source already had "~150,000 THB").
  return out.replace(/~\s*~/g, '~');
}

interface PriceProps {
  /** The raw THB display string, e.g. "6,000 THB" or "~150,000 THB". */
  value: string;
  className?: string;
}

/**
 * Renders a THB price string converted to the user's selected currency.
 * Reactive: re-renders on currency change AND when live FX rates refresh.
 */
export function Price({ value, className }: PriceProps) {
  const { currency } = useCurrency();
  const display = convertPriceString(value, currency);
  const isConverted = currency !== 'THB' && display !== value;
  return (
    <span
      className={className}
      title={isConverted ? `Source: ${value} · ${getCurrencyMeta(currency).name}` : undefined}
    >
      {display}
    </span>
  );
}
