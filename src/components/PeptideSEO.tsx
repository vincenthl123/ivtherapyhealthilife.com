import { Helmet } from "react-helmet-async";

interface PeptideFAQ {
  q: string;
  a: string;
}

interface PeptideSEOProps {
  title: string;
  description: string;
  path: string; // e.g. "/BPC-157"
  peptideName: string;
  procedureDescription: string;
  faqs: PeptideFAQ[];
  imageAlt?: string;
}

const BASE_URL = "https://ivtherapyhealthilife.com";

const PeptideSEO = ({
  title,
  description,
  path,
  peptideName,
  procedureDescription,
  faqs,
}: PeptideSEOProps) => {
  const url = `${BASE_URL}${path}`;

  // JSON-LD @graph with FAQPage + MedicalProcedure + BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL + "/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Peptide Therapy",
            item: BASE_URL + "/peptides-therapy",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: peptideName,
            item: url,
          },
        ],
      },
      // FAQPage
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
      // MedicalProcedure
      {
        "@type": "MedicalProcedure",
        "@id": `${url}#procedure`,
        name: `${peptideName} Therapy`,
        description: procedureDescription,
        procedureType: "https://schema.org/NoninvasiveProcedure",
        howPerformed: "Subcutaneous injection under physician supervision",
        preparation: "Full medical consultation, blood work, and contraindication screening required",
        followup: "Active physician monitoring with biomarker reassessment",
        status: "https://schema.org/ActiveActionStatus",
        bodyLocation: "Subcutaneous",
        availableService: {
          "@type": "MedicalClinic",
          "@id": `${BASE_URL}/#clinic`,
          name: "Healthi Life",
          url: BASE_URL,
        },
      },
      // MedicalWebPage
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#webpage`,
        url: url,
        name: title,
        description: description,
        inLanguage: ["en", "th", "ja"],
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${url}#procedure` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        lastReviewed: "2026-04-01",
        reviewedBy: {
          "@type": "Physician",
          name: "Dr. First (Napat Hunsajarupan)",
          jobTitle: "Co-Founder & CMO",
          worksFor: { "@id": `${BASE_URL}/#clinic` },
        },
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
      <meta property="og:site_name" content="Healthi Life IV Therapy" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="th_TH" />
      <meta property="og:locale:alternate" content="ja_JP" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />

      {/* Medical */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Healthi Life - Dr. First (Napat Hunsajarupan)" />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default PeptideSEO;
