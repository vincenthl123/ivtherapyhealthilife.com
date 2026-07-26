# -*- coding: utf-8 -*-
"""Scan canon — les regles qui valent pour TOUS les satellites Healthi Life.

Porte depuis tools/geo/ymyl_scan.py du satellite cellules souches, dont il
reprend le noyau universel : awards, identite des medecins, donnees fabriquees,
attribution de l'ISO, superlatifs, revendications reglementaires nues.

Ce qui n'a PAS ete porte, volontairement : les regles de perimetre propres au
satellite cellules souches (placenta, hormones, fertilite marques « hors
grille »). Skin vend reellement de la therapie placentaire et le check-up vend
des panels hormonaux : les copier ici produirait des faux positifs en serie.

Chaque satellite peut ajouter ses propres motifs dans EXTRA_PATTERNS sans
toucher au noyau.

    python3 tools/canon_scan.py     # sortie non nulle si une occurrence
"""
import io
import os
import re
import sys

out = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# --- NOYAU COMMUN ---------------------------------------------------------
PATTERNS = [
    # --- awards : seuls trois claims existent -----------------------------
    # 1. « 2025 Regenerative Clinic of the Year in Asia-Pacific »
    #    decerne par « GlobalHealth Asia-Pacific Awards » (nom complet obligatoire)
    # 2. « ArokaGo Best Clinic Rising Star 2025 » (decision Vincent 2026-07-26)
    # 3. finaliste 2026 Beyond Activ Awards
    (r'Rising Star, ArokaGo', 'award : ordre des mots fautif'),
    (r'ArokaGo Best Rising Star', 'award perime : il manque « Clinic »'),
    (r'GlobalHealth Awards', 'award : nom d organisation tronque'),
    (r'Asia-Pacific Health Awards', 'award : organisation inexistante'),
    (r'Best (?:IV Therapy|Regenerative|Health Check-?Up|Skin) Clinic',
     'award fabrique (forme « Best ... Clinic »)'),
    (r'Thailand Rising Star|ดาวรุ่งไทยแลนด์|タイランド ライジングスター',
     'award fabrique (variante Thailand)'),

    # --- temoignages fabriques --------------------------------------------
    # Ces quatre noms etaient publies sur le satellite IV en JSON-LD « Review »,
    # avec notes 5 etoiles et promesses de resultat, sous le commentaire
    # « Real customer reviews for rich snippets ». Le scanner du satellite
    # cellules souches les interdisait deja nommement — mais lui seul. Retires
    # le 2026-07-26.
    (r"O'Connell|Meera Kapoor|Richard Chen|Sophie Williams", 'faux temoin'),
    # Un noeud Review individuel affirme a Google qu un avis nomme est
    # authentique. Il n en entre un ici que s il provient d un vrai avis Google
    # verifiable — d ou le signalement systematique.
    # (L aggregateRating au niveau clinique, lui, est legitime : 193 avis reels.)
    (r'"@type":\s*"Review"', 'Review JSON-LD — prouver qu il est reel'),

    # --- identite des medecins (SSOT _SOURCE_OF_TRUTH_doctors.md) ---------
    (r'\bABLM\b', 'ABLM INTERDIT — le board de Dr Petch est IBLM'),
    (r'American Academy of Aesthetic Medicine', 'AAAM = Anti-Aging, jamais Aesthetic'),
    (r'Aesthetic Medicine.{0,8}AAAM|AAAM Aesthetic', 'AAAM conflate avec Aesthetic'),
    (r'\bCMO\b', 'CMO seul interdit — « Chief Medical Officer » en entier'),
    (r'IV Nutrition Infusion Therapy', 'expansion CBAM fabriquee'),
    (r'\bManeesri\b', 'nom de famille fabrique pour Dr Petch'),
    (r'Medical Director', 'titre inexistant chez les deux medecins'),

    # --- donnees structurees fabriquees -----------------------------------
    (r'"transcript"', 'transcript fabrique'),
    (r'userInteractionCount|InteractionCounter|interactionStatistic',
     'metrique d engagement fabriquee'),
    (r'accessibilityFeature|accessibilitySummary|accessibilityHazard',
     'declaration d accessibilite invérifiable'),

    # --- ISO : appartient aux laboratoires partenaires, jamais a la clinique
    # On ne signale que si « partner » n absente dans les 70 caracteres suivants.
    (r'(?i)\bISO[-\s]?(?:and\s|&\s|/)?(?:GMP[-\s]?)?certified(?!.{0,70}partner)',
     'ISO attribue a la clinique'),

    # --- revendication reglementaire nue ----------------------------------
    (r'FDA Thailand Approved', 'approbation reglementaire nue'),

    # --- superlatifs inverifiables ----------------------------------------
    # « ArokaGo Best Clinic ... » est le nom d un trophee : exclu par lookbehind.
    (r'(?<!ArokaGo )Best (?:Clinic|Dermatology|Doctor)', 'superlatif'),
    (r"(?i)Bangkok'?s premier|premier (?:regenerative|skin|longevity|IV)", 'superlatif'),
    (r'(?i)world-class|gold-standard', 'superlatif'),
    (r'(?i)\bbest dermatology\b', 'superlatif'),
]

