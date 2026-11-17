# cutemoji

Static multilingual text tools. Production: https://cutemoji.pages.dev/

## Features
Kaomoji, text dividers, copypasta, ASCII/Braille art, fancy text, decorated nicknames, username suggestions and local image-to-Braille conversion. Favorites, recent copies and MY remain in browser storage; JSON backup is available.

## Hosting
Serve this directory directly with Cloudflare Pages or GitHub Pages. No build dependencies. Cloudflare is connected to `thenovary/cutemoji`. Canonicals and the sitemap use `https://cutemoji.pages.dev/`; GitHub Pages is an alternate host and does not request ads. Keep `.nojekyll` for GitHub Pages.

13 locales × 8 feature URLs are pre-rendered. `seo.js` updates metadata and URLs when tools/language change without resetting in-memory inputs. Locale-specific URLs take precedence over saved language. Root uses the saved/browser language. Language alternatives are declared with hreflang and included in sitemap.xml; there is no duplicate language link menu.

To regenerate after editing translations or SEO labels: `python3 build-seo.py`. The root index is the shared template. Validation scripts are maintained in the local development workspace.

## AdSense
`site-config.js` contains public publisher and ad-unit identifiers. Live requests are restricted to HTTPS on cutemoji.pages.dev and require enabled/consentReady flags. There are no ad mockups or preview query switches. In-feed units appear every 15 faces/dividers or 6 phrases/art items, with no duplicate trailing unit. A responsive display unit follows eligible public results. Favorites, recent, MY and empty lists do not request ads. The image converter's display slot stays hidden until an image is loaded. Ads are lazy requested, not refreshed on each edit. Unfilled or failed units collapse.

Ad delivery still requires Google's approval, available inventory and applicable consent. Code integration does not guarantee approval or search indexing. Do not click your own live ads while testing; localhost requests no ads.

## Privacy
Image conversion happens locally in Canvas. There is no upload API. Clearing an image removes its preview/output; no example image is automatically loaded. Ad/consent and external donation services have their own data processing described in the privacy page.
