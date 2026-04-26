## Why WhatsApp doesn't open right now

Two real issues, plus one that's hiding everything else:

### 0. Build is broken → preview frozen on old code
`src/assets/clinic-iv-lounge-main.jpg` is **2.81 MB**, above the PWA precache limit of 2 MiB. Vite-PWA fails the build, so your last edits to the widget may not even be live. **Must fix first** or any other change is invisible.

### 1. The global WhatsApp interceptor swallows clicks on the launcher button
`src/lib/wa-interceptor.ts` (lines 129–130) treats *any* element with an aria-label containing "whatsapp" as a WhatsApp link:
```ts
if (aria && /whatsapp/i.test(aria)) return el;
```
The widget's round launcher uses `aria-label="Open WhatsApp chat"` → the interceptor calls `preventDefault()` + `stopPropagation()` and tries to open wa.me directly **instead of toggling `isOpen`**. The card never opens. The async `window.open` that follows is also usually blocked by popup-blockers (lost user-gesture after `await fetch`).

### 2. `data-wa-skip` is only on the inner `<a>`, not the launcher
Even with the aria check fixed, a defensive `data-wa-skip="1"` on the widget root would prevent any future regression.

---

## Proposed fixes

### Fix A — Shrink/replace the oversized clinic image (unblocks build)
- Re-encode `src/assets/clinic-iv-lounge-main.jpg` to **WebP** at ~1600px wide, target ≤ 400 KB (matches our other clinic assets and `optimization-rules` memory).
- Update the `import` in `src/components/Services.tsx` to point at the new `.webp` file.
- Do the same defensive pass on `clinic-aesthetic-room.jpg` and `clinic-premium-iv-suite.jpg` if they're also heavy (check sizes first).

### Fix B — Stop the interceptor from hijacking the launcher
In `src/components/WhatsAppWidget.tsx`, add `data-wa-skip="1"` to the **outer wrapper `<div>`** (the `fixed bottom-4 right-4 …` container). Because `findWaAnchor` walks up the DOM and bails as soon as it sees `data-wa-skip` on any ancestor, this single attribute protects every interactive element inside the widget (launcher, label pill, close X, "Continue on WhatsApp" CTA) in one shot.

### Fix C — Make the "Continue on WhatsApp" click bullet-proof
In `handleContinue`, keep using the native `<a target="_blank">` navigation (already correct), but **remove `setIsOpen(false)` from the click handler** — closing the widget synchronously can race with the navigation on some mobile browsers. Close it in a `setTimeout(..., 200)` or on `visibilitychange` instead. Tracking call stays synchronous (it's fine — `gtag` and `trackButtonClick` don't block).

### Fix D — Verify in the live preview
After applying A–C:
1. Hard-reload the preview.
2. Confirm the build succeeds (no 2 MB warning).
3. Click the round launcher → the cream card must open with Anna's avatar and the welcome message.
4. Click "Continue on WhatsApp" → a new tab must open at `https://wa.me/66919991744?text=Hi%20Anna%2C%20I%20have%20a%20question%20about%20your%20IV%20protocols`.
5. Re-test the Hero "Book on WhatsApp" CTA (separate `source: "hero"` message) to confirm `data-wa-skip` still works there.

---

## Files touched
- `src/assets/clinic-iv-lounge-main.jpg` → replaced by a smaller `.webp` (and possibly the two other clinic photos if oversized)
- `src/components/Services.tsx` → updated import path(s)
- `src/components/WhatsAppWidget.tsx` → add `data-wa-skip="1"` on root, defer `setIsOpen(false)` after CTA click

## Out of scope (for now)
- Wiring every protocol card in `Services.tsx` to `{ source: "protocol", protocolName }` — separate pass, mentioned previously.
- Changing the interceptor's aria heuristic globally (keeping it conservative; the per-widget skip is the safer fix).
