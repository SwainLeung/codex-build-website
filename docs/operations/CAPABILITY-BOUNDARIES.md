# Shared capability and site-adapter boundary

Use this rule whenever a workflow may serve more than one site or project.

```text
shared capability → site adapter → run manifest → human approval → verification → retain / roll back
```

## Ownership

| Layer | Owns | Must not own |
| --- | --- | --- |
| Shared capability | Versioned input/output schema, deterministic analysis, validation, and reusable tests | Site identity, credentials, remote transport, production paths, or publishing authority |
| Site adapter | Site-specific content, local layout mapping, approved non-sensitive configuration names, and invocation order | A copied shared implementation, credential handling, or independent remote transport |
| Run manifest | Run identity, input fingerprints, mode, evidence, approval state, and rollback record | Raw source material, secret values, full analytics exports, or executable credentials |

## Promotion and reuse

1. Keep a new behavior local until a second independent use proves the abstraction.
2. When promoting it, create one shared entry point with a schema version and deterministic tests.
3. Replace duplicated site logic with a call or compatibility bridge; never fork the shared implementation.
4. A generated, bootstrap, archive, or bridge artifact may be materialized only when its source version or fingerprint is recorded.
5. If a site needs different behavior, use explicit adapter input rather than hidden branching in the shared capability.

## Operation registry

Every non-trivial operation should declare:

- `operation_id` and `schema_version`
- `scope`: shared capability or site adapter
- permitted mode: `dry-run` or `apply`
- input/output schema and evidence requirement
- side-effect classification
- owner approval and rollback requirement

External write operations require an explicit project authorization in addition to a valid operation record. This repository currently provides no external write operation.
