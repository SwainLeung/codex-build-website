# Diagnosis and operating record

## Original failure

On 2026-11-25, the installed Codex computer-use package returned:

```text
Computer Use native pipe is unavailable: failed to connect native pipe: 系统找不到指定的文件。
```

The package's own skill explicitly forbids manually searching for, launching, or recreating its private native helper/protocol. This project therefore does **not** attempt to repair or emulate that pipe.

## Supported alternative

`windows-browser-bridge` uses the public Playwright Node API and an isolated Chromium install. It is suitable for deterministic local-page verification and read-only visual snapshots. It is not a substitute for operating arbitrary Windows desktop applications.

## Evidence expected after installation

1. `npm install` completes and the existing Google Chrome channel is discoverable.
2. `npm run health` writes `artifacts/health-check.png` and `artifacts/health-check.json`.
3. `npm test` validates URL restrictions and input normalization.
4. A local target can be checked with `npm run snapshot -- --url http://127.0.0.1:<port>`.

For a Playwright-managed Chromium fallback, run `npm run install:chromium` and set `BRIDGE_BROWSER=bundled`. If a corporate proxy is required, configure npm/Playwright through the organization's documented policy rather than disabling certificate or browser security checks.
