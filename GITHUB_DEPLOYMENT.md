# 🚀 Déploiement sur GitHub Pages - Guide Complet

## ✅ Préparation Terminée

Le projet est **100% prêt** pour GitHub :

- ✅ Dépôt Git initialisé
- ✅ Premier commit créé (39 fichiers, 8381 lignes)
- ✅ Configuration GitHub Pages (vite.config.js)
- ✅ Workflow GitHub Actions créé
- ✅ .gitignore configuré

---

## 📋 Étape 1 : Créer le Repository GitHub

### Option A : Via l'Interface Web (Recommandé)

1. **Allez sur GitHub**
   - Ouvrez [github.com](https://github.com)
   - Connectez-vous au compte **rdldelconsulting**

2. **Créer un nouveau repository**
   - Cliquez sur le bouton **"+"** (en haut à droite)
   - Sélectionnez **"New repository"**

3. **Configurer le repository**
   ```
   Repository name: bizouk-gestion-materiel
   Description: Application de gestion de matériel événementiel avec QR codes et GPS
   Visibility: Public (ou Private selon préférence)

   ⚠️ NE PAS cocher :
   - [ ] Add a README file
   - [ ] Add .gitignore
   - [ ] Choose a license

   (Ces fichiers existent déjà dans votre projet local)
   ```

4. **Cliquez sur "Create repository"**

### Option B : Via GitHub CLI

```bash
# Installer GitHub CLI (si pas déjà fait)
brew install gh  # Mac
# ou
winget install GitHub.cli  # Windows

# Se connecter
gh auth login

# Créer le repository
gh repo create bizouk-gestion-materiel --public --source=. --remote=origin --push
```

---

## 📤 Étape 2 : Pousser le Code sur GitHub

**Exécutez ces commandes dans le terminal :**

```bash
# Ajouter le remote (remplacez par l'URL de votre repo)
git remote add origin https://github.com/rdldelconsulting/bizouk-gestion-materiel.git

# Pousser le code
git push -u origin main
```

**✅ Résultat attendu :**
```
Enumerating objects: 44, done.
Counting objects: 100% (44/44), done.
Delta compression using up to 8 threads
Compressing objects: 100% (41/41), done.
Writing objects: 100% (44/44), XX.XX KiB | XX.XX MiB/s, done.
Total 44 (delta 2), reused 0 (delta 0), pack-reused 0
To https://github.com/rdldelconsulting/bizouk-gestion-materiel.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## ⚙️ Étape 3 : Activer GitHub Pages

1. **Allez dans les Settings du repository**
   - Sur GitHub, cliquez sur **"Settings"** (en haut du repository)

2. **Accédez à Pages**
   - Dans le menu latéral gauche, cliquez sur **"Pages"**

3. **Configurer la source**
   ```
   Source: GitHub Actions
   ```

   **OU si l'option "GitHub Actions" n'apparaît pas :**
   ```
   Source: Deploy from a branch
   Branch: gh-pages / (root)
   ```

4. **Sauvegarder**
   - Les changements sont automatiquement sauvegardés

---

## 🤖 Étape 4 : Déploiement Automatique

### Le Workflow GitHub Actions

Le workflow `.github/workflows/deploy.yml` va :

1. **Se déclencher automatiquement** à chaque push sur `main`
2. **Installer les dépendances** (`npm ci`)
3. **Builder le projet** (`npm run build`)
4. **Déployer sur GitHub Pages**

### Vérifier le Déploiement

1. **Allez dans l'onglet "Actions"** du repository
2. **Vous verrez le workflow "Deploy to GitHub Pages"** en cours
3. **Attendez** que le workflow se termine (environ 1-2 minutes)
4. **✅ Statut :** Vert avec une coche = Déploiement réussi

---

## 🌐 Étape 5 : Accéder à l'Application

**URL de votre application :**

```
https://rdldelconsulting.github.io/bizouk-gestion-materiel/
```

**Vérifiez que :**
- ✅ L'application se charge
- ✅ Le style Bizouk s'affiche (fond noir, couleurs or)
- ✅ Le logo BIZOUK avec étoile est visible
- ✅ HTTPS est activé (cadenas 🔒 dans la barre d'adresse)

---

## 🧪 Test Post-Déploiement

### Tests Essentiels

1. **Scanner QR Code**
   - Cliquez sur "Scanner"
   - Autorisez la caméra
   - ✅ Le scanner doit fonctionner (HTTPS requis)

2. **Géolocalisation GPS**
   - Créez un matériel
   - Cliquez "Assigner"
   - ✅ La position GPS doit être capturée

3. **Import/Export CSV**
   - Testez l'import d'un fichier CSV
   - Testez l'export
   - ✅ Les fichiers doivent se télécharger

4. **Carte Interactive**
   - Allez dans l'onglet "Carte"
   - Assignez un matériel avec GPS
   - ✅ Le matériel doit apparaître sur la carte

5. **Persistance des Données**
   - Ajoutez du matériel
   - Fermez le navigateur
   - Rouvrez l'application
   - ✅ Les données doivent être toujours là (localStorage)

---

## 🔧 Dépannage

### Problème 1 : Le workflow échoue

**Erreur : "Process completed with exit code 1"**

**Solution :**
1. Vérifiez les logs dans l'onglet "Actions"
2. Assurez-vous que `package.json` est correct
3. Testez localement : `npm ci && npm run build`

### Problème 2 : Page 404 après déploiement

**Solutions :**
1. Attendez 5-10 minutes (propagation DNS)
2. Videz le cache du navigateur (Ctrl+Shift+R)
3. Vérifiez que GitHub Pages est bien activé dans Settings
4. Vérifiez l'URL : doit être `/bizouk-gestion-materiel/` (avec slash final)

### Problème 3 : Scanner QR ne fonctionne pas

**Cause :** Permissions caméra ou HTTPS

**Solutions :**
1. Vérifiez que l'URL commence par `https://`
2. Autorisez la caméra dans les paramètres du navigateur
3. Testez sur un autre navigateur (Chrome recommandé)

### Problème 4 : Les assets (CSS/JS) ne chargent pas

**Cause :** Mauvaise configuration de la base

**Solution :**
Vérifiez `vite.config.js` :
```javascript
base: '/bizouk-gestion-materiel/',  // Doit correspondre au nom du repo
```

---

## 🔄 Mise à Jour du Site

**Pour déployer des modifications :**

```bash
# 1. Apporter vos modifications au code

# 2. Commit
git add .
git commit -m "Description de vos modifications"

# 3. Push
git push

# 4. GitHub Actions redéploie automatiquement !
```

**Le site sera mis à jour en 1-2 minutes.**

---

## 📊 Statistiques GitHub

**Après le premier déploiement, vous aurez accès à :**

- **Traffic :** Nombre de visiteurs
- **Clones :** Nombre de clones du repository
- **Forks :** Si d'autres utilisent votre code
- **Stars :** Nombre d'étoiles

**Accès :** Repository → Insights → Traffic

---

## 🎨 Personnalisation

### Changer le Nom de Domaine

**Option 1 : Utiliser un sous-domaine personnalisé**

1. Ajoutez un fichier `CNAME` à la racine :
   ```
   materiel.votredomaine.com
   ```

2. Configurez le DNS chez votre hébergeur :
   ```
   Type: CNAME
   Name: materiel
   Value: rdldelconsulting.github.io
   ```

**Option 2 : Apex domain**

Voir [docs.github.com/pages/custom-domain](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## 🔒 Sécurité

### HTTPS

✅ **Activé automatiquement** par GitHub Pages

**Vérifiez :**
- Settings → Pages → Enforce HTTPS ✓

### Headers de Sécurité

Déjà configurés dans le workflow :
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Permissions-Policy (caméra, GPS)

---

## 📈 Améliorations Futures

### Analytics

**Ajouter Google Analytics :**

1. Installez :
   ```bash
   npm install react-ga4
   ```

2. Configurez dans `src/main.jsx` :
   ```javascript
   import ReactGA from 'react-ga4'
   ReactGA.initialize('G-XXXXXXXXXX')
   ```

### PWA (Progressive Web App)

**Transformer en PWA :**

```bash
npm install -D vite-plugin-pwa
```

Voir [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) pour les détails

---

## 📋 Checklist Finale

Vérifiez que tout fonctionne :

- [ ] Repository créé sur GitHub
- [ ] Code poussé sur `main`
- [ ] GitHub Pages activé
- [ ] Workflow GitHub Actions exécuté avec succès
- [ ] Site accessible sur https://rdldelconsulting.github.io/bizouk-gestion-materiel/
- [ ] HTTPS actif (cadenas 🔒)
- [ ] Scanner QR fonctionne
- [ ] GPS fonctionne
- [ ] Import/Export CSV fonctionnent
- [ ] Carte interactive fonctionne
- [ ] Données persistent (localStorage)

---

## 🎉 Félicitations !

**Votre application Bizouk est maintenant en ligne !**

**URL de production :**
```
https://rdldelconsulting.github.io/bizouk-gestion-materiel/
```

**Fonctionnalités disponibles :**
- ✅ Gestion complète du matériel
- ✅ QR Codes (génération, scan, impression)
- ✅ GPS et carte interactive
- ✅ Import/Export CSV
- ✅ Historique des pannes
- ✅ Dashboard statistiques

**Partagez cette URL avec votre équipe !** 🚀

---

## 🆘 Support

**En cas de problème :**

1. Consultez les logs GitHub Actions
2. Vérifiez la documentation : [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
3. Testez localement : `npm run build && npm run preview`
4. Vérifiez les issues GitHub du projet

---

## 📞 Contact

**Repository :** https://github.com/rdldelconsulting/bizouk-gestion-materiel

**Documentation :**
- [README.md](README.md) - Vue d'ensemble
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Guide de déploiement complet
- [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - Déploiement rapide

---

**Créé avec ❤️ pour BIZOUK**
**© 2026 Bizouk - Gestion Matériel Événementiel**
