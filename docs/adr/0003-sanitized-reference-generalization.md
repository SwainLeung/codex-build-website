# ADR-0003 — Generalize reference architecture without copying identity

| Field | Record |
| --- | --- |
| Status / date | Accepted / 2026-11-25 |
| Problem | Local reference sites contain useful operating patterns alongside production-specific identities, configuration, and data that must not enter this repository. |
| Options | Copy reference artifacts (unsafe); rely on an undocumented verbal summary (not reusable); write original generic model, templates, and explicit redaction rules. |
| Decision | Adopt a five-layer operating model and typed placeholders. Store the abstraction in `docs/operations/`, templates in `docs/templates/`, and show the model in the website. |
| Consequences and recovery | Adds documentation and content checks without adding a deployment backend. If a generalized rule proves wrong, revise the generic document; do not re-import source material. |
| Revisit when | A reference owner approves a separately licensed, scrubbed public template, or the project needs a new non-sensitive lifecycle state. |
