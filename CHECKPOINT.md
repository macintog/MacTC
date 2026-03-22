# Checkpoint (MacTC Public Site)

## Current Focus
Ship theme ergonomics without violating privacy or static-hosting constraints: add dark mode with automatic system detection plus explicit user override.

## Why Current Focus Matters
The site is public, and readability/comfort now matter in long sessions and night use. Theme behavior also becomes a durable contract that future redesigns must preserve.

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

## Next Safe Step
Do one focused copy pass for support/billing language consistency across pricing + legal pages, then optionally add visual proof (screenshots) without changing dependency or hosting constraints.

## Archive References
- Initial public-site redesign commit on `main`: `416690d`.
- Continuity-doc setup was introduced with this checkpoint update.
- Theme mode rollout is captured in this checkpoint update.
