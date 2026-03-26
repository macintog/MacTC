# Web Spine (MacTC Public Site)

## Purpose
This repo is the public-facing website for MacTC at `https://macintog.github.io/MacTC/`.
Its job is to explain value, route users to install, publish legal policy pages, and host the public-safe installer/update artifacts the app downloads.

## Operator Job
Keep the site credible, fast, privacy-respectful, and easy to update as MacTC product messaging evolves.

## Success Criteria
- The homepage clearly communicates what MacTC does and who it is for.
- Visitors can reach download, pricing context, and legal pages in one click.
- The site remains fully functional on GitHub Pages under `/MacTC/`.
- The site has no third-party tracking dependencies.
- Copy stays aligned with the real in-app purchase flow.

## Non-Goals
- This website does not run checkout.
- This website is not the app documentation portal.
- This website is not a metrics-heavy marketing stack.

## Durable Product Strategy
- Keep the site static and lightweight (plain HTML/CSS/JS).
- Preserve an intentional visual voice, but avoid design churn without product reason.
- Treat privacy posture as a first-class product message.
- Keep conversion flow simple: website -> install app -> trial -> in-app purchase.

## Stable Constraints / Invariants
- This repo may live nested under the private MacTC source tree, but it remains a separate Git surface with its own history and publish mechanics.
- Purchase flow is in-app only.
- Internal links and assets must remain relative (no root-absolute paths), so Pages works at `/MacTC/`.
- No third-party frontend dependencies for styling, fonts, or analytics.
- Theme behavior defaults to system preference (`Auto`) and may be user-overridden locally to `Dark` or `Light`.
- Legal pages (`terms.html`, `privacy.html`, `refund.html`) are always present and linked from global nav.
- `main` branch in this repo is the publish surface for GitHub Pages.
- Only public-safe website content and shipped install/update artifacts belong in this repo. Parent app source code and private docs do not.
- Public branch history is intentionally disposable. The supported public contract is the current tree plus any deliberately retained files under `downloads/`, not a permanent public diff trail.
- Public snapshot commit subjects are part of the visible operator surface and should stay brief, user-facing, and free of boilerplate prefixes because GitHub repeats them in the file listing.
- Preserve intentional visual milestones with explicit Git anchors in the authoring lane when a redesign would otherwise make an earlier shipped look hard to rediscover later. Current baseline anchor: tag `design-2026-03-26-pre-kimi-hybrid` on `source`.

## Design System Guardrails
- Reuse `assets/css/site.css` and `assets/js/site.js` for shared behavior and styling.
- Prefer local/system font stacks over remote font hosting.
- Keep motion meaningful and lightweight; respect reduced-motion behavior.
- Desktop and mobile layouts must both be intentionally designed, not incidental.

## Workstream Map
- Messaging and UX: homepage + pricing narrative.
- Legal and trust: terms/privacy/refund content and support routing.
- Publishing and operations: Git workflow, Pages deploy health, and link integrity.
- Public artifact hosting: `appcast.xml`, installer packages, and Sparkle archives under `downloads/`.

## Authority Map
- `WEB_SPINE.md`: durable website intent and invariants.
- `CHECKPOINT.md`: current focus, active decisions, and near-term execution state.
- `README.md`: quick start and operator entrypoint.
- `index.html`, `pricing.html`, `terms.html`, `privacy.html`, `refund.html`: shipped content surface.
- `assets/css/site.css`, `assets/js/site.js`: shared implementation surface.
