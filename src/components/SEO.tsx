import { useEffect, useState } from 'react';

// Safe hook to get language without throwing errors
const useSafeLanguage = () => {
  const [language, setLanguage] = useState<'en' | 'th'>('en');
  
  useEffect(() => {
    // Check URL for language parameter
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'th') {
      setLanguage('th');
    }
  }, []);
  
  return { language };
};

const SEO = () => {
  const { language } = useSafeLanguage();

  useEffect(() => {
    // Update HTML lang attribute based on current language
    document.documentElement.lang = language;
    
    // Update page title based on language
    const titles = {
      en: "IV Therapy Bangkok | Healthi-Life Longevity Center - NAD+, Fat Burner, Glow IV Drips",
      th: "IV Therapy กรุงเทพ | Healthi-Life - NAD+, Fat Burner, Glow IV Drip"
    };
    document.title = titles[language];
    
    // Update meta description based on language
    const descriptions = {
      en: "Premium IV Therapy in Bangkok. NAD+, Fat Burner, Glow & 21+ IV drips. Award-winning clinic at Ekkamai. 5.0★ Google Reviews. Book now or WhatsApp +66919991744",
      th: "IV Therapy ระดับพรีเมียมในกรุงเทพ NAD+, Fat Burner, Glow & IV Drip 21+ สูตร คลินิกรางวัล ที่เอกมัย 5.0★ Google Reviews จองเลยหรือ WhatsApp +66919991744"
    };
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[language]);
    }

    // FAQ Schema for AEO (Voice Search Optimization)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is IV Therapy and how does it work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "IV Therapy delivers vitamins, minerals, and antioxidants directly into your bloodstream — allowing your body to absorb them faster and more effectively than oral supplements. At Healthi-Life Bangkok, treatments take 30-45 minutes."
          }
        },
        {
          "@type": "Question",
          "name": "How long does an IV therapy session take in Bangkok?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most IV drips at Healthi-Life take 30 to 45 minutes. You can relax in our private treatment lounges while your body is being replenished with essential nutrients."
          }
        },
        {
          "@type": "Question",
          "name": "Is IV Therapy safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — all IV drips at Healthi-Life are prepared by medical professionals using hospital-grade, ISO and GMP certified ingredients. Treatments are administered by trained nurses under doctor supervision."
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
            "text": "Our Fat Burner IV Therapy (4,500 THB) includes L-Carnitine, B-Complex, and metabolism boosters to support fat loss, detoxification, and energy production. It's one of our most popular treatments."
          }
        },
        {
          "@type": "Question",
          "name": "How much does IV therapy cost in Bangkok?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "IV therapy at Healthi-Life Bangkok ranges from 4,500 THB for treatments like Fat Burner or Hangover IV, to 12,000 THB for premium treatments like Glow Revive. NAD+ IV starts at 6,000 THB."
          }
        },
        {
          "@type": "Question",
          "name": "Where is the best IV therapy clinic in Bangkok?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Healthi-Life IV Therapy Clinic is located at 94 Ekkamai 10 Alley, Watthana, Bangkok 10110. Awarded Best Regenerative Medicine Clinic 2025 Asia-Pacific with 5.0 Google rating from 2,500+ patients."
          }
        }
      ]
    };

    // LocalBusiness Schema for GEO (Local SEO)
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://ivtherapyhealthilife.com/#localbusiness",
      "name": "Healthi-Life IV Therapy Bangkok",
      "image": "https://ivtherapyhealthilife.com/og-image.jpg",
      "logo": "https://ivtherapyhealthilife.com/images/healthilife-logo.png",
      "description": "Bangkok's premium IV therapy clinic offering NAD+, Fat Burner, Glow, and 21+ specialized IV drips. Award-winning clinic at Ekkamai with 5.0 Google rating.",
      "url": "https://ivtherapyhealthilife.com/",
      "telephone": "+66919991744",
      "priceRange": "$$",
      "currenciesAccepted": "THB",
      "paymentAccepted": "Cash, Credit Card",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "94 Ekkamai 10 Alley, Khlong Tan Nuea",
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
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "11:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "00:00",
          "closes": "00:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "125",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://www.instagram.com/healthi_life_th/",
        "https://www.facebook.com/HealthiLifeTH",
        "https://wa.me/66919991744"
      ],
      "hasMap": "https://maps.app.goo.gl/Uttmbd2da2kBfkZSA"
    };

    // MedicalBusiness Schema
    const medicalBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "@id": "https://ivtherapyhealthilife.com/#medicalbusiness",
      "name": "Healthi-Life IV Therapy Bangkok",
      "alternateName": ["Healthi-Life", "HealthiLife Bangkok", "IV Therapy Bangkok"],
      "description": "Premium medical clinic specializing in IV vitamin therapy, NAD+ treatments, and regenerative medicine in Bangkok, Thailand.",
      "url": "https://ivtherapyhealthilife.com/",
      "telephone": "+66919991744",
      "priceRange": "$$",
      "image": "https://ivtherapyhealthilife.com/og-image.jpg",
      "medicalSpecialty": [
        "IV Therapy",
        "Regenerative Medicine",
        "Longevity Medicine",
        "Wellness Medicine"
      ],
      "isAcceptingNewPatients": true,
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
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "11:00",
          "closes": "19:00"
        }
      ],
      "availableService": [
        {
          "@type": "MedicalProcedure",
          "name": "NAD+ IV Therapy",
          "description": "Boost energy, repair cells, slow aging, and enhance brain power with NAD+ delivered directly into your bloodstream.",
          "howPerformed": "Intravenous infusion administered by trained medical professionals."
        },
        {
          "@type": "MedicalProcedure",
          "name": "Fat Burner IV Therapy",
          "description": "Accelerate fat burning with L-Carnitine, B-complex vitamins, and antioxidants to boost energy and detoxify.",
          "howPerformed": "Intravenous infusion administered by trained medical professionals."
        },
        {
          "@type": "MedicalProcedure",
          "name": "Glow Revive IV Therapy",
          "description": "Revitalize your skin with placenta extract for a brighter glow, firmer texture, and lasting youthfulness.",
          "howPerformed": "Intravenous infusion administered by trained medical professionals."
        }
      ],
      "employee": [
        {
          "@type": "Physician",
          "name": "Dr. Petch (Sarassawadee Suwanjinda)",
          "jobTitle": "Founder & Lifestyle Medicine Specialist",
          "medicalSpecialty": "Longevity Medicine"
        },
        {
          "@type": "Physician",
          "name": "Dr. First (Napat Hunsajarupan)",
          "jobTitle": "Founder & MD",
          "medicalSpecialty": "Dermatology"
        }
      ]
    };

    // Service Schema with Offers
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "IV Therapy Bangkok",
      "provider": {
        "@type": "MedicalClinic",
        "name": "Healthi-Life IV Therapy Bangkok",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "94 Ekkamai 10 Alley",
          "addressLocality": "Bangkok",
          "postalCode": "10110",
          "addressCountry": "TH"
        }
      },
      "serviceType": "IV Vitamin Therapy",
      "areaServed": {
        "@type": "City",
        "name": "Bangkok"
      },
      "description": "Premium IV therapy delivering vitamins, minerals, and antioxidants directly into your bloodstream for instant absorption and maximum results.",
      "offers": [
        {
          "@type": "Offer",
          "name": "Fat Burner IV Therapy",
          "price": "4500",
          "priceCurrency": "THB",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "NAD+ IV Therapy 100mg",
          "price": "6000",
          "priceCurrency": "THB",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "NAD+ IV Therapy 250mg",
          "price": "8500",
          "priceCurrency": "THB",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Glow Revive IV Therapy",
          "price": "12000",
          "priceCurrency": "THB",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Resveratrol IV Therapy",
          "price": "8500",
          "priceCurrency": "THB",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Full Body Detox IV",
          "price": "8500",
          "priceCurrency": "THB",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Liver Detox IV",
          "price": "4500",
          "priceCurrency": "THB",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Curcumin IV Therapy",
          "price": "8500",
          "priceCurrency": "THB",
          "availability": "https://schema.org/InStock"
        }
      ]
    };

    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://ivtherapyhealthilife.com/#organization",
      "name": "Healthi-Life IV Therapy Bangkok",
      "alternateName": ["Healthi-Life", "HealthiLife", "Healthi Life IV Therapy"],
      "url": "https://ivtherapyhealthilife.com/",
      "logo": "https://ivtherapyhealthilife.com/images/healthilife-logo.png",
      "description": "Bangkok's premier IV therapy clinic. Award-winning medical facility offering NAD+, Fat Burner, Glow, and 21+ specialized IV drips.",
      "foundingDate": "2022",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "94 Ekkamai 10 Alley, Khlong Tan Nuea, Watthana",
        "addressLocality": "Bangkok",
        "postalCode": "10110",
        "addressCountry": "TH"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+66919991744",
        "contactType": "customer service",
        "availableLanguage": ["English", "Thai"]
      },
      "sameAs": [
        "https://www.instagram.com/healthi_life_th/",
        "https://www.facebook.com/HealthiLifeTH",
        "https://wa.me/66919991744"
      ],
      "award": [
        "Best Regenerative Medicine Clinic 2025 – Asia-Pacific",
        "Thailand Rising Star 2025"
      ]
    };

    // WebSite Schema for Sitelinks Search Box
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Healthi-Life IV Therapy Bangkok",
      "url": "https://ivtherapyhealthilife.com/",
      "description": "Premium IV Therapy clinic in Bangkok offering NAD+, Fat Burner, Glow & 21+ IV drips",
      "inLanguage": ["en", "th"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ivtherapyhealthilife.com/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
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
          "name": "IV Therapy Bangkok",
          "item": "https://ivtherapyhealthilife.com/#services"
        }
      ]
    };

    // Remove existing schema scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => script.remove());
    
    // Add all schema scripts
    const schemas = [
      faqSchema,
      localBusinessSchema,
      medicalBusinessSchema,
      serviceSchema,
      organizationSchema,
      websiteSchema,
      breadcrumbSchema
    ];

    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Add hreflang tags
    const existingHreflangTh = document.querySelector('link[hreflang="th"]');
    if (!existingHreflangTh) {
      const hreflangTh = document.createElement('link');
      hreflangTh.rel = 'alternate';
      hreflangTh.setAttribute('hreflang', 'th');
      hreflangTh.href = 'https://ivtherapyhealthilife.com/?lang=th';
      document.head.appendChild(hreflangTh);
    }

    // Update og:locale based on language
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute('content', language === 'th' ? 'th_TH' : 'en_US');
    }

    // Cleanup function
    return () => {
      document.querySelectorAll('script[type="application/ld+json"]').forEach(script => script.remove());
    };
  }, [language]);

  return null;
};

export default SEO;
