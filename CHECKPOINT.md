# Checkpoint (MacTC Public Site)

## Current Focus
Refresh the homepage narrative so the public site explains who MacTC is for, why it exists, and what tradeoff it makes without violating the durable GitHub publishing boundary.

## Why Current Focus Matters
The public site was technically accurate, but too abstract to explain the workload-shaped problem that created MacTC in the first place. Folding that founder-story context into the homepage should make the product legible without turning the site into a hypey or over-claiming marketing surface.

## Open Blockers / Decisions
- Final support contact channel wording is still generic across legal pages.
- Decide when to introduce screenshots/product visuals versus staying copy-first.
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
- Homepage narrative now incorporates the longer operator backstory: most users do not need MacTC, the product is aimed at sustained heavy workloads, and the story is grounded in observed LM Studio / GPU-clock slowdown rather than generic fan-control language.
- Homepage and pricing CTA links now point at the current `downloads/MacTC-beta-v1.0-b347.pkg` installer instead of the older `b340` package.
- Pricing copy now reinforces that the website is informational and that purchase assent happens in-app.
- Refund copy now uses plain refund-policy wording instead of `money-back guarantee`.

## Next Safe Step
Preview the revised homepage locally, decide whether to add screenshots to support the new story-first layout, and finalize the concrete support contact wording across pricing and legal pages.

## Archive References
- Initial public-site redesign commit on `main`: `416690d`.
- Continuity-doc setup on `main`: `521aed4`.
- Theme mode rollout on `main`: `4455baa`.
