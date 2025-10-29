import fs from 'node:fs';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    await Promise.all([
      fetch('https://plausible.io/api/health'),
      fetch('https://calendly.com'),
    ]);
    if (!fs.existsSync(process.env.LEAD_CSV_PATH || './addons/admin/leads.csv')) {
      throw new Error('Leads CSV manquant');
    }
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
