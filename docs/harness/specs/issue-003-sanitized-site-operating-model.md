# ISSUE-003 — Sanitized generalized site operating model

| Field | Value |
| --- | --- |
| Project / target version / owner | codex-build-website / v0.1.0 / repository owner |
| Source idea / issue / PR | Local architecture comparison / ISSUE-003 / operating-model integration commit |
| User and current impact | The project explains how to build a page but lacks a portable operating model for content/assets, quality gates, reference hygiene, and long-lived site maintenance. |
| Target and boundary | Add original generalized docs and an on-page five-layer model. Do not import reference-site implementation, URLs, account data, credentials, absolute paths, production records, or vendor-specific deployment details. |
| Changed entry points | `src/`, documentation, templates, checklist, governance records, and content verifier. |

## Acceptance criteria

| ID | Given | Action | Expected result | Evidence |
| --- | --- | --- | --- |
| AC-01 | Visitor opens the site | Navigate to the operating-model section | Five operating layers and four reference-hygiene rules are visible and responsive. | Unit test + browser smoke. |
| AC-02 | Maintainer needs a new site profile or content asset record | Open `docs/templates/` | Templates contain generic roles/placeholders and lifecycle gates only. | Content verifier + manual review. |
| AC-03 | Maintainer imports a reference | Follow `REFERENCE-HYGIENE.md` | Sensitive/identifying inputs are classified, redacted, or quarantined; only abstractions are copied. | Checklist review. |
| AC-04 | Candidate commit | Run harness check | Root lint, content contract, app tests, bridge unit tests, and build pass. | `python scripts/harness.py check`. |

## Delivery decisions

| Decision | Record |
| --- | --- |
| Generalization method | Re-express architecture as five layers and a state lifecycle; do not copy source text or naming. |
| Privacy boundary | Use typed placeholders such as `<PROJECT_ID>` and `<RESPONSIBLE_ROLE>`; never preserve identifying values. |
| Scope | Adds operating guidance and UI explanation, not a server, telemetry, publishing integration, or private data migration. |
