import { useEffect } from 'react';

// FAQ data for schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is stem cell therapy safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. At Healthi-Life, we use only fresh, ethically sourced umbilical cord stem cells processed in certified labs. Every batch is tested for safety, purity, and viability. To date, we have seen no serious adverse reactions in any of our patients."
      }
    },
    {
      "@type": "Question",
      "name": "What conditions can stem cell therapy help with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our stem cell programs support patients dealing with fertility challenges, hormonal imbalance, osteoarthritis, joint pain, chronic fatigue, and visible signs of aging. Treatments are personalized based on your goals and health history."
      }
    },
    {
      "@type": "Question",
      "name": "Where do your stem cells come from?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We use only mesenchymal stem cells (MSCs) derived from fresh umbilical cord tissue, collected during planned C-section deliveries. No fetal or embryonic sources, no animal products — 100% ethical, traceable, and xeno-free."
      }
    },
    {
      "@type": "Question",
      "name": "How many sessions will I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most patients begin with a plan of 1–3 sessions, spaced out over several weeks. Your doctor will recommend a specific protocol based on your age, condition, and response to treatment."
      }
    },
    {
      "@type": "Question",
      "name": "What makes fresh stem cells better than frozen ones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fresh cells retain higher viability, grow faster, and integrate more effectively. Frozen stem cells often suffer from cell damage, reduced activity, and lower therapeutic results. That's why we only use fresh, high-potency MSCs at Healthi-Life."
      }
    },
    {
      "@type": "Question",
      "name": "Will I need downtime after treatment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not at all. Most of our therapies are walk-in / walk-out with no downtime required. You may feel slightly tired or experience a mild low-grade fever — this is a natural response as your body begins to activate its healing."
      }
    }
  ]
};

