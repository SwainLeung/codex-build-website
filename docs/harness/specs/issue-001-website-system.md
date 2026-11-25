# ISSUE-001 — Seven-stage website system

| Field | Value |
| --- | --- |
| Project / target version / owner | codex-build-website / v0.1.0 / repository owner |
| Source idea / issue / PR | IDEA-001 / initial build request / first commit |
| User and current impact | A creator has a video transcript but no reusable workflow, tension analysis, or check evidence. |
| Target and boundary | Explore seven stages, examine tradeoffs, copy a brief, complete a checklist. No accounts, form backend, or hosting configuration. |
| Changed entry points | `src/`, `README.md`, `docs/`, harness, and CI. |

## Acceptance criteria

| ID | Given | Action | Expected result | Evidence |
| --- | --- | --- | --- | --- |
| AC-01 | Home page open | Select each stage | Detail changes to matching purpose, question, outcome, and asset | `npm test` and browser smoke |
| AC-02 | Clipboard-supported browser | Copy the brief | Button confirms the copy | Browser smoke |
| AC-03 | Any browser | Check items and refresh | Items and progress remain | Browser smoke |
| AC-04 | Candidate commit | Run harness check | Lint, content contract, tests, and build pass | `python scripts/harness.py check` |
| AC-05 | Narrow viewport or reduced-motion preference | Browse the page | No overflow; essential content has no motion dependency | Manual viewport smoke |

## Delivery decisions

| Decision | Record |
| --- | --- |
| Architecture | Vite + React single page: enough state for the interactions and straightforward static delivery. |
| Persistence / privacy | Local checklist state only; no API, secret, account, or user-data processing. |
| Source handling | Do not commit raw transcript; provide an original summary only. |
| Candidate release | Build `dist/`, smoke test, then update `releases/v0.1.0.md` with SHA and target platform. |
