import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/66919991744";

const PAGE_TITLE =
  "Therapeutic Peptides in Longevity Medicine - Educational Overview | Healthi Life";
const PAGE_DESCRIPTION =
  "An evidence-based introduction to therapeutic peptides in longevity medicine: what they are, which families are studied, and how they fit into a physician-supervised protocol. Educational only.";
const CANONICAL_URL =
  "https://healthi-life.com/science/peptides-introduction/";

const HREFLANGS: { hreflang: string; href: string }[] = [
  { hreflang: "en", href: "https://healthi-life.com/science/peptides-introduction/" },
  { hreflang: "th", href: "https://healthi-life.com/th/science/peptides-introduction/" },
  { hreflang: "ja", href: "https://healthi-life.com/ja/science/peptides-introduction/" },
  { hreflang: "x-default", href: "https://healthi-life.com/science/peptides-introduction/" },
];

const ARTICLE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Therapeutic Peptides in Longevity Medicine - An Educational Overview",
  description:
    "Educational introduction to therapeutic peptides in longevity medicine.",
  inLanguage: "en",
  author: {
    "@type": "Organization",
    name: "Healthi Life",
    url: "https://healthi-life.com",
  },
  publisher: {
    "@type": "MedicalOrganization",
    name: "Healthi Life",
    url: "https://healthi-life.com",
    logo: {
      "@type": "ImageObject",
      url: "https://healthi-life.com/logo.png",
    },
  },
  datePublished: "2026-04-24",
  dateModified: "2026-04-24",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": CANONICAL_URL,
  },
  isAccessibleForFree: true,
};

