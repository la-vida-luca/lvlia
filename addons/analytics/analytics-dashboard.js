import fetch from 'node-fetch';
import fs from 'node:fs';

const PLAUSIBLE_API = 'https://plausible.io/api/v1';

export async function statsHandler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }
  const siteId = process.env.PLAUSIBLE_SITE_ID;
  const headers = {
    'Authorization': `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
    'Content-Type': 'application/json'
  };

  const [visitors, topPages] = await Promise.all([
    fetch(`${PLAUSIBLE_API}/stats/breakdown?site_id=${siteId}&period=7d&property=event:page`, { headers }),
    fetch(`${PLAUSIBLE_API}/stats/breakdown?site_id=${siteId}&period=7d&property=event:page&limit=5`, { headers })
  ]).then((responses) => Promise.all(responses.map((r) => r.json())));

  const visitorResults = Array.isArray(visitors?.results) ? visitors.results : [];
  const topPagesResults = Array.isArray(topPages?.results) ? topPages.results : [];
  const sessions7d = visitorResults.reduce((acc, item) => acc + item.visitors, 0);
  const topPagesFormatted = topPagesResults.map((item) => ({ path: item.page, sessions: item.visitors }));

  const leads = await loadLeads();
  const leads7d = leads.filter((lead) => Date.now() - new Date(lead.date_iso).getTime() <= 7 * 24 * 60 * 60 * 1000).length;
  const conversion = sessions7d ? ((leads7d / sessions7d) * 100).toFixed(1) : '0.0';

  res.status(200).json({ sessions7d, leads7d, conversion, topPages: topPagesFormatted });
}

async function loadLeads() {
  const path = process.env.LEAD_CSV_PATH || './addons/admin/leads.csv';
  if (!fs.existsSync(path)) return [];
  const [, ...rows] = fs.readFileSync(path, 'utf8').trim().split('\n');
  return rows.filter(Boolean).map((row) => {
    const [date_iso, name, email, phone, surface, goal, message] = row.split(';');
    return { date_iso, name, email, phone, surface, goal, message };
  });
}

export async function eventsHandler(req, res) {
  const limit = Number(req.query.limit || 20);
  const logPath = process.env.ANALYTICS_LOG_PATH || './addons/admin/events.log';
  if (!fs.existsSync(logPath)) {
    res.status(200).json([]);
    return;
  }
  const lines = fs.readFileSync(logPath, 'utf8').trim().split('\n').filter(Boolean);
  const events = lines.slice(-limit).map((line) => {
    try {
      return JSON.parse(line);
    } catch (e) {
      return null;
    }
  }).filter(Boolean);
  res.status(200).json(events.reverse());
}
