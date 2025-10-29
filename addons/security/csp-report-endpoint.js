export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }
  console.log('CSP Report', req.body);
  res.status(204).end();
}
