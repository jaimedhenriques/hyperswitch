# Avenra web

The Avenra company homepage and an interactive merchant workspace. This is a demonstration frontend for the separately deployed payment backend. It uses synthetic transactions; payments, refunds, connectors, and routing changes operate only in memory and reset when the page reloads.

## Development

```bash
cd web
npm ci
npm run dev
```

Open `/` for the company site or `/app` for the merchant workspace. No credentials or environment variables are required. The app does not accept production secrets.

## Validation

```bash
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

When using an existing Chromium installation, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path. Browser tests cover payment scopes and CSV export, transaction creation and refund state, routing validation, connector changes, settings/reset, mobile navigation, dialog keyboard behavior, and the company site's entry flow.

## Hosting

Serve the generated `dist` directory. Configure the web server to fall back to `index.html` for `/app` and its child paths. Keep backend deployment separate; this app does not proxy its APIs. Fonts and branding are self-hosted, and the frontend loads no third-party analytics or trackers.

A container setup is included with route fallback already configured:

```bash
docker compose -f web/compose.yml up --build
```

Run this command from the repository root, then open `http://localhost:8088`.

## Design and attribution

Reusable tokens are in `src/styles/global.css`. The homepage and workspace have separate stylesheets; the workspace is loaded only when entering `/app`. The [design system](../DESIGN.md), [product record](../PRODUCT.md), and [brand guide](../docs/BRANDING.md) describe the implemented identity and its limits.

Manrope is distributed under the [SIL Open Font License](public/fonts/OFL.txt). The payment backend derives from Hyperswitch; the repository's LICENSE and NOTICE preserve its attribution.
