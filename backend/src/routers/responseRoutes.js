import express from "express";
import {
    submitResponse,
    getFilteredResponses,
    getResponseById,
    deleteResponse
} from "../controllers/responseController.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Responses
 *   description: Survey response management
 */

/**
 * @swagger
 * /responses:
 *   post:
 *     summary: Submit a new survey response
 *     tags: [Responses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Map of questionId to answers
 *     responses:
 *       201:
 *         description: Successfully submitted
 *       400:
 *         description: Validation error
 */
router.post("/", submitResponse);

/**
 * @swagger
 * /responses:
 *   get:
 *     summary: Get all survey responses (Admin only)
 *     tags: [Responses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of responses
 */
router.get("/", getFilteredResponses)

/**
 * @swagger
 * /responses/{id}:
 *   get:
 *     summary: Get a single response by ID
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Response details
 *       404:
 *         description: Not found
 */
router.get("/:id", getResponseById);

/**
 * @swagger
 * /responses/{id}:
 *   delete:
 *     summary: Delete a response (Admin only)
 *     tags: [Responses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/:id", deleteResponse)

export default router;
