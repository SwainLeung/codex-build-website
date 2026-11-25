# ISSUE-003 / Phase 1 — Generalize site operating patterns safely

| Start item | Record |
| --- | --- |
| Issue / owner / version / phase | ISSUE-003 / repository owner / v0.1.0 / 1 |
| Goal and boundary | Transfer portable site-operation concepts without carrying reference identities or production data. |
| Inputs | Safe structural review of local reference documentation, current website/harness records, and the redaction boundary. |
| Affected paths | `src/`, `docs/operations/`, `docs/templates/`, release-quality docs, and content verifier. |
| Exit evidence | Content test covers model counts; verifier requires templates; full harness passes; manual review confirms no sensitive reference data entered. |

## Execution log

| Date / actor | Baseline | Action and evidence | Next |
| --- | --- | --- | --- |
| 2026-11-25 / Codex | `324f79f` | Inspected only safe structural files and headings; extracted lifecycle, gates, recovery, shared-boundary, and redaction patterns in original language. | Verify and review before committing. |
| 2026-11-25 / Codex | Local candidate | Added the operating-model UI, sanitized documents/templates, and a hygiene verifier. Root tests, bridge tests, full harness, and a local Chrome snapshot passed. | Review staged diff and decide release/commit. |
