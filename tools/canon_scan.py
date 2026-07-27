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
    # Jusqu a deux mots entre « leading » et le nom : « Bangkok's leading
    # HEALTH clinic » echappait a la version collee.
    (r'(?i)\bleading\s+(?:\w+\s+){0,2}(?:lifestyle|medicine|specialist|clinic|'
     r'doctor|physician|provider|expert|centre|center|authority)', 'superlatif'),
    # « Ultimate » est le nom d un forfait check-up (90 000 THB) : le
    # lookahead evite de signaler un nom propre comme un superlatif.
    (r'(?i)\bunparalleled\b|\bunrivall?ed\b|\bsecond to none\b'
     r'|\bthe ultimate\b(?!(?:\s+\w+){0,2}\s+(?:package|program|programme|tier|plan))',
     'superlatif'),
    (r'(?i)\b(?:no\.?\s*1|#1|number one)\b', 'superlatif'),
    (r'(?i)top\s+clinic|トップクリニック|ชั้นนำ|比類なき|ไม่เคยมีมาก่อน', 'superlatif'),
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
            lines = s.split('\n')

            def in_comment(pos):
                """Un commentaire ne rend rien et ne lie rien.

                Sans cette exclusion, un commentaire de garde documentant
                id="ancienne-section" suffisait a faire passer un lien mort
                pour vivant — le controle se validait lui-meme. Le depot
                contient deja exactement ce cas de figure : le commentaire
                de VideoTestimonials.tsx cite l id qu il protege.
                """
                return lines[s[:pos].count('\n')].lstrip().startswith(
                    ('//', '*', '/*', '{/*', '#', '<!--'))

            # id="x"  et  id={'x'} / id={`x`}
            for m in re.finditer(r'id=(?:"([\w-]+)"|\{[\'"`]([\w-]+)[\'"`]\})', s):
                if in_comment(m.start()):
                    continue
                ids.add(m.group(1) or m.group(2))
            # id={service.slug} : le fichier rend une valeur de donnees en id.
            # On n ajoute ses slugs QUE dans ce cas. La nuance est le cœur du
            # controle : avant correction, Sitemap.tsx declarait les slugs mais
            # ne s en servait que comme key React — une key ne produit aucun
            # attribut dans le DOM, et les six liens du footer sautaient dans le
            # vide. Ajouter les slugs sans exiger ce rendu aurait masque
            # exactement le defaut que ce controle existe pour trouver.
            #
            # LIMITE CONNUE, assumee : la recolte est par FICHIER, pas par
            # tableau. Un fichier qui rend un tableau en id et en declare un
            # second, non rendu, verra les slugs du second acceptes a tort.
            # Verifie a la main sur les quatre consommateurs actuels du motif
            # (AutoBlog.tsx, Sitemap.tsx, MembershipSection.tsx x2) : tous
            # rendent bien l integralite de leurs tableaux. Resserrer
            # demanderait d analyser la portee du .map(), ce qu une regex ne
            # sait pas faire honnetement.
            if re.search(r'id=\{\s*\w+\.(?:slug|id)\s*\}', s):
                for m in re.finditer(r'\b(?:slug|id):\s*[\'"]([\w-]+)[\'"]', s):
                    if in_comment(m.start()):
                        continue
                    ids.add(m.group(1))
            # href="#x", to="/#x", path: "/#x"  — le fragment seul, sans domaine
            for m in re.finditer(r'["\'`](?:[\w/.-]*)#([\w-]+)["\'`]', s):
                if in_comment(m.start()):
                    continue
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
# Mots-vehicule : ils nomment le CONTENANT, jamais le produit. Un meme drip
# s ecrit « Fat Burner », « Fat Burner IV », « Fat Burner IV Drip » et « Fat
# Burner IV Therapy » selon la surface. Sans ce retrait, ces quatre ecritures
# sont quatre produits distincts, chacun seul sur sa surface, donc chacun
# invisible au controle de desaccord — qui exige DEUX sources pour comparer.
# Mesure au 27/07 sur le satellite IV : 50 « produits » dont 42 orphelins, soit
# 8 produits reellement compares sur 33. Le controle existait sans controler.
# Apres retrait : 33 produits, 17 orphelins, et zero fusion abusive (verifiee
# nom brut par nom brut sur les quatre satellites).
_NOISE = frozenset(('therapy', 'drip', 'treatment', 'infusion', 'iv'))


