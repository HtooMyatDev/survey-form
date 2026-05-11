import rateLimit from "../config/upstash.js";

// Rate limiter middleware

export const rateLimiter = async (req, res, next) => {
    try {
        // Use the client's IP as a unique key for rate limiting
        const identifier = req.ip || req.headers['x-forwarded-for'] || "anonymous";
        
        // Limit to 20 requests per 20 seconds (Upstash config is usually set in the config file, 
        // but here we just pass the identifier)
        const { success } = await rateLimit.limit(`ratelimit_${identifier}`);
        
        if (!success) {
            return res.status(429).json({ message: "Slow down, cutie! Too many requests. 🌸" });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "Error in rateLimiter middleware",
            error: error.message,
        });
        next(error);
    }
}
