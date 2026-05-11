import express from "express"
import { login } from "../controllers/authController.js";
import { loginValidationRules, validate } from "../middleware/authValidation.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Admin authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post("/login", loginValidationRules, validate, login);

export default router
