import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  if (!body || !body.pdf || !body.fileName) {
    res.status(400).json({ error: 'Payload invalide' });
    return;
  }
  const dir = process.env.ROI_EXPORT_DIR || './addons/exports';
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  const buffer = Buffer.from(body.pdf, 'base64');
  const safeName = body.fileName.replace(/[^a-z0-9\-\.]/gi, '_');
  const output = path.join(dir, safeName);
  writeFileSync(output, buffer);
  res.status(200).json({ success: true, path: output });
}