def _pname(txt):
    txt = re.sub(r'<[^>]+>', '', txt)
    txt = re.sub(r'^\s*(?:[-*]|\d+\.)\s*', '', txt).replace('**', '')
    # Coupe au premier separateur suivi d un montant, et jamais ailleurs :
    # « Pico Laser – Executive ... – 20 Sessions — 58,000 THB » garde son nom.
    #
    # Le « : » est indispensable et manquait. llms.txt s ecrit « - Nom: 4,500 »,
    # donc sans lui le nom normalise etait « fat burner 4 500 » — le montant
    # colle au nom. Consequence mesuree le 27/07 : AUCUNE ligne de llms.txt ne
    # pouvait s apparier a une autre surface, donc le fichier que la regle
    # designe comme l une des trois surfaces devant s accorder etait de fait
    # exclu du controle. Le « : » ne coupe que devant un chiffre : « Package:
    # Foundation » garde son nom entier.
    txt = re.split(r'\s+[—–-]\s+(?=[\d฿])|\s*\((?=[\d฿])|\s*:\s*(?=[\d฿])',
                   txt)[0]
    txt = re.sub(r'[^a-z0-9+ ]', ' ', txt.lower())
    txt = re.sub(r'\s+', ' ', txt).strip()
    return ' '.join(w for w in txt.split() if w not in _NOISE) or txt


def _amounts(txt):
    return set(n.replace(',', '') for n in
               re.findall(r'(?:฿\s*)?([\d][\d,]{2,})(?:\s*THB)?', txt))


def _add(store, source, name, amounts):
    if name and amounts:
        store.setdefault(name, {}).setdefault(source, set()).update(amounts)


def _collect_prices():
    root = repo_root()
    prices = {}     # nom normalise -> { source : {montants} }

    html_path = os.path.join(root, 'index.html')
    if os.path.isfile(html_path):
        html = io.open(html_path, encoding='utf-8', errors='ignore').read()
        for m in re.finditer(r'"name":\s*"([^"]+)"[^{}]*?"price":\s*"?([\d,]+)"?',
                             html):
            _add(prices, 'index.html JSON-LD', _pname(m.group(1)),
                 {m.group(2).replace(',', '')})
        for li in re.findall(r'<li>(.*?)</li>', html, re.S):
            if 'THB' in li or '฿' in li:
                _add(prices, 'index.html statique', _pname(li), _amounts(li))

    llms = os.path.join(root, 'public', 'llms.txt')
    if os.path.isfile(llms):
        for line in io.open(llms, encoding='utf-8', errors='ignore'):
            if 'THB' in line or '฿' in line:
                _add(prices, 'llms.txt', _pname(line), _amounts(line))

    # Le code source. La version precedente ne lisait QUE index.html et
    # llms.txt : elle ne pouvait donc pas voir les cinq prix faux que
    # src/pages/Sitemap.tsx portait en dur sur le satellite IV — dont un ecart
    # de 3 000 THB sur Glow Revive, en ligne. Un controle de prix qui ignore le
    # code n en est pas un.
    src = os.path.join(root, 'src')
    if os.path.isdir(src):
        for dp, dn, fn in os.walk(src):
            dn[:] = [d for d in dn if d not in ('node_modules', '.git', 'assets')]
            for f in fn:
                if not f.endswith(('.tsx', '.ts')):
                    continue
                fp = os.path.join(dp, f)
                rel = os.path.relpath(fp, root).replace(os.sep, '/')
                body = io.open(fp, encoding='utf-8', errors='ignore').read()
                # « name: "X", ... price: "N THB" »  et  « "X", "N THB" »
                for m in re.finditer(
                        r'name:\s*"([^"]+)"[^\n]{0,120}?price:\s*"([\d,]+)\s*THB"'
                        r'|"([^"]{4,60})",\s*"([\d,]+)\s*THB"', body):
                    nm = m.group(1) or m.group(3)
                    am = m.group(2) or m.group(4)
                    _add(prices, rel, _pname(nm), {am.replace(',', '')})

    return prices


# Surfaces de reference : le catalogue que la clinique publie comme etant le
# sien. Un produit peut legitimement n exister que la (le catalogue check-up
# vit presque entierement dans le JSON-LD de index.html : 65 de ses 76 produits
# n ont qu une seule surface, et aucun n est un probleme).
def _is_canonical(source):
    return (source.startswith(('llms.txt', 'index.html'))
            or 'PriceList' in source or 'Pricing' in source)


