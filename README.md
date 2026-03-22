# MacTC Site

Static public site for MacTC, served by GitHub Pages at:

- https://macintog.github.io/MacTC/

## Continuity docs

- `WEB_SPINE.md`: durable website purpose, strategy, and invariants.
- `CHECKPOINT.md`: current execution state, decisions, and next safe step.
- `mactc-public-copy-gate.md`: standing rules for public-facing MacTC copy.
- `mactc-copy-lint-spec.md`: deterministic checklist for validating copy against the gate.

## Local preview

From this folder:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

## Deployment model

- This folder is a standalone git repo with remote: `macintog/MacTC`.
- GitHub Pages should publish from the default branch root.
- All links are relative so pages work both locally and at `/MacTC/`.

## Content notes

- Purchase is intentionally **in-app only** (no website checkout flow).
- Pricing page is informational and points users to install first.
- Legal pages include merchant-of-record language where applicable.
- No third-party frontend dependencies (no Tailwind CDN, no Google Fonts, no analytics tags).
- Theme supports `Auto` (system detection), `Dark`, and `Light` modes with local preference persistence.

## Before going live

- Replace download links if release URL changes.
- Replace support contact wording with final support channel.
- Perform legal review of privacy/terms/refund text.
