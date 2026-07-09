# Aracore Website Deployment Files

Upload these files to the public web root:

- `index.html`
- `product.html`
- `usecases.html`
- `developers.html`
- `onboarding.html`
- `company.html`
- `404.html`
- `styles.css`
- `site-chrome.js`
- `site.webmanifest`
- `brand/`
- `favicon/`
- `fonts/`
- `robots.txt`
- `sitemap.xml`

Do not upload local working files or folders such as:

- `.git/`
- `.agents/`
- `.codex/`
- `ARACORE_*.md`
- `aracore-corp/`
- temporary files

Server requirements:

- Serve `index.html` as the default directory document.
- Serve the site over HTTPS.
- Prefer one canonical hostname: `https://www.aracore.io`.
- Configure unknown routes to use `404.html` when the hosting provider supports a custom 404 page.