// Consolidated Medical Business + Physicians + Treatments schema using @graph
const medicalGraphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalClinic",
      "@id": "https://stemcellhealthilife.com/#clinic",
      "name": "Healthi-Life Longevity Center",
      "description": "Bangkok's premium longevity and regenerative medicine clinic providing physician-led, evidence-based programs focused on wellness optimization and regenerative health.",
      "url": "https://stemcellhealthilife.com/",
      "telephone": "+66919991744",
      "priceRange": "$$$$",
      "image": "https://stemcellhealthilife.com/images/clinic-exterior.jpg",
      "hasMap": "https://www.google.com/maps/place/Healthi-Life+Longevity+Center/@13.7405523,100.5456734,13z/",
      "sameAs": [
        "https://www.instagram.com/healthi_life_th/",
        "https://www.facebook.com/HealthiLifeTH",
        "https://www.youtube.com/@Healthi-Life_LongevityCenter",
        "https://share.google/ISKCEIXyRtxYFsBaA"
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
        "http://schema.org/PrimaryCare",
        "http://schema.org/Dermatology"
      ],
      "availableService": [
        { "@id": "https://stemcellhealthilife.com/#treatment-stem-cell" },
        { "@id": "https://stemcellhealthilife.com/#treatment-nad-iv" }
      ],
      "employee": [
        { "@id": "https://stemcellhealthilife.com/#dr-petch" },
        { "@id": "https://stemcellhealthilife.com/#dr-first" }
      ],
      "review": [
        { "@id": "https://stemcellhealthilife.com/#review-james" },
        { "@id": "https://stemcellhealthilife.com/#review-meera" },
        { "@id": "https://stemcellhealthilife.com/#review-nathalie" },
        { "@id": "https://stemcellhealthilife.com/#review-richard" },
        { "@id": "https://stemcellhealthilife.com/#review-sophie" }
      ]
    },
    {
      "@type": ["Person", "IndividualPhysician"],
      "@id": "https://stemcellhealthilife.com/#dr-petch",
      "name": "Dr. Petch (Sarassawadee Suwanjinda)",
      "medicalSpecialty": ["http://schema.org/PrimaryCare"],
      "practicesAt": { "@id": "https://stemcellhealthilife.com/#clinic" },
      "address": { "@id": "https://stemcellhealthilife.com/#clinic-address" },
      "knowsAbout": [
        "Longevity Medicine",
        "Regenerative Medicine",
        "Cellular Therapy",
        "Stem Cell Therapy",
        "NAD+ IV Therapy",
        "IV Nutrition Therapy",
        "Anti-Aging Medicine",
        "Wellness Optimization"
      ],
      "description": "Dr. Sarassawadee is a licensed medical physician focused on lifestyle and longevity medicine, regenerative protocols, and IV-based wellness programs in Bangkok.",
      "url": "https://stemcellhealthilife.com/"
    },
    {
      "@type": ["Person", "IndividualPhysician"],
      "@id": "https://stemcellhealthilife.com/#dr-first",
      "name": "Dr. First (Napat Hunsajarupan)",
      "medicalSpecialty": ["http://schema.org/Dermatology"],
      "practicesAt": { "@id": "https://stemcellhealthilife.com/#clinic" },
      "address": { "@id": "https://stemcellhealthilife.com/#clinic-address" },
      "knowsAbout": [
        "Dermatology",
        "Aesthetic Medicine",
        "Skin Rejuvenation",
        "Regenerative Medicine",
        "Cell Therapy",
        "Stem Cell Therapy",
        "Anti-Aging Treatments"
      ],
      "description": "Dr. First (Napat Hunsajarupan) is a medical physician specializing in dermatology and aesthetic medicine, with training in regenerative medicine and skin rejuvenation in Bangkok.",
      "url": "https://stemcellhealthilife.com/"
    },
    {
      "@type": "PostalAddress",
      "@id": "https://stemcellhealthilife.com/#clinic-address",
      "streetAddress": "94 Ekkamai 10 Alley, Khlong Tan Nuea, Watthana",
      "addressLocality": "Bangkok",
      "postalCode": "10110",
      "addressCountry": "TH"
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://stemcellhealthilife.com/#treatment-stem-cell",
      "name": "Stem Cell Therapy",
      "description": "Physician-led cellular therapy programs designed to support regenerative health based on individual medical assessment.",
      "howPerformed": "Personalized medical assessment, physician-led protocol, and follow-up monitoring."
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://stemcellhealthilife.com/#treatment-nad-iv",
      "name": "NAD+ IV Therapy",
      "description": "Intravenous NAD+ therapy delivered under medical supervision to support wellness optimization based on individual assessment.",
      "howPerformed": "Medical screening, supervised IV administration, and aftercare guidance."
    },
    {
      "@type": "Review",
      "@id": "https://stemcellhealthilife.com/#review-james",
      "author": {
        "@type": "Person",
        "name": "James O'Connell"
      },
      "datePublished": "2024-11-15T00:00:00+07:00",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "After years of living with knee pain from an old sports injury, I finally found relief at Healthi-Life. The stem cell therapy not only reduced my inflammation but restored mobility I hadn't had in years. I'm walking without pain—and even jogging again. Truly life-changing.",
      "itemReviewed": { "@id": "https://stemcellhealthilife.com/#clinic" }
    },
    {
      "@type": "Review",
      "@id": "https://stemcellhealthilife.com/#review-meera",
      "author": {
        "@type": "Person",
        "name": "Meera Kapoor"
      },
      "datePublished": "2024-10-22T00:00:00+07:00",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Healthi-Life gave me more than just a refreshed appearance—it gave me confidence. After one month, I noticed firmer skin, deeper sleep, and better focus. The stem cell therapy felt like a reset button for my whole body. Highly recommended for anyone serious about graceful aging.",
      "itemReviewed": { "@id": "https://stemcellhealthilife.com/#clinic" }
    },
    {
      "@type": "Review",
      "@id": "https://stemcellhealthilife.com/#review-nathalie",
      "author": {
        "@type": "Person",
        "name": "Nathalie Dufresne"
      },
      "datePublished": "2024-09-10T00:00:00+07:00",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "I was told I had poor egg quality and limited chances with IVF. But after undergoing the fertility stem cell program at Healthi-Life, my hormone levels improved significantly. I felt energized, balanced, and within two months—I received a positive pregnancy test. Forever grateful!",
      "itemReviewed": { "@id": "https://stemcellhealthilife.com/#clinic" }
    },
    {
      "@type": "Review",
      "@id": "https://stemcellhealthilife.com/#review-richard",
      "author": {
        "@type": "Person",
        "name": "Richard Chen"
      },
      "datePublished": "2024-12-05T00:00:00+07:00",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "At 58, I was feeling the effects of aging—low energy, brain fog, and joint stiffness. After my anti-aging stem cell treatment at Healthi-Life, I feel 15 years younger. My energy levels are through the roof, my skin looks healthier, and I'm back to playing tennis every week. This is real regenerative medicine.",
      "itemReviewed": { "@id": "https://stemcellhealthilife.com/#clinic" }
    },
    {
      "@type": "Review",
      "@id": "https://stemcellhealthilife.com/#review-sophie",
      "author": {
        "@type": "Person",
        "name": "Sophie Williams"
      },
      "datePublished": "2024-11-28T00:00:00+07:00",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "I came to Healthi-Life for their anti-aging stem cell program after researching clinics across Asia. The results exceeded my expectations—my wrinkles have softened, my hair is thicker, and I have mental clarity I haven't experienced in years. Dr. Petch and the team are exceptional professionals.",
      "itemReviewed": { "@id": "https://stemcellhealthilife.com/#clinic" }
    }
  ]
};

