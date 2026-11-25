import { createServer } from 'node:http'
import { takeSnapshot } from './browser.mjs'

const host = '127.0.0.1'
const defaultPort = Number(process.env.BRIDGE_PORT || 8787)

function send(response, status, payload) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  response.end(`${JSON.stringify(payload)}\n`)
}

async function body(request) {
  let text = ''
  for await (const chunk of request) {
    text += chunk
    if (text.length > 20_000) throw new Error('request body exceeds 20 KB')
  }
  return text ? JSON.parse(text) : {}
}

export function startServer({ token, port = defaultPort }) {
  if (!token || token.length < 16) throw new Error('BRIDGE_TOKEN must contain at least 16 characters')
  const server = createServer(async (request, response) => {
    try {
      if (request.method === 'GET' && request.url === '/health') return send(response, 200, { status: 'ok', host, port })
      if (request.method !== 'POST' || request.url !== '/snapshot') return send(response, 404, { error: 'not found' })
      if (request.headers.authorization !== `Bearer ${token}`) return send(response, 401, { error: 'unauthorized' })
      const payload = await body(request)
      const result = await takeSnapshot({ url: payload.url, label: payload.label })
      return send(response, 200, result)
    } catch (error) {
      return send(response, 400, { error: error instanceof Error ? error.message : 'unknown error' })
    }
  })
  server.listen(port, host, () => {
    const address = server.address()
    const activePort = typeof address === 'object' && address ? address.port : port
    console.log(`Windows Browser Bridge listening on http://${host}:${activePort}`)
  })
  return server
}
