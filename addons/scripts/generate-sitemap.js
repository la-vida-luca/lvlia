#!/usr/bin/env node

/**
 * LVLIA - Générateur de sitemap.xml automatique
 * Version: 1.0.0
 * Usage: node addons/scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://lvlia.fr';
const ROOT_DIR = path.join(__dirname, '../../');

// Fichiers à exclure du sitemap
const EXCLUDE_PATTERNS = [
  'index (4).html',
  'test-images.html',
  'verify-deployment.html',
  '_drafts',
  'addons/admin',
  'addons/performance/lighthouse',
  'livraison-', // Pages tunnel paiement (noindex)
  'paiement-',
  'success-'
];

// Priorités par type de page
const PRIORITIES = {
  'index.html': 1.0,
  'tarifs.html': 0.9,
  'kit-particuliers.html': 0.9,
  'temoignages.html': 0.9,
  'faq.html': 0.9,
  'pros.html': 0.8,
  'blog.html': 0.8,
  'contact.html': 0.8,
  'blog/': 0.7,
  'default': 0.6
};

// Fréquence de mise à jour
const CHANGEFREQ = {
  'index.html': 'daily',
  'tarifs.html': 'weekly',
  'blog.html': 'weekly',
  'blog/': 'monthly',
  'default': 'monthly'
};

/**
 * Récupère tous les fichiers HTML récursivement
 */
function getHTMLFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Ignorer certains dossiers
      if (!EXCLUDE_PATTERNS.some(pattern => filePath.includes(pattern))) {
        getHTMLFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      // Vérifier si le fichier doit être exclu
      const shouldExclude = EXCLUDE_PATTERNS.some(pattern => 
        filePath.includes(pattern) || file.includes(pattern)
      );
      
      if (!shouldExclude) {
        fileList.push(path.relative(ROOT_DIR, filePath));
      }
    }
  });
  
  return fileList;
}

/**
 * Détermine la priorité d'une URL
 */
function getPriority(file) {
  for (const [pattern, priority] of Object.entries(PRIORITIES)) {
    if (file === pattern || file.includes(pattern)) {
      return priority;
    }
  }
  return PRIORITIES.default;
}

/**
 * Détermine la fréquence de changement
 */
function getChangeFreq(file) {
  for (const [pattern, freq] of Object.entries(CHANGEFREQ)) {
    if (file === pattern || file.includes(pattern)) {
      return freq;
    }
  }
  return CHANGEFREQ.default;
}

/**
 * Obtient la date de dernière modification du fichier
 */
function getLastMod(file) {
  try {
    const stats = fs.statSync(path.join(ROOT_DIR, file));
    return stats.mtime.toISOString().split('T')[0];
  } catch (error) {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Génère le sitemap XML
 */
function generateSitemap() {
  console.log('🔍 Recherche des fichiers HTML...');
  const files = getHTMLFiles(ROOT_DIR);
  console.log(`✅ ${files.length} fichiers HTML trouvés`);
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Trier les fichiers par priorité décroissante
  files.sort((a, b) => getPriority(b) - getPriority(a));
  
  files.forEach(file => {
    // Construire l'URL
    let url = DOMAIN;
    if (file === 'index.html') {
      url += '/';
    } else {
      url += '/' + file.replace(/\\/g, '/'); // Remplacer \ par / pour Windows
    }
    
    const priority = getPriority(file);
    const changefreq = getChangeFreq(file);
    const lastmod = getLastMod(file);
    
    sitemap += '  <url>\n';
    sitemap += `    <loc>${url}</loc>\n`;
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
    sitemap += `    <changefreq>${changefreq}</changefreq>\n`;
    sitemap += `    <priority>${priority.toFixed(1)}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  // Écrire le sitemap
  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  
  console.log(`✅ Sitemap généré avec ${files.length} URLs`);
  console.log(`📁 Fichier : ${sitemapPath}`);
  console.log('\n📋 Top 10 des URLs par priorité :');
  
  files.slice(0, 10).forEach(file => {
    const priority = getPriority(file);
    const url = file === 'index.html' ? '/' : '/' + file;
    console.log(`  [${priority.toFixed(1)}] ${url}`);
  });
  
  // Générer un rapport
  const report = {
    generated_at: new Date().toISOString(),
    total_urls: files.length,
    domain: DOMAIN,
    urls_by_priority: {
      '1.0': files.filter(f => getPriority(f) === 1.0).length,
      '0.9': files.filter(f => getPriority(f) === 0.9).length,
      '0.8': files.filter(f => getPriority(f) === 0.8).length,
      '0.7': files.filter(f => getPriority(f) === 0.7).length,
      '0.6': files.filter(f => getPriority(f) === 0.6).length
    }
  };
  
  const reportPath = path.join(__dirname, 'sitemap-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n📊 Rapport : ${reportPath}`);
  
  return files.length;
}

// Exécution
try {
  const totalUrls = generateSitemap();
  console.log('\n✅ Sitemap généré avec succès !');
  console.log('🔗 Prochaine étape : soumettre à Google Search Console');
  process.exit(0);
} catch (error) {
  console.error('❌ Erreur lors de la génération du sitemap:', error);
  process.exit(1);
}