// HowTo Schema for treatment process - enables rich snippets in Google
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Start Stem Cell Therapy at Healthi-Life Bangkok",
  "description": "A simple 4-step process to begin your personalized stem cell therapy treatment at Healthi-Life Longevity Center in Bangkok, Thailand.",
  "totalTime": "P7D",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "Contact for pricing"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Medical records (optional)"
    },
    {
      "@type": "HowToSupply",
      "name": "Blood test results (optional)"
    },
    {
      "@type": "HowToSupply",
      "name": "MRI scans if available (optional)"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Phone or video call device for consultation"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Submit Evaluation Form",
      "text": "Book online and answer a few questions about your health goals and medical history. This helps our doctors understand your needs before the consultation.",
      "url": "https://stemcellhealthilife.com/#process",
      "image": "https://stemcellhealthilife.com/process-step-1.jpg"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Send Your Medical Reports",
      "text": "Optional: Share your MRI scans, blood tests, or existing diagnosis to help us better understand your condition and prepare a tailored treatment approach.",
      "url": "https://stemcellhealthilife.com/#process",
      "image": "https://stemcellhealthilife.com/process-step-2.jpg"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Doctor Consultation",
      "text": "Have a consultation by phone, video call, or visit our medical center in Bangkok. Our experienced physicians will discuss your goals and recommend the best treatment options.",
      "url": "https://stemcellhealthilife.com/#process",
      "image": "https://stemcellhealthilife.com/process-step-3.jpg"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Get Your Personalized Treatment Plan",
      "text": "Our doctors will create a customized stem cell therapy protocol, schedule your sessions, and prepare everything for your regenerative treatment.",
      "url": "https://stemcellhealthilife.com/#process",
      "image": "https://stemcellhealthilife.com/process-step-4.jpg"
    }
  ]
};

// Standalone Physician Schema for Dr. Petch
const drPetchSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": "https://stemcellhealthilife.com/#dr-petch",
  "name": "Dr. Petch (Sarassawadee Suwanjinda)",
  "medicalSpecialty": "http://schema.org/PrimaryCare",
  "telephone": "+66919991744",
  "priceRange": "$$$$",
  "image": "https://stemcellhealthilife.com/images/dr-petch.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "94 Ekkamai 10 Alley, Khlong Tan Nuea, Watthana",
    "addressLocality": "Bangkok",
    "postalCode": "10110",
    "addressCountry": "TH"
  },
  "knowsAbout": [
    "Longevity Medicine",
    "Regenerative Medicine",
    "Stem Cell Therapy",
    "NAD+ IV Therapy",
    "Anti-Aging Medicine"
  ],
  "description": "Dr. Sarassawadee is a licensed medical physician specializing in primary care and longevity-focused regenerative medicine, delivering personalized, physician-led protocols in Bangkok."
};

