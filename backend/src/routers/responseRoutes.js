import express from "express";
import {
    submitResponse,
    getFilteredResponses,
    getResponseById
} from "../controllers/responseController.js";
import { submitResponseValidationRules, validate } from "../middleware/responseValidation.js"
const router = express.Router();

// Respondent submits a response
router.post("/", submitResponseValidationRules, validate, submitResponse);

// Admin gets all responses
router.get("/", getFilteredResponses)

// Admin gets a single response by ID
router.get("/:id", getResponseById);

export default router;
