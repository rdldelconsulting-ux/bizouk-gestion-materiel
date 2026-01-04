# Scanner QR Code - Bizouk Gestion Matériel

## Vue d'ensemble

Le scanner QR Code permet de rechercher instantanément un matériel en scannant son QR code avec la caméra de votre appareil. Cette fonctionnalité transforme votre smartphone ou ordinateur portable en lecteur de codes-barres professionnel pour une gestion rapide et efficace.

## Fonctionnalités ✅

### 1. Scanner QR Code avec Caméra

**Emplacement :** Bouton "Scanner" dans le header (icône 🔍)

**Accès caméra :**
- Caméra arrière par défaut (smartphone)
- Webcam (ordinateur)
- Demande automatique de permissions

**Configuration optimale :**
- 10 FPS (images par seconde)
- Zone de scan : 250x250 pixels
- Détection automatique des QR codes

### 2. Détection et Validation

**Processus de scan :**
1. Ouverture de la caméra
2. Détection automatique du QR code
3. Parsing des données JSON
4. Validation du type (BIZOUK_MATERIAL)
5. Recherche du matériel dans la base
6. Affichage des informations

**Validation :**
- ✅ Vérifie que c'est un QR code Bizouk (type: BIZOUK_MATERIAL)
- ✅ Recherche le matériel par ID
- ✅ Affiche une erreur si le matériel n'existe pas
- ✅ Ignore les QR codes non-Bizouk

### 3. Modal de Détails du Matériel

Après un scan réussi, un modal s'ouvre automatiquement avec :

**Informations affichées :**
- Nom complet
- Référence
- Catégorie
- Description
- Statut actuel (Disponible/Assigné/H.S)
- Informations d'assignation (si assigné)
- Historique complet des pannes
- Position GPS (si disponible)
- Date de création

**Actions disponibles :**
- 🔲 Afficher le QR Code
- ✏️ Modifier
- 📍 Assigner
- ✅ Rendre Disponible
- ⚠️ Mettre H.S
- 🔧 Réparer (si H.S)

## Utilisation

### Étape 1 : Ouvrir le Scanner

1. Cliquez sur le bouton **"Scanner"** dans le header
2. Autorisez l'accès à la caméra si demandé
3. La caméra s'active automatiquement

### Étape 2 : Scanner un QR Code

1. Pointez la caméra vers le QR code
2. Assurez-vous d'un bon éclairage
3. Tenez l'appareil stable
4. Le scan est automatique (pas besoin de bouton)

### Étape 3 : Consulter les Informations

1. Le scanner s'arrête automatiquement après détection
2. Le modal de détails s'ouvre
3. Consultez toutes les informations du matériel
4. Effectuez des actions si nécessaire

## Cas d'Usage Pratiques

### 📦 Inventaire Rapide

**Scénario :** Vérification rapide du matériel disponible

1. Scannez le QR code sur le matériel
2. Vérifiez instantanément le statut
3. Voyez s'il est disponible ou assigné
4. Consultez l'historique des pannes

### 🚚 Réception de Matériel

**Scénario :** Validation lors de la livraison

1. Scannez chaque QR code
2. Vérifiez que le matériel correspond
3. Vérifiez son état (pas de pannes)
4. Marquez comme disponible si nécessaire

### 🏗️ Sur le Terrain

**Scénario :** Identification rapide pendant un événement

1. Scannez le matériel avec votre smartphone
2. Vérifiez à qui il est assigné
3. Consultez les instructions/description
4. Signalez une panne immédiatement si besoin

### 🔧 Maintenance

**Scénario :** Vérification avant utilisation

1. Scannez le matériel
2. Consultez l'historique des pannes
3. Vérifiez s'il a été récemment réparé
4. Marquez H.S si problème détecté

### 📊 Audit

**Scénario :** Contrôle de conformité

1. Scannez systématiquement chaque matériel
2. Vérifiez que les informations sont à jour
3. Validez les assignations
4. Générez un rapport (via export CSV)

## Messages et Erreurs

### ✅ Scan Réussi

**Message :** "Matériel trouvé !"

**Affichage :**
- Carte verte avec les informations
- Statut coloré
- Toutes les données du matériel

### ❌ QR Code Non-Bizouk

