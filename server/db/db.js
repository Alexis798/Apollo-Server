import mongoose from "mongoose";

export const connectDB = async () => {

    try {
        
        const conn = await mongoose.connect('YourDATABASEmongolink')
        console.log(`MongoDB Connected : ${conn.connection.name}`)

    } catch (error) {
     
        console.error(`Error: ${error.message}`)
        process.exit(1)

    }
    

}