# Monitoring & sauvegardes

## Backups

- Script `backup.sh` : archive `addons/`, `/admin/leads.csv`, base de données éventuelle.
- Planification : cron quotidien + rotation sur 7 jours.

## Monitoring uptime

- Utiliser UptimeRobot ou Healthchecks.io avec ping `https://staging.fermesurbaines.com/health` toutes les 5 minutes.
- Script `healthcheck.js` à déployer pour vérifier les dépendances (API leads, Plausible, CSV).

## Journalisation

- `access.log` : stocker les accès aux pages admin.
- `events.log` : alimenté par l'endpoint analytics.

- `healthcheck.js` nécessite `node-fetch` (`npm install node-fetch`).
