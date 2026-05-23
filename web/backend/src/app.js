import cors from 'cors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createProxyMiddleware } from 'http-proxy-middleware'
import rateLimit from 'express-rate-limit'
import apiRouter from './routes/api.js'
import {
  CLIENT_ORIGIN,
  FRONTEND_DEV_SERVER_URL,
  NODE_ENV,
} from './constants.js'

const app = express()
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
})
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
)
app.use(express.json())

app.use('/api', apiLimiter, apiRouter)

if (NODE_ENV !== 'production' && FRONTEND_DEV_SERVER_URL) {
  app.use(
    '/',
    publicLimiter,
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

  app.use(publicLimiter)
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