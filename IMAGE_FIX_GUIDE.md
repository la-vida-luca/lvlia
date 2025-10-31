# 🔧 Guide de Résolution - Problème d'Affichage des Images

## Problème
Les images ne s'affichent pas sur le site en production (Netlify) malgré plusieurs tentatives de correction.

## Solutions Appliquées

### 1. Fichier `_headers` (Principal Fix)
Création d'un fichier `_headers` à la racine du projet pour forcer Netlify à servir les images avec les bons types MIME.

**Fichier:** `_headers`

Ce fichier configure explicitement:
- Content-Type pour les fichiers JPEG, PNG et SVG
- Cache-Control pour optimiser les performances
- Headers de sécurité (X-Content-Type-Options, X-Frame-Options)

### 2. Mise à jour `netlify.toml`
Ajout explicite des headers Content-Type dans le fichier netlify.toml pour renforcer la configuration.

### 3. Page de Test
Création de `test-images.html` pour diagnostiquer rapidement les problèmes de chargement.

## Comment Vérifier que la Correction Fonctionne

### Sur Netlify (après déploiement)

1. **Visitez la page de test**
   - Allez sur: `https://votre-site.netlify.app/test-images.html`
   - Toutes les images doivent s'afficher avec "✅ Chargée avec succès"

2. **Vérifiez les headers HTTP**
   ```bash
   curl -I https://votre-site.netlify.app/assets/photos/IMG_6813.jpeg
   ```
   Vous devriez voir:
   ```
   HTTP/2 200
   content-type: image/jpeg
   cache-control: public, max-age=31536000, immutable
   x-content-type-options: nosniff
   ```

3. **Ouvrez la console du navigateur** (F12)
   - Allez sur n'importe quelle page du site
   - Vérifiez qu'il n'y a pas d'erreur de type "Failed to load resource"

### En Local

Pour tester localement avant le déploiement:

```bash
cd /chemin/vers/lvlia
python -m http.server 8000
```

Puis visitez: `http://localhost:8000/test-images.html`

## Causes Possibles si le Problème Persiste

### 1. Cache du CDN/Navigateur
**Solution:**
- Dans Netlify Dashboard → Deploys → Trigger deploy → Clear cache and deploy
- Dans le navigateur: Ctrl+Shift+R (hard refresh)
- Test en navigation privée

### 2. Erreur de Déploiement
**Vérifier:**
```bash
# Localement
git ls-files assets/photos/

# Doit lister tous les fichiers .jpeg
```

**Dans Netlify:**
- Aller dans: Deploys → (dernier déploiement) → Deploy log
- Vérifier qu'il n'y a pas d'erreurs
- Vérifier que les fichiers sont bien uploadés

### 3. Configuration du Domaine
Si vous utilisez un domaine personnalisé (lvlia.fr au lieu de netlify.app):
- Vérifier que le DNS pointe correctement vers Netlify
- Vérifier que le certificat SSL est actif

### 4. Fichiers Manquants dans Git
**Vérifier:**
```bash
git status
git ls-files assets/photos/ | wc -l
# Doit retourner 15 (14 images + 1 README.txt)
```

### 5. Permissions des Fichiers
Les images doivent être:
- Lisibles (chmod 644)
- Non dans .gitignore
- Committées dans git

## Déploiement sur Netlify

### Première Configuration

1. **Build settings:**
   - Build command: (vide)
   - Publish directory: `.` (un point)
   - Branch to deploy: `main` ou votre branche actuelle

2. **Vérifier que les fichiers sont déployés:**
   - Dans Netlify Dashboard → Site overview → View file system
   - Naviguer vers `assets/photos/`
   - Vérifier que tous les fichiers .jpeg sont présents

### Après un Déploiement

1. **Clear cache systématique** après chaque mise à jour des images
2. **Tester avec test-images.html** avant de valider
3. **Vérifier les headers** avec curl ou DevTools

## Checklist de Débogage

- [ ] Les images sont bien dans `assets/photos/` localement
- [ ] Les images sont bien trackées par git: `git ls-files assets/photos/`
- [ ] Le fichier `_headers` existe à la racine
- [ ] Le fichier `netlify.toml` contient les headers Content-Type
- [ ] Les chemins dans HTML sont relatifs (pas de `/` au début)
- [ ] Déploiement Netlify réussi sans erreurs
- [ ] Cache Netlify vidé après le déploiement
- [ ] Test avec `test-images.html` sur le site live
- [ ] Headers HTTP vérifiés avec curl
- [ ] Console navigateur sans erreurs 404 ou MIME type

## Commandes Utiles

```bash
# Vérifier les images trackées
git ls-files assets/photos/

# Vérifier la taille du repo
du -sh assets/photos/

# Tester localement
python -m http.server 8000

# Vérifier les headers (remplacer l'URL)
curl -I https://votre-site.netlify.app/assets/photos/IMG_6813.jpeg

# Vérifier qu'une image n'est pas un pointeur LFS
git cat-file blob :assets/photos/IMG_6813.jpeg | head -c 20 | xxd
# Doit commencer par: ffd8 (header JPEG)
```

## Support

Si le problème persiste après avoir suivi ce guide:

1. **Vérifier les logs Netlify** pour des messages d'erreur spécifiques
2. **Contacter le support Netlify** avec:
   - URL du site
   - URL d'une image qui ne charge pas
   - Copie des headers HTTP retournés
   - Screenshot de la console du navigateur

## Fichiers Modifiés dans cette PR

1. **`_headers`** (nouveau) - Configuration Netlify pour MIME types
2. **`netlify.toml`** (modifié) - Ajout Content-Type explicites
3. **`test-images.html`** (nouveau) - Page de diagnostic
4. **`IMAGE_FIX_GUIDE.md`** (ce fichier) - Documentation

---

**Date de création:** 2025-10-31  
**Problème résolu:** Images ne s'affichent pas sur Netlify  
**Solution:** Ajout fichier _headers + configuration netlify.toml
