// scripts/generate-sitemap.js
import { projects } from '../src/data/projects.js';
import { news } from '../src/data/news.js';
import { writeFileSync } from 'fs';

const baseUrl = 'https://theprimecasa.in';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/properties', changefreq: 'daily', priority: '0.9' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
  { loc: '/services', changefreq: 'monthly', priority: '0.7' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.7' },
  { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
];

const projectUrls = projects.map(p => ({
  loc: `/project/${p.id}`,
  changefreq: 'weekly',
  priority: '0.8',
}));

const blogUrls = news.map(n => ({
  loc: `/blog/${n.slug}`,
  changefreq: 'monthly',
  priority: '0.6',
}));

const allUrls = [...staticPages, ...projectUrls, ...blogUrls];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync('./public/sitemap.xml', sitemap);
console.log(' Sitemap generated.');