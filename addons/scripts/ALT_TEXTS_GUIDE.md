# Guide d'Optimisation Alt Texts Images - LVLIA

**Date :** 2 novembre 2025  
**Objectif :** Optimiser tous les alt texts pour SEO + accessibilité

---

## 🎯 RÈGLES GÉNÉRALES

### Format Optimal
- **Longueur :** 80-125 caractères (idéal pour SEO)
- **Contexte :** Décrire ce que montre l'image + contexte d'usage
- **Localisation :** Inclure "Normandie", "Caen" quand pertinent
- **Mots-clés :** Intégrer naturellement mots-clés cibles

### Ce qu'il faut ÉVITER
❌ "Image de..." ou "Photo de..."  
❌ Descriptions génériques ("Serre LVLIA")  
❌ Bourrage de mots-clés  
❌ Plus de 150 caractères  

### Ce qu'il faut FAIRE
✅ Descriptions précises et contextuelles  
✅ Bénéfices clients quand pertinent  
✅ Localisation géographique  
✅ Détails techniques si utiles  

---

## 📷 IMAGES PRINCIPALES ET LEURS ALT OPTIMISÉS

### Photos Produits

**IMG_6805.jpeg** (Serre 1m² lumière LED)  
❌ Avant : `Serre LVLIA`  
✅ Après : `Micro-serre connectée LVLIA 1m² avec éclairage LED horticole Samsung en fonctionnement à Caen`

**IMG_6801.jpeg** (Serre 2m² grande taille)  
❌ Avant : `Serre 2m²`  
✅ Après : `Serre hydroponique connectée LVLIA 2m² pour famille, production 20kg/mois légumes bio Normandie`

**IMG_6813.jpeg** (Serre lumière violette)  
❌ Avant : `Serre connectée`  
✅ Après : `Culture hydroponique indoor LVLIA avec système éclairage LED violet plein spectre pour croissance optimale`

**IMG_6815.jpeg** (Serre vitrée dans salon)  
❌ Avant : `Installation LVLIA`  
✅ Après : `Serre vitrée design LVLIA 2m² installée dans salon moderne, culture verticale herbes aromatiques`

**IMG_6814.jpeg** (Tableau de bord app)  
❌ Avant : `App LVLIA`  
✅ Après : `Application LVLIA Farm sur tablette affichant monitoring temps réel température pH humidité micro-serre`

**IMG_6812.jpeg** (Racines système hydroponique)  
❌ Avant : `Racines hydroponie`  
✅ Après : `Système racinaire sain culture hydroponique LVLIA avec circulation solution nutritive oxygénée NFT`

**IMG_6799.jpeg** (Plants en croissance)  
❌ Avant : `Culture hydroponique`  
✅ Après : `Plants salades vertes en croissance saine système hydroponique LVLIA, récolte 25-30 jours Caen`

**IMG_6804.jpeg** (Cabinet compact)  
❌ Avant : `Micro-serre compacte`  
✅ Après : `Cabinet culture indoor LVLIA format compact pour appartement, solution autonomie alimentaire urbaine`

**IMG_6806.jpeg** (Installation garage)  
❌ Avant : `Serre en garage`  
✅ Après : `Micro-serre LVLIA 1m² installée dans garage non chauffé, production légumes 365 jours an Normandie`

### Photos Techniques

**17c66c52-983c-4973-b901-a042d8363388.jpeg** (Plants jeunes)  
❌ Avant : `Plants jeunes`  
✅ Après : `Jeunes plants légumes feuilles en début croissance système hydroponie LVLIA substrat laine roche`

**acd007ba-366e-4e03-8255-88f6fd6330d9.jpeg** (Fraises hydroponie)  
❌ Avant : `Culture fraises`  
✅ Après : `Culture fraises en hydroponie verticale LVLIA, production fruits légers toute année sans pesticides`

---

## 🔧 SCRIPT D'OPTIMISATION AUTOMATIQUE

Créer un script Node.js qui :
1. Parse tous les fichiers HTML
2. Extrait les balises `<img>` avec alt générique
3. Propose des suggestions d'amélioration
4. Génère un rapport

```javascript
// À implémenter si besoin
const optimizeAltTexts = (htmlFiles) => {
  // Parse HTML, détecte alt texts à optimiser
  // Génère suggestions basées sur nom fichier + contexte page
};
```

---

## 📊 CHECKLIST VALIDATION

### Pages Prioritaires à Optimiser
- [x] `/temoignages.html` (12 images) - ✅ Optimisé
- [x] `/tarifs.html` (0 image produit, OK)
- [ ] `/index.html` (5-6 images) - À optimiser
- [ ] `/kit-particuliers.html` (4 images) - À optimiser
- [ ] `/pros.html` (2 images) - À optimiser
- [ ] `/blog.html` (0 image, OK)
- [ ] `/faq.html` (0 image, OK)
- [ ] `/contact.html` (1 iframe calendrier, OK)

### Blog Articles
- [ ] `/blog/fermes-urbaines-definition.html`
- [ ] `/blog/hydroponie-maison-guide.html`
- [ ] `/blog/rentabilite-fermes-urbaines.html`
- [ ] `/blog/1m2-vs-2m2.html`
- [ ] `/blog/led-horticoles-guide.html`

---

## 🎯 IMPACT ATTENDU

**SEO :**
- Meilleur ranking Google Images
- Indexation contextuelle des images
- Mots-clés longue traîne ("serre connectée caen", "hydroponie normandie")

**Accessibilité :**
- Score Lighthouse Accessibility +5-10 points
- Screen readers informés correctement
- WCAG AA respecté

**Trafic :**
- +10-15% trafic depuis Google Images (estimé)
- Meilleur CTR sur résultats image

---

## 📝 PROCHAINES ÉTAPES

1. **Valider ce guide** avec l'équipe
2. **Appliquer les alt texts optimisés** sur toutes les pages (15 min par page)
3. **Ajouter attributs `width` et `height`** sur toutes images (anti-CLS)
4. **Vérifier avec Lighthouse** que Accessibility > 95

**Temps total estimé :** 2-3 heures pour 40+ images

---

**✅ Guide créé le 2 novembre 2025**  
**👤 Auteur :** Équipe LVLIA SEO
