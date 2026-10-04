<p align="center">
  <img src="./docs/imgs/avenra-logo-dark.svg#gh-dark-mode-only" alt="Avenra" width="250" />
  <img src="./docs/imgs/avenra-logo-light.svg#gh-light-mode-only" alt="Avenra" width="250" />
</p>

<h1 align="center">Payments, with a clear way forward.</h1>

<p align="center">A new merchant experience built on open-source payment infrastructure.</p>

Avenra is the brand and product direction for [this fork](https://github.com/jaimedhenriques/hyperswitch) of [Juspay's Hyperswitch](https://github.com/juspay/hyperswitch). It pairs the existing Rust payment platform with an original company website and merchant workspace in [web](web/).

The Avenra web app is a local demonstration with sample merchants, transactions, metrics, and routing controls. It does not process payments, accept real processor credentials, or connect to the backend. Running the backend remains a separate setup.

## Start the Avenra web app

Use Node.js 20.19+ or 22.12+ and npm. From the repository root:

```bash
npm --prefix web ci
npm --prefix web run dev
```

Open the URL printed by Vite. The `/` route is the company website; `/app` opens the demo merchant workspace.

```bash
npm --prefix web run typecheck
npm --prefix web exec -- playwright install chromium
npm --prefix web run test
npm --prefix web run build
```

Install Chromium once before running the Playwright browser tests. On a Linux machine without browser system dependencies, use `npm --prefix web exec -- playwright install --with-deps chromium`.

View the implemented [company website](docs/imgs/avenra-homepage.png) and [merchant workspace](docs/imgs/avenra-workspace.png) design previews.

The production build is written to `web/dist`. A production web server must serve `index.html` for client routes such as `/app`.

## What's in this fork

| Area | Location | Purpose |
| --- | --- | --- |
| Avenra web app | [web](web/) | Company website and demo merchant workspace, built with React, TypeScript, and Vite |
| Brand guide | [docs/BRANDING.md](docs/BRANDING.md) | Name, voice, colors, and original identity assets |
| Payment backend | [crates/router](crates/router/) | Existing Hyperswitch Rust services and connector infrastructure |
| Dashboard theme | [config/dashboard_theme.json](config/dashboard_theme.json) | Avenra appearance for the separately deployed upstream Control Center |
| API reference | [api-reference](api-reference/) | Avenra documentation shell around the preserved upstream API definitions |
| Upstream documentation | [docs/UPSTREAM_README.md](docs/UPSTREAM_README.md) | Original repository README, preserved for provenance and technical context |

The existing backend package names, API paths, configuration keys, payment statuses, and OpenAPI definitions retain their upstream identifiers for compatibility. The web workspace is a separate frontend; it does not replace the upstream Control Center service.

## Run the existing payment backend

For the repository's Docker or Podman setup, inspect and run the existing script:

```bash
./scripts/setup.sh
```

This upstream workflow runs payment infrastructure and its own services. Some components use upstream container images and branding. See the [preserved upstream guide](docs/UPSTREAM_README.md), [deployment notes](config/deployments/README.md), and [API reference development guide](api-reference/README.md) for details. A backend deployment needs its own accounts, connector configuration, secrets, and operational setup.

## Project status

The Avenra identity is a working product direction for this fork. Demo metrics are illustrative. Check name, domain, and trademark availability before launching a public company under this name.

## License and attribution

This fork builds on Hyperswitch by Juspay and its contributors. The upstream [Apache 2.0 license](LICENSE) and [NOTICE](NOTICE) are preserved. Brand and frontend changes do not imply affiliation with or endorsement by Juspay. Contribute to this fork through its [issues](https://github.com/jaimedhenriques/hyperswitch/issues) and [pull requests](https://github.com/jaimedhenriques/hyperswitch/pulls).