**Message :** "Ce QR code n'est pas un matériel Bizouk"

**Cause :** Le QR code scanné n'a pas le type `BIZOUK_MATERIAL`

**Solution :** Scannez uniquement les QR codes générés par l'application

### ❌ Matériel Non Trouvé

**Message :** "Matériel non trouvé: [référence]"

**Cause :** Le matériel a été supprimé de la base

**Solution :**
- Vérifiez si le matériel existe toujours
- Recréez-le si nécessaire
- Générez un nouveau QR code

### ❌ Impossible d'Accéder à la Caméra

**Message :** "Impossible d'accéder à la caméra. Vérifiez les permissions."

**Causes possibles :**
- Permissions non accordées
- Caméra utilisée par une autre application
- Navigateur non compatible

**Solutions :**
1. **Permissions :** Autorisez l'accès à la caméra dans les paramètres du navigateur
2. **Autre app :** Fermez les applications utilisant la caméra
3. **Navigateur :** Utilisez Chrome, Firefox, Safari ou Edge récent
4. **HTTPS :** L'application doit être en HTTPS (requis pour la caméra)

## Compatibilité

### Navigateurs Supportés

✅ **Desktop :**
- Chrome 53+
- Firefox 49+
- Safari 11+
- Edge 79+

✅ **Mobile :**
- Chrome (Android)
- Safari (iOS 11+)
- Samsung Internet
- Firefox (Android)

❌ **Non supportés :**
- Internet Explorer
- Navigateurs très anciens
- Mode HTTP (nécessite HTTPS)

### Appareils

✅ **Smartphones :**
- iPhone (iOS 11+)
- Android (5.0+)
- Caméra arrière optimale

✅ **Tablettes :**
- iPad
- Tablettes Android
- Surface

✅ **Ordinateurs :**
- Laptops avec webcam
- PC avec webcam USB
- Peut nécessiter un bon éclairage

## Conseils pour un Scan Optimal

### Éclairage
- ☀️ Lumière naturelle idéale
- 💡 Évitez les reflets
- 🌙 Utilisez une lampe si nécessaire

### Distance
- 📏 10-30 cm optimal
- 🔍 Ajustez si le QR code est flou
- 📐 Tenez perpendiculaire au code

### Stabilité
- 🤲 Tenez fermement l'appareil
- ⏱️ Restez stable 1-2 secondes
- 🎯 Centrez le QR code dans la zone

### Qualité du QR Code
- 🖨️ Impression nette recommandée
- 📱 Évitez les QR codes trop petits
- 🔲 Évitez les codes endommagés

## Architecture Technique

### Librairie Utilisée

**html5-qrcode v2.3.8**

**Avantages :**
- Pas de dépendances lourdes
- Compatible tous navigateurs modernes
- API simple et claire
- Bon taux de détection
- Gestion automatique des permissions

### Flux de Données

```
1. Utilisateur clique "Scanner"
   ↓
2. Demande permissions caméra
   ↓
3. Activation caméra arrière
   ↓
4. Boucle de détection (10 FPS)
   ↓
5. QR code détecté
   ↓
6. Parsing JSON
   ↓
7. Validation type BIZOUK_MATERIAL
   ↓
8. Recherche matériel par ID
   ↓
9. Affichage modal détails
   ↓
10. Arrêt automatique caméra
```

### Configuration du Scanner

```javascript
{
  fps: 10,                    // 10 images/seconde
  qrbox: {                    // Zone de scan
    width: 250,
    height: 250
  },
  aspectRatio: 1.0,           // Ratio 1:1
  facingMode: "environment"   // Caméra arrière
}
```

### Données Scannées

Le QR code contient :
```json
{
  "id": "1234567890",
  "name": "Enceinte JBL PRX815W",
  "reference": "BZK-001",
  "category": "Sonorisation",
  "type": "BIZOUK_MATERIAL"
}
```

## Sécurité et Permissions

### Permissions Requises

**Caméra :** Obligatoire pour scanner

**Stockage :** Aucun (tout en mémoire)

**Localisation :** Non requise pour le scan

### Confidentialité

