# ADR-0005 — Use executable site contracts without inheriting runtime authority

| Field | Record |
| --- | --- |
| Status / date | Accepted / 2026-11-25 |
| Problem | A prose-only site profile cannot deterministically block missing identity/design constraints, accidental shared-code forks, or unapproved apply-mode operations. Copying a full multi-site runtime would introduce private access and deployment risk. |
| Options | Keep prose only; copy the full source runtime; introduce original local contracts, validators, templates, and boundaries with no external authority. |
| Decision | Add `SOUL.md`, `DESIGN.md`, a versioned design contract, a contract validator, capability-boundary documentation, and a generic run-manifest standard. |
| Consequences and recovery | Adds documentation and deterministic checks but no live collection, authentication, transport, or publishing. Revert by removing the contracts, validator commands, UI section, and ISSUE-005 records. |
| Revisit when | A second independent site needs the same generic capability and an owned shared package can be introduced with a versioned API and tests. |
