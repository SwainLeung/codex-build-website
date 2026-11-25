# ISSUE-005 — Executable site contracts and operation boundaries

| Field | Value |
| --- | --- |
| Project / target version / owner | codex-build-website / v0.1.0 / repository owner |
| Source idea / issue / PR | Generalized cross-site contract and execution patterns / ISSUE-005 / local candidate |
| User and current impact | The project documents a workflow but lacks enforceable SOUL/DESIGN identity, a reusable/shared boundary, and a standard way to record dry-run, approval, verification, and recovery. |
| Target and boundary | Add generic SOUL/DESIGN contracts, a deterministic validator, templates, capability-boundary documentation, run-manifest guidance, and a visible website section. Exclude real sites, credentials, live collection, remote transport, publishing, production records, and copied runtime logic. |
| Changed entry points | Root contract files, `config/`, `scripts/`, `src/`, documentation/templates, governance records, and content checks. |

## Acceptance criteria

| ID | Given | Action | Expected result | Evidence |
| --- | --- | --- | --- |
| AC-01 | Visitor opens the website | Navigate to the executable-contract section | SOUL, DESIGN, shared boundary, and run evidence are visible as four separate responsibilities. | Content test + browser smoke. |
| AC-02 | Maintainer reads the root contracts | Run `npm run check:contracts` | The SOUL, enabled design contract, and generic dry-run manifest validate. | Validator output. |
| AC-03 | A contract is incomplete, disabled, secret-like, or an apply run lacks approval | Run the contract validator test | The invalid state is rejected. | Node unit test. |
| AC-04 | Maintainer needs a new reusable operation | Read the operation and boundary records | Shared code, site adapters, materialized artifacts, dry-run, approval, verification, and rollback have distinct documented roles. | Template/manual review. |
| AC-05 | Candidate commit | Run the project harness | Lint, content/hygiene checks, root and bridge tests, and build pass. | `python scripts/harness.py check`. |

## Delivery decisions

| Decision | Record |
| --- | --- |
| Contract split | Keep SOUL/DESIGN readable by people and a design JSON contract readable by deterministic checks. |
| Case rule | Standardize the design source as `DESIGN.md`; do not maintain a case-variant duplicate. |
| Shared boundary | Shared capability is schema/test/analysis only; a site adapter binds only local content and invocation order. |
| Execution | Default to dry-run; apply requires recorded approval, verification, and rollback strategy. |
