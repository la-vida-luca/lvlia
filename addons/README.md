# Addons Fermes Urbaines

Ce dossier regroupe tous les modules additionnels et réversibles proposés pour améliorer fermesurbaines.com sans toucher au site actuel. Supprimer entièrement le dossier `addons/` permet de revenir à l'état initial.

## Contenu ajouté

- Composants d'accessibilité, de conversion et de preuve sociale dans `addons/components/`.
- Feuilles de style et scripts dédiés (`addons/css/`, `addons/js/`) incluant lazy-loading, focus visibles et bannière cookies.
- Pages d'atterrissage thématiques dans `addons/pages/` avec contenus SEO, FAQ, schémas JSON-LD et formulaires prêts à intégrer.
- Contenus premium (FAQ globale, comparatif, calculateur ROI) dans `addons/content/`.
- Pages légales complètes dans `addons/legal/`.
- Pipeline performance (budget, scripts d'optimisation d'images, rapport Lighthouse) dans `addons/performance/`.
- Infrastructure staging, sécurité (CSP, HSTS, backups) et monitoring dans `addons/staging/`, `addons/security/`, `addons/monitoring/`.
- Formulaire lead et stockage CSV via fonction serveur dans `addons/forms/` et tableau de bord dans `addons/admin/`.
- Scripts d'analytics et de mise à jour de sitemap dans `addons/analytics/` et `addons/scripts/`.

## Activation / Désactivation des modules

Chaque module est indépendant. Pour activer une fonctionnalité, inclure explicitement ses ressources (HTML/CSS/JS) dans la page staging :

> Les pages d'atterrissage utilisent des commentaires `<!--#include ... -->` pour illustrer l'inclusion des composants. Remplacez-les par des includes serveur (SSI, PHP, templating) ou collez directement le markup selon votre stack.


1. **Skip link & focus visibles** :
   - Inclure `<link rel="stylesheet" href="/addons/css/a11y-helpers.css" rel="preload" as="style" onload="this.rel='stylesheet'">` dans le `<head>` (garde `rel="preload"` comme lazy).
   - Insérer en tout début de `<body>` `<?php include 'addons/components/skip-link.html'; ?>` ou l'équivalent statique.

2. **Lazy-loading universel** : charger `addons/js/lazyload-init.js` en `defer` uniquement sur les nouvelles pages. Le script ajoute automatiquement l'attribut `loading="lazy"` aux images/iframes qui n'en possèdent pas.

3. **Composants CRO (preuve sociale, chiffres clés, témoignages, CTA sticky, calendrier, formulaire lead)** : importer le fragment HTML voulu depuis `addons/components/` et le style `addons/css/cro-modules.css`. Le slider de témoignages nécessite également `addons/js/testimonials-slider.js`.

4. **Formulaire lead** : utiliser `addons/components/lead-form.html` (ou la version intégrée des landing pages). Déployer la fonction Node `addons/forms/lead-handler.js` (serverless ou Express) et configurer les variables d'environnement décrites dans `addons/forms/README.md`.

5. **Calculateur ROI** : inclure `addons/components/roi-calculator.html` et `addons/js/roi-calculator.js`. Le script permet l'export PDF via la librairie `jspdf` chargée dynamiquement et envoie le fichier vers l'API `/api/roi-export` (voir `addons/forms/roi-export-handler.js`).

6. **Bannière cookies** : ajouter `addons/components/cookie-banner.html`, `addons/js/cookie-banner.js` et `addons/css/cookie-banner.css`. Le script ne déclenche Plausible/Matomo qu'après consentement.

7. **Analytics & dashboard** : déployer l'API de collecte `addons/analytics/events-endpoint.js`, connecter Plausible ou Matomo selon `addons/analytics/README.md`, puis utiliser `/addons/admin/dashboard.html`. Définir `data-analytics-endpoint` sur `<body>` pour remonter les événements internes.

8. **Sécurité** : appliquer les headers définis dans `addons/security/security-headers.conf` au reverse proxy/Netlify. CSP initialement en mode `report-only`; le rapport est collecté via `addons/security/csp-report-endpoint.js`.

9. **Staging** : utiliser la configuration `addons/staging/README.md` pour créer `staging.fermesurbaines.com` en noindex. Les playbooks de backup et monitoring sont dans `addons/monitoring/`.

Pour désactiver un module, retirer les inclusions correspondantes. Aucun fichier existant n'est modifié.

## Déploiement

1. Déployer les fichiers `addons/` sur l'environnement staging (ex : Netlify, Vercel ou serveur dédié) dans un dossier séparé.
2. Suivre `addons/staging/README.md` pour configurer le sous-domaine `staging.fermesurbaines.com`, activer HTTPS, HSTS et mot de passe si souhaité. Ajouter `noindex, nofollow` dans les meta des pages staging ou via header.
3. Intégrer progressivement les modules sur staging uniquement et valider les critères (Lighthouse, Axe, CNIL, Rich Results, sécurité).
4. Une fois validé, déployer sur production en ajoutant seulement les fichiers nécessaires et en conservant les originaux. Chaque page additionnelle peut être publiée individuellement.

## Restauration

- Pour revenir à l'état initial du dépôt ou de la production, supprimer le dossier `addons/` et retirer toute inclusion/route vers ces fichiers. Aucun fichier existant n'a été modifié.
- Les sauvegardes générées par les scripts (leads CSV, exports PDF, rapports Lighthouse) se trouvent dans `addons/admin/` ou `addons/exports/`. Supprimer ces dossiers remet le système à zéro.

## Checklist (critères d'acceptation)

- [x] Modules uniquement additifs, révocables en supprimant `addons/`.
- [x] Lazy-loading, focus states, skip link, bannière cookies fournis.
- [x] Pages d'atterrissage et contenus premium prêts à publier.
- [x] Formulaire lead avec stockage CSV sécurisé et envoi email.
- [x] Scripts SEO (JSON-LD, sitemap, robots, Open Graph) prêts à être branchés.
- [x] Budgets de performance, rapport Lighthouse modèle et optimiseur d'images.
- [x] Sécurité (HTTPS, HSTS, CSP, SRI) et monitoring documentés.
- [x] Dashboard analytics et événements définis.
- [x] Procédure de déploiement / restauration détaillée.

