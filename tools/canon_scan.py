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
    # Interdiction seche, decision Vincent du 2026-07-26 : les avis reels se
    # publient en TEXTE VISIBLE, jamais en noeud Review. Google proscrit le
    # balisage d avis qu une entreprise collecte sur elle-meme ; les etoiles ne
    # s afficheraient pas et le site s exposerait a une penalite pour spam
    # structure. L aggregateRating au niveau clinique reste legitime, lui :
    # 193 avis Google reels.
    (r'"@type":\s*"Review"', 'noeud Review JSON-LD interdit'),

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
    # Troisieme element = mot de contexte : si « partner » apparait dans la
    # fenetre autour de l occurrence, la regle ne s applique pas.
    #
    # La version precedente n utilisait qu un lookahead — elle ne regardait donc
    # que ce qui SUIT. Or l anglais met le plus souvent le partenaire AVANT :
    # « Our partner laboratories maintain ISO-certified ... ». Elle produisait
    # une alerte sur chaque phrase correctement redigee, et un scanner qui crie
    # sur du bon texte est un scanner qu on cesse de lire.
    (r'(?i)\bISO[-\s]?(?:and\s|&\s|/)?(?:GMP[-\s]?)?certified',
     'ISO attribue a la clinique', 'partner|พันธมิตร|パートナー|提携'),

    # --- revendication reglementaire nue ----------------------------------
    (r'FDA Thailand Approved', 'approbation reglementaire nue'),

    # --- superlatifs inverifiables ----------------------------------------
    # « ArokaGo Best Clinic ... » est le nom d un trophee : exclu par lookbehind.
    (r'(?<!ArokaGo )Best (?:Clinic|Dermatology|Doctor)', 'superlatif'),
    (r"(?i)Bangkok'?s premier|premier (?:regenerative|skin|longevity|IV)", 'superlatif'),
    (r'(?i)world-class|gold-standard', 'superlatif'),
    (r'(?i)\bbest dermatology\b', 'superlatif'),
    # Trouves par la passe adversariale du 26/07, encore en ligne : la liste
    # ci-dessus ne les couvrait pas. « leading » est qualifie par un nom pour
    # ne pas attraper le « leading to » ordinaire.
    (r'(?i)\bleading\s+(?:lifestyle|medicine|specialist|clinic|doctor|physician|'
     r'provider|expert|centre|center|authority)', 'superlatif'),
    # « our most comprehensive program » est un classement INTERNE : factuel,
    # verifiable, legitime. « Bangkok's most trusted clinic » est une
    # revendication contre tous les concurrents, invérifiable. Seule la seconde
    # forme est interdite — sans cette distinction la regle attrapait cinq
    # comparatifs internes parfaitement honnetes.
    (r"(?i)(?:bangkok|thailand|asia|the world|the country)'?s\s+most\s+\w+",
     'superlatif'),
    (r'(?i)most\s+\w+\s+(?:test|clinic|treatment|therapy|programme|program)\s+'
     r'available', 'superlatif (revendication de marche)'),
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
    ('lib/wa-interceptor.ts', 'ANCRE MORTE',
     'le #iv est un tag de message WhatsApp, pas une ancre HTML — zone John'),
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


# --- ANCRES MORTES ---------------------------------------------------------
# Le defaut du 26/07 : supprimer un composant a laisse trois liens #testimonials
# pointant dans le vide — le menu, le footer et la page /sitemap. Deux passes
# adversariales l ont trouve, le scanner non. Il le trouve maintenant.
def check_anchors():
    root = os.path.join(repo_root(), 'src')
    if not os.path.isdir(root):
        return 0
    ids, links = set(), {}
    for dp, dn, fn in os.walk(root):
        dn[:] = [d for d in dn if d not in ('node_modules', '.git', 'assets')]
        for f in fn:
            if not f.endswith(('.tsx', '.ts')):
                continue
            p = os.path.join(dp, f)
            s = io.open(p, encoding='utf-8', errors='ignore').read()
            rel = os.path.relpath(p, repo_root()).replace(os.sep, '/')
            # id="x"  et  id={'x'} / id={`x`}
            for m in re.finditer(r'id=(?:"([\w-]+)"|\{[\'"`]([\w-]+)[\'"`]\})', s):
                ids.add(m.group(1) or m.group(2))
            # id={service.slug} : le fichier rend une valeur de donnees en id.
            # On n ajoute ses slugs QUE dans ce cas. La nuance est le cœur du
            # controle : avant correction, Sitemap.tsx declarait les slugs mais
            # ne s en servait que comme key React — une key ne produit aucun
            # attribut dans le DOM, et les six liens du footer sautaient dans le
            # vide. Ajouter les slugs sans exiger ce rendu aurait masque
            # exactement le defaut que ce controle existe pour trouver.
            if re.search(r'id=\{\s*\w+\.(?:slug|id)\s*\}', s):
                for m in re.finditer(r'\b(?:slug|id):\s*[\'"]([\w-]+)[\'"]', s):
                    ids.add(m.group(1))
            # href="#x", to="/#x", path: "/#x"  — le fragment seul, sans domaine
            for m in re.finditer(r'["\'`](?:[\w/.-]*)#([\w-]+)["\'`]', s):
                frag = m.group(1)
                # Un code couleur n est pas une ancre. Sans ce filtre le
                # controle noyait six vrais liens morts sous « #fff » et
                # « #25D366 » — et un scanner bruyant cesse d etre lu.
                if re.match(r'^[0-9a-fA-F]{3,8}$', frag):
                    continue
                links.setdefault(frag, []).append(
                    (rel, s[:m.start()].count('\n') + 1))
    bad = 0
    for frag, where in sorted(links.items()):
        if frag in ids:
            continue
        for rel, line in where:
            if exempt(rel, 'ANCRE MORTE'):
                continue
            bad += 1
            out.write('%-46s:%-5d %-34s #%s\n'
                      % (rel, line, 'ANCRE MORTE', frag))
    return bad


