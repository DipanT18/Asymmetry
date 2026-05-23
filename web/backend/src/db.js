import mongoose from 'mongoose'
import { MONGODB_URI } from './constants.js'

export const connectDatabase = async () => {
  mongoose.set('strictQuery', true)
  await mongoose.connect(MONGODB_URI)
  return mongoose.connection
}