// Standalone Physician Schema for Dr. First
const drFirstSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": "https://stemcellhealthilife.com/#dr-first",
  "name": "Dr. First (Napat Hunsajarupan)",
  "medicalSpecialty": "http://schema.org/Dermatology",
  "telephone": "+66919991744",
  "priceRange": "$$$$",
  "image": "https://stemcellhealthilife.com/images/dr-first.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "94 Ekkamai 10 Alley, Khlong Tan Nuea, Watthana",
    "addressLocality": "Bangkok",
    "postalCode": "10110",
    "addressCountry": "TH"
  },
  "knowsAbout": [
    "Dermatology",
    "Aesthetic Medicine",
    "Skin Rejuvenation",
    "Regenerative Medicine",
    "Stem Cell Therapy",
    "Anti-Aging Treatments"
  ],
  "description": "Dr. First Hunsajarupan is a medical physician specializing in dermatology and aesthetic medicine, with expertise in regenerative and anti-aging treatments in Bangkok."
};

// Organization Schema for Knowledge Graph
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://stemcellhealthilife.com/#organization",
  "name": "Healthi-Life Longevity Center",
  "alternateName": ["Healthi-Life", "HealthiLife Bangkok", "Healthi Life Stem Cell Clinic"],
  "url": "https://stemcellhealthilife.com/",
  "logo": "https://stemcellhealthilife.com/images/healthilife-logo.png",
  "image": "https://stemcellhealthilife.com/images/clinic-exterior.jpg",
  "description": "Bangkok's premier regenerative medicine and longevity clinic specializing in fresh stem cell therapy, NAD+ IV therapy, and evidence-based anti-aging treatments.",
  "foundingDate": "2020",
  "founder": [
    { "@id": "https://stemcellhealthilife.com/#dr-petch" },
    { "@id": "https://stemcellhealthilife.com/#dr-first" }
  ],
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
    "https://www.youtube.com/@Healthi-Life_LongevityCenter",
    "https://share.google/ISKCEIXyRtxYFsBaA"
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 13.7268,
      "longitude": 100.5847
    },
    "geoRadius": "50000"
  },
  "knowsAbout": [
    "Stem Cell Therapy",
    "Regenerative Medicine",
    "NAD+ IV Therapy",
    "Anti-Aging Medicine",
    "Longevity Medicine",
    "Mesenchymal Stem Cells",
    "IV Nutrition Therapy",
    "Exosome Therapy"
  ]
};

// WebSite Schema with SearchAction for Google
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://stemcellhealthilife.com/#website",
  "name": "Healthi-Life Longevity Center",
  "alternateName": "Stem Cell Therapy Bangkok",
  "url": "https://stemcellhealthilife.com/",
  "publisher": { "@id": "https://stemcellhealthilife.com/#organization" },
  "inLanguage": "en",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://stemcellhealthilife.com/?s={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// ItemList Schema for Services
const servicesListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Healthi-Life Medical Services",
  "description": "Comprehensive list of regenerative medicine and longevity treatments offered at Healthi-Life Bangkok",
  "numberOfItems": 4,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "MedicalProcedure",
        "name": "Stem Cell Therapy",
        "description": "Fresh mesenchymal stem cell treatments for anti-aging, joint pain, fertility, and chronic conditions.",
        "url": "https://stemcellhealthilife.com/#services"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "MedicalProcedure",
        "name": "NAD+ IV Therapy",
        "description": "Intravenous NAD+ therapy for cellular energy, metabolism, and cognitive function optimization.",
        "url": "https://stemcellhealthilife.com/#services"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "MedicalProcedure",
        "name": "Exosome Therapy",
        "description": "Cell-derived vesicle treatments for regenerative and anti-aging purposes.",
        "url": "https://stemcellhealthilife.com/#services"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "MedicalProcedure",
        "name": "IV Nutrition Therapy",
        "description": "Customized vitamin and mineral infusions for optimal health and wellness.",
        "url": "https://stemcellhealthilife.com/#services"
      }
    }
  ]
};

