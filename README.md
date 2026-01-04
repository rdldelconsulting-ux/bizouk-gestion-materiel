# Bizouk - Gestion Matériel Événementiel

Application web de gestion de matériel événementiel avec géolocalisation et suivi des pannes.

## Fonctionnalités

- **Gestion complète du matériel** : Ajout, modification, suppression
- **Assignation avec GPS** : Capture automatique de la position lors de l'assignation
- **Système H.S** : Mise hors service avec description du problème
- **Historique des pannes** : Suivi complet de toutes les pannes par matériel
- **Carte interactive** : Visualisation géolocalisée du matériel avec Leaflet
- **QR Codes** : Génération, impression et téléchargement de QR codes pour chaque matériel
- **Scanner QR Code** : Scan avec caméra pour rechercher instantanément un matériel
- **Import/Export CSV** : Import en masse et export des données avec validation
- **Recherche et filtres** : Recherche par nom/référence et filtres par statut
- **Statistiques** : Dashboard avec Total, Disponible, Assigné, H.S
- **Persistance** : Données sauvegardées dans localStorage

## Style Bizouk

- Fond noir (#000000, #1a1a1a)
- Couleur principale : Jaune/Or (#FFD700, #FFC700)
- Logo BIZOUK avec étoile au centre du O

## Installation

```bash
npm install
```

## Lancement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## Build

```bash
npm run build
```

## Déploiement en Production 🚀

L'application est **prête pour la production** avec build optimisé !

### Déploiement Rapide (5 minutes)

**Option 1 - Vercel (Recommandé) :**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option 2 - Netlify Drop :**
```bash
npm run build
# Puis glissez le dossier dist/ sur netlify.com/drop
```

**Option 3 - GitHub Pages :**
```bash
npm install --save-dev gh-pages
npm run deploy
```

📖 **Guide complet :** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
⚡ **Démarrage rapide :** [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

### Fichiers de Configuration Inclus

- ✅ `vercel.json` - Configuration Vercel
- ✅ `netlify.toml` - Configuration Netlify
- ✅ `public/_redirects` - Redirections SPA
- ✅ `.gitignore` - Fichiers à ignorer

### Résultats du Build

- **Taille totale (gzip) :** ~224 KB
- **Temps de build :** 1.32s
- **Status :** ✅ Prêt pour production

## Technologies

- React 18
- Vite
- Tailwind CSS
- Leaflet (cartes interactives)
- qrcode.react (génération QR codes)
- html5-qrcode (scan QR codes avec caméra)
- lucide-react (icônes)
- localStorage (persistance)

## Structure du projet

```
src/
├── App.jsx                      # Composant principal avec logique
├── main.jsx                     # Point d'entrée
├── index.css                    # Styles globaux
└── components/
    ├── Logo.jsx                 # Logo Bizouk
    ├── MaterialForm.jsx         # Formulaire ajout/édition
    ├── MaterialList.jsx         # Liste du matériel
    ├── MaterialDetailModal.jsx  # Modal détails complet d'un matériel
    ├── AssignmentModal.jsx      # Modal d'assignation avec GPS
    ├── HSModal.jsx              # Modal mise hors service
    ├── HistoryPanel.jsx         # Historique des pannes
    ├── MapView.jsx              # Carte interactive Leaflet
    ├── QRCodeModal.jsx          # Modal QR Code (visualisation/impression)
    ├── QRCodePrintAll.jsx       # Impression en masse des QR codes
    ├── QRScanner.jsx            # Scanner QR Code avec caméra
    ├── ExportButton.jsx         # Export CSV
    └── ImportButton.jsx         # Import CSV
```

## Documentation Complémentaire

### Fonctionnalités
- **[QRCODE_FEATURES.md](QRCODE_FEATURES.md)** - Guide complet des fonctionnalités QR Code
- **[QRCODE_SCANNER.md](QRCODE_SCANNER.md)** - Guide d'utilisation du scanner QR Code
- **[GUIDE_TEST.md](GUIDE_TEST.md)** - Guide de test Import/Export CSV
- **[TEST_SCANNER_QR.md](TEST_SCANNER_QR.md)** - Tests du scanner QR Code

### Déploiement
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Guide de déploiement complet (Vercel, Netlify, GitHub Pages, VPS, Docker)
- **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - Déploiement rapide en 5 minutes

## Licence

© 2026 Bizouk
