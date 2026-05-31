# Multiplier l'affichage de +66 (0)9 1999 1744 (conversion optimization)

Objectif : afficher le téléphone cliquable 5 à 10 fois sur la home + pages clés pour maximiser les appels.

## Inventaire actuel (home `/`)
Déjà présent :
1. Header desktop — lien texte
2. Header mobile — icône appel
3. Header mobile menu — bloc bordé
4. Hero — "Or call us directly"
5. Footer — bloc contact

→ 5 occurrences. On veut en rajouter 4-5 pour atteindre ~10.

## Ajouts proposés sur la home

### A. `src/components/TrustBanner.tsx`
Ajouter un petit ruban "Call us +66 (0)9 1999 1744" cliquable à droite (desktop) / en bas (mobile), avec icône Phone, tracking `ivclick-trustbanner-phone`.

### B. `src/components/Services.tsx` (fin de section Most Popular IVs)
Sous la grille, ligne centrée : "Not sure which IV is right for you? Call **+66 (0)9 1999 1744**" — tracking `ivclick-services-phone`.

### C. `src/components/MembershipSection.tsx` (footer encart existant)
Ajouter à côté du disclaimer Longevity Consultation un lien Phone cliquable — tracking `ivclick-membership-phone`.

### D. `src/components/WhyChooseUs.tsx` (fin de section)
Bandeau CTA secondaire : icône Phone + numéro + "Speak to our medical team" — tracking `ivclick-why-phone`.

### E. `src/components/FAQ.tsx`
Le numéro existe déjà (tel:) → vérifier qu'il s'affiche visuellement `+66 (0)9 1999 1744` (format avec espaces).

### F. `src/components/Process.tsx`
Idem : vérifier format affiché.

## Résultat attendu sur `/`
~10 points de contact téléphone visibles :
Header (desktop + mobile icône) · Hero · TrustBanner · Services · Membership · WhyChooseUs · Process · FAQ · Footer.

## Détails techniques
- Format affiché partout : `+66 (0)9 1999 1744`
- `href="tel:+66919991744"`
- Icône `Phone` lucide-react
- `onClick={() => trackButtonClick('ivclick-{location}-phone')}`
- Aucune nouvelle dépendance, aucun changement de design tokens
- Styles discrets, alignés avec l'aesthetic premium médical (pas de boutons criards qui cassent la mise en page)

## Hors scope
- Pas de modification des CTA WhatsApp existants
- Pas de refonte de sections
- Pas de pages secondaires (Clinic, PriceList ont déjà leur numéro)
