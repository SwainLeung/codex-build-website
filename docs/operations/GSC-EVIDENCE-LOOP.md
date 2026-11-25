# GSC Evidence Loop

This is a privacy-safe, offline iteration loop for using Search Console observations in a site project. It transfers a decision method, not a live integration. It never authorizes access to an external account, reads credentials, or publishes a site change.

## Boundary

Allowed input is a maintainer-created, redacted aggregate summary. It may describe direction, confidence, and an anonymous evidence statement. It must not contain raw queries, page URLs, domains, exports, screenshots, user data, access details, or credentials.

The repository stores only the generic example schema, iteration records, and acceptance evidence. Keep source exports and generated site-specific reports outside the repository in an ignored private location.

## Lifecycle

`redact → validate → baseline → compare → interpret → propose → approve → release → measure → retain / roll back`

1. **Redact** — convert a private export into aggregate directions and anonymous observations before it enters the project workflow.
2. **Validate** — run `npm run check:gsc-evidence` on the summary. A rejected input stays outside the repository.
3. **Baseline and compare** — name two non-identifying windows and record only changes that are material to the decision.
4. **Interpret** — distinguish visibility, click, and index-coverage signals; record confidence rather than pretending correlation proves causation.
5. **Propose** — create reversible candidate changes. A candidate is a hypothesis, never an automatic edit or publishing instruction.
6. **Approve and release** — the repository owner explicitly approves a candidate through normal review and release gates.
7. **Measure** — evaluate the same aggregate signals after a defined observation window.
8. **Retain or roll back** — retain only measured improvements; roll back harmful or inconclusive changes using release evidence.

## Required gates

| Gate | Pass condition | Failure handling |
| --- | --- | --- |
| Privacy | No identifiers, raw exports, URLs, credentials, or private telemetry | Quarantine the source outside Git and rewrite it as an aggregate summary. |
| Input integrity | Schema version, redaction flags, periods, signals, observations, and candidates validate | Correct the summary; do not bypass the validator. |
| Decision quality | Every candidate names a hypothesis, expected signal, risk, and owner approval | Keep it proposed or reject it. |
| Release | Candidate change passes normal product, quality, and release gates | Do not publish from an evidence record. |
| Measurement | Same aggregate signals are compared after release | Mark inconclusive or roll back; do not claim success without evidence. |

## Shared-tool boundary

If a future authorized environment needs live Search Console collection, it belongs in an owned, separately versioned shared tool. This site project only consumes a redacted summary after collection. Do not import OAuth handling, tokens, runtime caches, site configuration, live API calls, or source exports into this repository.
