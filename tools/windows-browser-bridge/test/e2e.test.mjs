import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import test from 'node:test'
import { startServer } from '../src/server.mjs'

test('authorized bridge request snapshots a local HTTP page', async () => {
  const target = createServer((_request, response) => {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
    response.end('<title>Bridge target</title><main>local snapshot target</main>')
  })
  target.listen(0, '127.0.0.1')
  await new Promise((resolve) => target.once('listening', resolve))
  const targetAddress = target.address()
  const targetPort = typeof targetAddress === 'object' && targetAddress ? targetAddress.port : 0
  const bridge = startServer({ token: 'test-token-with-enough-length', port: 0 })
  await new Promise((resolve) => bridge.once('listening', resolve))
  const bridgeAddress = bridge.address()
  const bridgePort = typeof bridgeAddress === 'object' && bridgeAddress ? bridgeAddress.port : 0
  try {
    const response = await fetch(`http://127.0.0.1:${bridgePort}/snapshot`, {
      method: 'POST',
      headers: { authorization: 'Bearer test-token-with-enough-length', 'content-type': 'application/json' },
      body: JSON.stringify({ url: `http://127.0.0.1:${targetPort}`, label: 'test-target' }),
    })
    const result = await response.json()
    assert.equal(response.status, 200)
    assert.equal(result.title, 'Bridge target')
    assert.equal(result.status, 200)
    assert.match(result.image, /test-target\.png$/)
  } finally {
    await new Promise((resolve, reject) => bridge.close((error) => error ? reject(error) : resolve()))
    await new Promise((resolve, reject) => target.close((error) => error ? reject(error) : resolve()))
  }
})
