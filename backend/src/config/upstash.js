import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import "./env.js";

const rateLimit = new Ratelimit({
    // Connect to Upstash Redis
    redis: Redis.fromEnv(),
    // 1000 requests per 60 seconds
    limiter: Ratelimit.slidingWindow(1000, "60 s"),
});

export default rateLimit;
