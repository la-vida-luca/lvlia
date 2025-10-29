# Sécurité & fiabilité

- Appliquer les en-têtes définis dans `security-headers.conf` (mode `Content-Security-Policy-Report-Only` lors des premiers tests).
- Déployer `csp-report-endpoint.js` sur `/api/csp-report` pour collecter les rapports.
- Activer HTTPS + HSTS via votre reverse proxy (Let's Encrypt ou Netlify/TLS géré).
- Ajouter SRI lors de l'inclusion de scripts tiers (ex : jsPDF) en utilisant `npm exec sri <url>`.
- Consigner les accès admin via logs (`addons/monitoring/access.log`).
- Mettre en place les backups décrits ci-dessous.
