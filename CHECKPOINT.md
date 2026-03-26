# Checkpoint (MacTC Public Site)

## Current Focus

Stabilize the flattened homepage direction and clean up repo state before more redesign churn. The page now uses the flatter editorial system, reduced overline copy, the clearer free-window versus paid-controller split, and the founder backstory at the bottom; the next operational step is to merge the active topic branch back into `source`.

## Why Current Focus Matters

The site direction is now much closer to the intended product voice, but the docs and branch roles need to match reality so future publish work does not repeat the recent confusion between the local file render, the authoring branch, and the public Pages snapshot.

## Open Blockers / Decisions

- Final support contact channel wording is still generic across legal pages.
- Decide whether the theme toggle copy should remain explicit (`Mode: Auto/Dark/Light`) or shift to a more compact icon-first control.
- Decide whether the current hero still needs another spacing pass now that the live and local review surfaces are explicitly separated in docs.

## Validation Evidence

- Direct local review surface for design feedback is `file:///Users/ryand/playground/mactc/github_page/index.html`.
- Public GitHub Pages surface is `https://macintog.github.io/MacTC/`.
- Site currently avoids Google fonts, Tailwind CDN, and analytics tags.
- Internal links/assets are relative and compatible with `/MacTC/` hosting.
- Public download/install surfaces live in this repo only: `appcast.xml` at root and downloadable artifacts under `downloads/`.
- Public website history is now intended to be published as a rewritten current snapshot rather than an append-only public changelog.
- Local durable authoring history lives on branch `source`, while public `origin/main` is a single-commit snapshot publish surface.
- Theme defaults to system preference and supports persisted local override between `Auto`, `Dark`, and `Light`.
- Live site now renders the theme toggle control (`data-theme-toggle`) on the public homepage.
- Homepage copy now states the fan-behavior change, fan-noise/activity tradeoff, and variability/no-guarantee qualifier near the main claim.
- Homepage narrative now keeps the longer operator backstory collapsed at the bottom of the page so it does not dominate the main product explanation.
- The homepage now introduces the product split explicitly: the GUI window is free forever, while the background fan-control logic is the paid product.
- Public GUI screenshot assets now live at `assets/images/mactc-gui-window.png` and `assets/images/mactc-gui-window-advanced.png`, with shared JS/CSS controlling the fade and hover behavior.
- The backstory now links to the current `mactop` repo (`metaspartan/mactop`) and renders the install command as inline code.
- Homepage and pricing CTA links now point at the current `downloads/MacTC-beta-v1.0-b347.pkg` installer instead of the older `b340` package.
- Pricing copy now reinforces that the website is informational and that purchase assent happens in-app.
- Refund copy now uses plain refund-policy wording instead of `money-back guarantee`.
- Current active topic branch is `codex/kimi-structure-refactor @ 5b5314e`.
- Current local authoring branch is `source @ 0e4e156`.
- Current published snapshot is `origin/main @ f844198`.
- `source`, `origin/main`, and the current topic branch share the same website tree at `13bca4e73064e112d20e241faffe4970b0f32f38`; `origin/main` differs only because the publish snapshot uses a separate single-commit history.
- Live served `index.html`, `assets/css/site.css`, and `assets/js/site.js` were hash-checked against `origin/main` and matched exactly after the last publish verification pass.
- The app icon asset was recompressed losslessly on the current topic branch and now awaits merge into `source`.
- Preserved design anchor: tag `design-2026-03-26-pre-kimi-hybrid` points at the last pre-hybrid live-site authoring commit (`7b0406d`).

## Next Safe Step

Merge `codex/kimi-structure-refactor` into `source`, push `source`, and only then decide whether the icon-only delta also warrants a fresh public snapshot publish to `origin/main`.

## Archive References

- Initial public-site redesign commit on `main`: `416690d`.
- Continuity-doc setup on `main`: `521aed4`.
- Theme mode rollout on `main`: `4455baa`.
- Pre-hybrid rounded-card design anchor on `source`: `design-2026-03-26-pre-kimi-hybrid` -> `7b0406d`.
