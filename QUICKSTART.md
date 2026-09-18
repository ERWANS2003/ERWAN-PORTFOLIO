# 🚀 Guide de Démarrage Rapide

## Visualiser le Portfolio Localement

### Méthode 1: Double-clic sur index.html
La méthode la plus simple - ouvrez simplement `index.html` dans votre navigateur.

### Méthode 2: Live Server (Recommandé)
Si vous utilisez VS Code:
1. Installer l'extension "Live Server"
2. Clic droit sur `index.html`
3. Sélectionner "Open with Live Server"

### Méthode 3: Python Server
```bash
# Python 3
python -m http.server 8000

# Puis ouvrir http://localhost:8000
```

### Méthode 4: Node.js Server
```bash
npx http-server -p 8000
```

## 🎨 Tester les Fonctionnalités

### Mode Sombre
- Cliquer sur l'icône 🌙/☀️ en haut à droite
- Le thème est sauvegardé automatiquement

### Animations
- Scroller pour voir les animations d'apparition
- Survoler les cartes de projets pour l'effet 3D
- Cliquer sur les boutons pour l'effet ripple

### Navigation
- Utiliser le menu pour naviguer entre les sections
- Smooth scroll avec animation
- Barre de progression en haut de page

### CV Numérique
- Scroller jusqu'à la section CV
- Cliquer sur "Télécharger PDF" pour obtenir la version papier
- Imprimer la page avec Ctrl+P (styles d'impression optimisés)

### Particules
- Observer l'arrière-plan animé du hero
- Les particules se connectent quand elles sont proches
- Changent de couleur avec le mode sombre

## 🔧 Personnalisation Rapide

### Changer les Couleurs
Éditer `styles.css` ligne 17-20:
```css
--primary-color: #3b82f6;  /* Votre couleur */
--accent-color: #8b5cf6;   /* Votre accent */
```

### Changer les Informations
Éditer `index.html`:
- Ligne 66-70: Informations du hero
- Ligne 229-310: Expériences
- Ligne 348-445: Projets
- Ligne 756-850: Contact

### Ajouter un Projet
Copier un bloc `.project-card` dans `index.html` et modifier:
```html
<div class="project-card">
    <div class="project-image">
        <img src="URL_IMAGE" alt="Nom Projet">
    </div>
    <div class="project-content">
        <h3>Titre du Projet</h3>
        <p>Description...</p>
        <div class="project-tech">
            <span>Tech1</span>
            <span>Tech2</span>
        </div>
    </div>
</div>
```

### Remplacer l'Avatar
Remplacer le fichier:
`static/media/avatar_erwan.png`

### Remplacer le CV PDF
Remplacer le fichier:
`static/media/CV Erwan OUBDA 2026.2f3997321739e8779cd7.pdf`

## 📤 Déploiement

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/portfolio.git
git push -u origin main

# Activer GitHub Pages dans Settings > Pages
```

### Netlify (Drag & Drop)
1. Aller sur [netlify.com](https://netlify.com)
2. Glisser-déposer le dossier complet
3. Site déployé en 30 secondes !

### Vercel
```bash
npm i -g vercel
vercel --prod
```

## ✅ Checklist Avant Déploiement

- [ ] Remplacer toutes les informations personnelles
- [ ] Mettre à jour l'avatar
- [ ] Remplacer le CV PDF
- [ ] Vérifier tous les liens (GitHub, LinkedIn, email)
- [ ] Tester le formulaire de contact
- [ ] Vérifier le mode sombre
- [ ] Tester sur mobile (responsive)
- [ ] Vérifier les images de projets
- [ ] Mettre à jour les meta tags SEO
- [ ] Tester dans différents navigateurs

## 🐛 Résolution de Problèmes

### Les animations ne fonctionnent pas
- Vérifier que JavaScript est activé
- Ouvrir la console (F12) pour voir les erreurs

### Le mode sombre ne se sauvegarde pas
- Vérifier que les cookies/localStorage sont activés

### Les particules ne s'affichent pas
- Vérifier que Canvas est supporté
- Tester dans un navigateur moderne

### Les images ne chargent pas
- Vérifier les chemins d'accès
- S'assurer que les fichiers existent

## 📱 Contact

Besoin d'aide ? Contactez:
- Email: erwanoubda_tech@icloud.com
- GitHub: [@erwanoubda](https://github.com/erwanoubda)

---

**Bon développement ! 🚀**
