import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

const artifactRoot = resolve('artifacts')

async function launchBridgeBrowser() {
  const preference = process.env.BRIDGE_BROWSER || 'chrome'
  if (preference === 'bundled') {
    return { browser: await chromium.launch({ headless: true }), engine: 'playwright-chromium' }
  }
  const errors = []
  for (const candidate of [
    { channel: 'chrome', engine: 'google-chrome-channel' },
    { channel: 'msedge', engine: 'microsoft-edge-channel' },
  ]) {
    try {
      return { browser: await chromium.launch({ headless: true, channel: candidate.channel }), engine: candidate.engine }
    } catch (error) {
      errors.push(`${candidate.channel}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  try {
    return { browser: await chromium.launch({ headless: true }), engine: 'playwright-chromium-fallback' }
  } catch {
    throw new Error(`No installed Chrome/Edge channel or bundled Chromium could launch. Install the bundled fallback with npm run install:chromium. Attempts: ${errors.join(' | ')}`)
  }
}

export function validateHttpUrl(value) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('url must be a non-empty string')
  const url = new URL(value)
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('only http and https URLs are allowed')
  if (url.username || url.password) throw new Error('credential-bearing URLs are not allowed')
  return url
}

export function normalizeLabel(value = 'snapshot') {
  const label = String(value).trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '')
  return label.slice(0, 64) || 'snapshot'
}

async function artifactPaths(label) {
  await mkdir(artifactRoot, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const prefix = `${stamp}-${normalizeLabel(label)}`
  return { image: resolve(artifactRoot, `${prefix}.png`), metadata: resolve(artifactRoot, `${prefix}.json`) }
}

export async function takeSnapshot({ url, label = 'snapshot' }) {
  const target = validateHttpUrl(url)
  const files = await artifactPaths(label)
  const { browser, engine } = await launchBridgeBrowser()
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ignoreHTTPSErrors: false })
    const page = await context.newPage()
    const response = await page.goto(target.href, { waitUntil: 'networkidle', timeout: 30_000 })
    await page.screenshot({ path: files.image, fullPage: true })
    const result = {
      capturedAt: new Date().toISOString(),
      requestedUrl: target.href,
      finalUrl: page.url(),
      title: await page.title(),
      status: response?.status() ?? null,
      engine,
      bodyText: (await page.locator('body').innerText()).slice(0, 4_000),
      image: files.image,
    }
    await writeFile(files.metadata, `${JSON.stringify(result, null, 2)}\n`, 'utf8')
    await context.close()
    return { ...result, metadata: files.metadata }
  } finally {
    await browser.close()
  }
}

export async function runHealthCheck() {
  const files = await artifactPaths('health-check')
  const { browser, engine } = await launchBridgeBrowser()
  try {
    const page = await browser.newPage({ viewport: { width: 900, height: 600 } })
    await page.setContent('<main><h1>Windows Browser Bridge</h1><button id="check">Ready</button><output id="status">pending</output><script>document.querySelector("#check").addEventListener("click", () => { document.querySelector("#status").textContent = "passed" })</script></main>')
    await page.locator('#check').click()
    const status = await page.locator('#status').textContent()
    if (status !== 'passed') throw new Error(`health interaction failed: ${status}`)
    await page.screenshot({ path: files.image, fullPage: true })
    const result = { checkedAt: new Date().toISOString(), engine, browserVersion: browser.version(), status: 'passed', image: files.image }
    await writeFile(files.metadata, `${JSON.stringify(result, null, 2)}\n`, 'utf8')
    return { ...result, metadata: files.metadata }
  } finally {
    await browser.close()
  }
}
