## Add Membership Section — The Urban Longevity House

### Goal
Add a new 3-tier membership pricing section to the homepage, placed immediately after the Popular IV Drips grid and before the clinic gallery / wellness packages.

### Scope

1. **New component**: `src/components/MembershipSection.tsx`
   - 3 pricing cards: Resident (฿50K), Patron (฿100K, featured), Founding Member (฿300K)
   - Responsive: 1 col mobile, 3 col desktop
   - Center card (Patron) highlighted with primary ring + "Best Seller" badge
   - Each card: icon, floating tag, price top-right, title, headline, benefit list with checkmark, WhatsApp CTA
   - Footer encart below cards with Longevity Consultation disclaimer
   - Style: medical minimal premium, using existing design tokens (`primary`, `foreground`, `muted-foreground`, `border`, `bg-gradient-medical` / `bg-gradient-to-br` with primary/emerald fallback)
   - Icons via `lucide-react`: `Leaf`, `Heart`, `Shield`, `Check`, `MessageCircle`
   - Content hardcoded in English (no i18n keys added)

2. **Mount in `src/pages/Index.tsx`**
   - Import and render `<MembershipSection />` inside the `<Suspense>` block, between `<Services />` and `<WhyChooseUs />`

3. **WhatsApp CTA wiring**
   - Each card opens `wa.me/66919991744` with pre-filled message:
     ```
     Hello Healthi-Life — I'm interested in the {TIER} membership (฿{PRICE}).
     Ref: HL-MEMBERSHIP
     ```
   - Use direct `buildWaUrl`-style URL construction (inline or small helper)
   - `target="_blank" rel="noopener noreferrer"`
   - Unique IDs: `membership-resident`, `membership-patron`, `membership-founding`

### Files touched
- `src/components/MembershipSection.tsx` — new
- `src/pages/Index.tsx` — insert component

### Content (unchanged from spec)
- Badge header: "Membership · 12 months"
- H2: "Membership into the house"
- Subtitle: "The Urban Longevity House — Ekkamai, Bangkok"
- Intro paragraph about 12-month relationship
- 3 tiers with exact benefits, prices, headlines, tags
- Footer encart with Dr. Petch consultation text + disclaimer
- Closing line: "Come for the recovery. Stay for the longevity."

### Design notes
- Cards use `Card` / `CardContent` from existing UI primitives
- Checkmarks use small accent-colored dots or `Check` icon
- Featured card (`popular={true}`) gets `ring-2 ring-primary` and elevated shadow
- No images; pure typography + icon + Tailwind
- Background: `bg-gradient-subtle` or `bg-secondary/30` to separate from services section