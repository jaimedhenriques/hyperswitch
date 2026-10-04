# Avenra

**Payments, with a clear way forward.**

Avenra is the new public identity of [this Hyperswitch fork](https://github.com/jaimedhenriques/hyperswitch). The product brings merchant payment activity, processor connections, and routing decisions into a focused workspace. The current [web app](../web/) demonstrates that experience using sample data.

## Name and voice

Use **Avenra** in customer-facing titles, navigation, page metadata, and original documentation. Write in plain language, with short sentences and concrete verbs: “View payments,” “Connect a processor,” and “Review routing.” Explain a payment outcome before discussing its implementation.

Treat the name as a working brand until name, domain, and trademark availability have been checked. Do not invent a company address, email domain, license, certification, customer endorsement, or operating history.

## Visual identity

The original A mark uses two slanted rounded strokes joined by a crossbar. The strokes suggest a path coming together: an identity for a payment workspace that helps merchants understand their next move. The wordmark is Avenra, set with a clean sans-serif and restrained spacing.

| Asset | Usage |
| --- | --- |
| [avenra-logo-light.svg](imgs/avenra-logo-light.svg) | Evergreen wordmark on a light background |
| [avenra-logo-dark.svg](imgs/avenra-logo-dark.svg) | Ivory wordmark with a lime mark on a dark background |
| [API reference light logo](../api-reference/logo/light.svg) | Documentation in light mode |
| [API reference dark logo](../api-reference/logo/dark.svg) | Documentation in dark mode |
| [favicon.svg](../api-reference/favicon.svg) | Evergreen tile with the lime A mark |

Keep the SVG proportions intact and allow at least half the mark's width as surrounding space. Use the compact A mark in small application surfaces. At larger sizes, use the complete wordmark. Give linked logos an accessible name such as “Avenra home.”

## Color palette

| Color | Hex | Role |
| --- | --- | --- |
| Evergreen | `#153C32` | Primary text, navigation, hero surfaces, primary actions |
| Lime | `#D7EF8A` | Selected states, marks on evergreen, highlights |
| Ivory | `#F7F8F2` | Main page background and dark-surface text |
| White | `#FFFFFF` | Cards, panels, tables |
| Muted green | `#66736C` | Supporting text on light surfaces |

Pair evergreen text with lime buttons, and ivory text with evergreen surfaces. Use lime as a fill or accent on light backgrounds; it needs a darker foreground for readable text. Payment statuses require both a label and a visual cue, so their meaning does not depend on color alone.

## Product surfaces

The company site lives at `/`. The merchant demo lives at `/app`. Use the same identity, type scale, spacing, and action language across them. The dashboard should prioritize payment volume, payment outcomes, and the next operational action. Charts, customer names, amounts, and processor connections in the demo must be clearly presented as sample data.

The existing Control Center is a separate upstream application. Its [theme configuration](../config/dashboard_theme.json) carries the Avenra identity; the new web workspace does not change its implementation.

## Compatibility and attribution

Use Avenra for the original public-facing experience. Preserve `hyperswitch` where it is a backend crate, API identifier, environment key, SDK, image reference, protocol field, or upstream project name. Keep API definitions and deployment endpoints accurate to their actual service.

The [API reference configuration](../api-reference/docs.json) uses Avenra assets and this fork's repository links. The upstream Google Tag Manager and Mixpanel integrations were removed from this documentation shell.

Maintain the Apache 2.0 [LICENSE](../LICENSE) and upstream [NOTICE](../NOTICE). The original README is preserved in [UPSTREAM_README.md](UPSTREAM_README.md). Avenra's original brand does not claim ownership of the upstream platform or affiliation with Juspay.