# --- PRIX : les trois surfaces doivent s accorder --------------------------
# Sur skin et check-up un prix vit dans llms.txt, dans le bloc statique de
# index.html et dans le JSON-LD. Le 26/07, cinq produits hormonaux annoncaient
# 15 000 THB dans llms.txt et 13 500 partout ailleurs — trouve par SONDAGE lors
# d une passe adversariale, pas par un controle. Celui-ci le trouve.
#
# La regle exacte : le prix du JSON-LD doit figurer parmi les nombres enonces
# pour ce produit sur les autres surfaces. Formulee ainsi elle accepte les deux
# ecritures legitimes — la remise (« 15,000 → 13,500 », le JSON-LD porte 13500)
# et la fourchette (« 45,000–65,000 », le JSON-LD porte le prix d entree) —
# tout en refusant un chiffre qu aucune autre surface ne mentionne.
def _pname(txt):
    txt = re.sub(r'<[^>]+>', '', txt)
    txt = re.sub(r'^\s*(?:[-*]|\d+\.)\s*', '', txt).replace('**', '')
    # Coupe au premier separateur suivi d un montant, et jamais ailleurs :
    # « Pico Laser – Executive ... – 20 Sessions — 58,000 THB » garde son nom.
    txt = re.split(r'\s+[—–-]\s+(?=[\d฿])|\s*\((?=[\d฿])', txt)[0]
    txt = re.sub(r'[^a-z0-9+ ]', ' ', txt.lower())
    return re.sub(r'\s+', ' ', txt).strip()


def _amounts(txt):
    return set(n.replace(',', '') for n in
               re.findall(r'(?:฿\s*)?([\d][\d,]{2,})(?:\s*THB)?', txt))


def check_prices():
    root = repo_root()
    html_path = os.path.join(root, 'index.html')
    if not os.path.isfile(html_path):
        return 0
    html = io.open(html_path, encoding='utf-8', errors='ignore').read()

    # Surface de reference : les Offer du JSON-LD, le seul endroit ou un prix
    # est affirme a la machine comme LE prix.
    jsonld = {}
    for m in re.finditer(r'"name":\s*"([^"]+)"[^{}]*?"price":\s*"?([\d,]+)"?', html):
        jsonld.setdefault(_pname(m.group(1)), set()).add(m.group(2).replace(',', ''))

    # Surfaces enoncees : le bloc statique et llms.txt.
    stated = {}
    for li in re.findall(r'<li>(.*?)</li>', html, re.S):
        if 'THB' in li or '฿' in li:
            stated.setdefault(_pname(li), set()).update(_amounts(li))
    llms = os.path.join(root, 'public', 'llms.txt')
    if os.path.isfile(llms):
        for line in io.open(llms, encoding='utf-8', errors='ignore'):
            if 'THB' in line or '฿' in line:
                stated.setdefault(_pname(line), set()).update(_amounts(line))

    bad = 0
    for name, prices in sorted(jsonld.items()):
        said = stated.get(name)
        if not said:
            continue          # produit absent des surfaces enoncees : rien a croiser
        for p in sorted(prices):
            if p not in said:
                bad += 1
                out.write('%-46s:%-5s %-34s %s (JSON-LD) vs %s\n'
                          % ('index.html', '-', 'PRIX EN DESACCORD',
                             p, '/'.join(sorted(said))))
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
    for rule in PATTERNS + EXTRA_PATTERNS:
        pat, label = rule[0], rule[1]
        near = rule[2] if len(rule) > 2 else None
        for m in re.finditer(pat, s):
            line = s[:m.start()].count('\n') + 1
            # Les commentaires de garde citent les motifs qu ils interdisent
            # (« ne pas re-ajouter transcript ... »). Les signaler noierait les
            # vraies occurrences sous du bruit, et un scanner bruyant est un
            # scanner qu on cesse de lire.
            # « {/* » est la forme JSX : sans elle, un commentaire de section
            # React comme {/* Best Clinic Award */} remonte en superlatif.
            src_line = s.splitlines()[line - 1].lstrip() if line <= len(s.splitlines()) else ''
            if src_line.startswith(('//', '*', '/*', '{/*', '#', '<!--')):
                continue
            # Mot de contexte : on regarde des DEUX cotes. Voir la regle ISO.
            # Plusieurs termes separes par « | », parce qu une phrase thaie ou
            # japonaise correcte n emploie pas le mot anglais « partner ».
            if near:
                window = s[max(0, m.start() - 90):m.end() + 90].lower()
                if any(t.lower() in window for t in near.split('|')):
                    continue
            if exempt(rel, label):
                continue
            hits += 1
            out.write('%-46s:%-5d %-34s %s\n' % (rel, line, label, m.group(0)[:34]))

hits += check_presence()
hits += check_anchors()
hits += check_prices()

out.write('\n%d fichiers scannes · %d occurrences · %s\n'
          % (scanned, hits, 'PROPRE' if not hits else 'A CORRIGER'))
out.flush()
sys.exit(0 if not hits else 1)
