# 📋 CHECKLIST DE DÉPLOIEMENT - LVLIA

Suivez cette checklist étape par étape pour déployer votre site !

---

## PHASE 1 : DÉPLOIEMENT (15 minutes)

### ☐ Étape 1 : Créer un compte Netlify
- [ ] Aller sur https://www.netlify.com
- [ ] Cliquer sur "Sign up"
- [ ] Choisir "Continue with GitHub"
- [ ] Autoriser Netlify à accéder à GitHub

### ☐ Étape 2 : Importer le projet
- [ ] Cliquer sur "Add new site"
- [ ] Choisir "Import an existing project"
- [ ] Sélectionner "Deploy with GitHub"
- [ ] Chercher et sélectionner le dépôt `la-vida-luca/lvlia`
- [ ] Sélectionner la branche `copilot/deploy-website-code`

### ☐ Étape 3 : Configuration du déploiement
- [ ] **Build command** : LAISSER VIDE (ne rien écrire)
- [ ] **Publish directory** : Taper juste `.` (un point)
- [ ] **Functions directory** : LAISSER VIDE
- [ ] Cliquer sur "Deploy site"

### ☐ Étape 4 : Attendre le déploiement
- [ ] Attendre 20-30 secondes
- [ ] Voir le message "Site is live" avec une URL
- [ ] Cliquer sur l'URL pour voir votre site en ligne ! 🎉

**✅ VOTRE SITE EST MAINTENANT EN LIGNE !**

URL temporaire : `https://random-name-123456.netlify.app`

---

## PHASE 2 : PERSONNALISATION (20 minutes)

### ☐ Étape 5 : Personnaliser le nom de domaine (optionnel)
- [ ] Dans Netlify, aller à "Site settings"
- [ ] Cliquer sur "Domain management"
- [ ] Cliquer sur "Options" → "Edit site name"
- [ ] Choisir un nom comme `lvlia-hydroponie` ou `lvlia-normandie`
- [ ] Votre nouveau URL : `https://lvlia-hydroponie.netlify.app`

### ☐ Étape 6 : Remplacer l'email de contact
**Fichiers à modifier :** Tous les fichiers HTML (9 fichiers)

- [ ] Ouvrir chaque fichier HTML dans un éditeur de code
- [ ] Chercher : `contact@lvlia.example`
- [ ] Remplacer par : `votre-email-reel@exemple.com`
- [ ] Sauvegarder tous les fichiers
- [ ] Commit et push les changements
- [ ] Netlify redéploie automatiquement (30 secondes)

**Raccourci** : Utilisez "Rechercher et remplacer dans tous les fichiers" de votre éditeur !

Fichiers concernés :
- [ ] index.html
- [ ] cafes.html
- [ ] restaurants.html
- [ ] boulangers.html
- [ ] hotels.html
- [ ] bouchers.html
- [ ] epiceries.html
- [ ] collectivites.html
- [ ] contact.html

### ☐ Étape 7 : Configurer Calendly
- [ ] Aller sur https://calendly.com
- [ ] Créer un compte gratuit
- [ ] Créer un type d'événement "Consultation 30 minutes"
- [ ] Copier votre lien Calendly (ex: `https://calendly.com/votre-nom/consultation`)
- [ ] Dans tous les fichiers HTML, chercher : `https://calendly.com/lvlia/30min-consultation`
- [ ] Remplacer par votre lien Calendly
- [ ] Sauvegarder, commit, push
- [ ] Vérifier que le widget fonctionne sur le site

### ☐ Étape 8 : Ajouter vos liens réseaux sociaux
Dans le footer de chaque fichier HTML :

- [ ] Remplacer `<a href="#">Facebook</a>` par `<a href="https://facebook.com/votre-page">Facebook</a>`
- [ ] Remplacer `<a href="#">Instagram</a>` par `<a href="https://instagram.com/votre-compte">Instagram</a>`
- [ ] Remplacer `<a href="#">LinkedIn</a>` par `<a href="https://linkedin.com/company/votre-entreprise">LinkedIn</a>`
- [ ] Sauvegarder, commit, push

**Alternative** : Si vous n'avez pas de réseaux sociaux, vous pouvez supprimer ces liens.

### ☐ Étape 9 : Mettre à jour le sitemap.xml
- [ ] Ouvrir `sitemap.xml`
- [ ] Remplacer tous les `lvlia.example` par votre domaine Netlify
- [ ] Exemple : `https://lvlia-hydroponie.netlify.app`
- [ ] Sauvegarder, commit, push

