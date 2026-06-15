/**
 * GET /api/dashboard?secret=<RESPONDIO_WEBHOOK_SECRET>
 *
 * Self-contained HTML dashboard for the WhatsApp conversion pipeline.
 * Reads the private Blob store:
 *   wa-refs/<REF>.json        — one per WhatsApp click (site, utm, gclid, ts)
 *   wa-contacts/<KEY>.json    — ref captured from a respond.io contact's first message
 *   wa-conversions/<KEY>.json — one per "Consultation Booked" conversion
 *
 * Stats per site: clicks → contacts linked → bookings → rate, plus a full
 * conversion log and the most recent clicks.
 */
import { get, list } from "@vercel/blob";
import type { VercelRequest, VercelResponse } from "@vercel/node";

type RefRecord = {
  ref?: string;
  s?: string;
  p?: string;
  c?: string;
  src?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  ga_client_id?: string;
  ts?: string;
  received_at?: string;
};

type ContactRecord = {
  ref?: string;
  contactId?: string;
  phone?: string;
  captured_at?: string;
};

type ConversionRecord = {
  ref?: string | null;
  phone?: string;
  contactId?: string;
  stage?: string;
  matched?: boolean;
  sent_at?: string;
};

const readJson = async <T>(pathname: string): Promise<T | null> => {
  try {
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result?.stream) return null;
    const text = await new Response(result.stream as ReadableStream).text();
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
};

const readPrefix = async <T>(prefix: string): Promise<T[]> => {
  const { blobs } = await list({ prefix, limit: 1000 });
  const out: T[] = [];
  // Fetch in batches of 20 to keep this snappy without hammering the store.
  for (let i = 0; i < blobs.length; i += 20) {
    const batch = blobs.slice(i, i + 20);
    const results = await Promise.all(
      batch.map((b) => readJson<T>(b.pathname)),
    );
    for (const r of results) if (r) out.push(r);
  }
  return out;
};

const esc = (v: unknown): string =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const maskPhone = (p?: string): string => {
  const digits = (p || "").replace(/\D/g, "");
  if (digits.length < 6) return p ? "•••" : "—";
  return `+${digits.slice(0, 4)}•••${digits.slice(-3)}`;
};

const fmtDate = (iso?: string | null): string => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-GB", {
      timeZone: "Asia/Bangkok",
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const fmtAgo = (iso?: string | null): string => {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  if (!isFinite(ms) || ms < 0) return "";
  const min = Math.floor(ms / 60000);
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 48) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const bangkokDay = (iso?: string | null): string => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" });
  } catch {
    return "";
  }
};

/** All sites in the network — shown even before they record any data. */
const KNOWN_SITES = [
  "ivtherapyhealthilife.com",
  "skin-healthi-life.com",
  "healthcheckup-healthilife.com",
  "stemcellhealthilife.com",
  "certificate-healthi-life.com",
  "healthi-life.com",
  "information-bangkok.com",
];

const UNKNOWN_LABEL =
  "No ref — direct WhatsApp / pre-tracking contact";

