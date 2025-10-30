# Configuration Mollie Payment Links

Ce document explique comment configurer les liens de paiement Mollie pour les micro-serres LVLIA.

## ⚠️ Configuration Requise Avant Production

Avant de déployer ces pages en production, assurez-vous de :

1. **Mettre à jour le numéro de téléphone** dans les fichiers suivants :
   - `paiement-1m2.html` (ligne 212)
   - `paiement-2m2.html` (ligne 235)
   - Remplacer `00 00 00 00 00` par le numéro de téléphone réel de LVLIA

2. **Configurer les redirections Mollie** (voir ci-dessous)

## Liens de Paiement Actuels

### Micro-serre 1m² - 2990€
- **URL de paiement:** https://payment-links.mollie.com/payment/cb2k9hjwLNhFPEgmVbEyw
- **Prix:** 2990€ TTC
- **Page de redirection après paiement:** https://lvlia.fr/success-1m2.html

### Micro-serre 2m² - 5990€
- **URL de paiement:** https://payment-links.mollie.com/payment/mWjrRDEzXjiMVPqtFiVQp
- **Prix:** 5990€ TTC
- **Page de redirection après paiement:** https://lvlia.fr/success-2m2.html

## Configuration dans le Dashboard Mollie

Pour chaque lien de paiement, vous devez configurer les paramètres suivants dans votre dashboard Mollie :

### Étape 1 : Accéder à vos Payment Links
1. Connectez-vous à votre compte Mollie : https://www.mollie.com/dashboard
2. Allez dans la section "Payment Links" ou "Liens de paiement"
3. Trouvez les liens de paiement correspondants

### Étape 2 : Configurer les redirections

#### Pour la Micro-serre 1m² (cb2k9hjwLNhFPEgmVbEyw)
- **Redirect URL (après paiement réussi):** `https://lvlia.fr/success-1m2.html`
- **Montant:** 2990.00 EUR
- **Description:** Micro-serre connectée LVLIA 1m² Compact

#### Pour la Micro-serre 2m² (mWjrRDEzXjiMVPqtFiVQp)
- **Redirect URL (après paiement réussi):** `https://lvlia.fr/success-2m2.html`
- **Montant:** 5990.00 EUR
- **Description:** Micro-serre connectée LVLIA 2m² Glasshouse Premium

### Étape 3 : Paramètres additionnels recommandés

Pour chaque lien de paiement, configurez également :

- **Webhook URL (optionnel):** Si vous souhaitez recevoir des notifications de paiement sur un endpoint de votre serveur
- **Expiration:** Laissez sans limite ou définissez selon vos besoins
- **Méthodes de paiement acceptées:**
  - Carte bancaire (recommandé)
  - Virement bancaire
  - PayPal (optionnel)
  - Autres méthodes selon vos préférences

## Pages du Site

### Pages de Paiement
- `/paiement-1m2.html` - Page de commande pour la micro-serre 1m²
- `/paiement-2m2.html` - Page de commande pour la micro-serre 2m²

### Pages de Confirmation
- `/success-1m2.html` - Page de confirmation après paiement réussi (1m²)
- `/success-2m2.html` - Page de confirmation après paiement réussi (2m²)

### Flux de Paiement Complet

1. **Client visite** `/kit-particuliers.html`
2. **Client clique** sur "Commander maintenant" (1m² ou 2m²)
3. **Redirection vers** `/paiement-1m2.html` ou `/paiement-2m2.html`
4. **Client clique** sur "Payer maintenant"
5. **Redirection vers** le lien Mollie correspondant
6. **Client effectue le paiement** sur la plateforme Mollie
7. **Redirection automatique** vers `/success-1m2.html` ou `/success-2m2.html`

## Test des Paiements

Avant de publier en production, testez le flux complet :

1. Activez le mode test dans votre dashboard Mollie
2. Créez des liens de paiement test avec les mêmes montants
3. Testez le parcours complet depuis le site jusqu'à la page de confirmation
4. Vérifiez que les redirections fonctionnent correctement

## Notes Importantes

- Les liens de paiement Mollie doivent être configurés pour rediriger vers les bonnes URLs de succès
- Assurez-vous que les montants dans Mollie correspondent exactement aux prix affichés sur le site
- Testez toujours les paiements en mode test avant de passer en production
- Les pages de succès sont optimisées pour l'expérience utilisateur et incluent des appels à l'action

## Support

Pour toute question sur la configuration Mollie, consultez :
- Documentation Mollie : https://docs.mollie.com/
- Support LVLIA : contact@lvlia.fr
