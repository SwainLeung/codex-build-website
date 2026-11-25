# ISSUE-002 / Phase 1 — Share the browser bridge

| Start item | Record |
| --- | --- |
| Issue / owner / version / phase | ISSUE-002 / repository owner / v0.1.0 / 1 |
| Goal and boundary | Vendor the reusable bridge source without runtime dependencies or evidence; add root harness coverage. |
| Inputs | Locally verified Playwright bridge, package lock, health evidence, and bridge AGENTS rules. |
| Affected paths | `tools/windows-browser-bridge/`, root docs, `harness.config.json`. |
| Exit evidence | Root and nested tests pass; bridge health passes on this Windows Chrome channel; commit is pushed. |

## Execution log

| Date / actor | Baseline | Action and evidence | Next |
| --- | --- | --- | --- |
| 2026-11-25 / Codex | `fde92cb` | Imported source, docs, tests, and lockfile; excluded `node_modules`, artifacts, token, and local state. | Run root harness and push. |
