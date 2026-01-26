import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    "nav.ivDrips": "IV Drips",
    "nav.whyIVTherapy": "Why IV Therapy",
    "nav.doctors": "Doctors",
    "nav.process": "Process",
    "nav.testimonials": "Testimonials",
    "nav.faq": "FAQ",
    "nav.bookNow": "Book Now",
    "nav.whatsapp": "WhatsApp",

    // Hero
    "hero.badge": "Best Regenerative Medicine Clinic 2025 – Asia-Pacific",
    "hero.title": "IV Therapy",
    "hero.titleHighlight": "Bangkok",
    "hero.subtitle": "Powerful nutrients delivered directly into your bloodstream — for instant absorption and maximum results.",
    "hero.subtitleBold": "Recharge, recover, and rejuvenate.",
    "hero.reviews": "5.0 Google Reviews",
    "hero.location": "Ekkamai, Bangkok",
    "hero.hours": "Mon-Sat: 11 AM – 7 PM",
    "hero.cta1": "Talk with Us on WhatsApp",
    "hero.cta2": "Book Now",
    "hero.locationInfo": "📍 Bangkok's Premium IV Therapy Destination at EKKAMAI 10",

    // Trust Banner
    "trust.googleRating": "Google Rating",
    "trust.patientsTreated": "Patients Treated",
    "trust.countriesServed": "Countries Served",
    "trust.certifiedLab": "Certified Lab",
    "trust.bestClinicValue": "Best Clinic",
    "trust.bestClinicLabel": "2025 Asia-Pacific",

    // WhatsApp Widget
    "whatsapp.concierge": "Your Medical Concierge",
    "whatsapp.online": "Online",
    "whatsapp.greeting": "Hi 👋",
    "whatsapp.welcome": "Welcome to Healthi-Life! 💉✨",
    "whatsapp.message": "Personalized IV Therapy for Energy, Vitality & Peak Performance. Ready to optimize your health?",
    "whatsapp.startChat": "Start Chat",
    "whatsapp.enterMessage": "Enter Your Message...",
    "whatsapp.concierge.name": "Anna - Medical Concierge",

    // Google Reviews
    "reviews.googleReviews": "Google Reviews",
    "reviews.viewAll": "View all reviews on Google",

    // Services
    "services.title": "Most Popular IV Therapy",
    "services.subtitle": "Replenish your energy, enhance metabolism, and support detoxification with our targeted IV drips.",
    "services.subtitleBold": "Fast, effective results.",
    "services.chatWithUs": "Talk with Us",
    "services.discoverMore": "Discover more than 21 IV drips tailored for your wellness needs",
    "services.bodyBooster": "BODY BOOSTER IV",
    "services.brainBooster": "BRAIN BOOSTER",
    "services.skinBooster": "SKIN BOOSTER",
    "services.notSure": "Not Sure Which IV Drip is Right for You?",
    "services.notSureSubtitle": "Our medical team will help you choose the perfect IV therapy for your needs.",
    "services.talkToUs": "Talk to Us Directly",

    // Popular drips
    "popular.fatBurner.title": "Fat Burner IV Therapy",
    "popular.fatBurner.price": "4,500 THB",
    "popular.fatBurner.desc": "Ignite your metabolism and accelerate fat burning. Packed with L-Carnitine, CLA, B-complex vitamins, and antioxidants to boost energy, detoxify your body, and target stubborn fat.",
    "popular.fatBurner.benefit1": "Accelerate fat burning",
    "popular.fatBurner.benefit2": "Boost energy",
    "popular.fatBurner.benefit3": "Detoxify liver",

    "popular.nad.title": "NAD+ IV 100mg",
    "popular.nad.price": "6,000 THB",
    "popular.nad.desc": "Boost energy, repair cells, slow aging, and enhance brain power. Delivering NAD+ directly into your bloodstream for cellular health and cognitive enhancement.",
    "popular.nad.benefit1": "Cellular health",
    "popular.nad.benefit2": "Anti-aging",
    "popular.nad.benefit3": "Mental clarity",

    "popular.glow.title": "Glow Revive IV Therapy",
    "popular.glow.price": "12,000 THB",
    "popular.glow.desc": "Revitalize your skin with placenta extract for a brighter glow, firmer texture, and lasting youthfulness. Premium anti-aging skin treatment.",
    "popular.glow.benefit1": "Firms & lifts skin",
    "popular.glow.benefit2": "Improves elasticity",
    "popular.glow.benefit3": "Radiant glow",

    "popular.resveratrol.title": "Resveratrol IV Therapy",
    "popular.resveratrol.price": "8,500 THB",
    "popular.resveratrol.desc": "Powerful antioxidant therapy derived from red grapes. Protects against cellular aging, supports cardiovascular health, and promotes longevity at the cellular level.",
    "popular.resveratrol.benefit1": "Anti-aging antioxidant",
    "popular.resveratrol.benefit2": "Heart health",
    "popular.resveratrol.benefit3": "Cellular protection",

    "popular.fullDetox.title": "Full Body Detox IV",
    "popular.fullDetox.price": "8,500 THB",
    "popular.fullDetox.desc": "Complete systemic cleanse to eliminate toxins, heavy metals, and metabolic waste. Rejuvenate your organs, boost immunity, and restore optimal body function.",
    "popular.fullDetox.benefit1": "Full body cleanse",
    "popular.fullDetox.benefit2": "Organ support",
    "popular.fullDetox.benefit3": "Immune boost",

    "popular.liverDetox.title": "Liver Detox IV",
    "popular.liverDetox.price": "4,500 THB",
    "popular.liverDetox.desc": "Targeted liver cleansing formula with glutathione and essential nutrients. Flush toxins, restore liver function, and improve overall metabolic health.",
    "popular.liverDetox.benefit1": "Liver cleansing",
    "popular.liverDetox.benefit2": "Toxin removal",
    "popular.liverDetox.benefit3": "Metabolic support",

    "popular.curcumin.title": "Curcumin IV Therapy",
    "popular.curcumin.price": "8,500 THB",
    "popular.curcumin.desc": "High-absorption curcumin infusion with powerful anti-inflammatory properties. Reduces inflammation, supports joint health, and provides potent antioxidant protection.",
    "popular.curcumin.benefit1": "Anti-inflammatory",
    "popular.curcumin.benefit2": "Joint support",
    "popular.curcumin.benefit3": "Pain relief",

    "popular.nad250.title": "NAD+ IV 250mg",
    "popular.nad250.price": "8,500 THB",
    "popular.nad250.desc": "High-dose NAD+ therapy for maximum cellular regeneration. Premium anti-aging treatment that supercharges energy, sharpens cognitive function, and reverses cellular decline.",
    "popular.nad250.benefit1": "Maximum regeneration",
    "popular.nad250.benefit2": "Peak energy",
    "popular.nad250.benefit3": "Brain optimization",

    // Body Booster drips
    "body.nad.title": "NAD+ IV 100mg",
    "body.nad.price": "6,000 THB",
    "body.nad.tagline": "Cellular health, boosts energy, anti-aging",
    "body.nad.desc": "Elevate your energy, mental clarity, and vitality with this advanced IV treatment. Delivering Nicotinamide Adenine Dinucleotide (NAD+) directly into your bloodstream, it restores cellular health, boosts energy, enhances cognitive focus, supports anti-aging, and accelerates athletic recovery.",

    "body.fatBurner.title": "Fat Burner IV",
    "body.fatBurner.price": "4,500 THB",
    "body.fatBurner.tagline": "Accelerate fat burning, detox",
    "body.fatBurner.desc": "Ignite your metabolism and accelerate fat burning with our scientifically formulated IV drip. Packed with essential nutrients like L-Carnitine, CLA, B-complex vitamins, and antioxidants.",

    "body.vitalBoost.title": "Vital Boost / Myer's Cocktail IV",
    "body.vitalBoost.price": "4,500 THB",
    "body.vitalBoost.tagline": "Energy boost, strengthens immunity, reduces stress",
    "body.vitalBoost.desc": "Recharge instantly with Vital Boost IV – a powerful blend of vitamins to fight fatigue, boost immunity, and restore total body balance.",

    "body.athleteMax.title": "Athlete Max IV",
    "body.athleteMax.price": "4,500 THB",
    "body.athleteMax.tagline": "Speeds recovery, enhances endurance, replenishes nutrients",
    "body.athleteMax.desc": "Fuel muscle growth, speed up recovery, and elevate performance with our Athlete Max IV – advanced amino acids + vitamin infusion.",

    "body.partyShield.title": "Party Shield IV",
    "body.partyShield.price": "4,500 THB",
    "body.partyShield.tagline": "Rehydrates body, restores energy, supports liver detox",
    "body.partyShield.desc": "Pre-party protection in a drip – boost energy, hydrate deeply, and stay energized all night with Party Shield IV Therapy.",

    "body.hangover.title": "Hangover IV",
    "body.hangover.price": "4,500 THB",
    "body.hangover.tagline": "Reduces nausea, relieves headache, fast rehydration",
    "body.hangover.desc": "Rapid hangover relief – rehydrate, eliminate toxins, and detox your liver in one powerful, refreshing IV drip.",

    // Brain Booster drips
    "brain.timeZone.title": "Time Zone IV",
    "brain.timeZone.price": "4,500 THB",
    "brain.timeZone.tagline": "Fights jet lag, restores energy, reduces fatigue",
    "brain.timeZone.desc": "Rehydrate, recharge, and reset your body with a tailored blend to combat fatigue, restore energy, and ease travel recovery.",

    "brain.stressEase.title": "Stress Ease IV",
    "brain.stressEase.price": "4,500 THB",
    "brain.stressEase.tagline": "Calms the nervous system, lowers stress, improves mood",
    "brain.stressEase.desc": "Recharge your mind and body with a soothing blend of nutrients designed to relieve stress, restore balance, and promote relaxation.",

    "brain.neuroBoost.title": "Neuro Boost IV",
    "brain.neuroBoost.price": "4,500 THB",
    "brain.neuroBoost.tagline": "Improves focus, enhances memory, boosts cognitive function",
    "brain.neuroBoost.desc": "Unlock Your Brain's Full Potential. Experience sharper focus, enhanced memory, and improved cognitive function.",

    "brain.dreamEase.title": "Dream Ease IV",
    "brain.dreamEase.price": "4,500 THB",
    "brain.dreamEase.tagline": "Improves sleep quality, relaxes body & mind, restores balance",
    "brain.dreamEase.desc": "A premium infusion designed to soothe your mind, relax your body, and unlock the rejuvenating power of deep, restorative sleep.",

    // Skin Booster drips
    "skin.glowVita.title": "Glow Vita IV",
    "skin.glowVita.price": "4,500 THB",
    "skin.glowVita.tagline": "Hydrates skin deeply, brightens complexion, restores natural glow",
    "skin.glowVita.desc": "Brighten your skin with nutrients that boost hydration, enhance collagen production, and reveal your natural glow.",

    "skin.glowRestore.title": "Glow Restore IV",
    "skin.glowRestore.price": "8,500 THB",
    "skin.glowRestore.tagline": "Repairs skin damage, boosts collagen, reduces fine lines",
    "skin.glowRestore.desc": "A powerful infusion of potent antioxidants to brighten, protect, and rejuvenate your skin.",

    "skin.glowRevive.title": "Glow Revive IV",
    "skin.glowRevive.price": "12,000 THB",
    "skin.glowRevive.tagline": "Firms and lifts skin, improves elasticity, delivers radiant anti-aging effect",
    "skin.glowRevive.desc": "Revitalize your skin with placenta extract for a brighter glow, firmer texture, and lasting youthfulness.",

    // Why Choose Us
    "why.title": "What is IV Therapy?",
    "why.subtitle": "Modern life drains you. Stress, poor sleep, toxins, travel, and aging all deplete your body's essential reserves.",
    "why.subtitleBold": "IV Therapy restores balance.",
    "why.absorption.title": "100% Absorption",
    "why.absorption.desc": "IV Therapy delivers vitamins, minerals, and antioxidants directly into your bloodstream — allowing your body to absorb them faster and more effectively than oral supplements.",
    "why.instant.title": "Instant Results",
    "why.instant.desc": "Unlike oral supplements, IV therapy bypasses the digestive system and gives your body exactly what it needs, where it needs it, fast.",
    "why.physician.title": "Physician-Led Care",
    "why.physician.desc": "All IV drips at Healthi-Life are prepared by medical professionals using hospital-grade ingredients and administered by trained nurses under doctor supervision.",
    "why.medical.title": "Medical-Grade Formulas",
    "why.medical.desc": "Each infusion is personalized with medical-grade nutrients that match your exact health profile. Because safety isn't optional — it's our standard.",
    "why.quick.title": "Quick & Comfortable",
    "why.quick.desc": "Most IV drips take 30 to 45 minutes. Relax in our private treatment lounges while your body is being replenished.",
    "why.whyNeed": "Why You Need It",
    "why.whyNeedDesc": "Recharge your system and get the boost you didn't know you were missing.",
    "why.targeted": "Targeted IV Solutions",
    "why.trusted": "Trusted by Doctors. Chosen by High Performers.",
    "why.brainBooster": "Brain Booster IV",
    "why.brainBoosterDesc": "Sharpen focus, clear the fog. Neuro-enhancing vitamins and antioxidants to boost memory, clarity, and cognitive speed.",
    "why.bodyBooster": "Body Booster IV",
    "why.bodyBoosterDesc": "Total body revival in one drip. Restores energy, strengthens immunity, and supports detox at the cellular level.",
    "why.skinBooster": "Skin Booster IV",
    "why.skinBoosterDesc": "Glow starts from the inside. Skin-loving antioxidants and collagen boosters for radiant, youthful skin.",
    "why.luxurious": "Bangkok's Most Luxurious IV Experience",

    // Medical Team
    "team.badge": "World-Class Medical Team",
    "team.title": "Meet Your Expert Physicians",
    "team.subtitle": "Our internationally certified doctors combine decades of experience in regenerative medicine, aesthetic procedures, and longevity science to deliver personalized treatment plans.",
    "team.education": "Education & Training",
    "team.certifications": "Key Certifications",
    "team.more": "more",
    "team.trustAAM": "AAAM Certified Physicians",
    "team.trustISSCA": "ISSCA Stem Cell Specialists",
    "team.trustIntl": "International Training",
    "team.drPetch.name": "Dr. Petch (Sarassawadee Suwanjinda)",
    "team.drPetch.role": "Founder & Lifestyle Medicine Specialist - M.D",
    "team.drPetch.specialty": "Lifestyle Medicine Specialist & Anti-Aging",
    "team.drPetch.edu1": "Medical Physician",
    "team.drPetch.edu2": "Internship Training at Police General Hospital",
    "team.drPetch.edu3": "Internship Training at Ananda Mahidol Hospital",
    "team.drPetch.cert1": "Certificate in Aesthetic Medicine – AAAM",
    "team.drPetch.cert2": "Member of American Academy of Aesthetic Medicine",
    "team.drPetch.cert3": "Certificate in IV Nutrition Infusion Therapy – CBAM",
    "team.drPetch.cert4": "Certificate in Allogeneic Cellular Therapy – ISSCA",
    "team.drPetch.cert5": "HEAT International Congress on Wellness Management",
    "team.drPetch.cert6": "Nutraceutical Certificate – Thai Traditional Medicine",
    "team.drFirst.name": "Dr. First (Napat Hunsajarupan)",
    "team.drFirst.role": "Founder & MD, Dermatologist",
    "team.drFirst.specialty": "Dermatology & Aesthetic Medicine",
    "team.drFirst.edu1": "MSc. Dermatology – CICM, Thammasat University",
    "team.drFirst.edu2": "Doctor of Medicine (M.D.) – Thammasat University",
    "team.drFirst.edu3": "General Practitioner – Royal Thai Army Medical Dept",
    "team.drFirst.edu4": "Dermatology OPD – Benchakitti Park Hospital",
    "team.drFirst.cert1": "Certificate in Aesthetic Medicine – AAAM",
    "team.drFirst.cert2": "Member of American Academy of Aesthetic Medicine",
    "team.drFirst.cert3": "Practical Cell Therapy Symposium",
    "team.drFirst.cert4": "American Board of Laser Surgery",
    "team.drFirst.cert5": "Integrative Botulinum Injection – Rassapoom Institute",
    "team.drFirst.cert6": "Nutraceutical Certificate – Thai Traditional Medicine",

    // Process
    "process.title": "How It Works",
    "process.subtitle": "From booking to feeling amazing — we make it seamless and comfortable.",
    "process.step1.title": "Talk with Us",
    "process.step1.desc": "Message us on WhatsApp to discuss your health goals and ask any questions.",
    "process.step2.title": "Quick Consultation",
    "process.step2.desc": "Our medical team will recommend the perfect IV drip for your needs.",
    "process.step3.title": "Book Your Session",
    "process.step3.desc": "Schedule your visit at our serene clinic in Ekkamai, Bangkok.",
    "process.step4.title": "Relax & Recharge",
    "process.step4.desc": "Enjoy your 30-45 minute IV drip in our luxurious private treatment lounges.",
    "process.ready": "Ready to Feel Amazing?",
    "process.callUs": "Call Us Now",
    "process.quickConsult": "Quick consultation",
    "process.bookOnline": "Book Online",
    "process.scheduleSession": "Schedule your session",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Still Have Questions? Our Medical Concierge Team is Here to Help.",
    "faq.q1": "What is IV Therapy and how does it work?",
    "faq.a1": "IV Therapy delivers vitamins, minerals, and antioxidants directly into your bloodstream — allowing your body to absorb them faster and more effectively than oral supplements.",
    "faq.q2": "How long does a session take?",
    "faq.a2": "Most IV drips take 30 to 45 minutes. You can relax, scroll your phone, or even nap while your body is being replenished.",
    "faq.q3": "Is IV Therapy safe?",
    "faq.a3": "Yes — all IV drips at Healthi-Life are prepared by medical professionals using hospital-grade ingredients and are administered by trained nurses under doctor supervision.",
    "faq.q4": "How soon will I feel the effects?",
    "faq.a4": "Many patients feel more energized, clear-headed, and refreshed within hours. For skin glow or immune support, visible results often appear within 24–72 hours.",
    "faq.q5": "Can IV drip therapy help with weight loss?",
    "faq.a5": "Yes! Our Fat Burner IV Therapy includes L-Carnitine, B-Complex, and metabolism boosters to support fat loss, detoxification, and energy production.",
    "faq.q6": "What should I expect during my first visit?",
    "faq.a6": "You'll be welcomed into our serene, hygienic clinic environment. Our team will discuss your health goals, recommend the right IV drip, and you'll relax in our private treatment lounges during the infusion.",
    "faq.cantFind": "Can't Find Your Answer?",
    "faq.teamReady": "Our medical team is ready to answer all your questions",
    "faq.whatsappUs": "WhatsApp Us",
    "faq.call": "Call",

    // Testimonials
    "testimonials.badge": "RECOGNITION",
    "testimonials.title": "Client Feedback",
    "testimonials.reviews": "reviews",
    "testimonials.privateClients": "Private Clients",
    "testimonials.googleRating": "Google Rating",
    "testimonials.patientsTreated": "Patients Treated",
    "testimonials.countriesServed": "Countries Served",
    "testimonials.bestClinic": "Best Clinic 2025 Asia-Pacific",

    // Contact
    "contact.title": "Visit Our Clinic",
    "contact.subtitle": "Bangkok's most luxurious IV therapy experience in the heart of Sukhumvit",
    "contact.location": "Location",
    "contact.address": "94 Ekkamai 10 Alley, Watthana, Bangkok 10110",
    "contact.bts": "BTS Ekkamai - Take motorbike 3 mins",
    "contact.findUs": "Find Us on Google Maps",
    "contact.openingHours": "Opening Hours",
    "contact.monSat": "Monday – Saturday: 11:00 AM – 7:00 PM",
    "contact.sunday": "Sunday: Closed",
    "contact.contactUs": "Contact Us",
    "contact.awardWinning": "Award-Winning Facility",
    "contact.awardDesc": "Best Regenerative Medicine Clinic 2025 – Asia-Pacific & Thailand Rising Star 2025",
    "contact.feelFast": "Feel It Fast. Stay Energized Longer.",
    "contact.feelFastDesc": "Don't wait days to feel better. Our high-performance IV infusions deliver potent vitamins, minerals, and antioxidants directly to your bloodstream — for immediate energy, deep hydration, and cellular repair that lasts.",
    "contact.bookYour": "Book Your IV Therapy",

    // Footer
    "footer.desc": "Bangkok's premium destination for personalized IV drips. Beyond hydration — targeted nutrients to restore energy, boost immunity, and rejuvenate.",
    "footer.theHouse": "THE HOUSE",
    "footer.quickLinks": "Quick Links",
    "footer.popularDrips": "Popular IV Drips",
    "footer.copyright": "IV Therapy Healthi-Life. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.serviceProvider": "Service provided by Healthi-Life Group",
  },
  th: {
    // Header
    "nav.ivDrips": "IV Drips",
    "nav.whyIVTherapy": "ทำไมต้อง IV",
    "nav.doctors": "แพทย์ผู้เชี่ยวชาญ",
    "nav.process": "ขั้นตอน",
    "nav.testimonials": "รีวิว",
    "nav.faq": "คำถามที่พบบ่อย",
    "nav.bookNow": "จองเลย",
    "nav.whatsapp": "WhatsApp",

    // Hero
    "hero.badge": "คลินิกเวชศาสตร์ฟื้นฟูดีที่สุดแห่งปี 2025 – เอเชียแปซิฟิก",
    "hero.title": "IV Therapy",
    "hero.titleHighlight": "กรุงเทพฯ",
    "hero.subtitle": "สารอาหารทรงพลังส่งตรงเข้าสู่กระแสเลือด — ดูดซึมทันทีและได้ผลสูงสุด",
    "hero.subtitleBold": "เติมพลัง ฟื้นฟู และชะลอวัย",
    "hero.reviews": "5.0 รีวิว Google",
    "hero.location": "เอกมัย กรุงเทพฯ",
    "hero.hours": "จันทร์-เสาร์: 11:00 - 19:00",
    "hero.cta1": "พูดคุยกับเราผ่าน WhatsApp",
    "hero.cta2": "จองเลย",
    "hero.locationInfo": "📍 ศูนย์ IV Therapy ระดับพรีเมียมที่เอกมัย 10",

    // Trust Banner
    "trust.googleRating": "คะแนน Google",
    "trust.patientsTreated": "ผู้ป่วยที่รักษา",
    "trust.countriesServed": "ประเทศที่ให้บริการ",
    "trust.certifiedLab": "ห้องปฏิบัติการรับรอง",
    "trust.bestClinicValue": "คลินิกดีที่สุด",
    "trust.bestClinicLabel": "2025 เอเชียแปซิฟิก",

    // WhatsApp Widget
    "whatsapp.concierge": "ที่ปรึกษาทางการแพทย์",
    "whatsapp.online": "ออนไลน์",
    "whatsapp.greeting": "สวัสดีค่ะ 👋",
    "whatsapp.welcome": "ยินดีต้อนรับสู่ Healthi-Life! 💉✨",
    "whatsapp.message": "IV Therapy เฉพาะบุคคลเพื่อพลังงาน ความมีชีวิตชีวา และประสิทธิภาพสูงสุด พร้อมเพิ่มประสิทธิภาพสุขภาพของคุณหรือยังคะ?",
    "whatsapp.startChat": "เริ่มแชท",
    "whatsapp.enterMessage": "พิมพ์ข้อความ...",
    "whatsapp.concierge.name": "แอนนา - ที่ปรึกษาทางการแพทย์",

    // Google Reviews
    "reviews.googleReviews": "รีวิว Google",
    "reviews.viewAll": "ดูรีวิวทั้งหมดบน Google",

    // Services
    "services.title": "IV Therapy ยอดนิยม",
    "services.subtitle": "เติมพลังงาน เร่งเผาผลาญ และช่วยขับสารพิษด้วย IV Drip ที่ออกแบบมาเฉพาะ",
    "services.subtitleBold": "เห็นผลเร็ว ได้ผลจริง",
    "services.chatWithUs": "พูดคุยกับเรา",
    "services.discoverMore": "ค้นพบ IV Drip มากกว่า 21 สูตรที่ออกแบบมาเพื่อสุขภาพของคุณ",
    "services.bodyBooster": "บอดี้ บูสเตอร์ IV",
    "services.brainBooster": "เบรน บูสเตอร์",
    "services.skinBooster": "สกิน บูสเตอร์",
    "services.notSure": "ไม่แน่ใจว่า IV Drip สูตรไหนเหมาะกับคุณ?",
    "services.notSureSubtitle": "ทีมแพทย์ของเราพร้อมช่วยเลือก IV Therapy ที่เหมาะกับความต้องการของคุณ",
    "services.talkToUs": "พูดคุยกับเราโดยตรง",

    // Popular drips
    "popular.fatBurner.title": "Fat Burner IV Therapy",
    "popular.fatBurner.price": "4,500 บาท",
    "popular.fatBurner.desc": "กระตุ้นการเผาผลาญและเร่งการเผาผลาญไขมัน อัดแน่นด้วย L-Carnitine, CLA, วิตามินบีรวม และสารต้านอนุมูลอิสระ เพื่อเพิ่มพลังงาน ขับสารพิษ และกำจัดไขมันที่ดื้อรั้น",
    "popular.fatBurner.benefit1": "เร่งเผาผลาญไขมัน",
    "popular.fatBurner.benefit2": "เพิ่มพลังงาน",
    "popular.fatBurner.benefit3": "ล้างพิษตับ",

    "popular.nad.title": "NAD+ IV 100mg",
    "popular.nad.price": "6,000 บาท",
    "popular.nad.desc": "เพิ่มพลังงาน ซ่อมแซมเซลล์ ชะลอวัย และเพิ่มประสิทธิภาพสมอง ส่ง NAD+ ตรงเข้าสู่กระแสเลือดเพื่อสุขภาพเซลล์และการทำงานของสมอง",
    "popular.nad.benefit1": "สุขภาพเซลล์",
    "popular.nad.benefit2": "ชะลอวัย",
    "popular.nad.benefit3": "สมองแจ่มใส",

    "popular.glow.title": "Glow Revive IV Therapy",
    "popular.glow.price": "12,000 บาท",
    "popular.glow.desc": "ฟื้นฟูผิวด้วยสารสกัดจากรกเพื่อผิวกระจ่างใส เฟิร์มกระชับ และดูอ่อนเยาว์ การรักษาชะลอวัยระดับพรีเมียม",
    "popular.glow.benefit1": "ผิวกระชับ ยกกระชับ",
    "popular.glow.benefit2": "เพิ่มความยืดหยุ่น",
    "popular.glow.benefit3": "ผิวเปล่งประกาย",

    "popular.resveratrol.title": "Resveratrol IV Therapy",
    "popular.resveratrol.price": "8,500 บาท",
    "popular.resveratrol.desc": "สารต้านอนุมูลอิสระทรงพลังจากองุ่นแดง ปกป้องจากความชราของเซลล์ สนับสนุนสุขภาพหัวใจ และส่งเสริมอายุยืนยาวในระดับเซลล์",
    "popular.resveratrol.benefit1": "สารต้านอนุมูลอิสระชะลอวัย",
    "popular.resveratrol.benefit2": "สุขภาพหัวใจ",
    "popular.resveratrol.benefit3": "ปกป้องเซลล์",

    "popular.fullDetox.title": "Full Body Detox IV",
    "popular.fullDetox.price": "8,500 บาท",
    "popular.fullDetox.desc": "การล้างพิษทั้งระบบเพื่อกำจัดสารพิษ โลหะหนัก และของเสียจากการเผาผลาญ ฟื้นฟูอวัยวะ เสริมภูมิคุ้มกัน และฟื้นฟูการทำงานของร่างกาย",
    "popular.fullDetox.benefit1": "ล้างพิษทั้งร่างกาย",
    "popular.fullDetox.benefit2": "สนับสนุนอวัยวะ",
    "popular.fullDetox.benefit3": "เสริมภูมิคุ้มกัน",

    "popular.liverDetox.title": "Liver Detox IV",
    "popular.liverDetox.price": "4,500 บาท",
    "popular.liverDetox.desc": "สูตรล้างพิษตับเฉพาะเจาะจงด้วย Glutathione และสารอาหารที่จำเป็น ขจัดสารพิษ ฟื้นฟูการทำงานของตับ และปรับปรุงสุขภาพการเผาผลาญ",
    "popular.liverDetox.benefit1": "ล้างพิษตับ",
    "popular.liverDetox.benefit2": "ขจัดสารพิษ",
    "popular.liverDetox.benefit3": "สนับสนุนการเผาผลาญ",

    "popular.curcumin.title": "Curcumin IV Therapy",
    "popular.curcumin.price": "8,500 บาท",
    "popular.curcumin.desc": "การอินฟิวชันเคอร์คูมินที่ดูดซึมสูงพร้อมคุณสมบัติต้านการอักเสบที่ทรงพลัง ลดการอักเสบ สนับสนุนสุขภาพข้อต่อ และให้การปกป้องจากสารต้านอนุมูลอิสระ",
    "popular.curcumin.benefit1": "ต้านการอักเสบ",
    "popular.curcumin.benefit2": "สนับสนุนข้อต่อ",
    "popular.curcumin.benefit3": "บรรเทาอาการปวด",

    "popular.nad250.title": "NAD+ IV 250mg",
    "popular.nad250.price": "8,500 บาท",
    "popular.nad250.desc": "การบำบัด NAD+ ขนาดสูงเพื่อการฟื้นฟูเซลล์สูงสุด การรักษาชะลอวัยระดับพรีเมียมที่เพิ่มพลังงาน เพิ่มความคมชัดของสมอง และย้อนกลับความเสื่อมของเซลล์",
    "popular.nad250.benefit1": "ฟื้นฟูสูงสุด",
    "popular.nad250.benefit2": "พลังงานสูงสุด",
    "popular.nad250.benefit3": "เพิ่มประสิทธิภาพสมอง",

    // Body Booster drips
    "body.nad.title": "NAD+ IV 100mg",
    "body.nad.price": "6,000 บาท",
    "body.nad.tagline": "สุขภาพเซลล์ เพิ่มพลังงาน ชะลอวัย",
    "body.nad.desc": "เพิ่มพลังงาน ความชัดเจนทางจิตใจ และความมีชีวิตชีวาด้วยการรักษา IV ขั้นสูง ส่ง NAD+ ตรงเข้าสู่กระแสเลือด ฟื้นฟูสุขภาพเซลล์ เพิ่มพลังงาน เพิ่มสมาธิ ชะลอวัย และเร่งการฟื้นตัว",

    "body.fatBurner.title": "Fat Burner IV",
    "body.fatBurner.price": "4,500 บาท",
    "body.fatBurner.tagline": "เร่งเผาผลาญไขมัน ขับสารพิษ",
    "body.fatBurner.desc": "กระตุ้นการเผาผลาญและเร่งการเผาผลาญไขมันด้วยสูตร IV Drip ที่คิดค้นทางวิทยาศาสตร์ อัดแน่นด้วย L-Carnitine, CLA, วิตามินบีรวม และสารต้านอนุมูลอิสระ",

    "body.vitalBoost.title": "Vital Boost / Myer's Cocktail IV",
    "body.vitalBoost.price": "4,500 บาท",
    "body.vitalBoost.tagline": "เพิ่มพลังงาน เสริมภูมิคุ้มกัน ลดความเครียด",
    "body.vitalBoost.desc": "เติมพลังทันทีด้วย Vital Boost IV – ส่วนผสมวิตามินทรงพลังที่ช่วยต่อสู้กับความเหนื่อยล้า เสริมภูมิคุ้มกัน และฟื้นฟูสมดุลร่างกาย",

    "body.athleteMax.title": "Athlete Max IV",
    "body.athleteMax.price": "4,500 บาท",
    "body.athleteMax.tagline": "เร่งการฟื้นตัว เพิ่มความทนทาน เติมสารอาหาร",
    "body.athleteMax.desc": "เสริมสร้างกล้ามเนื้อ เร่งการฟื้นตัว และเพิ่มประสิทธิภาพด้วย Athlete Max IV – กรดอะมิโนขั้นสูงและวิตามินอินฟิวชัน",

    "body.partyShield.title": "Party Shield IV",
    "body.partyShield.price": "4,500 บาท",
    "body.partyShield.tagline": "เติมน้ำให้ร่างกาย ฟื้นฟูพลังงาน ช่วยล้างพิษตับ",
    "body.partyShield.desc": "การป้องกันก่อนปาร์ตี้ในหยด – เพิ่มพลังงาน ให้ความชุ่มชื้นอย่างล้ำลึก และมีพลังตลอดคืนด้วย Party Shield IV Therapy",

    "body.hangover.title": "Hangover IV",
    "body.hangover.price": "4,500 บาท",
    "body.hangover.tagline": "ลดคลื่นไส้ บรรเทาปวดหัว เติมน้ำอย่างรวดเร็ว",
    "body.hangover.desc": "บรรเทาอาการเมาค้างอย่างรวดเร็ว – เติมน้ำ กำจัดสารพิษ และล้างพิษตับในหยดเดียว รู้สึกดีขึ้นเร็ว",

    // Brain Booster drips
    "brain.timeZone.title": "Time Zone IV",
    "brain.timeZone.price": "4,500 บาท",
    "brain.timeZone.tagline": "ต่อสู้กับเจ็ทแลค ฟื้นฟูพลังงาน ลดความเหนื่อยล้า",
    "brain.timeZone.desc": "เติมน้ำ ชาร์จพลัง และรีเซ็ตร่างกายด้วยส่วนผสมที่ออกแบบมาเพื่อต่อสู้กับความเหนื่อยล้า ฟื้นฟูพลังงาน และบรรเทาอาการเมาค้าง",

    "brain.stressEase.title": "Stress Ease IV",
    "brain.stressEase.price": "4,500 บาท",
    "brain.stressEase.tagline": "สงบระบบประสาท ลดความเครียด ปรับอารมณ์",
    "brain.stressEase.desc": "ชาร์จจิตใจและร่างกายด้วยส่วนผสมที่ผ่อนคลายซึ่งออกแบบมาเพื่อบรรเทาความเครียด ฟื้นฟูสมดุล และส่งเสริมการผ่อนคลาย",

    "brain.neuroBoost.title": "Neuro Boost IV",
    "brain.neuroBoost.price": "4,500 บาท",
    "brain.neuroBoost.tagline": "เพิ่มสมาธิ เสริมความจำ เพิ่มการทำงานของสมอง",
    "brain.neuroBoost.desc": "ปลดล็อกศักยภาพสมองเต็มที่ สัมผัสสมาธิที่แหลมคม ความจำที่เพิ่มขึ้น และการทำงานของสมองที่ดีขึ้น",

    "brain.dreamEase.title": "Dream Ease IV",
    "brain.dreamEase.price": "4,500 บาท",
    "brain.dreamEase.tagline": "ปรับปรุงคุณภาพการนอน ผ่อนคลายกายใจ ฟื้นฟูสมดุล",
    "brain.dreamEase.desc": "อินฟิวชันพรีเมียมที่ออกแบบมาเพื่อผ่อนคลายจิตใจ ผ่อนคลายร่างกาย และปลดล็อกพลังฟื้นฟูของการนอนหลับลึก",

    // Skin Booster drips
    "skin.glowVita.title": "Glow Vita IV",
    "skin.glowVita.price": "4,500 บาท",
    "skin.glowVita.tagline": "ให้ความชุ่มชื้นผิวอย่างล้ำลึก ผิวกระจ่างใส ฟื้นฟูความเปล่งประกาย",
    "skin.glowVita.desc": "ทำให้ผิวกระจ่างใสด้วยสารอาหารที่เพิ่มความชุ่มชื้น เพิ่มการผลิตคอลลาเจน และเผยความเปล่งประกายตามธรรมชาติ",

    "skin.glowRestore.title": "Glow Restore IV",
    "skin.glowRestore.price": "8,500 บาท",
    "skin.glowRestore.tagline": "ซ่อมแซมความเสียหายของผิว เพิ่มคอลลาเจน ลดริ้วรอย",
    "skin.glowRestore.desc": "อินฟิวชันทรงพลังของสารต้านอนุมูลอิสระที่ช่วยทำให้ผิวกระจ่างใส ปกป้อง และฟื้นฟูผิว",

    "skin.glowRevive.title": "Glow Revive IV",
    "skin.glowRevive.price": "12,000 บาท",
    "skin.glowRevive.tagline": "กระชับและยกกระชับผิว เพิ่มความยืดหยุ่น ให้ผลชะลอวัยอย่างเปล่งประกาย",
    "skin.glowRevive.desc": "ฟื้นฟูผิวด้วยสารสกัดจากรกเพื่อผิวกระจ่างใส เฟิร์มกระชับ และดูอ่อนเยาว์ยาวนาน",

    // Why Choose Us
    "why.title": "IV Therapy คืออะไร?",
    "why.subtitle": "ชีวิตสมัยใหม่ทำให้คุณหมดแรง ความเครียด การนอนไม่ดี สารพิษ การเดินทาง และการสูงวัยทำให้ร่างกายขาดสารอาหารที่จำเป็น",
    "why.subtitleBold": "IV Therapy ช่วยฟื้นฟูสมดุล",
    "why.absorption.title": "ดูดซึม 100%",
    "why.absorption.desc": "IV Therapy ส่งวิตามิน แร่ธาตุ และสารต้านอนุมูลอิสระตรงเข้าสู่กระแสเลือด — ให้ร่างกายดูดซึมได้เร็วและมีประสิทธิภาพกว่าอาหารเสริมแบบรับประทาน",
    "why.instant.title": "เห็นผลทันที",
    "why.instant.desc": "ต่างจากอาหารเสริมแบบรับประทาน IV Therapy ข้ามระบบย่อยอาหารและให้ร่างกายได้รับสิ่งที่ต้องการ ตรงจุดที่ต้องการ อย่างรวดเร็ว",
    "why.physician.title": "แพทย์ดูแลโดยตรง",
    "why.physician.desc": "IV Drip ทุกสูตรที่ Healthi-Life เตรียมโดยผู้เชี่ยวชาญทางการแพทย์ ใช้ส่วนผสมเกรดโรงพยาบาล และให้บริการโดยพยาบาลที่ผ่านการฝึกอบรมภายใต้การดูแลของแพทย์",
    "why.medical.title": "สูตรเกรดการแพทย์",
    "why.medical.desc": "แต่ละอินฟิวชันถูกปรับแต่งด้วยสารอาหารเกรดการแพทย์ที่ตรงกับโปรไฟล์สุขภาพของคุณ เพราะความปลอดภัยไม่ใช่ตัวเลือก — มันคือมาตรฐานของเรา",
    "why.quick.title": "รวดเร็วและสบาย",
    "why.quick.desc": "IV Drip ส่วนใหญ่ใช้เวลา 30-45 นาที ผ่อนคลายในห้องทรีทเมนต์ส่วนตัวขณะที่ร่างกายได้รับการเติมพลัง",
    "why.whyNeed": "ทำไมคุณต้องการมัน",
    "why.whyNeedDesc": "ชาร์จระบบร่างกายและรับการเติมพลังที่คุณไม่รู้ว่าขาดหายไป",
    "why.targeted": "โซลูชัน IV เฉพาะเจาะจง",
    "why.trusted": "ได้รับความไว้วางใจจากแพทย์ เลือกใช้โดยผู้ที่ต้องการประสิทธิภาพสูงสุด",
    "why.brainBooster": "Brain Booster IV",
    "why.brainBoosterDesc": "เพิ่มสมาธิ ขจัดความมึนงง วิตามินเพิ่มประสาทและสารต้านอนุมูลอิสระเพื่อเพิ่มความจำ ความชัดเจน และความเร็วทางปัญญา",
    "why.bodyBooster": "Body Booster IV",
    "why.bodyBoosterDesc": "ฟื้นฟูร่างกายทั้งหมดในหยดเดียว ฟื้นฟูพลังงาน เสริมภูมิคุ้มกัน และสนับสนุนการล้างพิษในระดับเซลล์",
    "why.skinBooster": "Skin Booster IV",
    "why.skinBoosterDesc": "ความเปล่งประกายเริ่มจากภายใน สารต้านอนุมูลอิสระที่รักผิวและคอลลาเจนบูสเตอร์เพื่อผิวเปล่งประกายและดูอ่อนเยาว์",
    "why.luxurious": "ประสบการณ์ IV หรูหราที่สุดในกรุงเทพฯ",

    // Medical Team
    "team.badge": "ทีมแพทย์ระดับโลก",
    "team.title": "พบกับแพทย์ผู้เชี่ยวชาญของคุณ",
    "team.subtitle": "แพทย์ที่ได้รับการรับรองระดับสากลของเราผสมผสานประสบการณ์หลายทศวรรษในด้านเวชศาสตร์ฟื้นฟู ขั้นตอนความงาม และวิทยาศาสตร์อายุยืน เพื่อมอบแผนการรักษาเฉพาะบุคคล",
    "team.education": "การศึกษาและการฝึกอบรม",
    "team.certifications": "ใบรับรองหลัก",
    "team.more": "เพิ่มเติม",
    "team.trustAAM": "แพทย์ที่ได้รับการรับรอง AAAM",
    "team.trustISSCA": "ผู้เชี่ยวชาญสเต็มเซลล์ ISSCA",
    "team.trustIntl": "การฝึกอบรมระดับสากล",
    "team.drPetch.name": "พญ. เพ็ชร (ศรัสวดี สุวรรณจินดา)",
    "team.drPetch.role": "ผู้ก่อตั้งและผู้เชี่ยวชาญด้านเวชศาสตร์ไลฟ์สไตล์ - แพทย์",
    "team.drPetch.specialty": "ผู้เชี่ยวชาญด้านเวชศาสตร์ไลฟ์สไตล์และชะลอวัย",
    "team.drPetch.edu1": "แพทย์ทั่วไป",
    "team.drPetch.edu2": "ฝึกอบรมที่โรงพยาบาลตำรวจ",
    "team.drPetch.edu3": "ฝึกอบรมที่โรงพยาบาลอานันทมหิดล",
    "team.drPetch.cert1": "ใบรับรองเวชศาสตร์ความงาม – AAAM",
    "team.drPetch.cert2": "สมาชิก American Academy of Aesthetic Medicine",
    "team.drPetch.cert3": "ใบรับรอง IV Nutrition Infusion Therapy – CBAM",
    "team.drPetch.cert4": "ใบรับรอง Allogeneic Cellular Therapy – ISSCA",
    "team.drPetch.cert5": "HEAT International Congress on Wellness Management",
    "team.drPetch.cert6": "ใบรับรอง Nutraceutical – การแพทย์แผนไทย",
    "team.drFirst.name": "นพ. เฟิร์ส (นภัส หุ่นสจะรูปัน)",
    "team.drFirst.role": "ผู้ก่อตั้งและแพทย์ผิวหนัง",
    "team.drFirst.specialty": "ผิวหนังวิทยาและเวชศาสตร์ความงาม",
    "team.drFirst.edu1": "วท.ม. ผิวหนังวิทยา – CICM มหาวิทยาลัยธรรมศาสตร์",
    "team.drFirst.edu2": "แพทยศาสตรบัณฑิต – มหาวิทยาลัยธรรมศาสตร์",
    "team.drFirst.edu3": "แพทย์ทั่วไป – กรมแพทย์ทหารบก",
    "team.drFirst.edu4": "OPD ผิวหนัง – โรงพยาบาลเบญจกิติพาร์ค",
    "team.drFirst.cert1": "ใบรับรองเวชศาสตร์ความงาม – AAAM",
    "team.drFirst.cert2": "สมาชิก American Academy of Aesthetic Medicine",
    "team.drFirst.cert3": "Practical Cell Therapy Symposium",
    "team.drFirst.cert4": "American Board of Laser Surgery",
    "team.drFirst.cert5": "Integrative Botulinum Injection – Rassapoom Institute",
    "team.drFirst.cert6": "ใบรับรอง Nutraceutical – การแพทย์แผนไทย",

    // Process
    "process.title": "ขั้นตอนการรับบริการ",
    "process.subtitle": "ตั้งแต่การจองจนถึงการรู้สึกดี — เราทำให้ทุกอย่างราบรื่นและสะดวกสบาย",
    "process.step1.title": "พูดคุยกับเรา",
    "process.step1.desc": "ส่งข้อความหาเราผ่าน WhatsApp เพื่อพูดคุยเกี่ยวกับเป้าหมายสุขภาพและถามคำถาม",
    "process.step2.title": "ปรึกษาแพทย์",
    "process.step2.desc": "ทีมแพทย์ของเราจะแนะนำ IV Drip ที่เหมาะกับความต้องการของคุณ",
    "process.step3.title": "จองนัดหมาย",
    "process.step3.desc": "นัดหมายการเยี่ยมชมคลินิกที่เงียบสงบของเราที่เอกมัย กรุงเทพฯ",
    "process.step4.title": "ผ่อนคลายและเติมพลัง",
    "process.step4.desc": "สนุกกับ IV Drip 30-45 นาทีในห้องทรีทเมนต์ส่วนตัวหรูหรา",
    "process.ready": "พร้อมที่จะรู้สึกดียิ่งขึ้นไหม?",
    "process.callUs": "โทรหาเราเลย",
    "process.quickConsult": "ปรึกษาด่วน",
    "process.bookOnline": "จองออนไลน์",
    "process.scheduleSession": "นัดหมายเซสชันของคุณ",

    // FAQ
    "faq.title": "คำถามที่พบบ่อย",
    "faq.subtitle": "ยังมีคำถาม? ทีมที่ปรึกษาทางการแพทย์ของเราพร้อมช่วยเหลือ",
    "faq.q1": "IV Therapy คืออะไรและทำงานอย่างไร?",
    "faq.a1": "IV Therapy ส่งวิตามิน แร่ธาตุ และสารต้านอนุมูลอิสระตรงเข้าสู่กระแสเลือด — ให้ร่างกายดูดซึมได้เร็วและมีประสิทธิภาพกว่าอาหารเสริมแบบรับประทาน",
    "faq.q2": "เซสชันใช้เวลานานเท่าไหร่?",
    "faq.a2": "IV Drip ส่วนใหญ่ใช้เวลา 30-45 นาที คุณสามารถผ่อนคลาย เล่นโทรศัพท์ หรืองีบหลับขณะที่ร่างกายได้รับการเติมพลัง",
    "faq.q3": "IV Therapy ปลอดภัยไหม?",
    "faq.a3": "ใช่ — IV Drip ทุกสูตรที่ Healthi-Life เตรียมโดยผู้เชี่ยวชาญทางการแพทย์ ใช้ส่วนผสมเกรดโรงพยาบาล และให้บริการโดยพยาบาลที่ผ่านการฝึกอบรมภายใต้การดูแลของแพทย์",
    "faq.q4": "จะรู้สึกผลเร็วแค่ไหน?",
    "faq.a4": "ผู้รับบริการหลายคนรู้สึกมีพลังงานมากขึ้น สมองแจ่มใส และสดชื่นภายในไม่กี่ชั่วโมง สำหรับผิวเปล่งประกายหรือเสริมภูมิคุ้มกัน ผลลัพธ์ที่เห็นได้ชัดมักปรากฏภายใน 24-72 ชั่วโมง",
    "faq.q5": "IV Drip ช่วยลดน้ำหนักได้ไหม?",
    "faq.a5": "ได้! Fat Burner IV Therapy ของเราประกอบด้วย L-Carnitine, B-Complex และสารเร่งการเผาผลาญเพื่อสนับสนุนการลดไขมัน การล้างพิษ และการผลิตพลังงาน",
    "faq.q6": "ควรคาดหวังอะไรในการเข้ารับบริการครั้งแรก?",
    "faq.a6": "คุณจะได้รับการต้อนรับในสภาพแวดล้อมคลินิกที่เงียบสงบและสะอาด ทีมของเราจะพูดคุยเกี่ยวกับเป้าหมายสุขภาพ แนะนำ IV Drip ที่เหมาะสม และคุณจะผ่อนคลายในห้องทรีทเมนต์ส่วนตัวระหว่างการอินฟิวชัน",
    "faq.cantFind": "หาคำตอบไม่เจอ?",
    "faq.teamReady": "ทีมแพทย์ของเราพร้อมตอบคำถามทุกข้อของคุณ",
    "faq.whatsappUs": "WhatsApp เรา",
    "faq.call": "โทร",

    // Testimonials
    "testimonials.badge": "การยอมรับ",
    "testimonials.title": "ความคิดเห็นจากลูกค้า",
    "testimonials.reviews": "รีวิว",
    "testimonials.privateClients": "ลูกค้าส่วนตัว",
    "testimonials.googleRating": "คะแนน Google",
    "testimonials.patientsTreated": "ผู้ป่วยที่รักษา",
    "testimonials.countriesServed": "ประเทศที่ให้บริการ",
    "testimonials.bestClinic": "คลินิกดีที่สุด 2025 เอเชียแปซิฟิก",

    // Contact
    "contact.title": "เยี่ยมชมคลินิกของเรา",
    "contact.subtitle": "ประสบการณ์ IV Therapy หรูหราที่สุดในกรุงเทพฯ ใจกลางสุขุมวิท",
    "contact.location": "ที่ตั้ง",
    "contact.address": "94 ซอยเอกมัย 10 วัฒนา กรุงเทพฯ 10110",
    "contact.bts": "BTS เอกมัย - นั่งมอเตอร์ไซค์ 3 นาที",
    "contact.findUs": "ค้นหาเราบน Google Maps",
    "contact.openingHours": "เวลาทำการ",
    "contact.monSat": "จันทร์ – เสาร์: 11:00 - 19:00 น.",
    "contact.sunday": "อาทิตย์: ปิด",
    "contact.contactUs": "ติดต่อเรา",
    "contact.awardWinning": "สถานที่ได้รับรางวัล",
    "contact.awardDesc": "คลินิกเวชศาสตร์ฟื้นฟูดีที่สุด 2025 – เอเชียแปซิฟิก และ Rising Star ประเทศไทย 2025",
    "contact.feelFast": "รู้สึกผลเร็ว มีพลังยาวนาน",
    "contact.feelFastDesc": "ไม่ต้องรอหลายวันเพื่อรู้สึกดีขึ้น IV อินฟิวชันประสิทธิภาพสูงของเราส่งวิตามิน แร่ธาตุ และสารต้านอนุมูลอิสระตรงเข้าสู่กระแสเลือด — เพื่อพลังงานทันที ความชุ่มชื้นล้ำลึก และการซ่อมแซมเซลล์ที่ยั่งยืน",
    "contact.bookYour": "จอง IV Therapy ของคุณ",

    // Footer
    "footer.desc": "จุดหมายพรีเมียมของกรุงเทพฯ สำหรับ IV Drip แบบเฉพาะบุคคล มากกว่าการให้ความชุ่มชื้น — สารอาหารเฉพาะเพื่อฟื้นฟูพลังงาน เสริมภูมิคุ้มกัน และฟื้นฟู",
    "footer.theHouse": "THE HOUSE",
    "footer.quickLinks": "ลิงก์ด่วน",
    "footer.popularDrips": "IV Drip ยอดนิยม",
    "footer.copyright": "IV Therapy Healthi-Life สงวนลิขสิทธิ์",
    "footer.privacy": "นโยบายความเป็นส่วนตัว",
    "footer.terms": "ข้อกำหนดการให้บริการ",
    "footer.serviceProvider": "บริการโดย Healthi-Life Group",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
