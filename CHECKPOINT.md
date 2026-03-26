# Checkpoint (MacTC Public Site)

## Current Focus
Keep refining the homepage so the product split is obvious early: the GUI window is free forever, while the background fan control is the paid product.

## Why Current Focus Matters
The public site now explains the workload-shaped origin story more clearly, but the higher-value messaging problem is making the free utility window and the paid background controller immediately legible without losing the founder voice that makes the product make sense.

## Open Blockers / Decisions
- Final support contact channel wording is still generic across legal pages.
- Evaluate the live homepage balance between hero copy, the new free-vs-paid section, and the collapsed backstory after viewing the published page in-browser.
- Decide whether the theme toggle copy should remain explicit (`Mode: Auto/Dark/Light`) or shift to a more compact icon-first control.

## Validation Evidence
- `main` serves live GitHub Pages content at `https://macintog.github.io/MacTC/`.
- Site currently avoids Google fonts, Tailwind CDN, and analytics tags.
- Internal links/assets are relative and compatible with `/MacTC/` hosting.
- Public download/install surfaces live in this repo only: `appcast.xml` at root and downloadable artifacts under `downloads/`.
- Public website history is now intended to be published as a rewritten current snapshot rather than an append-only public changelog.
- Local authoring history now lives on branch `source`, while public `origin/main` is a single-commit snapshot whose live subject is `build 340 installer appcast and site refresh`.
- Theme defaults to system preference and supports persisted local override between `Auto`, `Dark`, and `Light`.
- Live site now renders the theme toggle control (`data-theme-toggle`) on the public homepage.
- Homepage copy now states the fan-behavior change, fan-noise/activity tradeoff, and variability/no-guarantee qualifier near the main claim.
- Homepage narrative now incorporates the longer operator backstory, but the story is collapsed behind a native disclosure so it does not dominate the page for visitors who only need the product summary.
- The homepage now introduces the product split explicitly: the GUI window is free forever, while the background fan-control logic is the paid product.
- Public GUI screenshot asset now lives at `assets/images/mactc-gui-window.png` and is used to support the free-window explanation.
- The backstory now links to the current `mactop` repo (`metaspartan/mactop`) and renders the install command as inline code.
- Homepage and pricing CTA links now point at the current `downloads/MacTC-beta-v1.0-b347.pkg` installer instead of the older `b340` package.
- Pricing copy now reinforces that the website is informational and that purchase assent happens in-app.
- Refund copy now uses plain refund-policy wording instead of `money-back guarantee`.
- Current local authoring branch is `source @ ecb0714`; current published snapshot is `origin/main @ 5c52e301166c9580589e903083072eb42a563559`.

## Next Safe Step
Review the live homepage in a browser, then continue tightening hero wording and section emphasis around the free GUI versus paid background controller if the top of page still feels too dense.

## Archive References
- Initial public-site redesign commit on `main`: `416690d`.
- Continuity-doc setup on `main`: `521aed4`.
- Theme mode rollout on `main`: `4455baa`.
