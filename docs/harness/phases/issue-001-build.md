# ISSUE-001 / Phase 1 — Reviewable first release

| Start item | Record |
| --- | --- |
| Issue / owner / version / phase | ISSUE-001 / Codex + owner / v0.1.0 / 1 |
| Goal and boundary | Deliver a static experience for seven stages, tensions, and launch checks; exclude accounts, analytics, and hosting setup. |
| Inputs | User TXT, user-supplied vidIQ transcript, AI Native Harness v1.1.0 template. |
| Affected paths | Root `AGENTS.md`, `src/`, `docs/`, `.github/`. |
| Exit evidence | Install, lint, content contract, test, build, harness, and browser smoke all recorded. |

## Execution log

| Date / actor | Baseline | Action and evidence | Next |
| --- | --- | --- | --- |
| 2026-11-25 / Codex | Empty remote `main` | Imported harness and started the first website. YouTube subtitle download returned 429; source changed to user-provided vidIQ transcript. | Complete checks and push candidate. |
| 2026-11-25 / Codex | First local candidate | Lint, content contract, two Vitest assertions, build, doctor, and harness check passed. Windows browser-automation native pipe was unavailable, so automated visual smoke could not run. | Perform visual browser smoke on a workstation with a working browser bridge before public release. |
