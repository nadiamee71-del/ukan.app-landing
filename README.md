# UKAN — Landing page

Site statique en HTML/CSS/JS (une seule page : `index.html`).

## Déploiement sur Vercel (recommandé)

1. Créez un dépôt sur [GitHub](https://github.com/new) (par ex. `ukan-landing`).
2. Dans ce dossier, poussez le code :

   ```bash
   git init
   git add .
   git commit -m "Initial commit: landing UKAN"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USER/ukan-landing.git
   git push -u origin main
   ```

3. Sur [vercel.com](https://vercel.com), connectez-vous avec GitHub → **Add New Project** → importez le dépôt.
4. Laissez les réglages par défaut (Vercel détecte un site statique ; la racine sert `index.html`).
5. Cliquez sur **Deploy**. Vous obtiendrez une URL du type `https://ukan-landing.vercel.app`.

Aucun fichier de configuration n’est obligatoire : `index.html` à la racine suffit.

## Développement local

Ouvrez `index.html` dans le navigateur, ou servez le dossier :

```bash
npx serve .
```

Puis ouvrez l’URL affichée (souvent `http://localhost:3000`).

## Personnalisation

- Textes et sections : éditez `index.html`.
- Thème clair/sombre : préférence stockée dans `localStorage` sous la clé `ukan-theme`.
