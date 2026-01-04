# Test du Scanner QR Code - Guide Pratique

## État du Serveur

✅ **Serveur démarré avec succès**
- URL : http://localhost:5173/
- Temps de démarrage : 111 ms
- Aucune erreur de compilation

---

## Préparation des Tests

### Étape 1 : Accéder à l'Application

1. Ouvrez votre navigateur (Chrome, Firefox, Safari ou Edge)
2. Accédez à : **http://localhost:5173/**
3. L'application Bizouk devrait s'afficher

### Étape 2 : Créer du Matériel de Test

**Option A : Créer manuellement**

1. Cliquez sur **"Ajouter Matériel"**
2. Remplissez le formulaire :
   - Nom : "Enceinte Test"
   - Référence : "TEST-001"
   - Catégorie : "Sonorisation"
   - Description : "Matériel de test pour scanner"
3. Cliquez sur **"Ajouter"**
4. Répétez pour créer 2-3 matériels

**Option B : Importer via CSV**

1. Cliquez sur **"Importer CSV"**
2. Sélectionnez le fichier **test_import.csv** (déjà créé)
3. Importez les 10 matériels de test

---

## Test 1 : Génération de QR Codes

### Objectif
Vérifier que les QR codes se génèrent correctement avant de les scanner.

### Procédure

1. **Afficher un QR Code individuel**
   - Sur une carte matériel, cliquez sur l'icône **QR Code** (🔲)
   - Un modal s'ouvre avec le QR code
   - Vérifiez que le QR code s'affiche (carré noir et blanc)
   - Les informations du matériel sont visibles

2. **Télécharger le QR Code**
   - Dans le modal, cliquez sur **"Télécharger"**
   - Un fichier SVG se télécharge : `qrcode_TEST-001.svg`
   - Ouvrez le fichier pour vérifier qu'il est valide

3. **Imprimer un QR Code**
   - Dans le modal, cliquez sur **"Imprimer"**
   - Une fenêtre d'impression s'ouvre
   - Vérifiez la mise en page (logo Bizouk, infos, QR code)
   - Imprimez ou sauvegardez en PDF

### Résultat Attendu
✅ QR codes générés correctement
✅ Format SVG téléchargeable
✅ Impression formatée avec style Bizouk

---

## Test 2 : Scanner QR Code (Caméra Requise)

### Pré-requis
- Smartphone avec caméra OU ordinateur avec webcam
- Un QR code imprimé ou affiché à l'écran
- Permissions caméra autorisées

### Procédure

1. **Ouvrir le Scanner**
   - Cliquez sur le bouton **"Scanner"** dans le header
   - Acceptez les permissions caméra si demandé
   - La caméra devrait s'activer

2. **Scanner un QR Code**
   - Pointez la caméra vers un QR code imprimé
   - OU affichez le QR code sur un second écran/smartphone
   - Tenez stable 1-2 secondes
   - Le scan est automatique

3. **Vérifier le Résultat**
   - Le scanner s'arrête automatiquement
   - Un message vert "Matériel trouvé !" apparaît
   - Les informations du matériel s'affichent
   - La caméra se ferme

4. **Consulter le Modal de Détails**
   - Le modal de détails s'ouvre automatiquement
   - Vérifiez toutes les informations :
     - Nom, référence, catégorie
     - Description
     - Statut (Disponible/Assigné/H.S)
     - Historique des pannes (si existant)

### Résultat Attendu
✅ Caméra s'active correctement
✅ QR code détecté automatiquement
✅ Matériel trouvé et affiché
✅ Modal de détails complet
✅ Caméra se ferme après scan

---

## Test 3 : Gestion des Erreurs

### Test 3A : QR Code Non-Bizouk

**Procédure :**
1. Ouvrez le scanner
2. Scannez un QR code aléatoire (pas généré par Bizouk)
   - Par exemple : QR code d'un site web, produit, etc.

**Résultat Attendu :**
❌ Message d'erreur : "Ce QR code n'est pas un matériel Bizouk"
✅ Le scanner reste actif
✅ Vous pouvez scanner un autre code

### Test 3B : Matériel Supprimé

**Procédure :**
1. Créez un matériel
2. Générez son QR code et imprimez-le
3. Supprimez le matériel de la base
4. Scannez le QR code imprimé

**Résultat Attendu :**
❌ Message d'erreur : "Matériel non trouvé: [référence]"
✅ La référence du matériel est affichée
✅ Le scanner reste actif

### Test 3C : Permissions Caméra Refusées

**Procédure :**
1. Révoquez les permissions caméra dans votre navigateur
2. Cliquez sur "Scanner"

