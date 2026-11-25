# SOUL and DESIGN contracts

`SOUL.md` and `DESIGN.md` serve different readers and must both exist.

| Artifact | Owner | Purpose | Must not contain |
| --- | --- | --- | --- |
| `SOUL.md` | Site project | Voice, audience, content model, product tier, pipeline role, and access boundary | Credentials, account details, real domains, raw reports, or deployment instructions |
| `DESIGN.md` | Site project | Human-readable visual direction, layout/motion intent, and asset rules | Runtime configuration or copied reference-brand material |
| `config/design-contract.json` | Site project | Versioned machine-readable tokens, page-kind expectations, and release requirements | Remote endpoints, production IDs, secrets, or provider-specific deployment data |
| `scripts/verify-project-contracts.mjs` | Shared project check | Deterministic validation of the contracts and the run-manifest template | Any implementation or publishing authority |

## Preflight policy

The preflight deliberately separates blockers from migration guidance.

- **Blockers:** missing SOUL section, project mismatch, invalid/disabled design contract, missing token or quality dimension, secret-like material, or an apply-mode run without approval.
- **Warnings or future work:** richer page kinds, optional visual regression tooling, or a more specific editorial threshold.

Do not infer approval from a passing preflight. A pass only proves that the declared contract is complete enough to enter normal review.

## Naming rule

Use `DESIGN.md` as the canonical case-sensitive filename. Do not introduce a parallel lowercase variant; it is ambiguous across Windows and case-sensitive environments.
