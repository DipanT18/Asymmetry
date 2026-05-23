import app from './app.js'
import { connectDatabase } from './db.js'
import { PORT } from './constants.js'

const startServer = async () => {
  await connectDatabase()
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})