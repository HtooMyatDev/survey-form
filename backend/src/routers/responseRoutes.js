import express from "express";
import {
    submitResponse,
    getFilteredResponses,
    getResponseById,
    deleteResponse
} from "../controllers/responseController.js";
const router = express.Router();

// Respondent submits a response
router.post("/", submitResponse);

// Admin gets all responses
router.get("/", getFilteredResponses)

// Admin gets a single response by ID
router.get("/:id", getResponseById);

// Delete a response
router.delete("/:id", deleteResponse)

export default router;
