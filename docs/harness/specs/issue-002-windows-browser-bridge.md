# ISSUE-002 — Reusable Windows browser bridge

| Field | Value |
| --- | --- |
| Project / target version / owner | codex-build-website / v0.1.0 / repository owner |
| Source idea / issue / PR | Browser-verification follow-up / ISSUE-002 / bridge integration commit |
| User and current impact | A machine with an unavailable private computer-use native pipe cannot produce repeatable browser evidence. |
| Target and boundary | Other Windows computers can install a dedicated browser bridge, run unit tests, use Chrome/Edge or optional bundled Chromium, and invoke a token-protected localhost snapshot API. It does not repair private plugin internals or drive arbitrary desktop UI. |
| Changed entry points | `tools/windows-browser-bridge/`, root harness config, root README/change log/project card. |

## Acceptance criteria

| ID | Given | Action | Expected result | Evidence |
| --- | --- | --- | --- | --- |
| AC-01 | Fresh clone with Node 20+ and Chrome or Edge | `npm --prefix tools/windows-browser-bridge ci && npm --prefix tools/windows-browser-bridge test` | Bridge tests pass without a global install. | Root harness test stage. |
| AC-02 | A supported Windows browser | `npm --prefix tools/windows-browser-bridge run health` | Browser opens a local page, clicks it, and writes ignored PNG/JSON evidence. | Local health output. |
| AC-03 | Service with no token | `node src/cli.mjs serve` | Refuses to start. | Unit test / command exit 1. |
| AC-04 | Authorized local caller | POST `127.0.0.1` `/snapshot` with a bearer token and HTTP(S) URL | Read-only screenshot response; `file:` and credential-bearing URLs are rejected. | `npm run test:e2e`. |

## Delivery decisions

| Decision | Record |
| --- | --- |
| Isolation | Keep bridge as a nested npm package so the website bundle does not include Playwright. |
| Browser policy | Prefer installed Chrome, then Edge, then explicitly requested Playwright Chromium. |
| Network and privacy | Bind only to loopback; require a transient caller token; preserve no browser profile or credentials. |
| Source boundary | Do not search for, run, or emulate the private `@oai/sky` helper; use Playwright's public API. |
