# Formulaire lead & traitement sécurisé

## Fonctionnement

- Les formulaires HTML (`addons/components/lead-form.html` et versions intégrées) envoient une requête `POST` JSON vers `/api/leads`.
- Le handler Node `lead-handler.js` réceptionne les données, envoie un email via SMTP et stocke la ligne dans `/admin/leads.csv`.
- Les données sont nettoyées côté serveur, aucune dépendance aux fichiers existants.

## Configuration

1. Copier `lead-handler.js` dans votre environnement Node (serverless Netlify/Vercel ou serveur Express).
2. Définir les variables d'environnement :
   - `LEAD_FORM_TOKEN` : valeur partagée avec le champ caché généré par `lead-form.js`.
   - `LEAD_SMTP_HOST`, `LEAD_SMTP_PORT`, `LEAD_SMTP_USER`, `LEAD_SMTP_PASS`.
   - `LEAD_SMTP_TO` : email de réception.
   - `LEAD_CSV_PATH` : chemin sécurisé vers `/admin/leads.csv` (utiliser le dossier fourni dans `addons/admin/`).
3. Déployer l'endpoint sur staging (ex : `/api/leads`).
4. Ajouter une règle de protection (auth basique / IP) pour `/admin/leads.csv`.

## Sauvegarde CSV

- Le fichier est créé automatiquement si absent.
- Format : `date_iso;name;email;phone;surface;goal;message`.
- Les exports PDF générés par le calculateur sont stockés dans `addons/exports/`.

## Sécurité & RGPD

- Les données sont conservées 24 mois maximum (cron `cleanup-leads.js`).
- L'API vérifie un token anti-robot simple transmis via l'attribut `data-token` (voir script JS).

- L'endpoint `/api/roi-export` (voir `roi-export-handler.js`) enregistre les PDF générés par le calculateur dans `addons/exports/`.
