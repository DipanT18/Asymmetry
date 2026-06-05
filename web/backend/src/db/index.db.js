import mongoose from 'mongoose'
import { DB_NAME, MONGODB_URI } from '../constants.js'

const connectDB = async () => {
    if (!MONGODB_URI || !DB_NAME) {
        throw new Error(
            'Missing MONGODB_URI or DB_NAME. Copy .env.example to .env and fill in the required values.',
        )
    }

    const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
    console.log(`MongoDB connected. DB host: ${connectionInstance.connection.host}`)
}

export default connectDB