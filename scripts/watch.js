const { watch } = require('node:fs')
const { WebSocketServer } = require('ws')

function main() {
  const wss = new WebSocketServer({ port: 80 })
  wss.on('connection', (ws, req) => {
    watch(
      process.cwd() + '/posts',
      { recursive: true },
      (eventType, filename) => {
        const path = '/posts/' + filename.replace(/\.md/, '')
        ws.send(JSON.stringify({ event: 'markdown-changed', path }))
      }
    )
  })
}
main()
