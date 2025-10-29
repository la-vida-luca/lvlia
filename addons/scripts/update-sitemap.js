#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const sitemapPath = path.resolve('./sitemap.xml');
const newUrls = [
  '/micro-serre-connectee/',
  '/hydroponie-domestique/',
  '/serre-connectee-caen/',
  '/autonomie-alimentaire/',
  '/professionnels/',
  '/mentions-legales/',
  '/politique-confidentialite/',
  '/conditions-generales-utilisation/'
];

if (!fs.existsSync(sitemapPath)) {
  const urlset = newUrls.map((url) => `<url><loc>https://fermesurbaines.com${url}</loc></url>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}</urlset>`;
  fs.writeFileSync('./addons/sitemap.xml', xml);
  process.exit(0);
}

const xml = fs.readFileSync(sitemapPath, 'utf8');
const dom = new JSDOM();
const parser = new dom.window.DOMParser();
const doc = parser.parseFromString(xml, 'text/xml');
const existingLocs = Array.from(doc.querySelectorAll('url > loc')).map((node) => node.textContent);

const urlset = doc.querySelector('urlset');
newUrls.forEach((url) => {
  const loc = `https://fermesurbaines.com${url}`;
  if (!existingLocs.includes(loc)) {
    const urlNode = doc.createElement('url');
    const locNode = doc.createElement('loc');
    locNode.textContent = loc;
    urlNode.appendChild(locNode);
    urlset.appendChild(urlNode);
  }
});

fs.writeFileSync('./addons/sitemap.xml', new dom.window.XMLSerializer().serializeToString(doc));
