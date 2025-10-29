# Analytics & événements

## Collecte

- Utiliser Plausible ou Matomo comme recommandé (voir cookie banner).
- Les événements personnalisés sont déclenchés via `addons/js/analytics-events.js` :
  - `cta-demo`, `cta-devis` (clics sur sticky CTA).
  - `lead:submitted` (formulaire envoyé).
  - `analytics:enabled` (consentement obtenu).
  - `roi:calculated`, `roi:exported` (calculateur ROI).
  - `calendar:opened` (interaction Calendly).
  - `scroll:75` (scroll profond).

## Endpoint optionnel

`events-endpoint.js` stocke les événements dans un fichier JSON (`addons/admin/events.log`). Peut être utilisé en complément de Plausible.

## Dashboard

`addons/admin/dashboard.html` consomme l'API locale `/api/stats` (définie dans `analytics-dashboard.js`) pour afficher : sessions, leads, taux de conversion et pages les plus vues.

- Ajouter `data-analytics-endpoint` sur la balise `<body>` des pages où `analytics-events.js` est chargé pour consigner les événements côté serveur.

- L'API dashboard nécessite `node-fetch` (`npm install node-fetch`) et l'API Plausible (site_id + token).
