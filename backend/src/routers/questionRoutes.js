import express from "express";
import {
    getAllQuestions,
    getAllQuestionsAdmin,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    reorderQuestions,
    toggleQuestionStatus
} from "../controllers/questionController.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Survey question management
 */

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all active questions for the survey
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: List of active questions
 */
router.get("/", getAllQuestions);

/**
 * @swagger
 * /questions/admin:
 *   get:
 *     summary: Get all questions including inactive ones (Admin only)
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all questions
 */
router.get("/admin", getAllQuestionsAdmin);

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Get a single question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question details
 */
router.get("/:id", getQuestionById);

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question (Admin only)
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post("/", createQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Update a question (Admin only)
 *     tags: [Questions]
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
 *         description: Updated successfully
 */
router.put("/:id", updateQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Delete a question (Admin only)
 *     tags: [Questions]
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
router.delete("/:id", deleteQuestion);

/**
 * @swagger
 * /questions/reorder:
 *   put:
 *     summary: Reorder questions (Admin only)
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reordered successfully
 */
router.put("/reorder", reorderQuestions);

/**
 * @swagger
 * /questions/{id}/toggle:
 *   put:
 *     summary: Toggle question active status (Admin only)
 *     tags: [Questions]
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
 *         description: Status toggled
 */
router.put("/:id/toggle", toggleQuestionStatus);

export default router;
