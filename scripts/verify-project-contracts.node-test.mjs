import assert from 'node:assert/strict'
import test from 'node:test'
import { validateDesignContract, validateDesignDocument, validateRunManifest, validateSoul } from './verify-project-contracts.mjs'

const soul = `---
schema_version: soul-profile@1.0.0
project_id: codex-build-website
access_mode: no-runtime-access
---
# SOUL
## Voice
Clear.
## Site
Static.
## Content model
Original.
## Tier
Public.
## Pipeline
Review.
## Access
No secrets.`

const designDocument = `# DESIGN
## Intent
Editorial.
## Visual tokens
Tokens.
## Layout and motion
Motion.
## Asset rules
Rights.
## Contract binding
Machine companion.`

function design() {
  return {
    schema_version: 'design-contract@1.0.0', project_id: 'codex-build-website', enabled: true, blocking: true, extends: 'frontend-baseline@1.0.0',
    tokens: { ink: '#17221d', paper: '#eae8e1', field: '#d7dfd4', signal: '#e84f32', charge: '#d7ff8a' },
    page_kinds: { 'editorial-system': { quality_weights: { hierarchy: 1, accessibility: 1, responsive: 1, performance: 1 } } },
    release_requirements: ['visual-smoke'],
  }
}

function manifest() {
  return {
    schema_version: 'run-manifest@1.0.0', run_id: 'run-example', project_id: 'example-project', mode: 'dry-run', status: 'validated',
    inputs: [{ kind: 'contract', fingerprint: 'sha256:example' }], verification: [{ check: 'static', status: 'pass' }],
    approval: { state: 'not-required' }, rollback: { strategy: 'restore-previous-verified-candidate' },
  }
}

test('accepts a complete non-sensitive contract set', () => {
  assert.deepEqual(validateSoul(soul), [])
  assert.deepEqual(validateDesignDocument(designDocument), [])
  assert.deepEqual(validateDesignContract(design()), [])
  assert.deepEqual(validateRunManifest(manifest()), [])
})

test('blocks missing identity, disabled design, and unapproved apply', () => {
  const disabled = design()
  disabled.enabled = false
  const apply = manifest()
  apply.mode = 'apply'
  assert.ok(validateSoul(soul.replace('## Access', '## Access removed')).some((error) => error.startsWith('soul_section_missing:Access')))
  assert.ok(validateSoul(`${soul}\ntoken: placeholder-secret`).includes('soul_contains_secret_pattern'))
  assert.ok(validateDesignDocument(designDocument.replace('## Asset rules', '## Asset removed')).some((error) => error.startsWith('design_section_missing:Asset rules')))
  assert.ok(validateDesignContract(disabled).includes('design_disabled'))
  assert.ok(validateRunManifest(apply).includes('run_apply_requires_approval'))
})
