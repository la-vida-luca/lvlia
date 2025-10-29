import { appendFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import nodemailer from 'nodemailer';

const requiredFields = ['name', 'email'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const sanitized = Object.entries(body || {}).reduce((acc, [key, value]) => {
    acc[key] = String(value || '').trim();
    return acc;
  }, {});

  if (!requiredFields.every((field) => sanitized[field])) {
    res.status(400).json({ error: 'Champs obligatoires manquants' });
    return;
  }

  if (sanitized.token && sanitized.token !== process.env.LEAD_FORM_TOKEN) {
    res.status(403).json({ error: 'Token invalide' });
    return;
  }

  const csvDir = path.dirname(process.env.LEAD_CSV_PATH || './addons/admin/leads.csv');
  if (!existsSync(csvDir)) {
    mkdirSync(csvDir, { recursive: true });
  }

  const csvPath = process.env.LEAD_CSV_PATH || './addons/admin/leads.csv';
  const row = [
    new Date().toISOString(),
    sanitized.name,
    sanitized.email,
    sanitized.phone || '',
    sanitized.surface || '',
    sanitized.goal || '',
    sanitized.message || ''
  ].map((value) => value.replace(/[\n\r;]/g, ' ')).join(';') + '\n';

  if (!existsSync(csvPath)) {
    appendFileSync(csvPath, 'date_iso;name;email;phone;surface;goal;message\n');
  }
  appendFileSync(csvPath, row);

  if (process.env.LEAD_SMTP_HOST) {
    const transporter = nodemailer.createTransport({
      host: process.env.LEAD_SMTP_HOST,
      port: Number(process.env.LEAD_SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.LEAD_SMTP_USER,
        pass: process.env.LEAD_SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `Fermes Urbaines <${process.env.LEAD_SMTP_USER}>`,
      to: process.env.LEAD_SMTP_TO,
      subject: 'Nouveau lead micro-serre',
      text: `Nom: ${sanitized.name}\nEmail: ${sanitized.email}\nTéléphone: ${sanitized.phone}\nSurface: ${sanitized.surface}\nObjectif: ${sanitized.goal}\nMessage: ${sanitized.message}`
    });
  }

  res.status(200).json({ success: true });
}
