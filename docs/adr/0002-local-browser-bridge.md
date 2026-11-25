# ADR-0002 — Share a local-only Playwright bridge

| Field | Record |
| --- | --- |
| Status / date | Accepted / 2026-11-25 |
| Problem | The installed computer-use plugin's private native pipe was unavailable and must not be manually recreated. Other computers still need repeatable browser verification. |
| Options | Repair private helper (unsupported); rely on manual browser checks (not repeatable); package an isolated Playwright utility (public API, lockfile, local tests). |
| Decision | Add `tools/windows-browser-bridge` as a nested npm package. It launches Chrome then Edge, has an optional bundled Chromium fallback, and only exposes read-only token-protected snapshots on `127.0.0.1`. |
| Consequences and recovery | Adds a small nested dependency install to CI. It does not affect the website runtime. Remove the tools directory and the added harness commands to revert. |
| Revisit when | A supported first-party replacement for browser verification becomes available, or a cross-platform containerized browser service is required. |
