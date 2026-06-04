## Goal

Reorder the homepage so the user sees:

1. Hero + TrustBanner (unchanged)
2. **Most Popular IV Therapy** (top of Services)
3. **Membership** section
4. **Inside Our Ekkamai Center** + Wellness Packages + rest of Services
5. WhyChooseUs → MedicalTeam → Process → … (unchanged)

Currently `MembershipSection` sits above the whole `Services` section, so it appears before "Most Popular IV Therapy". We need it between two blocks that both live inside `Services.tsx`.

## Changes

### 1. `src/components/Services.tsx`
- Accept an optional `children` prop.
- Render `{children}` between the Popular Drips grid (closing `</div>` at line 344) and the "Inside Our Ekkamai Center" gallery block (starts line 346).
- No other markup, styling, copy, or logic changes.

### 2. `src/pages/Index.tsx`
- Remove the standalone `<MembershipSection />` line above `<Services />`.
- Pass MembershipSection as a child: `<Services><MembershipSection /></Services>`.
- Keep the lazy import for `MembershipSection`.

Resulting `<Suspense>` order:
```text
<Services>
  <MembershipSection />   {/* injected between Popular grid and Ekkamai gallery */}
</Services>
<WhyChooseUs />
<MedicalTeam />
<Process />
<VideoTestimonials />
<Testimonials />
<FAQ />
<Contact />
```

## Out of scope
No changes to MembershipSection design, Services styling, translations, or any other component.