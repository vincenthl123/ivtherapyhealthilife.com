import { useEffect } from 'react';

// FAQ data for schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is IV Therapy and how does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IV Therapy delivers vitamins, minerals, and antioxidants directly into your bloodstream — allowing your body to absorb them faster and more effectively than oral supplements."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a session take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most IV drips take 30 to 45 minutes. You can relax, scroll your phone, or even nap while your body is being replenished."
      }
    },
    {
      "@type": "Question",
      "name": "Is IV Therapy safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — all IV drips at Healthi-Life are prepared by medical professionals using hospital-grade ingredients and are administered by trained nurses under doctor supervision."
      }
    },
    {
      "@type": "Question",
      "name": "How soon will I feel the effects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many patients feel more energized, clear-headed, and refreshed within hours. For skin glow or immune support, visible results often appear within 24–72 hours."
      }
    },
    {
      "@type": "Question",
      "name": "Can IV drip therapy help with weight loss?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Our Fat Burner IV Therapy includes L-Carnitine, B-Complex, and metabolism boosters to support fat loss, detoxification, and energy production."
      }
    }
  ]
};

// Medical Business schema
const medicalGraphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalClinic",
      "@id": "https://ivtherapyhealthilife.com/#clinic",
      "name": "Healthi-Life IV Therapy Bangkok",
      "description": "Bangkok's premium destination for personalized IV drips. Beyond hydration — targeted nutrients to restore energy, boost immunity, and rejuvenate.",
      "url": "https://ivtherapyhealthilife.com/",
      "telephone": "+66919991744",
      "priceRange": "$$",
      "image": "https://ivtherapyhealthilife.com/images/clinic-exterior.jpg",
      "hasMap": "https://g.co/kgs/c1rAiGV",
      "sameAs": [
        "https://www.instagram.com/healthi_life_th/",
        "https://www.facebook.com/HealthiLifeTH",
        "https://wa.me/66919991744"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "125",
        "bestRating": "5",
        "worstRating": "1"
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
          "closes": "00:00",
          "description": "Closed"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "94 Ekkamai 10 Alley, Khlong Tan Nuea, Watthana",
        "addressLocality": "Bangkok",
        "postalCode": "10110",
        "addressCountry": "TH"
      },
      "medicalSpecialty": [
        "http://schema.org/PrimaryCare"
      ],
      "availableService": [
        { "@id": "https://ivtherapyhealthilife.com/#treatment-nad-iv" },
        { "@id": "https://ivtherapyhealthilife.com/#treatment-fat-burner" },
        { "@id": "https://ivtherapyhealthilife.com/#treatment-glow-revive" }
      ],
      "employee": [
        { "@id": "https://ivtherapyhealthilife.com/#dr-petch" },
        { "@id": "https://ivtherapyhealthilife.com/#dr-first" }
      ]
    },
    {
      "@type": ["Person", "IndividualPhysician"],
      "@id": "https://ivtherapyhealthilife.com/#dr-petch",
      "name": "Dr. Petch (Sarassawadee Suwanjinda)",
      "medicalSpecialty": ["http://schema.org/PrimaryCare"],
      "practicesAt": { "@id": "https://ivtherapyhealthilife.com/#clinic" },
      "knowsAbout": [
        "IV Therapy",
        "NAD+ IV Therapy",
        "Longevity Medicine",
        "Regenerative Medicine",
        "Wellness Optimization"
      ],
      "description": "Founder & Lifestyle Medicine Specialist focused on IV therapy and longevity medicine in Bangkok.",
      "url": "https://ivtherapyhealthilife.com/"
    },
    {
      "@type": ["Person", "IndividualPhysician"],
      "@id": "https://ivtherapyhealthilife.com/#dr-first",
      "name": "Dr. First (Napat Hunsajarupan)",
      "medicalSpecialty": ["http://schema.org/Dermatology"],
      "practicesAt": { "@id": "https://ivtherapyhealthilife.com/#clinic" },
      "knowsAbout": [
        "Dermatology",
        "Aesthetic Medicine",
        "IV Therapy",
        "Skin Rejuvenation"
      ],
      "description": "Founder & MD specializing in dermatology and aesthetic IV therapy treatments.",
      "url": "https://ivtherapyhealthilife.com/"
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://ivtherapyhealthilife.com/#treatment-nad-iv",
      "name": "NAD+ IV Therapy",
      "description": "Boost energy, repair cells, slow aging, and enhance brain power with NAD+ delivered directly into your bloodstream.",
      "howPerformed": "Intravenous infusion administered by trained medical professionals."
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://ivtherapyhealthilife.com/#treatment-fat-burner",
      "name": "Fat Burner IV Therapy",
      "description": "Accelerate fat burning with L-Carnitine, B-complex vitamins, and antioxidants to boost energy and detoxify.",
      "howPerformed": "Intravenous infusion administered by trained medical professionals."
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://ivtherapyhealthilife.com/#treatment-glow-revive",
      "name": "Glow Revive IV Therapy",
      "description": "Revitalize your skin with placenta extract for a brighter glow, firmer texture, and lasting youthfulness.",
      "howPerformed": "Intravenous infusion administered by trained medical professionals."
    }
  ]
};

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://ivtherapyhealthilife.com/#organization",
  "name": "Healthi-Life IV Therapy Bangkok",
  "alternateName": ["Healthi-Life", "HealthiLife Bangkok", "Healthi Life IV Therapy"],
  "url": "https://ivtherapyhealthilife.com/",
  "logo": "https://ivtherapyhealthilife.com/images/healthilife-logo.png",
  "description": "Bangkok's premium IV therapy clinic offering NAD+, Fat Burner, Glow, and 21+ specialized IV drips.",
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
    "https://www.facebook.com/HealthiLifeTH"
  ]
};

