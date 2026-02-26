# Deployment Guide (GitHub Pages)

To see your portfolio live on GitHub Pages, follow these steps:

## 1. Prepare for Deployment
I have already updated your `vite.config.js` to handle the GitHub URL structure.

## 2. Push to GitHub
If you haven't uploaded your project to GitHub yet:
1. Create a new repository on [GitHub](https://github.com/new).
2. Open your terminal in the `portfolio` folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## 3. Deploy using GitHub Actions (Recommended)
This is the modern way to deploy Vite projects:
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Click **Configure** on the "Static HTML" workflow (or search for a "Vite" workflow).
5. Paste the following configuration into the workflow file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: ["main"]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - uses: actions/deploy-pages@v4
```
6. Commit the file. GitHub will now automatically deploy your site whenever you push changes!

## 4. Alternative: Simple `gh-pages` Package
If you prefer a simpler command-line approach:
1. Install the deploy package: `npm install gh-pages --save-dev`
2. Add these scripts to your `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run deploy`

> [!IMPORTANT]
> Since this is a client-side app using `localStorage`, your admin changes made on `localhost` won't automatically show up on the live site. You will need to log in to the live site's admin panel and upload your info there once it's live!
