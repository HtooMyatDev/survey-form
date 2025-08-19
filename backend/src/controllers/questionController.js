import Question from "../models/Question.js";

// Get all active questions ordered by their order field
export async function getAllQuestions(req, res) {
    try {
        const questions = await Question.find({ isActive: true })
            .sort({ order: 1, createdAt: 1 });

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch questions",
            error: error.message
        });
    }
}

// Get all questions (including inactive) for admin management
export async function getAllQuestionsAdmin(req, res) {
    try {
        const questions = await Question.find()
            .sort({ order: 1, createdAt: 1 });

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch questions",
            error: error.message
        });
    }
}

// Get a single question by ID
export async function getQuestionById(req, res) {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch question",
            error: error.message
        });
    }
}

// Create a new question
export async function createQuestion(req, res) {
    try {
        // Prevent duplicate order values
        if (typeof req.body.order === 'number') {
            const existing = await Question.findOne({ order: req.body.order });
            if (existing) {
                return res.status(400).json({ message: `Order ${req.body.order} is already in use.` });
            }
        }
        const question = await Question.create(req.body);
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({
            message: "Error creating question",
            error: error.message
        });
    }
}

// Update a question
export async function updateQuestion(req, res) {
    try {
        const { id } = req.params;
        // Prevent duplicate order values on update
        if (typeof req.body.order === 'number') {
            const duplicate = await Question.findOne({ order: req.body.order, _id: { $ne: id } });
            if (duplicate) {
                return res.status(400).json({ message: `Order ${req.body.order} is already in use.` });
            }
        }
        const question = await Question.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({
            message: "Error updating question",
            error: error.message
        });
    }
}

// Delete a question
export async function deleteQuestion(req, res) {
    try {
        const { id } = req.params;
        const question = await Question.findByIdAndDelete(id);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete question",
            error: error.message
        });
    }
}

// Reorder questions
export async function reorderQuestions(req, res) {
    try {
        const { questionOrders } = req.body; // Array of { id, order }

        const updatePromises = questionOrders.map(({ id, order }) =>
            Question.findByIdAndUpdate(id, { order }, { new: true })
        );

        await Promise.all(updatePromises);

        const questions = await Question.find().sort({ order: 1, createdAt: 1 });
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({
            message: "Error reordering questions",
            error: error.message
        });
    }
}

// Toggle question active status
export async function toggleQuestionStatus(req, res) {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        question.isActive = !question.isActive;
        await question.save();

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({
            message: "Error toggling question status",
            error: error.message
        });
    }
}
