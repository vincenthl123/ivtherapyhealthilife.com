import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, FlaskConical, Microscope, History, Atom, ShieldAlert } from "lucide-react";

const PeptidesIntroduction = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonical = "https://ivtherapyhealthilife.com/science/peptides-introduction/";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "An Introduction to Peptides: Biology, History & Scientific Context",
    "description":
      "Educational overview of peptides: what they are, how they function in biology, their discovery history, and their place in modern scientific research. Educational content only — not medical advice.",
    "author": { "@type": "Organization", "name": "Healthi Life — Science Library" },
    "publisher": {
      "@type": "Organization",
      "name": "Healthi Life",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ivtherapyhealthilife.com/og-image.jpg",
      },
    },
    "datePublished": "2026-04-24",
    "dateModified": "2026-04-24",
    "mainEntityOfPage": canonical,
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "educationalUse": "Reference",
    "about": {
      "@type": "Thing",
      "name": "Peptides (biochemistry)",
      "sameAs": "https://en.wikipedia.org/wiki/Peptide",
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Introduction to Peptides — Biology & Scientific Context</title>
        <meta
          name="description"
          content="Educational article on peptides: what they are, how they work in biology, their discovery, and current research context. Information only — not medical advice."
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="An Introduction to Peptides — Educational Overview" />
        <meta
          property="og:description"
          content="Plain-language educational article on peptides in biology and research."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Top disclaimer banner */}
      <div className="bg-secondary/60 border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-start gap-3 text-sm text-muted-foreground">
          <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>
            <span className="font-semibold text-foreground">Educational content only.</span>{" "}
            This article is provided for general scientific information. It is not medical
            advice, diagnosis, or treatment. No products or services are offered on this page.
          </p>
        </div>
      </div>

      {/* Back link */}
      <div className="container mx-auto px-4 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      {/* Hero */}
      <header className="container mx-auto px-4 pt-10 pb-12 max-w-3xl">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-4">
          <BookOpen className="w-4 h-4" />
          Science Library · Educational
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight text-foreground mb-6">
          An Introduction to Peptides
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A plain-language overview of what peptides are, how they function in biology, where
          they were discovered, and how scientists study them today. This article does not
          discuss any specific product, brand, dose, or therapy.
        </p>
      </header>

      {/* Article body */}
      <article className="container mx-auto px-4 pb-20 max-w-3xl prose prose-neutral">
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Atom className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-serif font-light text-foreground m-0">
              What is a peptide?
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A peptide is a short chain of amino acids linked together by chemical bonds called
            peptide bonds. Amino acids are the same building blocks that make up proteins; the
            distinction between a peptide and a protein is largely one of size. By common
            convention, chains of roughly 2 to 50 amino acids are called peptides, and longer
            chains are called proteins.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Because peptides are built from the same alphabet of 20 standard amino acids,
            nature can assemble an enormous diversity of sequences, each with its own
            three-dimensional shape and biological role.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Microscope className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-serif font-light text-foreground m-0">
              How peptides work in biology
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Many peptides act as <em>signaling molecules</em>. They bind to specific receptors
            on the surface of cells — much like a key fitting into a lock — and trigger
            cascades of activity inside the cell. Hormones such as insulin and oxytocin are
            classic examples of naturally occurring peptides that coordinate processes
            throughout the body.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Other peptides serve structural roles, participate in immune defense, or function
            as neurotransmitters in the nervous system. The specificity of peptide–receptor
            interactions is one reason peptides are of broad scientific interest: small
            sequences can produce highly targeted biological effects.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <History className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-serif font-light text-foreground m-0">
              A brief history of peptide science
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The concept of the peptide bond was formalized at the turn of the 20th century by
            chemist Emil Fischer, whose work on amino acid chemistry helped lay the foundation
            for modern biochemistry. In 1953, Vincent du Vigneaud achieved the first
            laboratory synthesis of a biologically active peptide hormone, a milestone
            recognized with the Nobel Prize in Chemistry in 1955.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The development of solid-phase peptide synthesis by Bruce Merrifield in the 1960s
            — also recognized with a Nobel Prize — transformed the field, making it practical
            for laboratories worldwide to produce defined peptide sequences for research.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-serif font-light text-foreground m-0">
              Peptides in modern research
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Today, peptides are studied across a wide range of scientific disciplines,
            including molecular biology, endocrinology, immunology, and pharmacology.
            Researchers use them as tools to investigate how cells communicate, how receptors
            function, and how biological pathways are regulated.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Like any area of active science, the evidence base evolves continuously. Findings
            from preclinical studies do not always translate to clinical outcomes, and the
            regulatory status of any specific peptide varies by jurisdiction. Public
            scientific literature — through databases such as PubMed — is the appropriate
            place to follow developments.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-serif font-light text-foreground mb-4">
            Key takeaways
          </h2>
          <ul className="space-y-3 text-muted-foreground leading-relaxed">
            <li className="flex gap-3">
              <span className="text-primary mt-1.5">•</span>
              <span>Peptides are short chains of amino acids, smaller than proteins.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5">•</span>
              <span>
                Many peptides act as signaling molecules that bind specific cell receptors.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5">•</span>
              <span>
                The field has a century of foundational chemistry behind it and remains an
                active area of research.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1.5">•</span>
              <span>
                Scientific understanding evolves; consult peer-reviewed literature for current
                evidence.
              </span>
            </li>
          </ul>
        </section>

        {/* Bottom disclaimer */}
        <section className="mt-16 p-6 bg-secondary/40 border border-border rounded-lg">
          <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            Important notice
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This article is published for educational and informational purposes only. It does
            not constitute medical advice, diagnosis, or treatment recommendations, and it
            does not promote, sell, or describe any specific product, brand, protocol, or
            service. Readers should consult a qualified healthcare professional for any
            questions concerning their health.
          </p>
        </section>
      </article>
    </div>
  );
};

export default PeptidesIntroduction;
