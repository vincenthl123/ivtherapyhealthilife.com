## Goal

Make sure every WhatsApp click sends `ga_client_id` to Make, plus forward `gbraid`/`wbraid` and Google Ads `gad_*` params that the current payload drops.

## Why the current setup fails

`src/lib/whatsapp.ts` → `makeRefPayload()` calls `getGaClientId()` which reads the `_ga` cookie **synchronously**. Three failure modes:

1. **Race condition** — GA4 script loads async. On a fast click (or prerendered page where the user clicks within the first ~500ms), the `_ga` cookie does not exist yet → empty string.
2. **Empty-string omission** — `getGaClientId()` returns `""` when missing. JSON keys with `undefined` values are dropped, and even `""` can be hard to spot in Make. No diagnostic info is sent.
3. **No retry / no async fallback** — `getGaClientIdAsync()` already exists in `attribution.ts` but is never called.

The screenshot confirms: payload has `gclid` (from URL → localStorage, works synchronously) but no `ga_client_id` field at all.

## Changes

### 1. `src/lib/attribution.ts`
- Extend `KEYS` to also capture `gad_source` and `gad_campaignid` (already present on the live ad URL) into the 90-day attribution store.
- Add a tiny helper `getGaClientIdStatus()` returning `"ok" | "cookie_missing" | "no_document"` so Make can see *why* it's blank.

### 2. `src/lib/whatsapp.ts`
- Convert `buildWaData` to await `getGaClientIdAsync()` (300 ms timeout, falls back to cookie). Because the WhatsApp open must stay synchronous with the user gesture, do this instead:
  - Try sync cookie read first (fast path — works ≥95% of the time once GA has loaded).
  - If empty, still open WhatsApp immediately, but **delay the Make webhook POST by up to 400 ms** while we poll for the cookie. The webhook is already fire-and-forget; user experience is unaffected.
- Extend `makeRefPayload` to always include:
  - `ga_client_id` (always present, even if `""`)
  - `ga_client_id_status` (`"ok"` / `"cookie_missing"`)
  - `gbraid`, `wbraid` (from attribution store)
  - `gad_source`, `gad_campaignid` (from attribution store)
  - `utm_term`, `utm_content` (currently dropped)

### 3. `src/lib/wa-interceptor.ts`
- No changes needed; it already calls `logWaUrlRef` which routes through the updated `makeRefPayload`.

## Validation

After the change, visit:
`https://ivtherapyhealthilife.com/ivtherapybangkok?gad_source=1&gad_campaignid=22242031086&gbraid=…&gclid=…`

Then click WhatsApp and check the Make webhook payload. Expected new fields:

```json
{
  "ref": "HL-XXXX",
  "ga_client_id": "1234567890.1747665432",
  "ga_client_id_status": "ok",
  "gclid": "EAIaIQob…",
  "gbraid": "0AAAAA-qgsxj…",
  "gad_source": "1",
  "gad_campaignid": "22242031086",
  "utm_source": "", "utm_medium": "", "utm_campaign": ""
}
```

If `ga_client_id_status` ever shows `"cookie_missing"` in Make logs, that visitor has an ad blocker / GA blocked and there is no client_id to send — but you'll at least know why.
