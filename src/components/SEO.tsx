import { useEffect, useState, useRef } from 'react';

// Safe hook to get language without throwing errors
const useSafeLanguage = () => {
  const [language, setLanguage] = useState<'en' | 'th' | 'ja'>('en');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'th') {
      setLanguage('th');
    } else if (langParam === 'ja') {
      setLanguage('ja');
    }
  }, []);
  
  return { language };
};

const SEO = () => {
  const { language } = useSafeLanguage();
  const mainSchemaRef = useRef<HTMLScriptElement | null>(null);
  const faqSchemaRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // This component owns the homepage SEO only.
    // Do not let it override direct-URL landing pages like /clinic.
    if (window.location.pathname === '/clinic') {
      return;
    }

    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // SEO-optimized titles (under 60 chars with main keyword first)
    const titles: Record<'en' | 'th' | 'ja', string> = {
      en: "IV Therapy Bangkok | Healthi-Life – NAD+, Fat Burner, Glow",
      th: "IV Therapy กรุงเทพ | Healthi-Life – NAD+, Fat Burner, Glow",
      ja: "IV療法バンコク | Healthi-Life – NAD+, 脂肪燃焼, 美肌"
    };
    document.title = titles[language];
    
    // Meta description (under 160 chars with CTA)
    const descriptions: Record<'en' | 'th' | 'ja', string> = {
      en: "Premium IV Therapy in Bangkok. NAD+, Fat Burner, Glow & 21+ IV drips. Award-winning clinic at Ekkamai. 5.0★ Google Reviews. Book now or WhatsApp +66919991744",
      th: "IV Therapy ระดับพรีเมียมในกรุงเทพ NAD+, Fat Burner, Glow & 21+ สูตร คลินิกที่เอกมัย 5.0★ Google จองเลยหรือ WhatsApp +66919991744",
      ja: "バンコクでプレミアムIV療法。NAD+、脂肪燃焼、美肌など21種類以上。エカマイの受賞クリニック。Google 5.0★。WhatsApp +66919991744"
    };
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[language]);
    }

    // ============================================
    // CONSOLIDATED @GRAPH SCHEMA (SEO + GEO + AEO)
    // Single injection = faster parsing + cleaner DOM
    // ============================================
    const consolidatedSchema = {
      "@context": "https://schema.org",
      "@graph": [
        // 1. WebSite - for Sitelinks & Search
        {
          "@type": "WebSite",
          "@id": "https://ivtherapyhealthilife.com/#website",
          "url": "https://ivtherapyhealthilife.com/",
          "name": "Healthi Life IV Therapy",
          "alternateName": ["Healthi-Life IV Therapy", "HealthiLife Bangkok"],
          "description": "Premium IV Therapy clinic in Bangkok offering NAD+, Fat Burner, Glow & 21+ specialized IV drips",
          "publisher": { "@id": "https://ivtherapyhealthilife.com/#org" },
          "inLanguage": ["en", "th", "ja"],
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://ivtherapyhealthilife.com/?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        },
        
        // 2. Organization - Parent entity linkage
        {
          "@type": "Organization",
          "@id": "https://ivtherapyhealthilife.com/#org",
          "name": "Healthi Life IV Therapy",
          "alternateName": ["Healthi-Life", "HealthiLife", "Healthi Life IV Therapy Bangkok"],
          "url": "https://ivtherapyhealthilife.com/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://ivtherapyhealthilife.com/og-image.jpg",
            "width": 1200,
            "height": 630
          },
          "image": "https://ivtherapyhealthilife.com/og-image.jpg",
          "description": "A physician-led IV therapy clinic in Bangkok. Award-winning medical facility offering NAD+, Fat Burner, Glow, and 21+ specialized IV drips.",
          "foundingDate": "2022",
          "parentOrganization": { "@id": "https://healthi-life.com/#org" },
          "sameAs": [
            "https://healthi-life.com/",
            "https://maps.app.goo.gl/Uttmbd2da2kBfkZSA",
            "https://www.instagram.com/healthi_life_th/",
            "https://www.facebook.com/HealthiLifeTH",
            "https://wa.me/66919991744"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+66919991744",
            "contactType": "customer service",
            "areaServed": ["TH", "Asia", "JP"],
            "availableLanguage": ["English", "Thai", "Japanese"]
          },
          "award": [
            "2025 Regenerative Clinic of the Year in Asia-Pacific — GlobalHealth Asia-Pacific Awards",
            "ArokaGo Best Clinic Rising Star 2025"
          ]
        },
        
        // 3. MedicalClinic + LocalBusiness (Dual Type for max coverage)
        {
          "@type": ["MedicalClinic", "LocalBusiness"],
          "@id": "https://ivtherapyhealthilife.com/#clinic",
          "name": "Healthi Life IV Therapy",
          "alternateName": ["Healthi-Life IV Therapy Bangkok", "IV Therapy Bangkok", "HealthiLife Ekkamai"],
          "url": "https://ivtherapyhealthilife.com/",
          "telephone": "+66919991744",
          "email": "contact@healthi-life.com",
          "priceRange": "$$",
          "currenciesAccepted": "THB, USD",
          "paymentAccepted": "Cash, Credit Card, Bank Transfer",
          "image": "https://ivtherapyhealthilife.com/og-image.jpg",
          "logo": "https://ivtherapyhealthilife.com/og-image.jpg",
          "description": "Bangkok's premium IV therapy clinic offering NAD+, Fat Burner, Glow, and 21+ specialized IV drips. Award-winning clinic at Ekkamai with 5.0 Google rating from 193 verified reviews.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "94 Ekkamai 10 Alley",
            "addressLocality": "Watthana",
            "addressRegion": "Bangkok",
            "postalCode": "10110",
            "addressCountry": "TH"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 13.7268,
            "longitude": 100.5847
          },
          "hasMap": "https://maps.app.goo.gl/Uttmbd2da2kBfkZSA",
          "openingHoursSpecification": [
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "11:00", "closes": "19:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "11:00", "closes": "19:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "11:00", "closes": "19:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "11:00", "closes": "19:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "11:00", "closes": "19:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "11:00", "closes": "19:00" }
          ],
          "areaServed": [
            { "@type": "City", "name": "Bangkok", "@id": "https://www.wikidata.org/wiki/Q1861" },
            { "@type": "Country", "name": "Thailand", "@id": "https://www.wikidata.org/wiki/Q869" }
          ],
          "medicalSpecialty": [
            "IV Therapy",
            "Preventive Medicine",
            "Regenerative Medicine",
            "Longevity Medicine",
            "Wellness Medicine"
          ],
          "isAcceptingNewPatients": true,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "193",
            "bestRating": "5",
            "worstRating": "1"
          },
          // Aucun noeud Review ici, et ne pas en re-ajouter.
          // Quatre Review fabriques y vivaient — James O'Connell, Meera Kapoor,
          // Richard Chen, Sophie Williams — sous le commentaire « Real customer
          // reviews for rich snippets ». Le scanner YMYL du satellite cellules
          // souches les interdit nommement comme « faux temoin » depuis des
          // semaines ; personne n avait verifie ce depot. Retires le 2026-07-26
          // sur decision de Vincent.
          // Un avis n entre ici que s il vient d un vrai avis Google verifiable.
          // L aggregateRating ci-dessus reste : 193 avis, lui, est verifie.
          "parentOrganization": { "@id": "https://ivtherapyhealthilife.com/#org" },
          "employee": [
            {
              "@type": "Physician",
              "@id": "https://ivtherapyhealthilife.com/#dr-petch",
              "name": "Dr. Petch (Sarassawadee Suwanjinda)",
              "jobTitle": "Co-Founder & Chief Medical Strategy Officer",
              "medicalSpecialty": ["Longevity Medicine", "Preventive Medicine"],
              "worksFor": { "@id": "https://ivtherapyhealthilife.com/#clinic" }
            },
            {
              "@type": "Physician",
              "@id": "https://ivtherapyhealthilife.com/#dr-first",
              "name": "Dr. First (Napat Hunsajarupan)",
              "jobTitle": "Co-Founder & Chief Medical Officer",
              "medicalSpecialty": ["Dermatology", "Aesthetic Medicine"],
              "worksFor": { "@id": "https://ivtherapyhealthilife.com/#clinic" }
            }
          ],
          "availableService": [
            {
              "@type": "MedicalProcedure",
              "name": "NAD+ IV Therapy",
              "description": "Boost energy, repair cells, slow aging with NAD+ infusion",
              "procedureType": "https://schema.org/NoninvasiveProcedure"
            },
            {
              "@type": "MedicalProcedure",
              "name": "Fat Burner IV Therapy",
              "description": "Accelerate metabolism with L-Carnitine & B-vitamins",
              "procedureType": "https://schema.org/NoninvasiveProcedure"
            },
            {
              "@type": "MedicalProcedure",
              "name": "Glow Revive IV Therapy",
              "description": "Skin rejuvenation with placenta extract & antioxidants",
              "procedureType": "https://schema.org/NoninvasiveProcedure"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "IV Therapy Treatments",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Fat Burner IV Therapy" },
                "price": "4500",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "NAD+ IV Therapy 100mg" },
                "price": "6000",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "NAD+ IV Therapy 250mg" },
                "price": "8500",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "NAD+ IV Therapy 500mg" },
                "price": "17000",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": "Glow Revive IV Therapy" },
                "price": "15000",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Hangover IV" },
                "price": "4500",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Curcumin IV Therapy" },
                "price": "8500",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Resveratrol IV Therapy" },
                "price": "8500",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "Full Body Detox IV" },
                "price": "8500",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "NAD+ 100mg — 5 Sessions Package" },
                "price": "27000",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "NAD+ 100mg — 10 Sessions Package" },
                "price": "51000",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "NAD+ 250mg — 5 Sessions Package" },
                "price": "38250",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "NAD+ 250mg — 10 Sessions Package" },
                "price": "72250",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "NAD+ 500mg — 5 Sessions Package" },
                "price": "76500",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": "NAD+ 500mg — 10 Sessions Package" },
                "price": "144500",
                "priceCurrency": "THB",
                "availability": "https://schema.org/InStock"
              }
            ]
          }
        },
        
        // 4. BreadcrumbList - for rich snippets
        {
          "@type": "BreadcrumbList",
          "@id": "https://ivtherapyhealthilife.com/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://ivtherapyhealthilife.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "IV Therapy Services",
              "item": "https://ivtherapyhealthilife.com/#services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "All Services Sitemap",
              "item": "https://ivtherapyhealthilife.com/sitemap"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Contact",
              "item": "https://ivtherapyhealthilife.com/#contact"
            }
          ]
        },

        // 5. VideoObject - for video rich snippets & AI crawlers
        {
          "@type": "VideoObject",
          "@id": "https://ivtherapyhealthilife.com/#video-dr-petch",
          "name": "Dr. Petch — Co-Founder & Chief Medical Strategy Officer",
          "description": "Dr. Petch introduces Healthi-Life's holistic approach to regenerative medicine, IV therapy, and longevity in Bangkok.",
          "thumbnailUrl": "https://img.youtube.com/vi/0q0ht-nms4w/maxresdefault.jpg",
          "uploadDate": "2024-01-15T00:00:00+07:00",
          "duration": "PT1M30S",
          "contentUrl": "https://www.youtube.com/watch?v=0q0ht-nms4w",
          "embedUrl": "https://www.youtube-nocookie.com/embed/0q0ht-nms4w",
          "publisher": { "@id": "https://ivtherapyhealthilife.com/#org" },
          "inLanguage": "en"
        },
        {
          "@type": "VideoObject",
          "@id": "https://ivtherapyhealthilife.com/#video-blake",
          "name": "Blake from USA - Human Performance Enhancement Testimonial",
          "description": "Patient testimonial: Enhancing athletic performance with regenerative medicine at Healthi-Life Bangkok.",
          "thumbnailUrl": "https://img.youtube.com/vi/acuxB5dBjqw/maxresdefault.jpg",
          "uploadDate": "2024-03-10T00:00:00+07:00",
          "duration": "PT1M45S",
          "contentUrl": "https://www.youtube.com/watch?v=acuxB5dBjqw",
          "embedUrl": "https://www.youtube-nocookie.com/embed/acuxB5dBjqw",
          "publisher": { "@id": "https://ivtherapyhealthilife.com/#org" },
          "inLanguage": "en"
        }
      ]
    };

    // ============================================
    // FAQ SCHEMA (Separate for AEO/Voice Search)
    // ============================================
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is IV Therapy and how does it work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "IV Therapy delivers vitamins, minerals, and antioxidants directly into your bloodstream — allowing your body to absorb them faster and more effectively than oral supplements. At Healthi-Life Bangkok, treatments take 30-45 minutes in our private treatment lounges."
          }
        },
        {
          "@type": "Question",
          "name": "How long does an IV therapy session take in Bangkok?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most IV drips at Healthi-Life take 30 to 45 minutes. You can relax in our private treatment lounges at Ekkamai while your body is being replenished with essential nutrients."
          }
        },
        {
          "@type": "Question",
          "name": "Is IV Therapy safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — all IV drips at Healthi-Life are prepared by medical professionals using hospital-grade ingredients, administered by trained nurses under doctor supervision. Cellular and compounded products are processed by ISO- and GMP-certified partner laboratories."
          }
        },
        {
          "@type": "Question",
          "name": "How soon will I feel the effects of IV therapy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Many patients feel more energized, clear-headed, and refreshed within hours. For skin glow or immune support, visible results often appear within 24–72 hours."
          }
        },
        {
          "@type": "Question",
          "name": "What is the best IV therapy for weight loss in Bangkok?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our Fat Burner IV Therapy (4,500 THB) includes L-Carnitine, B-Complex, and metabolism boosters to support fat loss, detoxification, and energy production. It's one of our most popular treatments at Healthi-Life Ekkamai."
          }
        },
        {
          "@type": "Question",
          "name": "How much does IV therapy cost in Bangkok?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "IV therapy at Healthi-Life Bangkok ranges from 4,500 THB for treatments like Fat Burner or Hangover IV, to 15,000 THB for premium treatments like Glow Revive. NAD+ IV starts at 6,000 THB for 100mg, 8,500 THB for 250mg, and 17,000 THB for 500mg. Multi-session packages available: NAD+ 100mg 5 sessions at 27,000 THB, NAD+ 250mg 5 sessions at 38,250 THB, NAD+ 500mg 5 sessions at 76,500 THB."
          }
        },
        {
          "@type": "Question",
          "name": "Where is the best IV therapy clinic in Bangkok?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Healthi-Life IV Therapy Clinic is located at 94 Ekkamai 10 Alley, Watthana, Bangkok 10110 — near Ekkamai BTS station. Awarded 2025 Regenerative Clinic of the Year in Asia-Pacific with 5.0 Google rating from 193 verified reviews. Book via WhatsApp: +66919991744"
          }
        },
        {
          "@type": "Question",
          "name": "What IV drips does Healthi-Life Bangkok offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            // « Immune Boost » et « Athlete Max » ne figuraient dans aucun
            // catalogue — ni le Sheet master, ni llms.txt, ni PriceList : deux
            // produits inventes, enonces en JSON-LD, donc servis aux crawlers
            // comme une reponse de la clinique. « Hangover Recovery » etait le
            // libelle d un produit reel nomme « Hangover IV » ailleurs.
            // Aucun nom ne doit apparaitre ici sans exister dans llms.txt.
            "text": "Healthi-Life offers 21+ specialized IV drips including: NAD+ (anti-aging & energy), Fat Burner (weight loss), Glow Revive (skin rejuvenation), Hangover IV, Athlete Pro Max IV, Neuro Boost, Curcumin, Resveratrol, and Full Body Detox treatments."
          }
        }
      ]
    };

    // Clean up previous scripts
    if (mainSchemaRef.current?.parentNode) {
      mainSchemaRef.current.parentNode.removeChild(mainSchemaRef.current);
    }
    if (faqSchemaRef.current?.parentNode) {
      faqSchemaRef.current.parentNode.removeChild(faqSchemaRef.current);
    }
    
    // Inject consolidated @graph schema (single injection = faster)
    const mainScript = document.createElement('script');
    mainScript.type = 'application/ld+json';
    mainScript.id = 'schema-main';
    mainScript.textContent = JSON.stringify(consolidatedSchema);
    document.head.appendChild(mainScript);
    mainSchemaRef.current = mainScript;
    
    // Inject FAQ schema separately (for AEO rich results)
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.id = 'schema-faq';
    faqScript.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);
    faqSchemaRef.current = faqScript;

    // Update og:locale based on language
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      const localeMap: Record<'en' | 'th' | 'ja', string> = {
        en: 'en_US',
        th: 'th_TH',
        ja: 'ja_JP'
      };
      ogLocale.setAttribute('content', localeMap[language]);
    }

    // Cleanup
    return () => {
      if (mainSchemaRef.current?.parentNode) {
        mainSchemaRef.current.parentNode.removeChild(mainSchemaRef.current);
        mainSchemaRef.current = null;
      }
      if (faqSchemaRef.current?.parentNode) {
        faqSchemaRef.current.parentNode.removeChild(faqSchemaRef.current);
        faqSchemaRef.current = null;
      }
    };
  }, [language]);

  return null;
};

export default SEO;
