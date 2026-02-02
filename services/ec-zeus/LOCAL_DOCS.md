# Running OpenAPI Documentation Locally

This guide shows you how to view and test the OpenAPI documentation locally.

## Option 1: Using Redoc CLI (Recommended)

Redoc provides a beautiful, interactive documentation interface for OpenAPI 3.0 specs.

### Setup
```bash
cd services/ec-zeus
npm install
```

### Run Documentation Server

**View User API docs:**
```bash
npm run docs:serve:user
# Opens at http://localhost:8080
```

**View B2B API docs:**
```bash
npm run docs:serve:b2b
# Opens at http://localhost:8081
```

**View both simultaneously:**
```bash
npm run docs:serve:all
# User API: http://localhost:8080
# B2B API: http://localhost:8081
```

### Generate Static HTML Files

You can also generate static HTML files for offline viewing:

```bash
npm run docs:build:user   # Creates docs/user-api.html
npm run docs:build:b2b    # Creates docs/b2b-api.html
```

Then open the HTML files in your browser.

### Unified docs (B2B + User API + auth guide)

One page with auth guide and both APIs in separate sections:

```bash
npm run docs:tryit:b2b
# Serves docs at http://localhost:8000
# Open http://localhost:8000/api-docs-unified.html
```

**http://localhost:8000/api-docs-unified.html** shows:
1. **Authentication** – Rendered from `docs/auth-process.md` (auth code and access token for B2B and User API).
2. **B2B API** – Swagger UI for `ec-api-doc-b2b-dev.yaml`.
3. **User API** – Swagger UI for `ec-api-doc-dev.yaml`.

Edit `docs/auth-process.md` to change the auth process description.

---

## Option 2: Using Swagger Editor (Online)

1. Go to https://editor.swagger.io/
2. Click **File** → **Import file**
3. Select your YAML file:
   - `docs/ec-api-doc-dev.yaml` (User API)
   - `docs/ec-api-doc-b2b-dev.yaml` (B2B API)
4. View and edit the documentation in the browser

---

## Option 3: Using Swagger UI (Simple HTTP Server)

If you have Python installed:

```bash
cd services/ec-zeus/docs

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then visit: http://localhost:8000 and open your YAML file.

**Note:** This only serves the raw YAML. For better viewing, use Option 1 or 2.

---

## Option 4: Using VS Code Extension

1. Install the **"OpenAPI (Swagger) Editor"** extension in VS Code
2. Open any `.yaml` file from `docs/` folder
3. Click the preview icon to view formatted documentation

---

## Option 5: Enable Swagger UI in Express Server

The `ec-odin-service` has Swagger UI available but commented out. To enable it:

1. Uncomment lines in `services/ec-odin-service/server.js`:
   ```javascript
   const swaggerUi = require('swagger-ui-express');
   const swaggerDocument = require('../config/swagger.json');
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
   ```

2. **Note:** The existing `swagger.json` is Swagger 2.0 format. For OpenAPI 3.0 support, you'd need to:
   - Convert YAML to JSON, or
   - Use a different library that supports OpenAPI 3.0

---

## GitHub Pages (test docs live)

To host the Try-it and unified docs on GitHub Pages (e.g. `https://<username>.github.io/swaggerDoc/`):

1. **Enable Pages from Actions**  
   Repo → **Settings** → **Pages** → Source: **GitHub Actions**.

2. **Push the workflow**  
   The workflow `.github/workflows/deploy-docs-pages.yaml` deploys `services/ec-zeus/docs` on push to `develop` or `main`. Push your branch; after the workflow runs, the site is live.

3. **Open the docs**  
   - B2B Try-it: `https://<username>.github.io/swaggerDoc/b2b-api-tryit.html`  
   - Unified (B2B + User + auth): `https://<username>.github.io/swaggerDoc/api-docs-unified.html`  
   - RapiDoc: `https://<username>.github.io/swaggerDoc/b2b-api-rapidoc.html`  

Replace `<username>` and `swaggerDoc` with your GitHub username and repo name.

---

## Quick Reference

| Method | Port | Best For |
|--------|------|----------|
| Redoc CLI | 8080/8081 | Interactive viewing, testing |
| Swagger Editor | Online | Editing and validation |
| Static HTML | N/A | Offline viewing, sharing |
| VS Code Extension | N/A | Quick preview while editing |

---

## Troubleshooting

**Port already in use?**
- Change the port in `package.json` scripts (e.g., `--port 8082`)

**Redoc not found?**
- Run `npm install` in `services/ec-zeus/`

**YAML validation errors?**
- Run `npm run validate:dev` to check for issues
