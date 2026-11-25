import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeLabel, validateHttpUrl } from '../src/browser.mjs'
import { startServer } from '../src/server.mjs'

test('accepts http and https URLs without embedded credentials', () => {
  assert.equal(validateHttpUrl('https://example.com/path').hostname, 'example.com')
  assert.equal(validateHttpUrl('http://127.0.0.1:4173').port, '4173')
})

test('rejects local-file and credential-bearing URL inputs', () => {
  assert.throws(() => validateHttpUrl('file:///C:/secret.txt'), /only http and https/)
  assert.throws(() => validateHttpUrl('https://user:pass@example.com'), /credential-bearing/)
})

test('normalizes artifact labels', () => {
  assert.equal(normalizeLabel(' Local Site / 1 '), 'local-site-1')
  assert.equal(normalizeLabel('***'), 'snapshot')
})

test('localhost service exposes health and protects snapshot endpoint', async () => {
  const server = startServer({ token: 'test-token-with-enough-length', port: 0 })
  await new Promise((resolve) => server.once('listening', resolve))
  const { port } = server.address()
  try {
    const health = await fetch(`http://127.0.0.1:${port}/health`)
    assert.equal(health.status, 200)
    assert.equal((await health.json()).status, 'ok')
    const denied = await fetch(`http://127.0.0.1:${port}/snapshot`, { method: 'POST', body: '{}' })
    assert.equal(denied.status, 401)
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  }
})
