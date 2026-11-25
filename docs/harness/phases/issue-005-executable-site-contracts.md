# ISSUE-005 / Phase 1 — Add executable site contracts

| Start item | Record |
| --- | --- |
| Issue / owner / version / phase | ISSUE-005 / repository owner / v0.1.0 / 1 |
| Goal and boundary | Give site identity, design direction, capability reuse, and material operations a testable contract without importing external accounts, site identities, or runtime logic. |
| Inputs | Safe structural analysis of local cross-site SOUL/DESIGN preflight, capability ownership, manifest, dry-run, verification, and rollback conventions. |
| Affected paths | Root contracts, `config/`, `scripts/`, `src/`, `docs/operations/`, `docs/templates/`, and harness records. |
| Exit evidence | Contract validator has valid and invalid coverage; website exposes the four contract roles; full harness and browser smoke pass. |

## Execution log

| Date / actor | Baseline | Action and evidence | Next |
| --- | --- | --- | --- |
| 2026-11-25 / Codex | `460a4ed` | Inspected only reusable structure: SOUL/DESIGN separation, blocker-vs-warning preflight, design change manifests, shared/site ownership, owned run manifests, dry-run, approval, verification, and rollback. Excluded all source identities, credentials, transport, and production outputs. | Implement the generic contracts and validate. |
| 2026-11-25 / Codex | Local candidate | Added canonical `DESIGN.md`, `SOUL.md`, a machine-readable design contract, deterministic positive/negative validation, generic shared/site and run-manifest standards, templates, and an on-page contract section. Desktop smoke and 390px smoke showed the section and no horizontal overflow. | Run final harness and commit. |
| 2026-11-25 / Codex | Local candidate | `adapter run` could not create a checkpoint under the control-plane installation directory because Windows returned permission denied. Repository checks remain the acceptance evidence until control-plane write access is restored. | Record the unavailable trace; do not emulate it in the repository. |
| 2026-11-25 / Codex | Local candidate | `python scripts/harness.py doctor` and `python scripts/harness.py check` passed after contract validation, root tests, browser-bridge tests, and Vite build. | Review diff and commit. |
