// scripts/inline-css.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ dist/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

// Find the hashed CSS file in dist/assets/
const assetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.log('⚠️ No assets folder found.');
  process.exit(0);
}

const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));
if (cssFiles.length === 0) {
  console.log('⚠️ No CSS file found.');
  process.exit(0);
}

// Use the first CSS file
const cssFile = cssFiles[0];
const cssPath = `/assets/${cssFile}`;

// Read index.html
let html = fs.readFileSync(indexPath, 'utf-8');

// Find the Vite-injected CSS link
const oldLinkRegex = /<link rel="stylesheet" href="\/assets\/[^"]+\.css"[^>]*>/;

if (!oldLinkRegex.test(html)) {
  console.warn('⚠️ Could not find the main CSS link.');
  process.exit(0);
}

// Replace with async version
const newLink = `
  <!-- Preload the CSS file -->
  <link rel="preload" as="style" href="${cssPath}" />
  <!-- Load it asynchronously (non‑blocking) -->
  <link rel="stylesheet" href="${cssPath}" media="print" onload="this.media='all'" />
  <noscript><link rel="stylesheet" href="${cssPath}" /></noscript>
`;

html = html.replace(oldLinkRegex, newLink);

// Also defer any VitePWA-injected manifest link (it strips deferral attrs)
const manifestRegex = /<link rel="manifest" href="\/manifest\.webmanifest">/g;
if (manifestRegex.test(html)) {
  html = html.replace(
    manifestRegex,
    `<link rel="manifest" href="/manifest.webmanifest" media="print" onload="this.media='all'" />`
  );
  console.log('✅ Deferred manifest.webmanifest');
}

// Also defer any swiper CSS injected separately (if present)
html = html.replace(/<link rel="stylesheet"[^>]*href="([^"]*swiper-react[^"]*)"[^>]*>/g, (match, href) => {
  return `\n  <link rel="preload" as="style" href="${href}" />\n  <link rel="stylesheet" href="${href}" media="print" onload="this.media='all'" />\n  <noscript><link rel="stylesheet" href="${href}" /></noscript>\n`;
});


fs.writeFileSync(indexPath, html);
console.log(`✅ Optimised CSS loading for ${cssPath}`);