# Motifs propres a ce depot. Vide par defaut.
EXTRA_PATTERNS = []

# --- EXEMPTIONS -----------------------------------------------------------
# Une occurrence exempte n est PAS un defaut ignore : c est un cas ou la regle
# ne s applique pas, et la raison doit tenir en une phrase verifiable.
#
# Le seul cas legitime a ce jour : la parole citee d un patient. Un superlatif
# dans un temoignage appartient au patient, pas a la clinique. Le reecrire
# serait falsifier un avis — une faute bien plus grave que le superlatif.
#
# Format : (fragment de chemin, libelle de la regle, justification)
EXEMPT = [
    ('components/Testimonials.tsx', 'superlatif',
     'parole citee d un patient — la reecrire falsifierait un avis'),
    ('components/VideoTestimonials.tsx', 'superlatif',
     'parole citee d un patient — la reecrire falsifierait un avis'),
]


def exempt(rel, label):
    return any(p in rel and lab == label for p, lab, _ in EXEMPT)

# --- PRESENCE : ce qui doit EXISTER, pas seulement ce qui doit manquer -----
# Un controle qui ne cherche que des absences laisse passer une surface
# manquante. C est ainsi qu un satellite entier s est retrouve sans llms.txt.
REQUIRED_FILES = ['public/llms.txt', 'public/robots.txt']
REQUIRED_IN_LLMS = ['healthi-life.com']   # rattachement a la maison mere
AI_BOTS = ['GPTBot', 'ClaudeBot', 'PerplexityBot']


def repo_root():
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')


def check_presence():
    bad = 0
    root = repo_root()
    for rel in REQUIRED_FILES:
        path = os.path.join(root, *rel.split('/'))
        if not os.path.isfile(path):
            bad += 1
            out.write('%-46s:%-5s %-34s %s\n' % (rel, '-', 'SURFACE AI ABSENTE', rel))
            continue
        body = io.open(path, encoding='utf-8', errors='ignore').read()
        if rel.endswith('llms.txt'):
            for mark in REQUIRED_IN_LLMS:
                if mark not in body:
                    bad += 1
                    out.write('%-46s:%-5s %-34s %s\n'
                              % (rel, '-', 'LIEN MAISON MERE ABSENT', mark))
        if rel.endswith('robots.txt'):
            for bot in AI_BOTS:
                if bot not in body:
                    bad += 1
                    out.write('%-46s:%-5s %-34s %s\n'
                              % (rel, '-', 'BOT IA NON NOMME', bot))
    return bad


ROOTS = ['dist', 'public', 'index.html', 'src']
EXT = ('html', 'json', 'txt', 'tsx', 'ts', 'yaml', 'yml', 'tsv', 'xml', 'mjs')
SELF = os.path.basename(__file__)   # ce fichier cite les motifs : il s exclut


def files():
    root = repo_root()
    for r in ROOTS:
        p = os.path.join(root, r)
        if os.path.isfile(p):
            yield p
            continue
        if not os.path.isdir(p):
            continue
        for dp, dn, fn in os.walk(p):
            dn[:] = [d for d in dn if d not in ('node_modules', '.git', 'assets')]
            for f in fn:
                if f != SELF and f.rsplit('.', 1)[-1] in EXT:
                    yield os.path.join(dp, f)


hits = 0
scanned = 0
root = repo_root()
for f in files():
    try:
        s = io.open(f, encoding='utf-8', errors='ignore').read()
    except Exception:
        continue
    scanned += 1
    rel = os.path.relpath(f, root).replace(os.sep, '/')
    for pat, label in PATTERNS + EXTRA_PATTERNS:
        for m in re.finditer(pat, s):
            line = s[:m.start()].count('\n') + 1
            # Les commentaires de garde citent les motifs qu ils interdisent
            # (« ne pas re-ajouter transcript ... »). Les signaler noierait les
            # vraies occurrences sous du bruit, et un scanner bruyant est un
            # scanner qu on cesse de lire.
            src_line = s.splitlines()[line - 1].lstrip() if line <= len(s.splitlines()) else ''
            if src_line.startswith(('//', '*', '/*', '#', '<!--')):
                continue
            if exempt(rel, label):
                continue
            hits += 1
            out.write('%-46s:%-5d %-34s %s\n' % (rel, line, label, m.group(0)[:34]))

hits += check_presence()

out.write('\n%d fichiers scannes · %d occurrences · %s\n'
          % (scanned, hits, 'PROPRE' if not hits else 'A CORRIGER'))
out.flush()
sys.exit(0 if not hits else 1)