**Résultat Attendu :**
❌ Message d'erreur : "Impossible d'accéder à la caméra. Vérifiez les permissions."
✅ Le modal reste ouvert avec le message
✅ Bouton "Fermer" fonctionnel

---

## Test 4 : Actions depuis le Modal de Détails

### Pré-requis
Scanner un matériel avec succès

### Test 4A : Modifier le Matériel

**Procédure :**
1. Depuis le modal de détails, cliquez sur **"Modifier"**
2. Le formulaire d'édition s'ouvre
3. Modifiez le nom : "Enceinte Test - Modifiée"
4. Cliquez sur **"Modifier"**

**Résultat Attendu :**
✅ Formulaire s'ouvre avec les données pré-remplies
✅ Modification enregistrée
✅ Retour à la liste avec données mises à jour

### Test 4B : Assigner le Matériel

**Procédure :**
1. Scannez un matériel disponible
2. Cliquez sur **"Assigner"**
3. Entrez : "Jean Dupont"
4. Le GPS se capture automatiquement
5. Cliquez sur **"Assigner"**

**Résultat Attendu :**
✅ Modal d'assignation s'ouvre
✅ Position GPS capturée
✅ Matériel assigné avec succès
✅ Statut change à "Assigné"

### Test 4C : Mettre Hors Service

**Procédure :**
1. Scannez un matériel
2. Cliquez sur **"Mettre H.S"**
3. Décrivez le problème : "Haut-parleur endommagé"
4. Cliquez sur **"Mettre H.S"**

**Résultat Attendu :**
✅ Modal H.S s'ouvre
✅ Problème enregistré dans l'historique
✅ Statut change à "H.S"
✅ Panne visible dans l'historique

### Test 4D : Afficher le QR Code

**Procédure :**
1. Scannez un matériel
2. Cliquez sur **"QR Code"**

**Résultat Attendu :**
✅ Modal QR Code s'ouvre
✅ QR code du matériel affiché
✅ Options Télécharger/Imprimer disponibles

---

## Test 5 : Workflow Complet

### Scénario : Gestion Complète d'un Matériel

1. **Créer** un matériel "Projecteur LED"
2. **Générer** son QR code
3. **Imprimer** le QR code
4. **Scanner** le QR code
5. **Assigner** à "Marie Martin"
6. **Re-scanner** pour vérifier l'assignation
7. **Mettre H.S** avec raison "Ampoule grillée"
8. **Re-scanner** pour voir l'historique
9. **Rendre disponible** (Réparer)
10. **Re-scanner** pour confirmer le statut

**Résultat Attendu :**
✅ Toutes les étapes fonctionnent
✅ Les informations sont toujours à jour
✅ L'historique est complet
✅ Le scanner reflète l'état réel

---

## Test 6 : Performance et Stabilité

### Test 6A : Scans Multiples

**Procédure :**
1. Scannez 5 matériels différents consécutivement
2. Fermez le modal entre chaque scan
3. Vérifiez que chaque scan fonctionne

**Résultat Attendu :**
✅ Tous les scans réussissent
✅ Pas de ralentissement
✅ Caméra se ferme/rouvre correctement

### Test 6B : Scan Rapide

**Procédure :**
1. Ouvrez le scanner
2. Scannez un QR code
3. Immédiatement après, ouvrez à nouveau le scanner
4. Scannez un autre QR code

**Résultat Attendu :**
✅ Pas de conflit
✅ Le scanner se réinitialise correctement
✅ Pas d'erreur JavaScript

---

## Test 7 : Compatibilité Mobile

### Sur Smartphone

**Procédure :**
1. Ouvrez http://localhost:5173/ sur votre smartphone
   - Sur le même réseau WiFi
   - Remplacez localhost par l'IP de votre ordinateur
2. Testez toutes les fonctionnalités du scanner

**Résultat Attendu :**
✅ Interface responsive
✅ Caméra arrière activée par défaut
✅ Scan fonctionne parfaitement
✅ Modal lisible sur petit écran

---

## Test 8 : Intégration avec les Autres Fonctionnalités

### Test 8A : Scanner → Carte

**Procédure :**
1. Scannez un matériel assigné
2. Notez sa position GPS
3. Allez dans l'onglet **"Carte"**
4. Vérifiez que le matériel apparaît sur la carte

**Résultat Attendu :**
✅ Matériel visible sur la carte
✅ Position GPS correcte
✅ Popup avec infos en cliquant

### Test 8B : Scanner → Historique Pannes

**Procédure :**
1. Scannez un matériel avec plusieurs pannes
2. Allez dans **"Historique Pannes"**
3. Vérifiez que toutes les pannes sont listées

