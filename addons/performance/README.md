# Performance & Web Vitals

- `lazyload-init.js` ajoute automatiquement l'attribut `loading="lazy"` aux nouvelles images/iframes.
- `image-optimizer.js` génère des versions WebP/AVIF sans remplacer les originaux.
- `budget.json` définit le budget de performance cible pour les audits.
- `lighthouse-mobile.html` et `lighthouse-desktop.html` (voir ci-dessous) servent de modèle de rapport.

## Générer les rapports Lighthouse

```bash
npm install -g lighthouse
lighthouse https://staging.fermesurbaines.com --preset=desktop --output-path=addons/performance/lighthouse-desktop.html
lighthouse https://staging.fermesurbaines.com --preset=mobile --output-path=addons/performance/lighthouse-mobile.html
```

Vérifier que :
- LCP ≤ 2,5 s
- CLS ≤ 0,1
- INP ≤ 200 ms

## Preload des ressources

Ajouter dans le `<head>` des nouvelles pages :

```html
<link rel="preload" href="/addons/css/cro-modules.css" as="style">
<link rel="preload" href="/addons/css/roi-calculator.css" as="style">
<link rel="preload" href="/addons/js/testimonials-slider.js" as="script">
```

Utiliser l'attribut `data-preload-on-interaction` avec `lazyload-init.js` pour différer si besoin.
