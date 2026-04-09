/**
 * Post-build prerender script
 * Generates static HTML files for each route so crawlers see full content without JS.
 * Run after `vite build`: node scripts/prerender.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const BASE_URL = 'https://ivtherapyhealthilife.com';

// Read the built index.html as template
const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

/**
 * Route definitions with SEO metadata and static content
 * Each route gets its own index.html with unique meta tags + noscript content
 */
const routes = [
  {
    path: '/peptides-therapy',
    title: 'Peptide Therapy Bangkok | Healthi-Life – GLP-1, BPC-157, NAD+',
    description: 'Doctor-supervised peptide therapy in Bangkok. GLP-1, BPC-157, Retatrutide, CJC-1295 & 18+ peptides. Award-winning clinic at Ekkamai. Book now.',
    content: `
      <h1>Peptide Therapy Bangkok — Healthi-Life Longevity Center</h1>
      <p>Doctor-supervised peptide therapy programs starting from 40,000 THB. 18+ medical peptides prescribed by Dr. First (MD).</p>
      <h2>Available Peptides</h2>
      <p>GLP-1 (Semaglutide, Tirzepatide) · BPC-157 · Retatrutide · CJC-1295 + Ipamorelin · TB-500 · Epithalon · SS-31 · Selank · Semax · PT-141 · Kisspeptin · MOTS-c · GHK-Cu · SLU-PP-332 · Tesofensine.</p>
      <h2>Protocols</h2>
      <p>Cellular Longevity Protocol (6–12 months, from ฿40,000) · Recovery & Regeneration (3–6 months) · Metabolic Reset & Weight Optimization (6–12 months) · Lean Muscle & Performance (6–12 months).</p>
      <h2>Medical Team</h2>
      <p>Dr. First (Napat Hunsajarupan) — Dermatologist & CMO, prescription authority for all peptide protocols.</p>
      <p>Dr. Petch (Sarassawadee Suwanjinda) — Lifestyle Medicine & Longevity Specialist.</p>
      <p>Contact: +66 91 999 1744 (WhatsApp) · Mon-Sat 11AM-7PM · 94 Ekkamai 10, Bangkok.</p>
    `
  },
  {
    path: '/BPC-157',
    title: 'BPC-157 Peptide Bangkok | Tissue Repair & Gut Healing – Healthi-Life',
    description: 'BPC-157 peptide therapy in Bangkok. Physician-prescribed for tendon repair, gut healing, and recovery. Injection & oral routes. Book consultation.',
    content: `
      <h1>BPC-157 Peptide Therapy — Healthi-Life Bangkok</h1>
      <p>BPC-157 (Body Protective Compound-157) is a synthetic 15-amino-acid peptide derived from human gastric juice, studied for regenerative properties across musculoskeletal, gut, and neurological systems.</p>
      <h2>Key Indications</h2>
      <p>Tendon & ligament repair · Gut healing (leaky gut, IBS) · Post-surgical recovery · Chronic inflammation · Joint pain.</p>
      <h2>Administration</h2>
      <p>Routes: Subcutaneous injection or oral capsules. Standard cycle: 4–8 weeks. Certified supply: Genoracle (HACCP, GHPs, ISO 9001).</p>
      <h2>Prescription</h2>
      <p>Prescribed by Dr. First (MD). Full medical consultation required before starting.</p>
      <p>Contact: +66 91 999 1744 (WhatsApp) · Healthi-Life, 94 Ekkamai 10, Bangkok.</p>
    `
  },
  {
    path: '/GLP-1',
    title: 'GLP-1 Therapy Bangkok | Weight Loss & Longevity – Healthi-Life',
    description: 'GLP-1 receptor agonist therapy in Bangkok. Semaglutide & Tirzepatide for weight management. 15% avg weight reduction. Physician-supervised.',
    content: `
      <h1>GLP-1 Therapy — Healthi-Life Bangkok</h1>
      <p>GLP-1 receptor agonists (semaglutide, tirzepatide) for metabolic reset and longevity optimization. 15% average body weight reduction in clinical trials.</p>
      <h2>Clinical Evidence</h2>
      <p>20% reduction in major cardiovascular events (SELECT trial). Dual positioning: weight management AND cardiovascular/neurological/anti-aging benefits.</p>
      <h2>Molecules Available</h2>
      <p>Semaglutide · Tirzepatide — physician-selected based on metabolic workup.</p>
      <h2>Protocol</h2>
      <p>Duration: 6–18 months (weight), 3–6 months (longevity). Mandatory muscle preservation: InBody tracking, protein prescription, resistance training.</p>
      <p>Prescribed by Dr. First (MD). Contact: +66 91 999 1744 · Healthi-Life, Ekkamai, Bangkok.</p>
    `
  },
  {
    path: '/Semaglutide',
    title: 'Semaglutide Bangkok | Weight Management & Metabolic Reset – Healthi-Life',
    description: 'Semaglutide (GLP-1) therapy in Bangkok. Once-weekly injection. STEP trial data: 14.9% weight loss. Physician-supervised protocol.',
    content: `
      <h1>Semaglutide Therapy — Healthi-Life Bangkok</h1>
      <p>Semaglutide is a GLP-1 receptor agonist with 94% amino acid homology to native human GLP-1. Half-life ~7 days, once-weekly subcutaneous injection.</p>
      <h2>Clinical Data</h2>
      <p>STEP 1: 14.9% weight reduction. SELECT trial: 20% MACE reduction in non-diabetic overweight adults. 40+ Phase III RCTs.</p>
      <h2>4 Mechanisms of Action</h2>
      <p>Appetite neurochemistry correction · Insulin sensitivity · Gastric emptying modulation · Visceral fat mobilization.</p>
      <h2>Dosing Protocol</h2>
      <p>Starting: 0.25 mg/week. Maintenance: 1.0–2.4 mg/week. 4-week titration increments. InBody tracking for muscle preservation.</p>
      <p>Prescribed by Dr. First (MD). Contact: +66 91 999 1744 · Healthi-Life, Ekkamai, Bangkok.</p>
    `
  },
  {
    path: '/Retatrutide',
    title: 'Retatrutide Bangkok | Triple Agonist Weight Loss – Healthi-Life',
    description: 'Retatrutide triple agonist therapy in Bangkok. GLP-1/GIP/Glucagon. Phase II: 24.2% weight reduction. Physician-supervised, informed consent required.',
    content: `
      <h1>Retatrutide — Triple Agonist Metabolic Therapy — Healthi-Life Bangkok</h1>
      <p>Retatrutide is the first triple receptor agonist targeting GLP-1, GIP, and glucagon simultaneously. Phase II trial (NEJM, June 2023): up to 24.2% body weight reduction at 48 weeks.</p>
      <h2>Important Notice</h2>
      <p>Phase III clinical trials ongoing. NOT yet FDA/EMA approved. Available under physician prescription with full informed consent.</p>
      <h2>Phase II Results by Dose</h2>
      <p>1mg: 8.7% · 4mg: 17.5% · 8mg: 22.8% · 12mg: 24.2% body weight reduction.</p>
      <h2>Who It's For</h2>
      <p>GLP-1 non-responders · High-burden metabolic patients · Informed frontier patients seeking next-generation protocols.</p>
      <p>Prescribed by Dr. First (MD). Contact: +66 91 999 1744 · Healthi-Life, Ekkamai, Bangkok.</p>
    `
  },
  {
    path: '/CJC-1295-Ipamorelin',
    title: 'CJC-1295 + Ipamorelin Bangkok | Growth Hormone Restoration – Healthi-Life',
    description: 'CJC-1295 & Ipamorelin growth hormone therapy in Bangkok. Restore natural GH pulse. Anti-aging, sleep, recovery. Physician-supervised.',
    content: `
      <h1>CJC-1295 + Ipamorelin — Growth Hormone Restoration — Healthi-Life Bangkok</h1>
      <p>CJC-1295 (GHRH analogue, half-life 6–8 days) and Ipamorelin (selective GHRP) restore the natural GH pulse pattern lost with age.</p>
      <h2>Key Benefits</h2>
      <p>2x GH pulse amplitude restoration · Simultaneous GH + IGF-1 elevation · Improved sleep architecture · Body composition optimization · Recovery acceleration.</p>
      <h2>Why Not Direct HGH?</h2>
      <p>Secretagogues restore natural pulsatility without suppressing endogenous GH production — safer long-term approach.</p>
      <h2>Protocol</h2>
      <p>SC injection, 2–3x/week. Optimal timing: before sleep. Cycle: 3–12 months. Physician-monitored with regular bloodwork.</p>
      <p>Prescribed by Dr. First (MD). Contact: +66 91 999 1744 · Healthi-Life, Ekkamai, Bangkok.</p>
    `
  },
  {
    path: '/price-list',
    title: 'IV Therapy Prices Bangkok | Healthi-Life – Full Price List',
    description: 'Complete IV therapy price list. NAD+ from 6,000 THB, Fat Burner 4,050 THB, Glow Revive 15,000 THB. Packages save up to 33%.',
    content: `
      <h1>Healthi-Life IV Therapy Price List — Bangkok</h1>
      <h2>Popular IV Drips</h2>
      <p>NAD+ IV 100mg ฿6,000 · NAD+ IV 250mg ฿8,500 · Fat Burner IV ฿4,050 · Curcumin IV ฿8,500 · Resveratrol IV ฿8,500 · Full Body Detox IV ฿8,500 · Hangover IV ฿4,050 · Glow Revive IV ฿15,000.</p>
      <h2>Body Booster IV</h2>
      <p>Vital Boost ฿4,050 · Athlete Pro ฿4,050 · Athlete Pro Max ฿8,500 · Vitamin D IM ฿4,050 · Liver Detox ฿4,050 · ProGut ฿8,500 · C Max ฿4,050 · Party Shield ฿4,050.</p>
      <h2>Brain &amp; Skin Booster IV</h2>
      <p>Time Zone ฿4,050 · Stress Ease ฿4,050 · Neuro Boost ฿4,050 · Dream Ease ฿4,050 · Glow Vita ฿4,050 · Glow Restore ฿8,500 · Glow Revive ฿15,000.</p>
      <h2>Wellness Packages</h2>
      <p>Fat Burner 5x ฿18,000 (save 20%) · Fat Burner 10x + Nutrition ฿31,500 (save 30%) · NAD+ 100mg 5x ฿27,500 · NAD+ 100mg 10x ฿54,000 · NAD+ 250mg 5x ฿41,500 · NAD+ 250mg 10x ฿80,000.</p>
      <p>Contact: +66 91 999 1744 (WhatsApp) · Mon-Sat 11AM-7PM · 94 Ekkamai 10, Bangkok.</p>
    `
  },
  {
    path: '/sitemap',
    title: 'Sitemap | Healthi-Life IV Therapy Bangkok',
    description: 'Browse all pages and services at Healthi-Life IV Therapy Bangkok. IV drips, peptide therapy, prices, and more.',
    content: `
      <h1>Sitemap — Healthi-Life IV Therapy Bangkok</h1>
      <nav>
        <ul>
          <li><a href="/">Home — IV Therapy Bangkok</a></li>
          <li><a href="/peptides-therapy">Peptide Therapy Programs</a></li>
          <li><a href="/BPC-157">BPC-157 Peptide Therapy</a></li>
          <li><a href="/GLP-1">GLP-1 Therapy</a></li>
          <li><a href="/Semaglutide">Semaglutide Therapy</a></li>
          <li><a href="/Retatrutide">Retatrutide Therapy</a></li>
          <li><a href="/CJC-1295-Ipamorelin">CJC-1295 + Ipamorelin</a></li>
          <li><a href="/price-list">Price List</a></li>
        </ul>
      </nav>
    `
  }
];

// Generate static HTML for each route
let generated = 0;
for (const route of routes) {
  const dir = join(DIST, route.path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${route.description}">`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${BASE_URL}${route.path}" />`
  );

  // Replace OG URL
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${BASE_URL}${route.path}" />`
  );

  // Replace OG title
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${route.title}">`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${route.title}">`
  );

  // Replace OG description
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${route.description}">`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${route.description}">`
  );

  // Inject prerendered content directly into <div id="root"> for crawlers
  // React will hydrate over this content on load
  const prerenderedContent = `<div style="max-width:960px;margin:0 auto;padding:2rem;font-family:system-ui,sans-serif">${route.content}</div>`;

  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${prerenderedContent}</div>`
  );

  // Also keep noscript as fallback
  html = html.replace(
    /<!-- Static content for crawlers[\s\S]*?<\/noscript>/,
    `<!-- Prerendered route: ${route.path} -->`
  );

  writeFileSync(join(dir, 'index.html'), html, 'utf-8');
  generated++;
  console.log(`✅ ${route.path}/index.html`);
}

console.log(`\n🎉 Prerendered ${generated} routes to ${DIST}`);
