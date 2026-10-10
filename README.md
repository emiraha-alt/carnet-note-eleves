# carnet-note-eleves

Application statique de gestion des notes scolaires pour les élèves.

## Fonctionnalités
- Ajouter une note avec élève, classe, matière et coefficient
- Calculer la moyenne générale pondérée
- Suivre la meilleure note
- Stockage local dans le navigateur
- Déploiement automatique vers GitHub Pages

## Lancer localement
Ouvrez simplement le fichier `index.html` dans un navigateur, ou lancez un petit serveur local :

```bash
python3 -m http.server 8000
```

Puis ouvrez : http://localhost:8000

## Mise en ligne
Le dépôt est prêt pour GitHub Pages via le workflow dans `.github/workflows/deploy-pages.yml`.
Le site est publié automatiquement à chaque push sur la branche `main`.
