# ADR-0004 — Keep search evidence offline and approval-gated

| Field | Record |
| --- | --- |
| Status / date | Accepted / 2026-11-25 |
| Problem | Search-performance iteration benefits from repeatable comparisons and action queues, but a static public project must not inherit a live search account, credentials, raw queries, page URLs, or automated publishing behavior. |
| Options | Copy a live integration (unsafe and site-bound); omit search evidence entirely (loses a useful maintenance loop); accept a versioned, redacted offline summary and route all changes through existing review/release gates. |
| Decision | Add an offline evidence schema, validator, templates, and UI explanation. Candidates remain hypotheses until explicitly approved; the repository cannot collect, alter, or publish external data. |
| Consequences and recovery | Adds generic documentation and validation without a runtime service or new secret. Remove the evidence-loop files, commands, and UI section to revert. |
| Revisit when | A separately owned shared tool has explicit authorization to collect data and can export a scrubbed summary that satisfies this schema. |
