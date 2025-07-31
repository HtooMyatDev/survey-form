// Import required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import responseRoutes from "./routers/responseRoutes.js"
import authRoutes from "./routers/authRoutes.js"
import { connectDB } from "./config/db.js"
import { rateLimiter } from "./middleware/rateLimiter.js"
import userSeeder from "./userSeeder.js";
// Load environment variables
dotenv.config()

// Create Express app
const app = express();
const PORT = process.env.PORT || 5002;
const __dirname = path.resolve();

// Middlware to parse JSON bodies
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}

app.use(express.json());
app.use(rateLimiter);

// Routes
app.use("/api/responses", responseRoutes)
app.use("/api/auth", authRoutes)


// Serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}

// Connect to DB and start the server
connectDB().then(async () => {
    console.log("MongoDB connected");
    if (process.env.RUN_SEED === "true") {
        await userSeeder();
    }

    app.listen(5002, () => {
        console.log("Server started on Port:", PORT);
    });
});
