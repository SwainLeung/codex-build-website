# Execution and run-manifest standard

Use a small, evidence-first loop for any material operation:

`index → dry-run → validate → review → approve → apply → read back → retain / roll back`

## Required behavior

- **Dry-run is the default.** It can inspect and produce a proposed manifest but cannot publish, mutate a remote service, or claim completion.
- **Runs are owned.** A `run_id` belongs to one project and records non-sensitive input fingerprints so evidence cannot be reused across projects.
- **Apply is explicit.** `mode: apply` is invalid unless the manifest has an approved human decision.
- **Verification is separate from action.** Capture the exact checks and their outcome after the operation; a preview is not release evidence.
- **Rollback is planned first.** Every run names either a recovery action or an explicit reason that no recovery is needed.
- **Context is bounded.** Read only the files named by the operation contract; do not use a repository-wide scan as a substitute for targeted context.

## Repository boundary

This project keeps only generic examples under `docs/templates/`. Real run records must be redacted before they enter Git and must never contain credentials, URLs, domains, page bodies, raw exports, screenshots, or production identifiers.