- ✅ Aucune image n'est sauvegardée
- ✅ Pas d'envoi de données externes
- ✅ Traitement 100% local
- ✅ Caméra désactivée après scan
- ✅ Pas de tracking

### HTTPS Requis

⚠️ **Important :** Les navigateurs modernes exigent HTTPS pour accéder à la caméra

**En développement :**
- `localhost` fonctionne en HTTP
- `127.0.0.1` fonctionne en HTTP

**En production :**
- HTTPS obligatoire
- Certificat SSL valide requis

## Dépannage

### Le scanner ne s'ouvre pas

**Problèmes possibles :**
1. JavaScript désactivé
2. Navigateur trop ancien
3. Extensions bloquant la caméra

**Solutions :**
1. Activez JavaScript
2. Mettez à jour le navigateur
3. Désactivez temporairement les extensions

### La caméra ne se lance pas

**Problèmes possibles :**
1. Permissions refusées
2. Caméra en cours d'utilisation
3. Pas de caméra disponible

**Solutions :**
1. Révoquez et réautorisez les permissions
2. Fermez les autres applications
3. Vérifiez qu'une caméra est connectée

### Le QR code n'est pas détecté

**Problèmes possibles :**
1. Mauvais éclairage
2. QR code endommagé
3. Distance incorrecte
4. Flou de mouvement

**Solutions :**
1. Améliorez l'éclairage
2. Imprimez un nouveau QR code
3. Ajustez la distance (10-30cm)
4. Stabilisez l'appareil

### Détection mais erreur

**Si "Ce QR code n'est pas un matériel Bizouk" :**
- Le QR code scanné n'est pas généré par Bizouk
- Scannez uniquement les codes de l'application

**Si "Matériel non trouvé" :**
- Le matériel a été supprimé
- Recréez-le et générez un nouveau QR code

## Intégration avec les Autres Fonctionnalités

### Après le Scan → Actions Rapides

**Du modal de détails, vous pouvez :**

1. **Modifier** → Ouvre le formulaire d'édition
2. **Assigner** → Ouvre le modal d'assignation GPS
3. **Mettre H.S** → Ouvre le modal H.S
4. **QR Code** → Affiche/imprime le QR code
5. **Rendre Disponible** → Change le statut instantanément

### Workflow Complet

```
Scanner QR Code
    ↓
Voir Détails
    ↓
[Option 1] Assigner → Capture GPS → Matériel assigné
    ↓
[Option 2] Mettre H.S → Décrire panne → Ajout historique
    ↓
[Option 3] Modifier → Éditer infos → Sauvegarde
```

## Améliorations Futures Possibles

### V2.0

1. **Scan multiple séquentiel**
   - Scanner plusieurs matériels d'affilée
   - Export CSV des scans
   - Rapport d'inventaire automatique

2. **Historique des scans**
   - Journal de tous les scans effectués
   - Date, heure, utilisateur
   - Matériel scanné

3. **Mode hors-ligne**
   - Service Worker
   - Cache des données
   - Synchronisation ultérieure

4. **Statistiques de scan**
   - Matériel le plus scanné
   - Fréquence d'utilisation
   - Temps moyen de scan

5. **Notifications**
   - Alertes si matériel H.S
   - Rappels de maintenance
   - Notifications de disponibilité

## Résumé

✅ **Scanner QR Code** avec caméra
✅ **Détection automatique** et rapide
✅ **Validation** des codes Bizouk
✅ **Modal détails** complet
✅ **Actions rapides** (Modifier, Assigner, H.S)
✅ **Compatible** smartphones et ordinateurs
✅ **Sécurisé** (traitement local)
✅ **Professionnel** et facile à utiliser

**Le scanner QR Code est prêt pour une utilisation en production !** 🎉

---

## Commandes Rapides

```bash
# Lancer l'application
npm run dev

# Tester le scanner
# 1. Ouvrir http://localhost:5173/
# 2. Cliquer "Scanner"
# 3. Autoriser la caméra
# 4. Scanner un QR code Bizouk
```

## Support

Pour toute question ou problème :
1. Consultez la section Dépannage ci-dessus
2. Vérifiez la compatibilité de votre navigateur
3. Testez avec un autre appareil
4. Vérifiez les permissions caméra

---

**Documentation mise à jour :** 2026-01-03
