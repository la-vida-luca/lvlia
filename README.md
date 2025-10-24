# LVLIA — Site vitrine (static)

Site statique mult-pages pour **LVLIA** (solutions hydroponiques).

## Stack
- HTML5, CSS3 (responsive), JS vanilla
- Netlify Forms (contact)
- Calendly (appel gratuit 30 min)
- Chart.js (graphique – page Restaurants)

## Arborescence
```
/site
  index.html
  cafes.html
  restaurants.html
  boulangers.html
  hotels.html
  bouchers.html
  epiceries.html
  collectivites.html
  contact.html
  sitemap.xml
  robots.txt
  netlify.toml
  assets/
    style.css
    main.js
    og-banner.png
```
## Développement local
Ouvrez `index.html` dans un navigateur ou servez le dossier :
```bash
npx serve .
```

## Déploiement
1. **GitHub**
   ```bash
   git init
   git branch -M main
   git remote add origin git@github.com:VOTRE_COMPTE/lvlia-site.git
   git add .
   git commit -m "Initial commit: LVLIA site"
   git push -u origin main
   ```
2. **Netlify**
   - Créez un nouveau site depuis un dépôt, choisissez `lvlia-site`.
   - Réglages:
     - Build command: *(vide)*
     - Publish directory: `.`
   - Activez **Netlify Forms** (déjà prêt grâce à `form name="contact" method="POST" netlify"`).
   - HTTPS est activé automatiquement via Let’s Encrypt.
3. **Variables Calendly**
   - Rien à configurer : le widget est intégré sur toutes les pages (section “Prendre rendez‑vous”).

## SEO
- Meta description et Open Graph inclus.
- `sitemap.xml` et `robots.txt` fournis (remplacez `lvlia.example` par votre domaine).

## Personnalisation
- Couleurs (palette LVLIA) et polices (Google Fonts Poppins & Open Sans).
- Remplacez les images Unsplash si besoin.