// BreadcrumbList Schema for navigation
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://stemcellhealthilife.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://stemcellhealthilife.com/#services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Medical Team",
      "item": "https://stemcellhealthilife.com/#team"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Testimonials",
      "item": "https://stemcellhealthilife.com/#testimonials"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "FAQ",
      "item": "https://stemcellhealthilife.com/#faq"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Contact",
      "item": "https://stemcellhealthilife.com/#contact"
    }
  ]
};

// Speakable Schema for Voice Search (Google Assistant, Siri, Alexa)
const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Stem Cell Therapy Bangkok | Healthi-Life Longevity Center",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".hero-description", "#services h2", "#faq"]
  },
  "url": "https://stemcellhealthilife.com/"
};

// MedicalCondition Schemas for treated conditions
const medicalConditionsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Conditions Treated at Healthi-Life",
  "description": "Medical conditions and health goals addressed through regenerative medicine at Healthi-Life Bangkok",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "MedicalCondition",
        "name": "Osteoarthritis",
        "description": "Degenerative joint disease causing pain and stiffness, treated with stem cell therapy to support cartilage regeneration.",
        "possibleTreatment": { "@id": "https://stemcellhealthilife.com/#treatment-stem-cell" }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "MedicalCondition",
        "name": "Chronic Fatigue Syndrome",
        "description": "Persistent exhaustion and reduced energy levels, addressed through NAD+ IV therapy and cellular regeneration protocols.",
        "possibleTreatment": { "@id": "https://stemcellhealthilife.com/#treatment-nad-iv" }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "MedicalCondition",
        "name": "Age-Related Decline",
        "alternateName": "Anti-Aging",
        "description": "Natural aging processes affecting energy, skin, cognition, and overall vitality, supported through regenerative medicine protocols.",
        "possibleTreatment": { "@id": "https://stemcellhealthilife.com/#treatment-stem-cell" }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "MedicalCondition",
        "name": "Female Infertility",
        "description": "Fertility challenges including poor egg quality and hormonal imbalance, supported through fertility-focused stem cell programs.",
        "possibleTreatment": { "@id": "https://stemcellhealthilife.com/#treatment-stem-cell" }
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "MedicalCondition",
        "name": "Sports Injuries",
        "description": "Athletic injuries affecting joints, tendons, and muscles, treated with regenerative stem cell therapy for faster recovery.",
        "possibleTreatment": { "@id": "https://stemcellhealthilife.com/#treatment-stem-cell" }
      }
    }
  ]
};

// Award Schema for certifications and recognition
const awardSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://stemcellhealthilife.com/#organization-awards",
  "name": "Healthi-Life Longevity Center",
  "award": [
    "Best Regenerative Medicine Clinic of the Year in Asia Pacific 2025",
    "Best Rising Star Longevity Center Thailand Bangkok 2025",
    "ISO Certified Medical Facility",
    "FDA Thailand Approved",
    "GMP Certified Laboratory Partner"
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Medical Certification",
      "name": "ISO Medical Facility Certification"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Government Approval",
      "name": "FDA Thailand Medical Approval"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Laboratory Standard",
      "name": "GMP Certified Laboratory Partnership"
    }
  ]
};

const SEO = () => {
  useEffect(() => {
    // Create and inject JSON-LD scripts
    const schemas = [
      { id: 'faq-schema', data: faqSchema },
      { id: 'medical-graph-schema', data: medicalGraphSchema },
      { id: 'howto-schema', data: howToSchema },
      { id: 'dr-petch-schema', data: drPetchSchema },
      { id: 'dr-first-schema', data: drFirstSchema },
      { id: 'organization-schema', data: organizationSchema },
      { id: 'website-schema', data: websiteSchema },
      { id: 'services-list-schema', data: servicesListSchema },
      { id: 'breadcrumb-schema', data: breadcrumbSchema },
      { id: 'speakable-schema', data: speakableSchema },
      { id: 'medical-conditions-schema', data: medicalConditionsSchema },
      { id: 'award-schema', data: awardSchema }
    ];

    schemas.forEach(({ id, data }) => {
      // Remove existing script if present
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }

      // Create new script
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });

    // Cleanup on unmount
    return () => {
      schemas.forEach(({ id }) => {
        const script = document.getElementById(id);
        if (script) {
          script.remove();
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default SEO;
