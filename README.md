# How Frontier Large Language Models Reshape Embodied Policies

A Comprehensive Evaluation of GPT-6-Astra on EBench.

## Local preview

Requires Node.js 22.12+ and Git LFS. The report is built with Astro; the previous website is preserved in `codex/archive-before-frontend-rewrite-20260920`.

```sh
git lfs pull --include="dist/media/**"
npm ci
npm run dev
```

Open http://127.0.0.1:4322/.

## Source organization

- `src/components/`: masthead, navigation, footer, dialog, and one component per report section in `sections/`. Component-specific styles live beside their markup.
- `src/scripts/`: benchmark, chart, and video interactions. Their shared runtime is compiled and bundled by Astro/Vite.
- `src/styles/report.css`: stylesheet entry point; imports the focused modules (reset, theme, shell, article, results, findings, media, analysis, panels, adaptive).
- `src/styles/widgets.css`: isolated evidence-widget presentation in a lower CSS layer.
- `dist/data`, `dist/media`, `dist/vendor`: versioned research assets; this directory is no longer the website source.
- `_site-next/`: generated publication output. Do not edit it.

The masthead and every section share the same content width. The contents panel never changes article width when toggled. Narrow windows use an overlay contents panel and explicit component breakpoints, while wide tables scroll inside their own containers. Text uses the bundled STIX Two Text font, rem sizes, and no page zoom or viewport-based font sizing. Allura is retained for the opening quotation.

## Validation

```sh
npm run check
npm run validate
npm run build
npx playwright install
npm run test:layout
```

The cross-platform workflow runs Chromium and Firefox on Windows, and Chromium, Firefox, and WebKit on Ubuntu. It checks section edges, masthead centering, 390–1800px viewport round trips, 1/1.25/2 device-pixel ratios, contents toggles, dialogs, tables, and video stages. These automated viewport/DPR checks cover layout conditions caused by display scaling; they do not claim to drive every browser's native zoom menu.

## Deploy

In Settings → Pages, select **GitHub Actions**. Run **Deploy report to GitHub Pages** from the Actions tab on `main`.

The workflow validates the site and publishes its pages, data and videos. Unfinished PDFs are excluded.
