import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config() 


export const DB=async()=>{
    try {
        const DB=await mongoose.connect(process.env.MONGO_DB)
        console.log('Successfully connected MONGODB',DB.connection.host);
    } catch (error) {
        console.log(error.message);
        console.log('There was an error in connnection');
    }      
}




