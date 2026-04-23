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
    description: 'Browse all pages and services at Healthi-Life IV Therapy Bangkok. IV drips, prices, and more.',
    content: `
      <h1>Sitemap — Healthi-Life IV Therapy Bangkok</h1>
      <nav>
        <ul>
          <li><a href="/">Home — IV Therapy Bangkok</a></li>
          <li><a href="/price-list">Price List</a></li>
          <li><a href="/clinic">Clinic — Ekkamai</a></li>
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
