const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const SocketIO = require('socket.io')
const http = require('http')
const cors = require('cors')
const app = express()
const SocketConnect = require('../server/app/SocketConnect.js')
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const server = http.createServer(app)
const io = SocketIO(server)


async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(cors())
  app.use(nuxt.render)
  // Listen the server
  // app.listen(port, host)
  server.listen(port, host)
  console.log('Server listening on '+host+':' + port) 

  io.on('connection', (socket) => {
    SocketConnect(socket, io)
  })
}
start()
