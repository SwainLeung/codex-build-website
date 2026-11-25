# Project card

| Item | Verified project value |
| --- | --- |
| Project / repository / primary branch | codex-build-website / `SwainLeung/codex-build-website` / `main` |
| User and core result | A creator can explore the seven stages, understand the tradeoffs, copy a better build brief, and leave with a checkable launch plan. |
| Product, code, release, recovery owner | Repository owner (to be assigned in GitHub). |
| Runtime / package manager / lock file | Node 24.15.0, npm 11.12.1, `package-lock.json`. |
| Artifact / delivery platform / preview | Vite static `dist/`; hosting platform pending; local Vite preview is the rehearsal path. |
| Source / test / config / documentation / output | `src/`, `src/*.test.ts`, `harness.config.json`, `docs/`, `dist/`. |
| Style / formatting / error conventions | TypeScript + ESLint from `eslint.config.js`; user-visible failures must be explicit. |
| Commit / PR convention | `feat:`, `fix:`, `docs:`, `chore:`; `.github/PULL_REQUEST_TEMPLATE.md`. |
| CI and required checks | `.github/workflows/harness-ci.yml`; harness doctor and check. |
| Last verified / baseline / maintainer | 2026-11-25 / initial candidate SHA pending / Codex + repository owner. |

## End-to-end path

| User entry | Modules | Data or dependency | Failure / observation | Owner |
| --- | --- | --- | --- | --- |
| Open page, select stage, check launch item, copy brief | `src/App.tsx`, `src/content.ts`, `src/styles.css` | Browser `localStorage` for checklist only; Google Fonts CSS | Selected stage does not update, copy fails, layout overflows | Repository owner |
| Record a future search-evidence iteration | `docs/operations/GSC-EVIDENCE-LOOP.md`, `docs/templates/`, `scripts/verify-gsc-evidence.mjs` | Offline, redacted aggregate summary only | Privacy/input gate blocks the record; candidate remains proposed without owner approval | Repository owner |
| Define or change a site contract | `SOUL.md`, `DESIGN.md`, `config/design-contract.json`, `scripts/verify-project-contracts.mjs` | Non-sensitive identity/design contract and dry-run manifest template | Missing/disabled contract, secret-like content, or unapproved apply run blocks the check | Repository owner |

## Clean-environment reproduction

| Stage | Real command | Prerequisite and success criterion |
| --- | --- | --- |
| Dependency setup | `npm ci` | Node 24 and npm 11; installs from lockfile. |
| Static and content checks | `npm run lint && npm run check:content` | ESLint has no errors; required records and seven stages exist. |
| Behavioral test | `npm test` | Vitest proves stage, tension, and checklist models exist. |
| Build | `npm run build` | Vite emits `dist/`. |
| Local smoke | `npm run dev` or `npm run preview` | Seven stages, brief copy, and persistent checklist behave at desktop and narrow width. |
| Release and recovery | `docs/harness/releases/v0.1.0.md` | Platform is pending; rebuild/redeploy previous successful `dist/` to recover. |

## Configuration and access

No runtime secrets, account permissions, server data, or third-party API credentials are required. The only browser persistence is a user-local checklist value. A future search-evidence loop accepts only an offline, redacted aggregate summary and does not include a live GSC connection. `SOUL.md`, design contracts, and run manifests describe only non-sensitive boundaries; they cannot authorize remote writes.

## Tool companions

`tools/windows-browser-bridge/` is a separately installable Playwright utility for Windows-local visual verification. Its own lockfile, tests, token requirement, local-only service binding, source rules, and diagnostic record live within that directory. The root harness runs its deterministic unit tests; the Chrome/Edge health smoke is intentionally run by the tool owner because browser availability is machine-specific.

## Generalized site operations

`docs/operations/` and `docs/templates/` hold the portable site-operating model: contract, content/asset lifecycle, quality gates, release evidence/recovery, shared-tool boundaries, and reference hygiene. These records contain only generic roles and placeholders; they must not store source domains, access details, production identifiers, or private reference data.
