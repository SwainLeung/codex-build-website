# AI LABS — Codex Website System

An interactive Chinese single-page site that turns the user-provided AI LABS video transcript into a seven-stage website-building workflow, tension analysis, and release checklist. It adopts the repository governance model from [AI Native Harness](https://github.com/Leungfh/ai-native-harness).

## What is here

- An interactive map of the seven stages: purpose and `AGENTS.md`, design skill, browser verification, brand `design.md`, original assets, layout inspiration, and components/performance.
- A keep/update matrix that compares rapid creative iteration with repository governance.
- A copyable build brief and a launch checklist persisted in browser local storage.
- Semantic HTML, keyboard-operable controls, responsive layout, and `prefers-reduced-motion` support.

## Run locally

```bash
npm ci
npm run dev
```

Run the checks and production build:

```bash
npm run lint
npm run check:content
npm test
npm run build
python scripts/harness.py doctor
python scripts/harness.py check
```

## Source and boundary

- The primary source is the user-provided `subtitles of video by vidIQ.txt`, which is deliberately not committed.
- This site contains an original structured summary and engineering analysis; it does not reproduce the raw transcript.
- Video entry point: <https://youtu.be/pHstb0JGGhE>.
- Names of third-party skills or products are video context only, not claims about their current behavior or quality.

## Project assets

| Directory | Purpose |
| --- | --- |
| `src/` | React UI, content model, styles, and unit tests |
| `public/assets/` | Publishable, rights-cleared original brand assets |
| `docs/CHECKLIST.md` | Reviewable manual delivery checklist |
| `docs/harness/` | Project facts, specification, phases, decisions, and release evidence |
| `.github/workflows/` | CI that repeats the harness checks |

## Release

Build output is the Vite `dist/` directory. Before any hosting release, fill the candidate SHA and evidence in `docs/harness/releases/v0.1.0.md`. Do not publish the local source transcript, credentials, or unlicensed reference imagery.

## Reusable Windows browser bridge

`tools/windows-browser-bridge/` packages a local-only Playwright browser bridge for visual smoke checks on Windows. It uses installed Chrome or Edge by default, requires a per-session token for its localhost snapshot service, and keeps images/metadata out of Git. See `tools/windows-browser-bridge/README.md` for installation and usage.