---

## PHASE 3 : CONFIGURATION NETLIFY (10 minutes)

### ☐ Étape 10 : Activer les notifications du formulaire
- [ ] Dans Netlify Dashboard, aller à "Forms"
- [ ] Cliquer sur le formulaire "contact"
- [ ] Cliquer sur "Form notifications"
- [ ] Cliquer sur "Add notification"
- [ ] Choisir "Email notification"
- [ ] Entrer votre email
- [ ] Sauvegarder

**Maintenant vous recevrez un email à chaque soumission du formulaire !**

### ☐ Étape 11 : Vérifier le certificat SSL (HTTPS)
- [ ] Dans Netlify Dashboard, aller à "Domain management"
- [ ] Section "HTTPS"
- [ ] Vérifier que "SSL/TLS certificate" est "Active"
- [ ] Si non, cliquer sur "Provision certificate"

**Votre site est maintenant sécurisé avec HTTPS ! 🔒**

---

## PHASE 4 : TESTS (10 minutes)

### ☐ Étape 12 : Tester le site
- [ ] Ouvrir votre site dans un navigateur
- [ ] Tester la navigation (cliquer sur tous les liens du menu)
- [ ] Vérifier que toutes les 9 pages se chargent
- [ ] Tester les boutons "Réserver un appel gratuit"
- [ ] Vérifier que le widget Calendly s'affiche
- [ ] Cliquer sur les cartes secteurs
- [ ] Vérifier que les images se chargent

### ☐ Étape 13 : Tester le formulaire de contact
- [ ] Aller sur la page Contact
- [ ] Remplir le formulaire avec des données de test
- [ ] Cliquer sur "Envoyer"
- [ ] Vérifier que vous voyez un message de confirmation
- [ ] Vérifier que vous recevez un email (si configuré)
- [ ] Aller dans Netlify Dashboard → Forms pour voir la soumission

### ☐ Étape 14 : Tester sur mobile
- [ ] Ouvrir votre site sur votre téléphone
- [ ] Vérifier que le menu burger fonctionne
- [ ] Tester la navigation
- [ ] Vérifier que tout s'affiche correctement
- [ ] Tester le formulaire sur mobile

**Alternative** : Utilisez le mode responsive de votre navigateur (F12 → icône mobile)

---

## PHASE 5 : OPTIMISATION (optionnel)

### ☐ Étape 15 : Google Analytics (optionnel)
- [ ] Créer un compte Google Analytics
- [ ] Obtenir votre ID de suivi (G-XXXXXXXXXX)
- [ ] Ajouter le code de tracking dans la section `<head>` de tous les fichiers HTML
- [ ] Sauvegarder, commit, push

### ☐ Étape 16 : Domaine personnalisé (optionnel)
Si vous avez acheté un nom de domaine :
- [ ] Dans Netlify, aller à "Domain management"
- [ ] Cliquer sur "Add custom domain"
- [ ] Entrer votre domaine (ex: lvlia.com)
- [ ] Suivre les instructions pour configurer le DNS
- [ ] Attendre la propagation DNS (24-48h)

---

## 🎉 FÉLICITATIONS !

Votre site LVLIA est maintenant :
- ✅ En ligne et accessible
- ✅ Sécurisé avec HTTPS
- ✅ Personnalisé avec vos informations
- ✅ Configuré pour recevoir les demandes de contact
- ✅ Optimisé pour le SEO
- ✅ Responsive (mobile, tablette, desktop)

---

## 📊 RÉCAPITULATIF

**Temps total estimé :** 55 minutes
- Phase 1 (Déploiement) : 15 min
- Phase 2 (Personnalisation) : 20 min
- Phase 3 (Configuration Netlify) : 10 min
- Phase 4 (Tests) : 10 min
- Phase 5 (Optimisation optionnelle) : variable

**Fichiers modifiés :** 9 fichiers HTML + sitemap.xml

**Ce qui reste à faire :**
- Remplacer `contact@lvlia.example` par votre email
- Configurer votre compte Calendly
- Ajouter vos liens réseaux sociaux
- Mettre à jour sitemap.xml

---

## 🆘 Problèmes ?

Consultez ces fichiers pour plus d'aide :
- **DEPLOYMENT_GUIDE.md** - Guide détaillé
- **DEPLOYMENT_SUMMARY.md** - Résumé complet
- **README.md** - Documentation technique

---

**Bon déploiement ! 🚀🌱**

*Dernière mise à jour : 24 octobre 2025*
