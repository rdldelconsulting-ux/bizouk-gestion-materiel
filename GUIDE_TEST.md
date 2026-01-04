# Guide de Test - Import/Export CSV

## Résultats de la Compilation

✅ **Le projet compile sans erreur**
- Serveur Vite lancé avec succès sur http://localhost:5173/
- Aucune erreur de build détectée
- Toutes les dépendances installées correctement

## Fichiers de Test Créés

1. **test_import.csv** - Fichier de test avec 10 matériels valides
2. **test_import_with_errors.csv** - Fichier de test avec erreurs de validation

---

## Test 1: Export CSV (Matériel)

### Procédure:
1. Lancez le projet: `npm run dev`
2. Ouvrez http://localhost:5173/ dans votre navigateur
3. Ajoutez quelques matériels manuellement via le bouton "Ajouter Matériel":
   - Nom: Enceinte JBL
   - Référence: TEST-001
   - Catégorie: Sonorisation
   - Description: Test d'export

4. Cliquez sur le bouton **"Exporter CSV"** dans le header
5. Un fichier `bizouk_materiel_YYYY-MM-DD.csv` devrait être téléchargé

### Résultat attendu:
- Fichier CSV téléchargé avec succès
- Contient toutes les colonnes: Nom, Référence, Catégorie, Description, Statut, etc.
- Encodage UTF-8 (accents préservés)
- Compatible Excel (ouvrir le fichier dans Excel pour vérifier)

---

## Test 2: Export CSV (Filtré)

### Procédure:
1. Ajoutez plusieurs matériels avec différents statuts
2. Utilisez la barre de recherche pour filtrer (ex: "JBL")
3. OU utilisez le filtre de statut (ex: "Disponible")
4. Cliquez sur **"Exporter CSV"**

### Résultat attendu:
- Le bouton affiche "Exporter filtre" quand un filtre est actif
- Le fichier contient UNIQUEMENT les matériels filtrés
- Pas tous les matériels

---

## Test 3: Export Historique des Pannes

### Procédure:
1. Ajoutez du matériel
2. Assignez-le (bouton "Assigner")
3. Mettez-le Hors Service (bouton "H.S")
   - Décrivez un problème: "Haut-parleur endommagé"
4. Répétez avec plusieurs matériels
5. Cliquez sur **"Export Pannes"** dans le header

### Résultat attendu:
- Fichier `bizouk_historique_pannes_YYYY-MM-DD.csv` téléchargé
- Contient: Matériel, Référence, Catégorie, Problème, Date, GPS
- Une ligne par panne enregistrée

---

## Test 4: Télécharger le Modèle CSV

### Procédure:
1. Cliquez sur le bouton **"Modèle"** (icône upload inversée)

### Résultat attendu:
- Fichier `bizouk_template_import.csv` téléchargé
- Contient les en-têtes: Nom, Référence, Catégorie, Description
- Contient une ligne d'exemple

---

## Test 5: Import CSV Valide

### Procédure:
1. Cliquez sur **"Importer CSV"**
2. Sélectionnez le fichier **test_import.csv** (créé automatiquement)
3. Une modal s'ouvre avec:
   - ✅ Valides: 10 matériels
   - ❌ Erreurs: 0 lignes
4. Vérifiez l'aperçu des matériels
5. Cliquez sur **"Importer (10)"**

### Résultat attendu:
- Message de confirmation: "10 matériels importés avec succès !"
- Les 10 matériels apparaissent dans la liste
- Tous ont le statut "Disponible"
- Compteur "Total" incrémenté de 10

---

## Test 6: Import CSV avec Erreurs

### Procédure:
1. Cliquez sur **"Importer CSV"**
2. Sélectionnez **test_import_with_errors.csv**
3. La modal affiche:
   - ✅ Valides: 3 matériels
   - ❌ Erreurs: 2 lignes

### Résultat attendu:
- Section "Erreurs détectées" visible
- Affiche les erreurs:
  - "Ligne 3: Le nom est obligatoire"
  - "Ligne 4: La référence est obligatoire"
- Aperçu montre UNIQUEMENT les 3 matériels valides
- L'import ne prend que les lignes valides

---

## Test 7: Détection de Doublons

### Procédure:
1. Ajoutez manuellement un matériel avec la référence "BZK-001"
2. Tentez d'importer **test_import.csv** (qui contient aussi BZK-001)

### Résultat attendu:
- La modal affiche une erreur:
  - "Ligne X: La référence "BZK-001" existe déjà"
- La ligne avec doublon est rejetée
- Les autres lignes (sans doublon) peuvent être importées

---

## Test 8: Import avec Caractères Spéciaux

### Procédure:
1. Ouvrez **test_import_with_errors.csv**
2. Notez la ligne avec: "Câble XLR, 20m" (virgule dans le nom)
3. Importez le fichier

### Résultat attendu:
- Le parsing gère correctement les guillemets
- Le nom est correctement importé avec la virgule
- Pas d'erreur de parsing

---

## Test 9: Workflow Complet Export → Modifier → Import

### Procédure:
1. Exportez vos matériels actuels
2. Ouvrez le CSV dans Excel/LibreOffice
3. Modifiez quelques valeurs (descriptions, catégories)
4. Supprimez les colonnes de statut/assignation (gardez: Nom, Ref, Cat, Desc)
5. Changez les références pour éviter les doublons
6. Sauvegardez le fichier
7. Importez-le

### Résultat attendu:
- Import réussi avec les nouvelles données
- Les modifications sont prises en compte
- Format compatible entre export et import

---

## Test 10: Vérification de la Persistance

### Procédure:
1. Importez des matériels
2. Fermez le navigateur
3. Rouvrez l'application

### Résultat attendu:
- Les matériels importés sont toujours là
- localStorage fonctionne correctement

---

## Checklist Complète

- [ ] Export CSV matériel (complet)
- [ ] Export CSV matériel (filtré)
- [ ] Export historique pannes
- [ ] Téléchargement modèle CSV
- [ ] Import CSV valide (10 matériels)
- [ ] Import CSV avec erreurs (validation)
- [ ] Détection doublons
- [ ] Parsing caractères spéciaux
- [ ] Workflow export → import
- [ ] Persistance localStorage

---

## Commandes Rapides

```bash
# Lancer le projet
npm run dev

# Ouvrir dans le navigateur
open http://localhost:5173/
```

## Notes Techniques

### Format CSV Attendu:
```csv
Nom,Référence,Catégorie,Description
Enceinte JBL,BZK-001,Sonorisation,Description ici
```

### Colonnes Obligatoires:
- ✅ Nom
- ✅ Référence

### Colonnes Optionnelles:
- Catégorie (défaut: Sonorisation)
- Description

### Encodage:
- UTF-8 avec BOM (compatible Excel)
- Gestion des accents
- Échappement automatique des virgules et guillemets

## Bugs Potentiels à Vérifier

1. Import de fichiers très volumineux (>1000 lignes)
2. Noms avec caractères spéciaux: @, #, €, etc.
3. Descriptions très longues (>500 caractères)
4. Fichiers CSV sans BOM
5. Fichiers CSV avec encodage différent (ISO-8859-1)

---

**Tous les tests de compilation sont passés ✅**
**Prêt pour les tests d'interface utilisateur !**
