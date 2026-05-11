import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB (Serverless Optimized)");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        // In serverless, we might not want to exit the process, 
        // but since this is called at the top level, it's fine for now.
    }
};