**Résultat Attendu :**
✅ Toutes les pannes visibles
✅ Dates correctes
✅ Descriptions complètes

### Test 8C : Scanner → Export CSV

**Procédure :**
1. Scannez plusieurs matériels
2. Effectuez des actions (assigner, H.S)
3. Exportez en CSV
4. Vérifiez que les données exportées sont à jour

**Résultat Attendu :**
✅ Export contient les dernières données
✅ Statuts corrects
✅ Historique inclus

---

## Checklist Complète des Tests

### Fonctionnalités de Base
- [ ] Serveur démarre sans erreur
- [ ] Application accessible sur localhost:5173
- [ ] Bouton "Scanner" visible dans le header
- [ ] Génération QR codes fonctionne
- [ ] Impression QR codes fonctionne
- [ ] Téléchargement SVG fonctionne

### Scanner QR Code
- [ ] Permissions caméra demandées
- [ ] Caméra s'active correctement
- [ ] Zone de scan visible (250x250)
- [ ] Détection automatique des QR codes
- [ ] Scan d'un QR code Bizouk réussit
- [ ] Message "Matériel trouvé !" s'affiche
- [ ] Caméra s'arrête après scan

### Modal de Détails
- [ ] Modal s'ouvre automatiquement après scan
- [ ] Toutes les infos affichées correctement
- [ ] Badge statut coloré visible
- [ ] Actions disponibles selon le statut
- [ ] Bouton "Fermer" fonctionne

### Gestion des Erreurs
- [ ] QR code non-Bizouk rejeté avec message
- [ ] Matériel supprimé détecté
- [ ] Erreur caméra gérée gracieusement
- [ ] Messages d'erreur clairs et utiles

### Actions depuis Scanner
- [ ] Modifier fonctionne
- [ ] Assigner fonctionne
- [ ] Mettre H.S fonctionne
- [ ] Rendre disponible fonctionne
- [ ] Afficher QR Code fonctionne

### Performance
- [ ] Scans multiples sans problème
- [ ] Pas de fuite mémoire
- [ ] Caméra se libère correctement
- [ ] Pas de ralentissement

### Intégration
- [ ] Sync avec la carte interactive
- [ ] Sync avec l'historique des pannes
- [ ] Sync avec l'export CSV
- [ ] localStorage mis à jour

---

## Problèmes Connus et Solutions

### Problème : La caméra ne démarre pas

**Solutions :**
1. Vérifiez les permissions dans les paramètres du navigateur
2. Fermez les autres applications utilisant la caméra
3. Redémarrez le navigateur
4. Utilisez Chrome ou Firefox (meilleure compatibilité)

### Problème : QR code non détecté

**Solutions :**
1. Améliorez l'éclairage
2. Rapprochez/éloignez la caméra (10-30cm optimal)
3. Assurez-vous que le QR code est net et non endommagé
4. Tenez l'appareil stable

### Problème : "Ce QR code n'est pas un matériel Bizouk"

**C'est normal si :**
- Vous scannez un QR code aléatoire
- Le QR code n'a pas été généré par l'application

**Solution :**
- Utilisez uniquement les QR codes générés par Bizouk

---

## Résultats des Tests

### Compilation
✅ **Succès** - Serveur démarre en 111ms
✅ **Aucune erreur** de build
✅ **html5-qrcode** chargé correctement

### À Tester Manuellement
⏳ Scanner avec caméra (nécessite appareil physique)
⏳ Détection QR codes en conditions réelles
⏳ Performance sur mobile
⏳ Intégration complète du workflow

---

## Prochaines Étapes

1. **Tester avec un appareil réel** (smartphone ou webcam)
2. **Scanner plusieurs QR codes** pour valider la stabilité
3. **Tester sur différents navigateurs** (Chrome, Firefox, Safari, Edge)
4. **Tester sur mobile** (iOS et Android)
5. **Valider l'intégration** avec toutes les fonctionnalités

---

## Notes Techniques

**Format des données scannées :**
```json
{
  "id": "1234567890",
  "name": "Enceinte JBL PRX815W",
  "reference": "BZK-001",
  "category": "Sonorisation",
  "type": "BIZOUK_MATERIAL"
}
```

**Configuration du scanner :**
- FPS: 10
- Zone: 250x250px
- Caméra: arrière (mobile)
- Niveau détection: automatique

---

## Commande pour Lancer les Tests

```bash
# Le serveur est déjà lancé sur :
http://localhost:5173/

# Pour arrêter le serveur :
# Ctrl+C dans le terminal
```

---

**Status Final : ✅ Prêt pour les tests manuels**

Le scanner QR Code est compilé sans erreur et prêt à être testé avec une caméra réelle !
