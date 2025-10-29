import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const csvPath = process.env.LEAD_CSV_PATH || './addons/admin/leads.csv';
const retentionDays = Number(process.env.LEAD_RETENTION_DAYS || 730);

if (!existsSync(csvPath)) {
  console.log('Aucun fichier leads à nettoyer.');
  process.exit(0);
}

const [header, ...rows] = readFileSync(csvPath, 'utf8').trim().split('\n');
const now = Date.now();
const filtered = rows.filter((row) => {
  const [dateIso] = row.split(';');
  const ageDays = (now - new Date(dateIso).getTime()) / (1000 * 60 * 60 * 24);
  return ageDays <= retentionDays;
});

writeFileSync(csvPath, [header, ...filtered].join('\n') + '\n');
console.log(`Nettoyage terminé. ${rows.length - filtered.length} lignes supprimées.`);
