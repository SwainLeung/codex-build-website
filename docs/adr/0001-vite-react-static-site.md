# ADR-0001 — Vite + React static site

| Field | Record |
| --- | --- |
| Status / date | Accepted / 2026-11-25 |
| Problem | The project needs an interactive, reproducible, static website; the remote repository is empty and has no backend requirement. |
| Options | Native HTML/CSS/JS (smaller dependency surface); Next.js (more capability than required); Vite + React (clear interaction state and static output). |
| Decision | Use Vite + React. It supports stage selection, local checklist persistence, tests, and an auditable `dist/` artifact without a server. |
| Consequences and recovery | Client-only learning state; no sensitive data. Rebuild and publish the previous successful commit to recover. |
| Revisit when | Server-side SEO, accounts, protected content, or a backend become requirements. |
