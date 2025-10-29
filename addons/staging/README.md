# Staging fermesurbaines.com

## Objectif

- Déployer tous les fichiers `addons/` sur `staging.fermesurbaines.com`.
- Activer l'authentification basique et `noindex`.

## Étapes

1. Créer un sous-domaine `staging.fermesurbaines.com` pointant vers l'environnement choisi.
2. Installer les dépendances : Node 18+, npm, sharp (pour l'optimiseur).
3. Copier `netlify.toml` ou config équivalente et ajouter :
   - Header `X-Robots-Tag: noindex, nofollow`.
   - Redirection `/api/leads` → fonction `lead-handler.js`.
4. Activer HTTPS (Let's Encrypt) et HSTS (voir `addons/security/security-headers.conf`).
5. Installer Plausible self-hosté ou Matomo sur sous-domaine séparé.
6. Lancer les tests :
   - Lighthouse mobile & desktop.
   - Axe DevTools (0 erreurs critiques sur les nouveaux composants).
   - Test Rich Results via `https://search.google.com/test/rich-results` pour les JSON-LD générés.

## Feature flags

- Utiliser `?addons=1` ou cookies pour charger dynamiquement les nouveaux modules via un script d'inclusion conditionnelle.
- Exemple : inclure `addons/js/feature-flags.js` (voir ci-dessous) et charger les composants seulement si l'URL contient `addons=1`.