const isTestRecord = (ref?: string | null, contactId?: string): boolean =>
  (contactId || "").startsWith("claude-test") || ref === "HL-TST9";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const secret = process.env.RESPONDIO_WEBHOOK_SECRET;
  if (!secret || req.query.secret !== secret) {
    return res.status(401).send("Unauthorized");
  }

  const [refs, contacts, conversions] = await Promise.all([
    readPrefix<RefRecord>("wa-refs/"),
    readPrefix<ContactRecord>("wa-contacts/"),
    readPrefix<ConversionRecord>("wa-conversions/"),
  ]);

  const refBySite = new Map<string, RefRecord>();
  for (const r of refs) if (r.ref) refBySite.set(r.ref, r);
  const siteOfRef = (ref?: string | null): string =>
    (ref && refBySite.get(ref)?.s) || "unknown";

  // Per-site aggregates (pre-seeded so every site shows a row from day one)
  const sites = new Map<
    string,
    {
      clicks: number;
      contacts: number;
      conversions: number;
      lastClick?: string;
      lastBooking?: string;
    }
  >();
  for (const s of KNOWN_SITES) {
    sites.set(s, { clicks: 0, contacts: 0, conversions: 0 });
  }
  const bump = (site: string, key: "clicks" | "contacts" | "conversions") => {
    const s = sites.get(site) || { clicks: 0, contacts: 0, conversions: 0 };
    s[key] += 1;
    sites.set(site, s);
  };

  for (const r of refs) {
    if (isTestRecord(r.ref)) continue;
    const site = r.s || "unknown";
    bump(site, "clicks");
    const s = sites.get(site)!;
    const t = r.received_at || r.ts;
    if (t && (!s.lastClick || t > s.lastClick)) s.lastClick = t;
  }
  for (const c of contacts) {
    if (isTestRecord(c.ref, c.contactId)) continue;
    bump(siteOfRef(c.ref), "contacts");
  }
  const realConversions = conversions.filter(
    (c) => !isTestRecord(c.ref, c.contactId),
  );
  for (const c of realConversions) {
    const site = siteOfRef(c.ref);
    bump(site, "conversions");
    const s = sites.get(site)!;
    if (c.sent_at && (!s.lastBooking || c.sent_at > s.lastBooking)) {
      s.lastBooking = c.sent_at;
    }
  }

  const siteRows = [...sites.entries()]
    .sort(
      (a, b) =>
        b[1].conversions - a[1].conversions || b[1].clicks - a[1].clicks,
    )
    .map(([site, s]) => {
      const isUnknown = site === "unknown";
      const rate =
        isUnknown || !s.clicks
          ? "—"
          : `${((s.conversions / s.clicks) * 100).toFixed(1)}%`;
      const label = isUnknown
        ? `<span class="muted">${esc(UNKNOWN_LABEL)}</span>`
        : `<strong>${esc(site)}</strong>`;
      return `<tr>
        <td>${label}</td>
        <td class="num">${isUnknown ? "—" : s.clicks}</td>
        <td class="num">${isUnknown ? "—" : s.contacts}</td>
        <td class="num">${s.conversions}</td>
        <td class="num">${rate}</td>
        <td>${fmtDate(s.lastClick)}</td>
        <td>${fmtDate(s.lastBooking)}</td>
      </tr>`;
    })
    .join("");

  // Cross-reference: which contacts ever had a ref captured (ref_capture
  // workflow). Lets us tell a "no ref ever captured" booking apart from a
  // "ref captured but booking failed to resolve it" bug (contactId mismatch).
  const normDigits = (s?: string) => (s || "").replace(/\D/g, "");
  const contactByKey = new Map<string, ContactRecord>();
  for (const ct of contacts) {
    if (ct.contactId) contactByKey.set(ct.contactId, ct);
    const ph = normDigits(ct.phone);
    if (ph) contactByKey.set(ph, ct);
  }

  let bugCount = 0;
  const unmatchedReason = (c: ConversionRecord): string => {
    if (c.matched) return "";
    if (c.ref) {
      return `ref captured but the click had no GA client-id (visitor's GA cookie wasn't set yet) — sent with a fallback id, so it won't tie to a GA session`;
    }
    const key = c.contactId || normDigits(c.phone);
    const mapping = key ? contactByKey.get(key) : undefined;
    if (mapping?.ref) {
      bugCount += 1;
      return `⚠️ BUG: this contact HAS a captured ref (${esc(mapping.ref)}) but the booking didn't use it — likely a contactId format mismatch between workflows`;
    }
    return `no website click is linked to this contact — they messaged the number directly (saved contact / Google Business Profile / ad-to-chat) or the chat began before tracking went live`;
  };

  const convRows = realConversions
    .sort((a, b) => (b.sent_at || "").localeCompare(a.sent_at || ""))
    .map((c) => {
      const ref = c.ref || null;
      const r = ref ? refBySite.get(ref) : undefined;
      const site = siteOfRef(ref);
      const siteCell =
        site === "unknown"
          ? `<span class="muted" title="${esc(UNKNOWN_LABEL)}">unattributable*</span>`
          : esc(site);
      const clickedAt = r?.received_at || r?.ts;
      const reason = unmatchedReason(c);
      return `<tr>
        <td><strong>${fmtDate(c.sent_at)}</strong><br><span class="muted">${fmtAgo(c.sent_at)}</span></td>
        <td>${siteCell}</td>
        <td><code>${esc(ref || "—")}</code>${clickedAt ? `<br><span class="muted">clicked ${fmtDate(clickedAt)}</span>` : ""}</td>
        <td>${c.matched ? `<span class="ok">✅ matched</span>` : `<span class="warn">⚠️ unmatched</span>`}${reason ? `<br><span class="muted">${reason}</span>` : ""}</td>
        <td>${r?.gclid ? "✅ from ad" : "—"}</td>
        <td>${esc(r?.utm_source || "—")} / ${esc(r?.utm_campaign || "—")}</td>
        <td>${esc(maskPhone(c.phone))}</td>
      </tr>`;
    })
    .join("");

  const recentClicks = refs
    .filter((r) => !isTestRecord(r.ref))
    .sort((a, b) =>
      (b.received_at || b.ts || "").localeCompare(a.received_at || a.ts || ""),
    )
    .slice(0, 25)
    .map(
      (r) => `<tr>
        <td>${fmtDate(r.received_at || r.ts)}</td>
        <td>${esc(r.s || "unknown")}</td>
        <td><code>${esc(r.ref)}</code></td>
        <td>${esc(r.p || "/")}</td>
        <td>${esc(r.src || r.c || "—")}</td>
        <td>${r.gclid ? "✅ ad click" : "organic"}</td>
        <td>${esc(r.utm_source || "—")}</td>
      </tr>`,
    )
    .join("");

  const totals = [...sites.values()].reduce(
    (acc, s) => ({
      clicks: acc.clicks + s.clicks,
      contacts: acc.contacts + s.contacts,
      conversions: acc.conversions + s.conversions,
    }),
    { clicks: 0, contacts: 0, conversions: 0 },
  );

  const today = bangkokDay(new Date().toISOString());
  const clicksToday = refs.filter(
    (r) => !isTestRecord(r.ref) && bangkokDay(r.received_at || r.ts) === today,
  ).length;
  const bookingsToday = realConversions.filter(
    (c) => bangkokDay(c.sent_at) === today,
  ).length;

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<meta http-equiv="refresh" content="300">
<title>WhatsApp Conversion Dashboard — HealthiLife</title>
<style>
  :root { color-scheme: light; }
  body { font: 14px/1.5 -apple-system, "Segoe UI", Roboto, sans-serif; margin: 0; background: #f6f7f9; color: #1a1d21; }
  header { background: #0e1b13; color: #e8f5ee; padding: 20px 28px; }
  header h1 { margin: 0; font-size: 18px; font-weight: 600; }
  header p { margin: 4px 0 0; opacity: .7; font-size: 12px; }
  main { max-width: 1100px; margin: 0 auto; padding: 24px 20px 60px; }
  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 28px; }
  .card { background: #fff; border: 1px solid #e4e7eb; border-radius: 10px; padding: 14px 16px; }
  .card .v { font-size: 26px; font-weight: 700; }
  .card .l { font-size: 12px; color: #6b7280; }
  h2 { font-size: 15px; margin: 28px 0 10px; }
  table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e4e7eb; border-radius: 10px; overflow: hidden; }
  th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #eef0f3; font-size: 13px; }
  th { background: #fafbfc; color: #6b7280; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; }
  tr:last-child td { border-bottom: none; }
  td.num { text-align: right; font-variant-numeric: tabular-nums; }
  code { background: #f1f3f5; padding: 1px 5px; border-radius: 4px; font-size: 12px; }
  .empty { color: #9aa1a9; padding: 18px; text-align: center; }
  .muted { color: #9aa1a9; font-size: 11px; }
  .ok { color: #15803d; }
  .warn { color: #b45309; }
  .note { color: #6b7280; font-size: 12px; margin: 8px 2px 0; }
  .sub { font-size: 11px; color: #15803d; margin-top: 2px; }
  footer { color: #9aa1a9; font-size: 11px; margin-top: 30px; }
</style></head><body>
<header>
  <h1>WhatsApp Conversion Dashboard</h1>
  <p>HealthiLife sites · live data from the click/conversion store · times in Asia/Bangkok · test records hidden</p>
</header>
<main>
  <div class="cards">
    <div class="card"><div class="v">${totals.clicks}</div><div class="l">WhatsApp clicks (refs)</div><div class="sub">${clicksToday} today</div></div>
    <div class="card"><div class="v">${totals.contacts}</div><div class="l">Contacts linked</div></div>
    <div class="card"><div class="v">${totals.conversions}</div><div class="l">Bookings (conversions)</div><div class="sub">${bookingsToday} today</div></div>
    <div class="card"><div class="v">${totals.clicks ? ((totals.conversions / totals.clicks) * 100).toFixed(1) : "0.0"}%</div><div class="l">Click → booking rate</div></div>
  </div>

  <h2>Per-site stats</h2>
  <table>
    <thead><tr><th>Site</th><th class="num">Clicks</th><th class="num">Contacts linked</th><th class="num">Bookings</th><th class="num">Rate</th><th>Last click</th><th>Last booking</th></tr></thead>
    <tbody>${siteRows || `<tr><td colspan="7" class="empty">No data yet</td></tr>`}</tbody>
  </table>
  <p class="note">"${esc(UNKNOWN_LABEL)}" = bookings from contacts whose chat carries no HL-ref: conversations started before tracking went live (12 Jun 2026), or people who messaged the WhatsApp number directly (saved contact, Google Business Profile) without going through a website. These can never be attributed to a site or ad — expect this row to shrink to near-zero for new conversations.</p>

  <h2>Conversion log (every booking)</h2>
  ${
    bugCount > 0
      ? `<p class="note" style="color:#b91c1c;font-weight:600">⚠️ ${bugCount} booking(s) below had a captured ref that wasn't used — a real linking gap to investigate (likely a contactId format mismatch between the respond.io workflows).</p>`
      : `<p class="note" style="color:#15803d">✓ No linking bugs detected — every unmatched booking below is genuinely a no-ref contact, not a pipeline failure.</p>`
  }
  <table>
    <thead><tr><th>Booked at (Bangkok)</th><th>Site</th><th>Ref · click time</th><th>Attribution / why</th><th>Ad click</th><th>Source / Campaign</th><th>Phone</th></tr></thead>
    <tbody>${convRows || `<tr><td colspan="7" class="empty">No conversions yet — they appear here the moment a contact reaches "Consultation Booked"</td></tr>`}</tbody>
  </table>
  <p class="note">✅ matched = booking tied back to a website click and its GA4/ad session (this is what reaches Google Ads). ⚠️ unmatched = no website click linked — counted in respond.io but not attributable to a site or campaign. The reason for each is shown under its status.</p>

  <h2>Recent clicks (last 25)</h2>
  <table>
    <thead><tr><th>When</th><th>Site</th><th>Ref</th><th>Page</th><th>CTA</th><th>Traffic</th><th>Source</th></tr></thead>
    <tbody>${recentClicks || `<tr><td colspan="7" class="empty">No clicks yet</td></tr>`}</tbody>
  </table>

  <footer>Generated ${fmtDate(new Date().toISOString())} (Bangkok) · auto-refreshes every 5 min · test records hidden. GA4/Ads remain the source of truth for ad reporting; this is the raw pipeline view.</footer>
</main></body></html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "private, no-store");
  return res.status(200).send(html);
}
