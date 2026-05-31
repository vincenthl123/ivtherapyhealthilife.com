# Audit UX/UI + Affichage téléphone direct

## Audit UX/UI (constats principaux)

**Header**
- Mobile : seulement burger + langue, aucun moyen de contact direct visible. Le téléphone n'apparaît nulle part en haut de page.
- Desktop : deux boutons WhatsApp côte à côte ("Book Now" et "WhatsApp") qui pointent vers la même URL — redondance visuelle.
- Aucune ligne d'info (téléphone + horaires) en barre supérieure.

**Home page**
- Hero : CTA WhatsApp uniquement, pas d'option téléphone pour les utilisateurs qui préfèrent appeler.
- TrustBanner / Footer : téléphone parfois mentionné mais non cliquable de manière homogène (à vérifier/uniformiser via `tel:`).
- WhatsAppWidget flotte en bas → bon, mais doublonne avec un éventuel bouton téléphone.

**Accessibilité**
- Liens téléphone manquants → utilisateurs mobiles ne peuvent pas tap-to-call.
- Format affiché doit être lisible : `+66 (0)9 1999 1744`, `href="tel:+66919991744"`.

## Changements à appliquer

### 1. `src/components/Header.tsx`
- **Desktop** : ajouter à gauche des boutons WhatsApp un lien téléphone discret avec icône `Phone` :
  `+66 (0)9 1999 1744` → `tel:+66919991744`, tracking `ivclick-header-phone`.
- **Mobile menu (ouvert)** : ajouter un bloc téléphone bien visible en haut des CTAs :
  icône Phone + numéro formaté, pleine largeur, style `variant="outline"`, tracking `ivclick-mobile-phone`.
- **Mobile header (fermé)** : ajouter une petite icône Phone cliquable à côté du burger pour appel direct sans ouvrir le menu, tracking `ivclick-mobile-phone-icon`.

### 2. `src/components/Hero.tsx`
- Sous les CTA WhatsApp existants, ajouter une ligne discrète "Or call us: **+66 (0)9 1999 1744**" cliquable (`tel:`), avec icône Phone, tracking `ivclick-hero-phone`.

### 3. `src/components/Footer.tsx` (vérification + uniformisation)
- S'assurer que le numéro affiché utilise le format `+66 (0)9 1999 1744` et est cliquable via `tel:+66919991744`.

## Détails techniques

- Numéro affiché partout : `+66 (0)9 1999 1744`
- Lien : `href="tel:+66919991744"`
- Icône : `Phone` de `lucide-react`
- Tracking : `trackButtonClick(id)` avec IDs `ivclick-{location}-phone`
- Aucun changement de design tokens, on réutilise `text-foreground`, `text-primary`, variantes `Button` existantes
- Pas de modif i18n (numéro identique dans toutes les langues)

## Hors scope
- Pas de refonte du header ni des sections existantes
- Pas de modif du WhatsAppWidget ni du tracking webhook
