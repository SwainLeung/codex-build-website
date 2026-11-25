import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const secretPatterns = [
  /\b(?:password|passwd|token|api[_-]?key|client_secret)\s*[:=]\s*\S+/i,
  /\b(?:sk|ghp|xoxb|AIza)[_-][A-Za-z0-9_-]{12,}\b/,
  /-----BEGIN(?: [A-Z]+)* PRIVATE KEY-----/,
]

const requiredSoulSections = ['Voice', 'Site', 'Content model', 'Tier', 'Pipeline', 'Access']
const requiredDesignSections = ['Intent', 'Visual tokens', 'Layout and motion', 'Asset rules', 'Contract binding']
const requiredTokens = ['ink', 'paper', 'field', 'signal', 'charge']
const requiredWeights = ['hierarchy', 'accessibility', 'responsive', 'performance']
const allowedModes = new Set(['dry-run', 'apply'])
const allowedRunStatuses = new Set(['proposed', 'validated', 'approved', 'applied', 'verified', 'rolled-back', 'blocked'])

function frontmatter(text) {
  const match = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/)
  return match?.[1] ?? ''
}

function yamlScalar(block, key) {
  return block.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'))?.[1]?.trim() ?? ''
}

export function validateSoul(text, { projectId = 'codex-build-website' } = {}) {
  const errors = []
  const front = frontmatter(text)
  if (!front) errors.push('soul_frontmatter_missing')
  if (yamlScalar(front, 'schema_version') !== 'soul-profile@1.0.0') errors.push('soul_schema_invalid')
  if (yamlScalar(front, 'project_id') !== projectId) errors.push('soul_project_mismatch')
  if (!yamlScalar(front, 'access_mode')) errors.push('soul_access_mode_missing')
  for (const section of requiredSoulSections) {
    if (!new RegExp(`^##\\s+${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'mi').test(text)) errors.push(`soul_section_missing:${section}`)
  }
  for (const pattern of secretPatterns) if (pattern.test(text)) errors.push('soul_contains_secret_pattern')
  return errors
}

export function validateDesignDocument(text) {
  const errors = []
  for (const section of requiredDesignSections) {
    if (!new RegExp(`^##\\s+${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'mi').test(text)) errors.push(`design_section_missing:${section}`)
  }
  for (const pattern of secretPatterns) if (pattern.test(text)) errors.push('design_contains_secret_pattern')
  return errors
}

export function validateDesignContract(contract, { projectId = 'codex-build-website' } = {}) {
  const errors = []
  if (!contract || typeof contract !== 'object' || Array.isArray(contract)) return ['design_contract_not_object']
  if (contract.schema_version !== 'design-contract@1.0.0') errors.push('design_schema_invalid')
  if (contract.project_id !== projectId) errors.push('design_project_mismatch')
  if (contract.enabled !== true) errors.push('design_disabled')
  if (contract.blocking !== true) errors.push('design_not_blocking')
  if (contract.extends !== 'frontend-baseline@1.0.0') errors.push('design_baseline_missing')
  for (const token of requiredTokens) {
    if (!/^#[0-9a-f]{6}$/i.test(contract.tokens?.[token] ?? '')) errors.push(`design_token_invalid:${token}`)
  }
  const pageKind = contract.page_kinds?.['editorial-system']
  if (!pageKind || typeof pageKind !== 'object') errors.push('design_page_kind_missing')
  for (const weight of requiredWeights) {
    if (typeof pageKind?.quality_weights?.[weight] !== 'number') errors.push(`design_weight_missing:${weight}`)
  }
  if (!Array.isArray(contract.release_requirements) || contract.release_requirements.length === 0) errors.push('design_release_requirements_missing')
  return errors
}

export function validateRunManifest(manifest) {
  const errors = []
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) return ['run_manifest_not_object']
  if (manifest.schema_version !== 'run-manifest@1.0.0') errors.push('run_schema_invalid')
  if (typeof manifest.run_id !== 'string' || !manifest.run_id.trim()) errors.push('run_id_missing')
  if (typeof manifest.project_id !== 'string' || !manifest.project_id.trim()) errors.push('run_project_missing')
  if (!allowedModes.has(manifest.mode)) errors.push('run_mode_invalid')
  if (!allowedRunStatuses.has(manifest.status)) errors.push('run_status_invalid')
  if (!Array.isArray(manifest.inputs) || manifest.inputs.length === 0) errors.push('run_inputs_missing')
  if (!Array.isArray(manifest.verification) || manifest.verification.length === 0) errors.push('run_verification_missing')
  if (!manifest.rollback || typeof manifest.rollback.strategy !== 'string' || !manifest.rollback.strategy) errors.push('run_rollback_missing')
  if (manifest.mode === 'apply' && manifest.approval?.state !== 'approved') errors.push('run_apply_requires_approval')
  if (JSON.stringify(manifest).match(/https?:\/\/|\bwww\.|\b(?:sk|ghp|xoxb|AIza)[_-][A-Za-z0-9_-]{12,}\b/i)) errors.push('run_contains_identifying_or_secret_text')
  return errors
}

function assertValid(label, errors) {
  if (errors.length) throw new Error(`${label} is invalid:\n${errors.map((error) => `- ${error}`).join('\n')}`)
}

function main() {
  const soul = readFileSync(resolve('SOUL.md'), 'utf8')
  const designDocument = readFileSync(resolve('DESIGN.md'), 'utf8')
  const design = JSON.parse(readFileSync(resolve('config/design-contract.json'), 'utf8'))
  const runTemplate = JSON.parse(readFileSync(resolve('docs/templates/RUN_MANIFEST.example.json'), 'utf8'))
  assertValid('SOUL.md', validateSoul(soul))
  assertValid('DESIGN.md', validateDesignDocument(designDocument))
  assertValid('config/design-contract.json', validateDesignContract(design))
  assertValid('docs/templates/RUN_MANIFEST.example.json', validateRunManifest(runTemplate))
  console.log('Project contracts verified: SOUL, DESIGN, design contract, and run-manifest template are valid.')
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main()
