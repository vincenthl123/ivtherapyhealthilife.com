# Repositionner MembershipSection

Dans `src/pages/Index.tsx`, descendre `MembershipSection` de 2 sections vers le bas.

## Ordre actuel
1. Hero
2. TrustBanner
3. **MembershipSection**
4. Services
5. WhyChooseUs
6. MedicalTeam
7. Process
8. VideoTestimonials
9. Testimonials
10. FAQ
11. Contact

## Nouvel ordre
1. Hero
2. TrustBanner
3. Services
4. WhyChooseUs
5. **MembershipSection** ← déplacée (après WhyChooseUs)
6. MedicalTeam
7. Process
8. VideoTestimonials
9. Testimonials
10. FAQ
11. Contact

## Détails techniques
- Seul fichier modifié : `src/pages/Index.tsx`
- Réordonner les composants JSX dans le `<Suspense>`
- Aucun changement de logique, design, ou imports
