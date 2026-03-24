# Checkpoint (MacTC Public Site)

## Current Focus
Enforce the durable GitHub publishing boundary so this repo is the only public MacTC surface, with the live Sparkle feed at repo root and versioned installer/update artifacts in `downloads/`.

## Why Current Focus Matters
The app repo is private product source, while this repo is the public website and artifact bucket. Encoding that split here prevents future packaging or copy updates from leaking parent-repo source or reintroducing GitHub Releases as a second public surface.

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
- Theme defaults to system preference and supports persisted local override between `Auto`, `Dark`, and `Light`.
- Live site now renders the theme toggle control (`data-theme-toggle`) on the public homepage.
- Homepage copy now states the fan-behavior change, fan-noise/activity tradeoff, and variability/no-guarantee qualifier near the main claim.
- Pricing copy now reinforces that the website is informational and that purchase assent happens in-app.
- Refund copy now uses plain refund-policy wording instead of `money-back guarantee`.

## Next Safe Step
Finalize the concrete support contact wording across pricing and legal pages, then decide whether to keep explicit `Mode: Auto/Dark/Light` toggle text or compress it to a tighter icon-first control.

## Archive References
- Initial public-site redesign commit on `main`: `416690d`.
- Continuity-doc setup on `main`: `521aed4`.
- Theme mode rollout on `main`: `4455baa`.
