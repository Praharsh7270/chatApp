import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        // Connect to MongoDB using the URI from environment variables
        mongoose.connection.on("connected", ()=>{
            console.log("MongoDB connected successfully");
        })
        await mongoose.connect(`${process.env.MongoDBUri}/chat-App`)
    }

    catch(err) {
        console.error("MongoDB connection error:", err);
    }
}