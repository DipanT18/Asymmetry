import app from './app.js'
import connectDB from './db/index.db.js'
import { PORT } from './constants.js'
import http from 'http'
import { Server } from 'socket.io'

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: CLIENT_ORIGIN,
    },
}) 

//Socket io connection handling
io.on('connection', (socket) => {
    console.log(` [socket] New client connected: ${socket.id}`)
})

const startServer = async () => {
    await connectDB()

    server.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`)
    })
}

startServer().catch((error) => {
    console.error('Failed to start server:', error)
    process.exit(1)
}) 