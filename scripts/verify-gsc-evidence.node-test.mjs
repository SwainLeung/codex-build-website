import assert from 'node:assert/strict'
import test from 'node:test'
import { validateEvidenceSummary } from './verify-gsc-evidence.mjs'

function validSummary() {
  return {
    schema_version: 'gsc-evidence-summary@1.0.0',
    source_mode: 'offline-redacted-summary',
    contains_raw_queries: false,
    contains_page_urls: false,
    contains_credentials: false,
    periods: { baseline: 'window-a', comparison: 'window-b' },
    signals: { impressions_direction: 'up', clicks_direction: 'flat', index_coverage_direction: 'unknown' },
    observations: [{ signal: 'coverage', evidence: 'aggregate count changed', confidence: 'medium' }],
    candidates: [{ id: 'candidate-001', hypothesis: 'Improve a content cluster after review.', expected_signal: 'impressions', risk: 'low', requires_owner_approval: true, status: 'proposed' }],
  }
}

test('accepts an aggregated, approval-gated evidence summary', () => {
  assert.deepEqual(validateEvidenceSummary(validSummary()), [])
})

test('rejects identifiable or automatic-action inputs', () => {
  const summary = validSummary()
  summary.contains_page_urls = true
  summary.candidates[0].requires_owner_approval = false
  summary.observations[0].evidence = 'https://private.example/path'
  const errors = validateEvidenceSummary(summary)
  assert.ok(errors.includes('contains_page_urls must be false'))
  assert.ok(errors.some((error) => error.includes('must require owner approval')))
  assert.ok(errors.some((error) => error.includes('forbidden URL')))
})
