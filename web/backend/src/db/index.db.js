import mongoose from "mongoose";
import {} from '';

const connectDB = async() => {
    try{
        const connnectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB Connected !! DB HOST: ${connnectioninstance.connection.host}`);
    }catch(error){
        console.log("MongoDB Connection Error: ", error)
        process.exit(1)
    }
}

export default connectDB;