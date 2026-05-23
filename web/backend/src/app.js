import cors from 'cors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createProxyMiddleware } from 'http-proxy-middleware'
import apiRouter from './routes/api.js'
import {
  CLIENT_ORIGIN,
  FRONTEND_DEV_SERVER_URL,
  NODE_ENV,
} from './constants.js'

const app = express()

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
)
app.use(express.json())

app.use('/api', apiRouter)

if (NODE_ENV !== 'production' && FRONTEND_DEV_SERVER_URL) {
  app.use(
    '/',
    createProxyMiddleware({
      target: FRONTEND_DEV_SERVER_URL,
      changeOrigin: true,
      ws: true,
    }),
  )
} else {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const clientDistPath = path.resolve(
    __dirname,
    '../../frontend/vite-project/dist',
  )

  app.use(express.static(clientDistPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'))
  })
}

app.use((error, req, res, next) => {
  const status = error.statusCode ?? 500
  res.status(status).json({
    message: error.message ?? 'Internal server error',
  })
})

export default app