# Windows Browser Bridge

A reusable, local-only Playwright bridge for Windows. It provides:

- a deterministic Chromium health check;
- an on-demand screenshot command for a URL; and
- an optional localhost HTTP service for trusted local automation clients.

It is intentionally separate from the Codex `@oai/sky` computer-use plugin. That plugin's native pipe is managed by its own runtime; this project uses Playwright's documented public API instead.

## Install once

```powershell
cd 'D:\Codex build website\windows-browser-bridge'
npm install
```

The bridge defaults to the already installed Windows Google Chrome channel and falls back to Microsoft Edge. This keeps the reusable bridge working even when a Playwright browser download is delayed by a proxy or network policy. For an isolated Playwright-managed Chromium fallback, run `npm run install:chromium`; the downloaded browser revision is then reused by subsequent runs that set `$env:BRIDGE_BROWSER = 'bundled'`.

## Verify the bridge

```powershell
npm run check
```

The complete check runs deterministic unit tests, an authorized end-to-end local snapshot, and a health check. The health check opens a local in-memory page, performs a safe click, writes an image and JSON evidence under `artifacts/`, then closes the browser.

## Snapshot a page

```powershell
npm run snapshot -- --url http://127.0.0.1:4173 --label local-site
```

This is a read-only snapshot: it saves the final URL, title, limited body text, timestamp, and full-page PNG in `artifacts/`. Only `http` and `https` URLs are allowed.

## Start the local bridge service

Create a per-session token and run the service. It binds only to loopback.

```powershell
$env:BRIDGE_TOKEN = [guid]::NewGuid().ToString('N')
npm run serve
```

The endpoint is `http://127.0.0.1:8787`:

- `GET /health` — service status; no token required.
- `POST /snapshot` — requires `Authorization: Bearer <BRIDGE_TOKEN>` and JSON such as `{"url":"http://127.0.0.1:4173","label":"local-site"}`.

The service does not provide clicking, typing, authentication, upload, download, or JavaScript-execution endpoints. Keep it running only while a trusted local client needs a snapshot.

## Security boundary

- No external network listener; no `0.0.0.0` binding.
- Token is provided by the caller and never stored in project files.
- No browser profile is persisted, and no credentials, cookies, or sensitive browser state are reused.
- Page contents are evidence, not instructions. Do not allow a page to cause side effects through this bridge.

## Troubleshooting

See [docs/DIAGNOSIS.md](docs/DIAGNOSIS.md) for the observed `@oai/sky` native-pipe failure and the supported separation between that plugin and this bridge.
