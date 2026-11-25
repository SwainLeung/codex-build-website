import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const allowedDirections = new Set(['up', 'flat', 'down', 'unknown'])
const allowedConfidence = new Set(['low', 'medium', 'high'])
const allowedStatus = new Set(['proposed', 'approved', 'rejected', 'measured', 'rolled-back'])
const forbiddenText = [
  { label: 'URL', pattern: /https?:\/\/|\bwww\./i },
  { label: 'domain', pattern: /\b(?:[a-z0-9-]+\.)+(?:com|org|net|io|dev|app|cn|uk|info|biz|co)\b/i },
  { label: 'email address', pattern: /\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i },
  { label: 'Windows absolute path', pattern: /\b[a-z]:\\/i },
  { label: 'common token prefix', pattern: /\b(?:sk|ghp|xoxb|AIza)[_-][A-Za-z0-9_-]{12,}\b/ },
]

export function validateEvidenceSummary(summary) {
  const errors = []
  if (!summary || typeof summary !== 'object' || Array.isArray(summary)) return ['summary must be an object']
  if (summary.schema_version !== 'gsc-evidence-summary@1.0.0') errors.push('unsupported schema_version')
  if (summary.source_mode !== 'offline-redacted-summary') errors.push('source_mode must be offline-redacted-summary')
  if (summary.contains_raw_queries !== false) errors.push('contains_raw_queries must be false')
  if (summary.contains_page_urls !== false) errors.push('contains_page_urls must be false')
  if (summary.contains_credentials !== false) errors.push('contains_credentials must be false')
  if (!summary.periods || typeof summary.periods.baseline !== 'string' || typeof summary.periods.comparison !== 'string') {
    errors.push('periods must include baseline and comparison labels')
  }

  const signals = summary.signals
  if (!signals || !allowedDirections.has(signals.impressions_direction) || !allowedDirections.has(signals.clicks_direction) || !allowedDirections.has(signals.index_coverage_direction)) {
    errors.push('signals must use allowed direction values')
  }

  if (!Array.isArray(summary.observations) || summary.observations.length === 0) {
    errors.push('at least one observation is required')
  } else {
    for (const [index, observation] of summary.observations.entries()) {
      if (!observation || typeof observation.signal !== 'string' || typeof observation.evidence !== 'string') errors.push(`observation ${index + 1} is incomplete`)
      if (!allowedConfidence.has(observation?.confidence)) errors.push(`observation ${index + 1} has invalid confidence`)
    }
  }

  if (!Array.isArray(summary.candidates) || summary.candidates.length === 0) {
    errors.push('at least one candidate is required')
  } else {
    for (const [index, candidate] of summary.candidates.entries()) {
      if (!candidate || typeof candidate.id !== 'string' || typeof candidate.hypothesis !== 'string' || typeof candidate.expected_signal !== 'string' || typeof candidate.risk !== 'string') errors.push(`candidate ${index + 1} is incomplete`)
      if (candidate?.requires_owner_approval !== true) errors.push(`candidate ${index + 1} must require owner approval`)
      if (!allowedStatus.has(candidate?.status)) errors.push(`candidate ${index + 1} has invalid status`)
    }
  }

  const serialized = JSON.stringify(summary)
  for (const rule of forbiddenText) if (rule.pattern.test(serialized)) errors.push(`summary contains forbidden ${rule.label}`)
  return errors
}

function main() {
  const file = resolve(process.argv[2] ?? 'docs/templates/GSC_EVIDENCE_SUMMARY.example.json')
  const summary = JSON.parse(readFileSync(file, 'utf8'))
  const errors = validateEvidenceSummary(summary)
  if (errors.length) throw new Error(`GSC evidence summary is invalid:\n${errors.map((error) => `- ${error}`).join('\n')}`)
  console.log(`GSC evidence summary verified: ${file}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
