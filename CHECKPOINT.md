# Checkpoint (MacTC Public Site)

## Current Focus
Establish durable continuity for website evolution so future redesign and copy updates preserve core constraints (privacy posture, in-app purchase model, and Pages compatibility).

## Why Current Focus Matters
The site is now public and live. Without a durable/volatile doc split, future iterations can easily regress on trust-critical rules like external dependencies, legal visibility, and publish-path correctness.

## Open Blockers / Decisions
- Final support contact channel wording is still generic across legal pages.
- Download CTA currently targets GitHub releases; confirm whether this should stay primary or move to a dedicated download landing path.
- Decide when to introduce screenshots/product visuals versus staying copy-first.

## Validation Evidence
- `main` serves live GitHub Pages content at `https://macintog.github.io/MacTC/`.
- Site currently avoids Google fonts, Tailwind CDN, and analytics tags.
- Internal links/assets are relative and compatible with `/MacTC/` hosting.

## Next Safe Step
Do one focused copy pass for support/billing language consistency across pricing + legal pages, then optionally add visual proof (screenshots) without changing dependency or hosting constraints.

## Archive References
- Initial public-site redesign commit on `main`: `416690d`.
- Continuity-doc setup was introduced with this checkpoint update.
