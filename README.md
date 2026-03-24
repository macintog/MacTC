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
- This repo lives nested under the private MacTC source tree for operator convenience, but it is its own Git boundary and is intentionally ignored by the parent repo.
- GitHub Pages should publish from the default branch root.
- All links are relative so pages work both locally and at `/MacTC/`.
- Sparkle appcasts should live at the repo root as `appcast.xml` so installed MacTC builds can fetch `https://macintog.github.io/MacTC/appcast.xml`.
- Public downloadables belong in `downloads/`, using versioned installer and Sparkle archive filenames.
- This repo is the only MacTC surface allowed on GitHub. Do not publish source code or other files from the parent app repo here.
- The public `main` branch is intended to be a rewritten current snapshot. Website diffs/history are not treated as a durable public surface; older builds remain public only when intentionally retained under `downloads/`.
- Local authoring history should stay on the `source` branch; the public `main` branch is publish-only output.
- Public snapshot commit subjects should be short, user-facing notes with no boilerplate prefix, because GitHub repeats the same subject beside each touched file.

## Content notes

- Purchase is intentionally **in-app only** (no website checkout flow).
- Pricing page is informational and points users to install first.
- Legal pages include merchant-of-record language where applicable.
- No third-party frontend dependencies (no Tailwind CDN, no Google Fonts, no analytics tags).
- Theme supports `Auto` (system detection), `Dark`, and `Light` modes with local preference persistence.

## Before going live

- Replace download links only if the local `downloads/` paths change.
- Replace support contact wording with final support channel.
- Perform legal review of privacy/terms/refund text.
