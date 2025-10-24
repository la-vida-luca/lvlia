# 🚀 Guide de Déploiement LVLIA

## 🎯 Démarrage Rapide (5 minutes)

**Pour les débutants** - Voici les étapes essentielles pour mettre votre site en ligne :

1. **Aller sur Netlify** : [netlify.com](https://www.netlify.com) → "Sign up with GitHub"
2. **Importer le projet** : "Add new site" → "Import an existing project" → choisir ce dépôt
3. **Configuration** : Laissez tout vide sauf "Publish directory" = `.` (un point)
4. **Déployer** : Cliquez sur "Deploy site" → Votre site sera en ligne en 30 secondes !
5. **⚠️ À PERSONNALISER APRÈS** : email de contact et lien Calendly (voir ci-dessous)

---

## ✅ État Actuel

Votre site est maintenant **prêt à être déployé** ! Tous les fichiers ont été extraits et organisés correctement dans le dépôt GitHub.

## 📁 Structure du Site

```
lvlia/
├── index.html           # Page d'accueil
├── cafes.html          # Page Cafés & Salons de thé
├── restaurants.html    # Page Restaurants & Traiteurs
├── boulangers.html     # Page Boulangers & Pâtissiers
├── hotels.html         # Page Hôtels & Spas
├── bouchers.html       # Page Bouchers & Charcutiers
├── epiceries.html      # Page Épiceries fines & Bio
├── collectivites.html  # Page Collectivités
├── contact.html        # Page de contact avec formulaire Netlify
├── assets/
│   ├── style.css       # Styles du site
│   ├── main.js         # JavaScript
│   └── og-banner.png   # Image pour réseaux sociaux
├── netlify.toml        # Configuration Netlify
├── sitemap.xml         # Plan du site pour SEO
└── robots.txt          # Fichier pour moteurs de recherche
```

## 🌐 Déploiement sur Netlify (RECOMMANDÉ)

Netlify est parfait pour les débutants et **100% GRATUIT** pour votre site !

### Option 1 : Déploiement depuis GitHub (Le plus facile !)

1. **Allez sur [netlify.com](https://www.netlify.com)**
   - Cliquez sur "Sign up" (Inscription)
   - Choisissez "Sign up with GitHub"

2. **Créez un nouveau site**
   - Cliquez sur "Add new site" → "Import an existing project"
   - Choisissez "GitHub"
   - Cherchez et sélectionnez le dépôt `la-vida-luca/lvlia`
   - Sélectionnez la branche `copilot/deploy-website-code`

3. **Configuration du déploiement**
   - **Build command** : laissez VIDE (votre site est déjà prêt !)
   - **Publish directory** : tapez juste un point `.`
   - Cliquez sur "Deploy site"

4. **Attendez quelques secondes** ⏳
   - Netlify va déployer votre site automatiquement
   - Vous recevrez une URL comme `https://random-name-123456.netlify.app`

5. **Personnalisez votre nom de domaine** (optionnel)
   - Dans Netlify, allez à "Site settings" → "Domain management"
   - Cliquez sur "Options" → "Edit site name"
   - Changez vers quelque chose comme `lvlia-hydroponie.netlify.app`

### Option 2 : Déploiement par glisser-déposer (Drag & Drop)

Si vous voulez tester rapidement sans GitHub :

1. Téléchargez tous les fichiers du dépôt sur votre ordinateur
2. Allez sur [netlify.com](https://www.netlify.com)
3. Faites glisser le dossier entier dans la zone "Want to deploy a new site without connecting to Git?"

⚠️ **Note** : Cette méthode ne permet pas les mises à jour automatiques.

## ✨ Fonctionnalités Activées

### 📧 Formulaire de Contact
- Le formulaire sur `contact.html` est déjà configuré pour Netlify Forms
- Vous recevrez les messages directement dans votre tableau de bord Netlify
- Pour activer les notifications email :
  1. Allez dans Netlify Dashboard → Forms
  2. Cliquez sur "Form notifications"
  3. Ajoutez votre email

### 📅 Calendly (Réservation d'appel)
- Le widget Calendly est déjà intégré sur toutes les pages
- URL actuelle : `https://calendly.com/lvlia/30min-consultation`
- ⚠️ **IMPORTANT - À MODIFIER** : Cette URL est un placeholder ! Vous DEVEZ :
  1. Créer votre compte gratuit sur [calendly.com](https://calendly.com)
  2. Remplacer `https://calendly.com/lvlia/30min-consultation` par votre propre lien Calendly dans tous les fichiers HTML
  3. Cherchez et remplacez dans tous les fichiers : `data-url="https://calendly.com/lvlia/30min-consultation"`

### 🔒 HTTPS
- Netlify active automatiquement HTTPS (certificat SSL gratuit)
- Votre site sera sécurisé dès le déploiement

## 🎨 Personnalisation

### Modifier votre email de contact
⚠️ **IMPORTANT** : L'email actuel `contact@lvlia.example` est un placeholder !

Dans chaque page HTML (footer), remplacez :
```html
<a href="mailto:contact@lvlia.example">contact@lvlia.example</a>
```
Par votre vrai email :
```html
<a href="mailto:contact@votre-entreprise.com">contact@votre-entreprise.com</a>
```

**Comment faire rapidement** : Utilisez la fonction "Rechercher et remplacer" de votre éditeur de code pour remplacer `contact@lvlia.example` dans tous les fichiers HTML.

### Modifier les liens réseaux sociaux
Dans le footer de chaque page, remplacez les `#` par vos vrais liens :
```html
<a href="https://facebook.com/votre-page">Facebook</a>
<a href="https://instagram.com/votre-compte">Instagram</a>
<a href="https://linkedin.com/company/votre-entreprise">LinkedIn</a>
```

### Modifier le sitemap.xml
Une fois votre site déployé, remplacez `lvlia.example` dans `sitemap.xml` par votre vrai domaine :
```xml
<loc>https://votre-domaine.netlify.app/index.html</loc>
```

## 🔍 SEO (Référencement)

Votre site est déjà optimisé avec :
- ✅ Meta descriptions sur toutes les pages
- ✅ Open Graph pour réseaux sociaux (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Structure sémantique HTML5

## 📊 Suivi et Analytics (Optionnel)

Pour suivre les visites sur votre site :

1. **Google Analytics**
   - Créez un compte sur [analytics.google.com](https://analytics.google.com)
   - Copiez votre ID de suivi (G-XXXXXXXXXX)
   - Ajoutez ce code dans la section `<head>` de toutes vos pages HTML

2. **Netlify Analytics** (payant mais simple)
   - Dans Netlify Dashboard → Analytics
   - Activez pour 9$/mois (optionnel)

## 🆘 Problèmes Courants

### Le formulaire de contact ne fonctionne pas
- Vérifiez que vous avez déployé via Netlify
- Les attributs `netlify` et `data-netlify="true"` doivent être présents dans la balise `<form>`

### Les images ne s'affichent pas
- Vérifiez que le dossier `assets/` a bien été uploadé
- Les chemins doivent être relatifs : `assets/style.css` et non `/assets/style.css`

### Le widget Calendly ne s'affiche pas
- Vérifiez votre connexion internet
- Le widget se charge depuis `https://assets.calendly.com/assets/external/widget.js`

## 📞 Support

- **Documentation Netlify** : [docs.netlify.com](https://docs.netlify.com)
- **Communauté Netlify** : [answers.netlify.com](https://answers.netlify.com)

## 🎉 Prochaines Étapes

1. [ ] Déployer sur Netlify
2. [ ] Créer un compte Calendly et mettre à jour l'URL
3. [ ] Remplacer l'email de contact `contact@lvlia.example`
4. [ ] Ajouter vos vrais liens réseaux sociaux
5. [ ] Mettre à jour le sitemap.xml avec votre domaine
6. [ ] Tester le formulaire de contact
7. [ ] Partager votre site ! 🚀

---

**Bon déploiement ! 🌱**
