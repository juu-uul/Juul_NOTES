# Déploiement Juul_NOTES sur GitHub Pages

Ce dossier contient l'ensemble des fichiers prêts à l'emploi pour héberger l'application **Juul_NOTES** sur **GitHub Pages** via un simple envoi de fichiers (upload).

---

## 🚀 Guide pas à pas pour le déploiement

### Option 1 : Directement via l'interface web de GitHub (Recommandé)

1. Rendez-vous sur votre dépôt GitHub.
2. Allez dans l'onglet **Code**.
3. Glissez-déposez **TOUS les fichiers et dossiers présents dans ce dossier `GITHUB`** (pas le dossier `GITHUB` lui-même, mais son contenu) :
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `.nojekyll`
   - Le dossier `assets/`
   - Le dossier `icons/`
4. Validez le commit (*Commit changes*).
5. Dans votre dépôt GitHub, allez dans **Settings** > **Pages**.
6. Sous **Build and deployment** :
   - Source : **Deploy from a branch**
   - Branch : `main` (ou `master`) / `/(root)`
7. Cliquez sur **Save**. Votre site sera disponible en quelques instants sur `https://<votre-nom-utilisateur>.github.io/<nom-du-depot>/`.

---

## 🛠️ Contenu du dossier

- **`index.html`** : Point d'entrée web avec chemins relatifs optimisés pour les sous-domaines GitHub Pages.
- **`assets/`** : Fichiers JavaScript et CSS compilés.
- **`icons/`** : Icônes PWA.
- **`manifest.json`** : Manifeste PWA pour l'installation sur mobile/bureau.
- **`sw.js`** : Service Worker configuré pour la mise en cache hors-ligne.
- **`.nojekyll`** : Fichier désactivant le moteur Jekyll de GitHub Pages afin de garantir le chargement direct de tous les fichiers.
