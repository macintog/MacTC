# Checkpoint (MacTC Public Site)

## Current Focus
Stabilize the first public website line after the public-copy compliance pass, and prepare the next content-focused iteration without regressing privacy or Pages constraints.

## Why Current Focus Matters
The site now has a compliant baseline for homepage, pricing, and refund messaging alongside the existing design system, legal surfaces, and theme contract. Capturing this state cleanly prevents future copy/design passes from reintroducing overclaim language or breaking `/MacTC/` hosting behavior.

## Open Blockers / Decisions
- Final support contact channel wording is still generic across legal pages.
- Download CTA currently targets GitHub releases; confirm whether this should stay primary or move to a dedicated download landing path.
- Decide when to introduce screenshots/product visuals versus staying copy-first.
- Decide whether the theme toggle copy should remain explicit (`Mode: Auto/Dark/Light`) or shift to a more compact icon-first control.

## Validation Evidence
- `main` serves live GitHub Pages content at `https://macintog.github.io/MacTC/`.
- Site currently avoids Google fonts, Tailwind CDN, and analytics tags.
- Internal links/assets are relative and compatible with `/MacTC/` hosting.
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
