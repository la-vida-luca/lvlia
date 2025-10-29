import { appendFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const EVENTS_PATH = process.env.ANALYTICS_LOG_PATH || './addons/admin/events.log';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const entry = {
    ...body,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    userAgent: req.headers['user-agent'],
    date: new Date().toISOString()
  };

  const dir = path.dirname(EVENTS_PATH);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  appendFileSync(EVENTS_PATH, JSON.stringify(entry) + '\n');
  res.status(200).json({ success: true });
}
