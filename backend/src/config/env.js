import dotenv from "dotenv";
import path from "path";

// Load environment variables from the root .env or backend/.env
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
    dotenv.config({ path: path.join(path.resolve(), "backend", ".env") });
}

export default process.env;
