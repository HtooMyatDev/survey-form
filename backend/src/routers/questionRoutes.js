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
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route - get active questions for survey
router.get("/", getAllQuestions);

// Protected routes - admin only
router.get("/admin", getAllQuestionsAdmin);
router.get("/:id", getQuestionById);
router.post("/", createQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);
router.put("/reorder", reorderQuestions);
router.put("/:id/toggle", toggleQuestionStatus);

export default router;
