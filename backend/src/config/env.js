import dotenv from "dotenv";
import path from "path";

// Load environment variables from the root .env or backend/.env
dotenv.config();
dotenv.config({ path: path.join(path.resolve(), "backend", ".env") });

export default process.env;
