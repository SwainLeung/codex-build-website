# Website delivery checklist

Use this before creating a release candidate. The browser checklist is a convenience layer; this file is the reviewable source of truth.

## Product and content

- [ ] One audience, one primary outcome, and one CTA are explicit.
- [ ] Statements derived from references are summarized rather than copied; sources and permissions are recorded.
- [ ] `AGENTS.md`, `design.md`, and the relevant `docs/harness/specs/` record agree on the project boundary.

## Design and assets

- [ ] The project visual system is applied consistently without copying a reference brand.
- [ ] Every asset in `public/assets/` has a documented source and publishing right.
- [ ] Layout references inform composition only; project content and brand remain original.
- [ ] Keyboard focus, contrast, small screens, and reduced-motion preference are manually checked.

## Engineering and release

- [ ] `npm run lint`, `npm run check:content`, `npm test`, and `npm run build` pass on the candidate commit.
- [ ] `python scripts/harness.py doctor` and `python scripts/harness.py check` pass.
- [ ] A browser smoke test covers desktop and narrow viewport behavior.
- [ ] `CHANGELOG.md`, release record, and rollback path identify the exact candidate artifact.
- [ ] A commit exists before and after any material agent-driven experiment.
