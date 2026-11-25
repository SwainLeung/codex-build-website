# Codex collaboration rules

This repository follows the AI Native Harness model. It is a Vite + React static website that explains a seven-stage AI-native website workflow.

## Before changing code

1. Read `docs/harness/PROJECT.md`, the active specification in `docs/harness/specs/`, this file, and local instructions for the affected path.
2. State the observable user behavior to change, the acceptance evidence, and the boundary. Use a specification for cross-module, compatibility, data, or release changes.
3. Keep source, project facts, release evidence, and creative direction in their respective files; do not replace evidence with a chat summary.

## Repository facts

- Source: `src/`; static publishable assets: `public/assets/`; build output: `dist/`.
- Run the real commands declared in `harness.config.json`. When Codex can perform a check itself, it must do so and report the command and result rather than asking the user to run it.
- `SOUL.md` is editorial/site identity and `DESIGN.md` is visual direction; `config/design-contract.json` is their machine-readable companion. `docs/harness/` holds project facts, acceptance conditions, decisions, and release evidence.
- The supplied video transcript is private source material. Do not commit it or copy long passages; create original summaries and analyses only.
- Any asset in `public/assets/` must have a known creation path, publication right, and documented placement. Never add opaque third-party media merely for visual polish.

## Reference import hygiene

- Before using a local or external reference, classify it as public design, generalized engineering pattern, private operating material, or sensitive configuration. Only the first two can inform repository content.
- Transfer principles, lifecycle states, acceptance gates, and failure handling in original language. Do not copy domains, endpoints, account/contact data, credentials, absolute paths, production records, telemetry, screenshots, or unapproved assets.
- Use `docs/operations/REFERENCE-HYGIENE.md` and the templates under `docs/templates/` for any generalized import. Treat uncertainty as sensitive and quarantine it rather than publishing it.
- Shared capabilities belong behind a documented versioned tool or template boundary. Do not copy active runtime logic, queues, caches, browser profiles, or environment-bound configuration into a site project.

## UI quality rules

- Preserve keyboard operation, semantic controls, visible focus, responsive behavior, and `prefers-reduced-motion` support.
- Run `npm run lint`, `npm run check:content`, `npm test`, `npm run build`, then `python scripts/harness.py doctor` and `python scripts/harness.py check` before handoff.
- Record failed or unavailable checks, affected acceptance criteria, and the next action in the relevant phase or release record.

## Delivery

- Use conventional commit prefixes such as `feat:`, `fix:`, `docs:`, or `chore:`.
- Update `CHANGELOG.md`, the relevant specification, and `docs/harness/releases/` whenever the user-visible result or release evidence changes.
- Static deployment is not approved until the repository owner records a target platform, candidate SHA, and release responsibility in the release record.
