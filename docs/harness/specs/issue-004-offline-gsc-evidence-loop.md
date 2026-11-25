# ISSUE-004 — Offline GSC evidence loop

| Field | Value |
| --- | --- |
| Project / target version / owner | codex-build-website / v0.1.0 / repository owner |
| Source idea / issue / PR | Generalized shared GSC operating pattern / ISSUE-004 / local candidate |
| User and current impact | Maintainers need a safe way to turn future search-performance observations into reviewed website iterations without importing private exports or production access. |
| Target and boundary | Add a generic offline evidence schema, validator, record template, documentation, and UI explanation. Exclude live APIs, OAuth, credentials, real domains, raw queries, page URLs, exports, dashboards, and automated edits or publishing. |
| Changed entry points | `src/`, documentation/templates, content checks, test command, harness records, and ignore rules. |

## Acceptance criteria

| ID | Given | Action | Expected result | Evidence |
| --- | --- | --- | --- |
| AC-01 | Visitor opens the site | Navigate to the evidence-loop section | Four stages explain redaction, comparison, approval-gated candidates, and post-release measurement. | Content test + browser smoke. |
| AC-02 | Maintainer opens the GSC templates | Copy the summary and iteration-record templates | The artifacts require aggregate/non-identifying input and explicit owner approval. | Validator + manual review. |
| AC-03 | A valid generic summary | Run `npm run check:gsc-evidence` | The schema example passes and the content contract invokes the check. | Node validator output. |
| AC-04 | A summary includes a URL, raw-page flag, or automatic candidate | Validate it | The validator rejects the input. | Node unit test. |
| AC-05 | Candidate commit | Run the harness | Lint, content/hygiene checks, tests, bridge tests, and build pass. | `python scripts/harness.py check`. |

## Delivery decisions

| Decision | Record |
| --- | --- |
| Input model | Versioned JSON summary with aggregate directions, anonymous observations, and approval-gated candidates. |
| Privacy boundary | Ignore private exports and site-specific reports; reject URLs, credentials, raw-query/page flags, and automatic actions. |
| Scope | Evidence workflow and validation only; not a search-data client, analytics dashboard, deployment integration, or autonomous optimizer. |
