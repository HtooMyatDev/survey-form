// Import required modules
import express from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import "./config/env.js"; // Initialize environment variables first

import responseRoutes from "./routers/responseRoutes.js"
import authRoutes from "./routers/authRoutes.js"
import questionRoutes from "./routers/questionRoutes.js"

import userSeeder from "./userSeeder.js";

import { connectDB } from "./config/db.js"
import { rateLimiter } from "./middleware/rateLimiter.js"
import { swaggerUi, specs } from './config/swagger.js';
import { initCronJobs } from "./utils/cron.js";
import errorHandler from "./middleware/errorHandler.js";
import AppError from "./utils/appError.js";

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
app.use(helmet()); // Basic XSS and security header protection
app.use(logger); // Log requests in production
app.use(rateLimiter); // DDoS protection

// Routes
const apiRouter = express.Router();
apiRouter.use("/responses", responseRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/questions", questionRoutes);

// Diagnostic route on the router
apiRouter.all("/ping", (req, res) => {
    res.json({ status: "pong", method: req.method, timestamp: new Date().toISOString() });
});

// Mount the router at both /api (local/traditional) and / (Vercel service)
app.use("/api", apiRouter);
app.use("/", apiRouter);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Psychology Survey API Docs"
}));


// test route
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Sparkly backend is alive! 🎀", timestamp: new Date() });
});


// Serve frontend (Only if not on Vercel)
if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
}

// Handle unhandled routes (404)
app.all("*", (req, res, next) => {
    // If it's a static file request (production), let it pass to the static middleware
    if (process.env.NODE_ENV === "production" && !process.env.VERCEL && !req.url.startsWith('/api')) {
        return res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    }
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler (Must be the last middleware)
app.use(errorHandler);

// Connect to DB and start the server
if (process.env.NODE_ENV !== "production") {
    connectDB().then(async () => {
        console.log("MongoDB connected");
        if (process.env.RUN_SEED === "true") {
            await userSeeder();
        }

        app.listen(PORT, () => {
            console.log("Server started on Port:", PORT);
            if (!process.env.VERCEL) {
                initCronJobs(); // Only start in-memory cron if not on Vercel
            }
        });
    });
} else {
    connectDB();
}

export default app;
