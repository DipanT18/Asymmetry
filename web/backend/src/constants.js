import dotenv from 'dotenv'

dotenv.config()

export const NODE_ENV = process.env.NODE_ENV ?? 'development'
export const PORT = Number.parseInt(process.env.PORT ?? '4000', 10)
export const MONGODB_URI =
  process.env.MONGODB_URI ?? 'mongodb://localhost:27017/asymmetry'
export const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'
export const FRONTEND_DEV_SERVER_URL =
  process.env.FRONTEND_DEV_SERVER_URL ?? 'http://localhost:5173'