// Service Schema for IV Therapy
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "IV Therapy Bangkok",
  "provider": {
    "@type": "MedicalClinic",
    "name": "Healthi-Life IV Therapy Bangkok"
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
      "priceCurrency": "THB"
    },
    {
      "@type": "Offer",
      "name": "NAD+ IV Therapy",
      "price": "6900",
      "priceCurrency": "THB"
    },
    {
      "@type": "Offer",
      "name": "Glow Revive IV Therapy",
      "price": "12000",
      "priceCurrency": "THB"
    }
  ]
};

const SEO = () => {
  useEffect(() => {
    // Update page title
    document.title = "IV Therapy Bangkok | Healthi-Life Longevity Center - NAD+, Fat Burner, Glow IV Drips";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Premium IV Therapy in Bangkok. NAD+, Fat Burner, Glow & 21+ IV drips. Award-winning clinic at Ekkamai. 5.0★ Google Reviews. Book now or WhatsApp +66919991744');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Premium IV Therapy in Bangkok. NAD+, Fat Burner, Glow & 21+ IV drips. Award-winning clinic at Ekkamai. 5.0★ Google Reviews. Book now or WhatsApp +66919991744';
      document.head.appendChild(meta);
    }

    // Update Open Graph tags
    const ogTags = {
      'og:title': 'IV Therapy Bangkok | Healthi-Life - NAD+, Fat Burner, Glow IV Drips',
      'og:description': 'Premium IV Therapy in Bangkok. NAD+, Fat Burner, Glow & 21+ IV drips. Award-winning clinic. Book now!',
      'og:type': 'website',
      'og:url': 'https://ivtherapyhealthilife.com/',
      'og:image': 'https://ivtherapyhealthilife.com/og-image.jpg',
      'og:site_name': 'Healthi-Life IV Therapy Bangkok'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });

    // Add Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'IV Therapy Bangkok | Healthi-Life',
      'twitter:description': 'Premium IV Therapy in Bangkok. NAD+, Fat Burner, Glow & 21+ IV drips.',
      'twitter:image': 'https://ivtherapyhealthilife.com/og-image.jpg'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://ivtherapyhealthilife.com/');

    // Add structured data
    const schemas = [faqSchema, medicalGraphSchema, organizationSchema, serviceSchema];
    
    // Remove existing schema scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => script.remove());
    
    // Add new schema scripts
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      document.querySelectorAll('script[type="application/ld+json"]').forEach(script => script.remove());
    };
  }, []);

  return null;
};

export default SEO;
