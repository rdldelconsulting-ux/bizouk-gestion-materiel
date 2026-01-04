# Guide de Déploiement - Bizouk Gestion Matériel

## ✅ Build de Production Réussi

**Résultats du build :**
- Taille index.html : 0.56 kB (gzip: 0.35 kB)
- Taille CSS : 31.26 kB (gzip: 10.02 kB)
- Taille JS : 716.73 kB (gzip: 213.87 kB)
- Temps de build : 1.32s
- **Status : Prêt pour la production** ✅

---

## 📦 Contenu du Build

Le dossier `dist/` contient :
- `index.html` - Page HTML principale
- `assets/` - Fichiers CSS et JavaScript optimisés
- Tous les assets sont hashés pour le cache-busting

---

## 🚀 Options de Déploiement

### Option 1 : Vercel (Recommandé) ⭐

**Avantages :**
- Déploiement automatique depuis GitHub
- HTTPS automatique
- CDN global
- Prévisualisations automatiques des PR
- Gratuit pour les projets personnels

#### Déploiement via GitHub

1. **Créer un dépôt GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Bizouk Gestion Matériel"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/bizouk-gestion-materiel.git
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez "New Project"
   - Importez votre dépôt GitHub
   - Vercel détecte automatiquement Vite
   - Cliquez "Deploy"

3. **Configuration automatique**
   - Build Command : `npm run build`
   - Output Directory : `dist`
   - Framework Preset : Vite

#### Déploiement via CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

**Fichier de configuration : `vercel.json` ✅**

---

### Option 2 : Netlify

**Avantages :**
- Interface simple
- Déploiement drag-and-drop
- HTTPS automatique
- Formulaires et fonctions serverless
- Gratuit avec des limites généreuses

#### Méthode 1 : Drag and Drop

1. **Build local**
   ```bash
   npm run build
   ```

2. **Netlify Drop**
   - Allez sur [app.netlify.com/drop](https://app.netlify.com/drop)
   - Glissez-déposez le dossier `dist/`
   - Votre site est en ligne !

#### Méthode 2 : GitHub

1. **Push sur GitHub** (voir étapes Vercel ci-dessus)

2. **Connecter à Netlify**
   - Allez sur [app.netlify.com](https://app.netlify.com)
   - "New site from Git"
   - Sélectionnez votre dépôt
   - Configuration :
     - Build command : `npm run build`
     - Publish directory : `dist`
   - Cliquez "Deploy site"

#### Méthode 3 : Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Initialiser
netlify init

# Déployer
netlify deploy

# Déployer en production
netlify deploy --prod
```

**Fichier de configuration : `netlify.toml` ✅**

---

### Option 3 : GitHub Pages

**Avantages :**
- Gratuit
- Intégré à GitHub
- Bon pour les projets open source

#### Déploiement

1. **Installer gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Ajouter au package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://VOTRE_USERNAME.github.io/bizouk-gestion-materiel"
   }
   ```

3. **Modifier vite.config.js**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/bizouk-gestion-materiel/', // Nom du dépôt
   })
   ```

4. **Déployer**
   ```bash
   npm run deploy
   ```

5. **Activer GitHub Pages**
   - Allez dans Settings → Pages
   - Source : Deploy from a branch
   - Branch : gh-pages / (root)
   - Save

**URL finale :** `https://VOTRE_USERNAME.github.io/bizouk-gestion-materiel`

---

### Option 4 : Serveur VPS (DigitalOcean, AWS, etc.)

**Pour les utilisateurs avancés**

#### 1. Préparer le serveur

```bash
# Se connecter au serveur
ssh user@your-server.com

# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer Nginx
sudo apt-get install nginx
```

#### 2. Déployer l'application

```bash
# Cloner le dépôt
git clone https://github.com/VOTRE_USERNAME/bizouk-gestion-materiel.git
cd bizouk-gestion-materiel

# Installer les dépendances
npm install

# Build
npm run build
```

#### 3. Configurer Nginx

```bash
sudo nano /etc/nginx/sites-available/bizouk
```

**Configuration :**
```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    root /var/www/bizouk-gestion-materiel/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache des assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Permissions pour la caméra (scanner QR)
    add_header Permissions-Policy "camera=*, geolocation=*, microphone=()";
}
```

#### 4. Activer et redémarrer Nginx

```bash
sudo ln -s /etc/nginx/sites-available/bizouk /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. HTTPS avec Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

---

### Option 5 : Docker

**Dockerfile** (créez ce fichier) :

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf** (créez ce fichier) :

```nginx
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Commandes Docker :**

```bash
# Build l'image
docker build -t bizouk-gestion-materiel .

# Lancer le conteneur
docker run -d -p 80:80 bizouk-gestion-materiel

# Avec docker-compose
docker-compose up -d
```

**docker-compose.yml** (créez ce fichier) :

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

---

## ⚙️ Configuration pour la Production

