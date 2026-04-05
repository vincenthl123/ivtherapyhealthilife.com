## Tier 1 — SEO Technique (5 pages)
1. **Créer un composant `PeptideSEO`** réutilisable avec react-helmet-async : `<title>`, `<meta description>`, `<canonical>`, `og:title/description/image/url`, `og:locale:alternate` (ja_JP, th)
2. **Intégrer PeptideSEO** dans BPC157, GLP1, Semaglutide, Retatrutide, CJC1295Ipamorelin
3. **Mettre à jour sitemap.xml** — ajouter les 5 URLs peptides
4. **Mettre à jour llms.txt** — ajouter les 5 pages dédiées avec détails

## Tier 2 — AEO/GEO (JSON-LD)
5. **JSON-LD FAQPage** sur chaque page peptide (questions/réponses existantes)
6. **JSON-LD MedicalProcedure** pour chaque peptide
7. **JSON-LD BreadcrumbList** Home > Peptides > [Peptide Name]

## Tier 3 — i18n (Traductions TH/JA)
8. **Extraire toutes les chaînes hardcoded** des 5 pages en clés i18n
9. **Créer les traductions TH** pour les 5 pages (~400+ clés)
10. **Créer les traductions JA** pour les 5 pages (~400+ clés)
11. **Remplacer le texte hardcoded** par `t("key")` dans les 5 composants

> Note : Les traductions TH/JA des contenus médicaux longs seront fidèles au contenu EN existant.