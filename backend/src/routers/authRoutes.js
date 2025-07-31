import express from "express"
import { login } from "../controllers/authController.js";
import { loginValidationRules, validate } from "../middleware/authValidation.js";
const router = express.Router();

router.post("/login", loginValidationRules, validate, login);

export default router
