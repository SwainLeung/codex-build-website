import { runHealthCheck, takeSnapshot } from './browser.mjs'
import { startServer } from './server.mjs'

function option(args, name) {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

async function main() {
  const [command = 'health', ...args] = process.argv.slice(2)
  if (command === 'health') {
    console.log(JSON.stringify(await runHealthCheck(), null, 2))
    return
  }
  if (command === 'snapshot') {
    const url = option(args, '--url')
    if (!url) throw new Error('usage: npm run snapshot -- --url <http(s) URL> [--label <name>]')
    console.log(JSON.stringify(await takeSnapshot({ url, label: option(args, '--label') }), null, 2))
    return
  }
  if (command === 'serve') {
    startServer({ token: process.env.BRIDGE_TOKEN })
    return
  }
  throw new Error(`unknown command: ${command}`)
}

main().catch((error) => {
  console.error(`Bridge error: ${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
})