### HTTPS Requis pour :
- ✅ Scanner QR Code (accès caméra)
- ✅ Géolocalisation GPS
- ✅ Service Workers (si ajoutés)

**Toutes les plateformes mentionnées fournissent HTTPS automatiquement** ✅

### Variables d'Environnement

Si vous avez besoin de variables d'environnement :

1. **Créer `.env.production`**
   ```
   VITE_APP_NAME=Bizouk Gestion Matériel
   VITE_API_URL=https://api.votre-domaine.com
   ```

2. **Utiliser dans le code**
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

3. **Configurer sur la plateforme**
   - **Vercel :** Settings → Environment Variables
   - **Netlify :** Site settings → Build & deploy → Environment

---

## 🔍 Checklist Pré-Déploiement

Avant de déployer, vérifiez :

- [ ] `npm run build` fonctionne sans erreur
- [ ] `npm run preview` affiche correctement l'app
- [ ] Toutes les fonctionnalités testées localement
- [ ] Scanner QR fonctionne (nécessite HTTPS en prod)
- [ ] Import/Export CSV fonctionnent
- [ ] Carte Leaflet s'affiche
- [ ] localStorage persiste les données
- [ ] Responsive sur mobile
- [ ] Pas d'erreurs dans la console

---

## 🧪 Test du Build en Production

**Après déploiement, testez :**

1. **Fonctionnalités principales**
   - [ ] Ajout/Édition/Suppression matériel
   - [ ] Assignation avec GPS
   - [ ] Mise H.S et historique
   - [ ] Carte interactive

2. **Import/Export**
   - [ ] Import CSV
   - [ ] Export CSV
   - [ ] Export historique pannes

3. **QR Codes**
   - [ ] Génération QR codes
   - [ ] Impression QR codes
   - [ ] Scanner QR codes (HTTPS requis)
   - [ ] Téléchargement SVG

4. **Performance**
   - [ ] Chargement rapide (< 3s)
   - [ ] Pas de ralentissement
   - [ ] Cache fonctionne

---

## 📊 Monitoring et Analytics

### Google Analytics (optionnel)

1. **Installer**
   ```bash
   npm install react-ga4
   ```

2. **Configurer dans `main.jsx`**
   ```javascript
   import ReactGA from 'react-ga4'

   ReactGA.initialize('G-XXXXXXXXXX')
   ReactGA.send('pageview')
   ```

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```javascript
import { Analytics } from '@vercel/analytics/react'

// Dans App.jsx
<Analytics />
```

---

## 🔒 Sécurité

### Headers de Sécurité (déjà configurés)

- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy pour caméra/GPS

### localStorage

⚠️ **Important :** Les données sont stockées localement dans le navigateur

**Pour une vraie production avec plusieurs utilisateurs :**
- Envisagez un backend (Firebase, Supabase, etc.)
- Synchronisation cloud
- Backup automatique

---

## 🚦 Déploiement Continu (CI/CD)

### GitHub Actions (exemple)

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
```

---

## 📱 PWA (Progressive Web App) - Optionnel

Pour transformer en PWA :

1. **Installer vite-plugin-pwa**
   ```bash
   npm install -D vite-plugin-pwa
   ```

2. **Configurer vite.config.js**
   ```javascript
   import { VitePWA } from 'vite-plugin-pwa'

   export default defineConfig({
     plugins: [
       react(),
       VitePWA({
         registerType: 'autoUpdate',
         manifest: {
           name: 'Bizouk Gestion Matériel',
           short_name: 'Bizouk',
           theme_color: '#FFD700',
           background_color: '#000000',
           icons: [...]
         }
       })
     ]
   })
   ```

---

## 🎯 Recommandation Finale

**Pour un déploiement rapide et simple :**

1. **Vercel** (recommandé) - Meilleur pour React/Vite
2. **Netlify** - Alternative excellente
3. **GitHub Pages** - Gratuit et simple

**Commandes à exécuter maintenant :**

```bash
# 1. Initialiser Git (si pas fait)
git init
git add .
git commit -m "Initial commit - Bizouk Gestion Matériel"

# 2. Créer un dépôt sur GitHub et push
git remote add origin https://github.com/VOTRE_USERNAME/bizouk-gestion-materiel.git
git push -u origin main

# 3. Déployer sur Vercel
npm install -g vercel
vercel login
vercel --prod
```

**Votre application sera en ligne en moins de 5 minutes !** 🚀

---

## 📞 Support

**Problèmes courants :**

1. **Build échoue :** Vérifiez `npm run build` localement
2. **404 sur refresh :** Vérifiez les redirections (vercel.json, netlify.toml)
3. **Scanner QR ne fonctionne pas :** Vérifiez que le site est en HTTPS
4. **Carte ne s'affiche pas :** Vérifiez les permissions Leaflet

---

**Documentation complète créée !**

Tous les fichiers de configuration sont prêts :
- ✅ vercel.json
- ✅ netlify.toml
- ✅ .gitignore
- ✅ public/_redirects

**L'application est prête pour le déploiement en production !** 🎉