const PeptidesIntroduction = () => {
  useEffect(() => {
    const originalTitle = document.title;

    // ---------- Helpers ----------
    const ensureMeta = (
      selector: string,
      attrName: string,
      attrValue: string,
      content: string,
    ) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      let created = false;
      let prev: string | null = null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
        created = true;
      } else {
        prev = el.getAttribute("content");
      }
      if (el.getAttribute("content") !== content) {
        el.setAttribute("content", content);
      }
      return { el, prev, created };
    };

    const ensureLink = (
      selector: string,
      attrs: Record<string, string>,
    ) => {
      let el = document.head.querySelector<HTMLLinkElement>(selector);
      let created = false;
      const prev: Record<string, string | null> = {};
      if (!el) {
        el = document.createElement("link");
        Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
        document.head.appendChild(el);
        created = true;
      } else {
        Object.keys(attrs).forEach((k) => (prev[k] = el!.getAttribute(k)));
        Object.entries(attrs).forEach(([k, v]) => {
          if (el!.getAttribute(k) !== v) el!.setAttribute(k, v);
        });
      }
      return { el, prev, created };
    };

    // ---------- Apply head ----------
    document.title = PAGE_TITLE;

    const desc = ensureMeta('meta[name="description"]', "name", "description", PAGE_DESCRIPTION);
    const robots = ensureMeta('meta[name="robots"]', "name", "robots", "noindex, nofollow");
    const ogTitle = ensureMeta('meta[property="og:title"]', "property", "og:title", PAGE_TITLE);
    const ogDesc = ensureMeta('meta[property="og:description"]', "property", "og:description", PAGE_DESCRIPTION);
    const ogType = ensureMeta('meta[property="og:type"]', "property", "og:type", "article");
    const ogUrl = ensureMeta('meta[property="og:url"]', "property", "og:url", CANONICAL_URL);
    const twTitle = ensureMeta('meta[name="twitter:title"]', "name", "twitter:title", PAGE_TITLE);
    const twDesc = ensureMeta('meta[name="twitter:description"]', "name", "twitter:description", PAGE_DESCRIPTION);

    const canonical = ensureLink('link[rel="canonical"]', {
      rel: "canonical",
      href: CANONICAL_URL,
    });

    // Remove any existing hreflang links so we control them entirely
    const removedHreflangs: { node: HTMLLinkElement; parent: Node; next: Node | null }[] = [];
    document
      .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')
      .forEach((l) => {
        removedHreflangs.push({ node: l, parent: l.parentNode!, next: l.nextSibling });
        l.remove();
      });

    const injectedHreflangs: HTMLLinkElement[] = [];
    HREFLANGS.forEach(({ hreflang, href }) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", hreflang);
      link.setAttribute("href", href);
      link.setAttribute("data-peptides-intro", "1");
      document.head.appendChild(link);
      injectedHreflangs.push(link);
    });

    // ---------- JSON-LD: strip all existing, inject Article only ----------
    const removedJsonLd: { node: HTMLScriptElement; parent: Node; next: Node | null }[] = [];
    document
      .querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')
      .forEach((s) => {
        removedJsonLd.push({ node: s, parent: s.parentNode!, next: s.nextSibling });
        s.remove();
      });

    const articleScript = document.createElement("script");
    articleScript.type = "application/ld+json";
    articleScript.id = "peptides-intro-article-jsonld";
    articleScript.textContent = JSON.stringify(ARTICLE_JSONLD);
    document.head.appendChild(articleScript);

    // ---------- Re-apply on mutation (defeat Helmet / global SEO overrides) ----------
    let reapplying = false;
    const reapply = () => {
      if (reapplying) return;
      reapplying = true;
      try {
        if (document.title !== PAGE_TITLE) document.title = PAGE_TITLE;

        const setMeta = (sel: string, attrName: string, attrValue: string, content: string) => {
          let el = document.head.querySelector<HTMLMetaElement>(sel);
          if (!el) {
            el = document.createElement("meta");
            el.setAttribute(attrName, attrValue);
            document.head.appendChild(el);
          }
          if (el.getAttribute("content") !== content) el.setAttribute("content", content);
        };
        setMeta('meta[name="description"]', "name", "description", PAGE_DESCRIPTION);
        setMeta('meta[name="robots"]', "name", "robots", "noindex, nofollow");
        setMeta('meta[property="og:title"]', "property", "og:title", PAGE_TITLE);
        setMeta('meta[property="og:description"]', "property", "og:description", PAGE_DESCRIPTION);
        setMeta('meta[property="og:type"]', "property", "og:type", "article");
        setMeta('meta[property="og:url"]', "property", "og:url", CANONICAL_URL);
        setMeta('meta[name="twitter:title"]', "name", "twitter:title", PAGE_TITLE);
        setMeta('meta[name="twitter:description"]', "name", "twitter:description", PAGE_DESCRIPTION);

        let c = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!c) {
          c = document.createElement("link");
          c.setAttribute("rel", "canonical");
          document.head.appendChild(c);
        }
        if (c.getAttribute("href") !== CANONICAL_URL) c.setAttribute("href", CANONICAL_URL);

        // Hreflang: remove any not marked by us, ensure ours exist
        document
          .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')
          .forEach((l) => {
            if (l.getAttribute("data-peptides-intro") !== "1") l.remove();
          });
        HREFLANGS.forEach(({ hreflang, href }) => {
          const sel = `link[rel="alternate"][hreflang="${hreflang}"][data-peptides-intro="1"]`;
          let l = document.head.querySelector<HTMLLinkElement>(sel);
          if (!l) {
            l = document.createElement("link");
            l.setAttribute("rel", "alternate");
            l.setAttribute("hreflang", hreflang);
            l.setAttribute("href", href);
            l.setAttribute("data-peptides-intro", "1");
            document.head.appendChild(l);
          } else if (l.getAttribute("href") !== href) {
            l.setAttribute("href", href);
          }
        });

        // JSON-LD: keep only ours
        document
          .querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')
          .forEach((s) => {
            if (s.id !== "peptides-intro-article-jsonld") s.remove();
          });
        if (!document.getElementById("peptides-intro-article-jsonld")) {
          const s = document.createElement("script");
          s.type = "application/ld+json";
          s.id = "peptides-intro-article-jsonld";
          s.textContent = JSON.stringify(ARTICLE_JSONLD);
          document.head.appendChild(s);
        }
      } finally {
        reapplying = false;
      }
    };

    const observer = new MutationObserver(() => reapply());
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["content", "href"],
      characterData: true,
    });
    const titleEl = document.querySelector("title");
    if (titleEl) {
      observer.observe(titleEl, { childList: true, characterData: true, subtree: true });
    }
    const raf = requestAnimationFrame(reapply);
    const t1 = window.setTimeout(reapply, 100);
    const t2 = window.setTimeout(reapply, 500);

    window.scrollTo(0, 0);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);

      document.title = originalTitle;

      const restoreMeta = (m: { el: HTMLMetaElement | null; prev: string | null; created: boolean }) => {
        if (!m.el) return;
        if (m.created) m.el.remove();
        else if (m.prev !== null) m.el.setAttribute("content", m.prev);
      };
      restoreMeta(desc);
      restoreMeta(robots);
      restoreMeta(ogTitle);
      restoreMeta(ogDesc);
      restoreMeta(ogType);
      restoreMeta(ogUrl);
      restoreMeta(twTitle);
      restoreMeta(twDesc);

      if (canonical.el) {
        if (canonical.created) canonical.el.remove();
        else if (canonical.prev.href !== null) canonical.el.setAttribute("href", canonical.prev.href);
      }

      injectedHreflangs.forEach((l) => l.remove());
      removedHreflangs.forEach(({ node, parent, next }) => {
        if (next && next.parentNode === parent) parent.insertBefore(node, next);
        else parent.appendChild(node);
      });

      articleScript.remove();
      removedJsonLd.forEach(({ node, parent, next }) => {
        if (next && next.parentNode === parent) parent.insertBefore(node, next);
        else parent.appendChild(node);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-24 pb-20">
        <article className="container mx-auto px-4 max-w-3xl">
          {/* Hero */}
          <header className="mb-12 pb-8 border-b border-border">
            <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight text-foreground mb-4">
              Therapeutic Peptides in Longevity Medicine
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              An Educational Overview - Healthi Life, Bangkok
            </p>
          </header>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-12">
            Peptide therapy sits at the intersection of molecular biology and
            preventive medicine. This overview is intended for individuals who
            want to understand the science before a conversation with a
            physician - not to recommend, prescribe, or substitute clinical
            guidance.
          </p>

          {/* Section 1 */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-6">
              What Are Therapeutic Peptides?
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Proteins govern nearly every function in the human body - from
                immune defense and tissue repair to hormonal signaling and
                cellular energy. Proteins are built from amino acids. Peptides
                are shorter chains of those same amino acids: typically between
                2 and 50 residues in length, sitting structurally between a
                single amino acid and a full protein.
              </p>
              <p>
                What makes peptides clinically interesting is their role as
                signaling molecules. Rather than performing structural work
                themselves, many peptides function as biological messengers -
                binding to specific receptors and triggering downstream cellular
                responses. This specificity is the basis of their therapeutic
                relevance: a well-characterized peptide can activate a precise
                biological pathway without the broad systemic effects associated
                with more blunt pharmacological tools.
              </p>
              <p>
                The body produces thousands of endogenous peptides. Many decline
                in concentration or activity with age. Therapeutic peptides -
                whether synthesized versions of naturally occurring sequences or
                designed analogues - are studied for their potential to support
                or restore signaling pathways that attenuate over time.
              </p>
              <p>
                Delivery routes vary (subcutaneous injection being the most
                common in clinical research contexts), and the molecules are
                typically degraded by proteases in the digestive tract, which is
                why oral bioavailability remains a research challenge for many
                compounds.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-6">
              Peptide Families of Research Interest in Longevity Medicine
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              The field is active. Several distinct molecule classes have
              accumulated meaningful peer-reviewed literature. The following are
              educational reference points only - not treatment recommendations.
              Dosage, administration, and clinical appropriateness are
              physician-determined decisions based on individual biomarker
              profiles.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-serif text-foreground mb-3">
                  GHK-Cu (Copper Tripeptide)
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  A naturally occurring tripeptide found in human plasma, urine,
                  and saliva. GHK-Cu has been studied for its roles in wound
                  healing, tissue remodeling, anti-inflammatory activity, and
                  gene expression modulation. Research suggests it may influence
                  over 4,000 human genes, including those associated with DNA
                  repair and antioxidant defense. Concentration declines
                  measurably with age, which has made it a subject of interest
                  in skin biology and systemic regenerative research.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif text-foreground mb-3">
                  BPC-157 (Body Protection Compound)
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  A pentadecapeptide (15 amino acid) sequence derived from a
                  gastric protection protein. BPC-157 has been studied primarily
                  in animal models for its effects on tissue repair - including
                  tendon, ligament, muscle, and gastrointestinal mucosa - and
                  for its apparent interaction with nitric oxide pathways. Human
                  clinical data remains limited; the preclinical evidence base
                  is, however, unusually consistent across study designs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif text-foreground mb-3">
                  TB-500 (Thymosin Beta-4 Synthetic Fragment)
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Thymosin Beta-4 is an endogenous peptide involved in actin
                  regulation, cell migration, and angiogenesis. TB-500 is a
                  synthetic fragment of this molecule studied for recovery
                  support in musculoskeletal contexts and for potential effects
                  on cardiac and neural tissue repair. Research interest has
                  increased in the context of post-injury recovery protocols and
                  age-related tissue resilience.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif text-foreground mb-3">
                  Epithalon (Epitalon)
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  A synthetic tetrapeptide (four amino acids) originally derived
                  from research on the pineal gland. Epithalon has been studied
                  for its effects on telomerase activity - the enzyme
                  responsible for maintaining telomere length, a biomarker
                  associated with cellular aging and replicative capacity.
                  Published research, including human studies, suggests
                  potential influence on telomere dynamics and circadian rhythm
                  regulation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif text-foreground mb-3">
                  Semax
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  A heptapeptide (seven amino acids) analogue of a fragment of
                  adrenocorticotropic hormone (ACTH). Semax has been researched
                  for neuroprotective and cognitive support applications, with a
                  mechanism of action involving brain-derived neurotrophic
                  factor (BDNF) upregulation. It has regulatory approval in
                  Russia for neurological indications and has attracted research
                  interest in the context of cognitive longevity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif text-foreground mb-3">
                  Selank
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  A synthetic analogue of the endogenous peptide tuftsin, Selank
                  has been studied for anxiolytic and nootropic effects without
                  the dependency profile associated with classical
                  benzodiazepine compounds. Its mechanism appears to involve
                  regulation of the GABAergic system and modulation of cytokine
                  expression. Like Semax, it carries regulatory status in Russia
                  and continues to be studied in the context of stress
                  resilience and cognitive function.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-6">
              How Peptides Fit Into a Personalized Longevity Protocol
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                At Healthi Life, no therapeutic molecule is introduced in
                isolation. The guiding principle - Measure. Understand. Decide.
                - applies as much to peptide therapy as to any other
                intervention.
              </p>
              <p>
                A physician-supervised longevity protocol follows a structured
                sequence:
              </p>

              <div className="space-y-5 pt-2">
                <p>
                  <strong className="text-foreground font-semibold">
                    Assessment first.
                  </strong>{" "}
                  Before any therapeutic discussion, a comprehensive biomarker
                  panel establishes baseline biology. This includes hormonal
                  panels, inflammatory markers, metabolic indicators, oxidative
                  stress markers, and, where appropriate, epigenetic age
                  testing. The goal is a precise biological portrait - not a
                  generic starting point.
                </p>
                <p>
                  <strong className="text-foreground font-semibold">
                    Biomarker-guided selection.
                  </strong>{" "}
                  Peptide candidates are evaluated against an individual's
                  specific biological findings. A guest showing markers of
                  impaired tissue repair, suboptimal growth hormone axis
                  activity, or accelerated epigenetic aging would prompt
                  different clinical reasoning than one presenting with
                  cognitive or neurological resilience concerns. There is no
                  universal peptide stack. Personalization is the standard, not
                  the exception.
                </p>
                <p>
                  <strong className="text-foreground font-semibold">
                    Physician supervision throughout.
                  </strong>{" "}
                  Peptide therapy is prescription-only in most jurisdictions and
                  requires ongoing clinical oversight. Efficacy markers are
                  re-measured at defined intervals. Protocols are adjusted based
                  on response - not assumed to be static. Where peptides are not
                  indicated, or where supply or regulatory constraints apply,
                  the protocol is designed around what is appropriate,
                  available, and rigorously overseen.
                </p>
                <p>
                  <strong className="text-foreground font-semibold">
                    Integration with the full protocol.
                  </strong>{" "}
                  Peptides are one tool among many. A complete longevity
                  framework at Healthi Life encompasses nutritional
                  optimization, IV micronutrient support, sleep and circadian
                  recalibration, physical performance protocols, and
                  supplementation - all coordinated by the medical team under
                  one roof.
                </p>
              </div>

              <p className="pt-2">
                The conversation about whether therapeutic peptides are
                appropriate for a given individual begins with data, proceeds
                through physician judgment, and is never driven by trend or
                commercial availability.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-14 p-8 bg-secondary/40 border border-border rounded-lg text-center">
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you would like to explore whether peptide therapy is relevant
              to your biological profile, we invite you to speak with our
              medical team.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Speak with our medical team
              </a>
            </Button>
          </section>

          {/* Disclaimer */}
          <section className="border-t border-border pt-8">
            <p className="text-xs italic text-muted-foreground leading-relaxed mb-4">
              This article is for educational purposes only and does not
              constitute medical advice. Peptide therapy is prescription-only
              and must be supervised by a qualified physician. Regulatory status
              varies by jurisdiction. Individual clinical decisions are made
              exclusively between a guest and their treating physician at
              Healthi Life.
            </p>
            <p className="text-xs text-muted-foreground">
              Healthi Life - The Urban Longevity House. Bangkok, Asia.
              healthi-life.com
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PeptidesIntroduction;
