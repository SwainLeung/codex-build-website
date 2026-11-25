import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const roots = ['docs/operations', 'docs/templates']
const files = []

function collect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) collect(path)
    else files.push(path)
  }
}

for (const root of roots) collect(root)

const forbidden = [
  { label: 'external URL', pattern: /https?:\/\/|\bwww\./i },
  { label: 'email address', pattern: /\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i },
  { label: 'Windows absolute path', pattern: /\b[a-z]:\\/i },
  { label: 'private-key block', pattern: /-----BEGIN(?: [A-Z]+)* PRIVATE KEY-----/ },
  { label: 'common token prefix', pattern: /\b(?:sk|ghp|xoxb|AIza)[_-][A-Za-z0-9_-]{12,}\b/ },
]

const violations = []
for (const file of files) {
  const text = readFileSync(file, 'utf8')
  for (const rule of forbidden) {
    if (rule.pattern.test(text)) violations.push(`${file}: ${rule.label}`)
  }
}

if (violations.length) throw new Error(`Reference hygiene violations found:\n${violations.join('\n')}`)
console.log(`Reference hygiene verified: ${files.length} generalized documents/templates contain no identifying paths, URLs, emails, or common key formats.`)
