// Import required modules
import express from "express";
import cors from "cors";
import path from "path";
import "./config/env.js"; // Initialize environment variables first

import responseRoutes from "./routers/responseRoutes.js"
import authRoutes from "./routers/authRoutes.js"
import questionRoutes from "./routers/questionRoutes.js"

import userSeeder from "./userSeeder.js";

import { connectDB } from "./config/db.js"
import { rateLimiter } from "./middleware/rateLimiter.js"

// Diagnostic logger for production
const logger = (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    }
    next();
};

// Create Express app
const app = express();
const PORT = process.env.PORT || 5002;
const __dirname = path.resolve();

// Middleware to parse JSON bodies
app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle OPTIONS preflight requests explicitly
app.options("*", cors());

app.use(express.json());
app.use(logger); // Log requests in production
app.use(rateLimiter);

// Diagnostic route
app.all("/api/ping", (req, res) => {
    res.json({ status: "pong", method: req.method, timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/responses", responseRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/questions", questionRoutes)


// test route
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Sparkly backend is alive! 🎀", timestamp: new Date() });
});


// Serve frontend (Only if not on Vercel)
if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}

// Connect to DB and start the server
if (process.env.NODE_ENV !== "production") {
    connectDB().then(async () => {
        console.log("MongoDB connected");
        if (process.env.RUN_SEED === "true") {
            await userSeeder();
        }

        app.listen(PORT, () => {
            console.log("Server started on Port:", PORT);
        });
    });
} else {
    connectDB();
}

export default app;
