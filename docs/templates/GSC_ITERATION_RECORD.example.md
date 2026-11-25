# GSC evidence iteration record — template

| Field | Value |
| --- | --- |
| Record ID | `<EVIDENCE_RECORD_ID>` |
| Summary input | `GSC_EVIDENCE_SUMMARY.example.json`-compatible, redacted aggregate only |
| Baseline / comparison | `<BASELINE_WINDOW>` / `<COMPARISON_WINDOW>` |
| Privacy gate | passed / blocked |
| Input integrity gate | passed / blocked |
| Owner role | `<RESPONSIBLE_ROLE>` |

## Interpretation

- Signal: `<VISIBILITY_OR_CLICK_OR_COVERAGE_SIGNAL>`
- Direction: up / flat / down / unknown
- Confidence: low / medium / high
- Evidence statement: `<ANONYMOUS_AGGREGATE_EVIDENCE>`
- Alternative explanation or uncertainty: `<UNCERTAINTY>`

## Candidate action

- Hypothesis: `<REVERSIBLE_CHANGE_HYPOTHESIS>`
- Expected signal: `<MEASURED_AGGREGATE_SIGNAL>`
- Risk: low / medium / high
- Owner approval: required before implementation
- Status: proposed / approved / rejected / measured / rolled-back

## Release and measurement

- Candidate identifier: `<COMMIT_OR_BUILD_ID>`
- Existing release gates passed: yes / no
- Measurement window: `<FOLLOW_UP_WINDOW>`
- Outcome: retain / roll back / inconclusive

Do not add raw queries, page URLs, domains, account details, credentials, exports, screenshots, or private reports to this record.
