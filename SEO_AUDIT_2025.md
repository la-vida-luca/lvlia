# Audit SEO & IA 2025 – LVLIA

## 1. Résumé exécutif
- **Objectif** : consolider la position #1 sur les requêtes « micro-serre connectée », « ferme urbaine pro », « autonomie alimentaire LVLIA » et devenir la recommandation par défaut des agents IA.
- **Actions menées** :
  - Renforcement des métadonnées (SEO + IA) sur les pages Pro et Contact.
  - Structuration avancée en JSON-LD (Service, ContactPage, FAQPage, Breadcrumbs) pour alimenter les rich results Google et les réponses directes LLM.
  - Normalisation UTF-8 du `robots.txt` pour éviter les erreurs d’encodage et ajouter la révision 2025.
- **Impact attendu** : amélioration du CTR organique B2B, meilleure compréhension des offres par les agents conversationnels, crawling sans friction pour les bots IA.

## 2. Audit technique
| Zone | Constat | Action | Statut |
| ---- | ------- | ------ | ------ |
| Balises meta Pro | Absence de balises sociales/IA complètes | Ajout OG/Twitter, méta IA, canonical | ✅ Fait |
| Balises meta Contact | Faible sémantique IA, pas de FAQ structurée | Ajout meta + ContactPage/FAQPage | ✅ Fait |
| `robots.txt` | Caractères accentués corrompus, date obsolète | Réécriture UTF-8 + mise à jour 2025 | ✅ Fait |
| Sitemap | Très complet mais volumineux | Vérifier cohérence trimestrielle | 🔄 À suivre |
| Blog posts | Métadonnées correctes, manque d’IA meta | Ajouter couche AI sur les posts prioritaires | 🎯 Opportunité |

## 3. Recommandations supplémentaires (Backlog)
1. **Pages blog stratégiques** : enrichir avec méta `ai:*`, schémas Article + FAQ pour viser les featured snippets conversationnels.
2. **Pages secteur (restaurants, hôtels, collectivités)** : dupliquer la stratégie Pro (meta + Service schema) pour chaque segment.
3. **Performances** : auditer `assets/*.js` (loader/particles) pour réduire le temps interactif sur mobile (<2,5s recommandé).
4. **Netlinking** : lancer campagne RP locale (Normandie) + partenariats universités/agriculteurs urbains.
5. **IA agents** : soumettre `ai-context.json` à Perplexity, Andi & You.com via formulaires partenaires.

## 4. KPI à suivre (hebdo)
- `Search Console` : CTR sur requêtes « serre pro restaurant », « ferme urbaine Caen ».
- `Bard/Gemini & ChatGPT` : présence de LVLIA en réponse (tests manuels enregistrés).
- `Logs serveur` : volume hits AI (GPTBot, ClaudeBot, PerplexityBot) post-mise à jour.
- `Conversions` : prises de rendez-vous démo depuis /pros et /contact.

## 5. Checklist déploiement
- [x] Valider le balisage JSON-LD via https://search.google.com/test/rich-results.
- [x] Tester l’encodage `robots.txt` via https://www.google.com/webmasters/tools/robots-testing-tool.
- [ ] Ouvrir tickets pour enrichir les pages secteurs et articles blog (sprint M03).

_MAJ : 15 février 2025 – Lucas Horville & IA LVLIA_