# --- PRODUIT ORPHELIN : invente plutot que contredit -----------------------
# Le controle de desaccord ci-dessus compare un produit ENTRE surfaces : il ne
# peut donc rien voir d un produit qui n existe QUE sur une surface — il n a
# rien avec quoi etre en desaccord. C est exactement la forme du defaut trouve
# le 27/07 sur IV : « Athlete Max IV » a 5 500 THB, dans src/pages/Sitemap.tsx
# et lie depuis le pied de page, absent du Sheet master, de llms.txt, de
# PriceList et de prerender.mjs. Le catalogue reel porte « Athlete Pro » 4 500
# et « Athlete Pro Max » 8 500. Le scanner declarait le depot PROPRE.
#
# Le controle detectait la contradiction, pas l invention. Celui-ci comble le
# trou : un produit PORTEUR D UN PRIX, present sur une seule surface, et cette
# surface n etant pas le catalogue de reference, est tenu pour invente jusqu a
# preuve du contraire.
#
# Portee volontairement etroite (decision Vincent 27/07) : un produit vu sur la
# seule surface canonique n est PAS signale — sinon 65 faux positifs sur le
# seul check-up, et un scanner bruyant est un scanner qu on cesse de lire.
# Calibrage au 27/07 : 3 detections sur IV, 0 sur skin, check-up et stem cell.
def check_orphans():
    bad = 0
    for name, bysrc in sorted(_collect_prices().items()):
        if len(bysrc) != 1:
            continue
        source, amounts = next(iter(bysrc.items()))
        if _is_canonical(source):
            continue
        if exempt(source, 'PRODUIT ORPHELIN'):
            continue
        bad += 1
        out.write('%-46s:%-5s %-34s %s\n'
                  % (source[:46], '-', 'PRODUIT ORPHELIN',
                     '%s = %s (nulle part ailleurs)'
                     % (name[:40], '/'.join(sorted(amounts)))))
    return bad


def check_prices():
    prices = _collect_prices()

    # Desaccord = deux sources dont les montants n ont AUCUNE valeur commune.
    # Formulee ainsi, la regle tolere la remise (« 15,000 → 13,500 » face a
    # 13500) et la fourchette (« 45,000–65,000 » face au prix d entree), et
    # refuse un chiffre qu aucune autre surface ne mentionne.
    bad = 0
    for name, bysrc in sorted(prices.items()):
        if len(bysrc) < 2:
            continue
        common = set.intersection(*bysrc.values())
        if common:
            continue
        bad += 1
        detail = ' · '.join('%s=%s' % (s, '/'.join(sorted(v)))
                            for s, v in sorted(bysrc.items()))
        out.write('%-46s:%-5s %-34s %s\n'
                  % (name[:46], '-', 'PRIX EN DESACCORD', detail[:90]))
    return bad



# --- TUNNEL DE RESERVATION : les trois pieces doivent aller ensemble --------
# Constate le 27/07 : quatre satellites portaient des liens /book et un seul
# avait la page d aboutissement qui mesure la soumission. On savait donc combien
# de visiteurs partaient vers le formulaire, jamais combien allaient au bout.
# L ecart n avait produit aucune alerte parce qu aucun controle ne regardait le
# tunnel comme un ensemble.
#
# La regle : si ce depot expose des liens /book, alors il lui faut AUSSI la
# redirection vers Fillout, la route /merci, et l evenement form_submit. Un
# depot sans lien /book (peptides, qui n adresse que WhatsApp) n est pas
# concerne — l absence y est un choix, pas un oubli.
def check_funnel():
    root = repo_root()

    def read(rel):
        p = os.path.join(root, rel)
        return io.open(p, encoding='utf-8', errors='ignore').read() if os.path.isfile(p) else ''

    src = os.path.join(root, 'src')
    book = merci = submit = 0
    for dp, dn, fn in os.walk(src) if os.path.isdir(src) else []:
        dn[:] = [d for d in dn if d not in ('node_modules', '.git', 'assets')]
        for f in fn:
            if not f.endswith(('.tsx', '.ts')):
                continue
            body = io.open(os.path.join(dp, f), encoding='utf-8',
                           errors='ignore').read()
            book += len(re.findall(r'(?:href|to)=[{"\']*"?/book', body))
            merci += len(re.findall(r'["\']/merci["\']', body))
            submit += body.count('form_submit')

    if not book:
        return 0

    bad = 0
    for label, ok in (
        ('redirection /book absente de vercel.json',
         '/book' in read('vercel.json')),
        ('route /merci absente alors que /book est expose', merci > 0),
        ('form_submit jamais emis : les soumissions ne sont pas mesurees',
         submit > 0),
    ):
        if not ok:
            bad += 1
            out.write('%-46s:%-5s %-34s %s\n'
                      % ('tunnel de reservation', '-', 'TUNNEL INCOMPLET',
                         '%s (%d lien(s) /book)' % (label, book)))
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
hits += check_orphans()
hits += check_funnel()

out.write('\n%d fichiers scannes · %d occurrences · %s\n'
          % (scanned, hits, 'PROPRE' if not hits else 'A CORRIGER'))
out.flush()
sys.exit(0 if not hits else 1)
