import { readFileSync } from 'node:fs'

const requiredFiles = ['README.md', 'CHANGELOG.md', 'docs/CHECKLIST.md', 'docs/harness/PROJECT.md', 'docs/harness/specs/issue-001-website-system.md', 'docs/operations/SITE-OPERATING-MODEL.md', 'docs/operations/REFERENCE-HYGIENE.md', 'docs/templates/SITE_PROFILE.example.yml']
const app = readFileSync('src/content.ts', 'utf8')
const missingTerms = ['Purpose & AGENTS.md', 'Design skill', 'Browser verification', 'Brand design.md', 'Original assets', 'Layout inspiration', 'Components & performance']

for (const file of requiredFiles) readFileSync(file, 'utf8')
for (const term of missingTerms) {
  if (!app.includes(term)) throw new Error(`Missing required stage: ${term}`)
}

for (const term of ['operatingLayers', 'referenceHygiene']) {
  if (!app.includes(term)) throw new Error(`Missing generalized operating-model content: ${term}`)
}

console.log(`Content contract verified: ${missingTerms.length} stages and ${requiredFiles.length} project records.`)
