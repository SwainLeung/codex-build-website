# ISSUE-004 / Phase 1 — Add an offline GSC evidence loop

| Start item | Record |
| --- | --- |
| Issue / owner / version / phase | ISSUE-004 / repository owner / v0.1.0 / 1 |
| Goal and boundary | Make future search-performance iteration reviewable with redacted aggregate evidence; do not add GSC authentication, raw data, live calls, or autonomous site changes. |
| Inputs | Safe structural analysis of shared GSC workflows, current operating-model records, and reference hygiene rules. |
| Affected paths | `src/`, `scripts/`, `docs/operations/`, `docs/templates/`, governance records, and ignore rules. |
| Exit evidence | Validator accepts the generic example and rejects sensitive/automatic inputs; content tests cover the UI; full harness passes. |

## Execution log

| Date / actor | Baseline | Action and evidence | Next |
| --- | --- | --- | --- |
| 2026-11-25 / Codex | `0f7da0e` | Inspected the shared capability only for reusable lifecycle, comparison, recovery, candidate-queue, and safety concepts. Excluded live collection/authentication and private report material. | Implement and validate the generic boundary. |
| 2026-11-25 / Codex | Local candidate | Added the offline schema validator, negative tests, templates, documentation, ignore rules, and on-page evidence-loop section. `npm run lint`, `npm run check:content`, `npm test`, `npm run build`, and `python scripts/harness.py check` passed. Desktop bridge snapshot and 390px smoke passed with no horizontal overflow. | Review diff and commit. |
| 2026-11-25 / Codex | Local candidate | `adapter run` could not create its checkpoint under the control-plane installation directory because Windows returned permission denied. This did not affect repository acceptance checks; retry after control-plane write access is restored. | Treat adapter trace as unavailable; keep project harness as the release evidence. |
| 2026-11-25 / Codex | Local candidate | A final harness retry initially encountered a locked native build binding from smoke-test preview child processes. Stopped only those two Vite children and reran `python scripts/harness.py check`; all declared checks passed. | Review and commit. |
