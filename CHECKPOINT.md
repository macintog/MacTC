# Checkpoint (MacTC Public Site)

## Current Focus
Stabilize the first public website line after shipping system-aware theming, and prepare the next content-focused iteration without regressing privacy or Pages constraints.

## Why Current Focus Matters
The site is now live with a real design system, legal surfaces, and a theme contract. Capturing this state cleanly prevents future copy/design passes from accidentally reintroducing third-party dependencies or breaking `/MacTC/` hosting behavior.

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

## Next Safe Step
Do one focused support/billing copy pass across pricing + legal pages, then decide whether to keep explicit `Mode: Auto/Dark/Light` toggle text or compress it to a tighter icon-first control.

## Archive References
- Initial public-site redesign commit on `main`: `416690d`.
- Continuity-doc setup on `main`: `521aed4`.
- Theme mode rollout on `main`: `4455baa`.
