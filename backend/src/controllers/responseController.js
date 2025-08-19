import Response from "../models/Response.js"
import Question from "../models/Question.js"

export async function submitResponse(req, res) {
    try {
        // Get all active questions to validate the response
        const questions = await Question.find({ isActive: true }).sort({ order: 1 });

        if (questions.length === 0) {
            return res.status(400).json({
                message: "No active questions found. Survey is not available.",
            });
        }

        // Validate that all required questions are answered
        const validationErrors = [];
        const answers = new Map();
        const questionIds = [];

        for (const question of questions) {
            questionIds.push(question._id);
            const answer = req.body[question._id];

            if (question.isRequired) {
                if (question.questionType === 'checkbox') {
                    if (!answer || !Array.isArray(answer) || answer.length === 0) {
                        validationErrors.push(`Question "${question.questionText}" is required`);
                    } else {
                        answers.set(question._id.toString(), answer);
                    }
                } else {
                    if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
                        validationErrors.push(`Question "${question.questionText}" is required`);
                    } else {
                        answers.set(question._id.toString(), answer);
                    }
                }
            } else {
                // Optional questions - only add if answered
                if (answer !== undefined && answer !== null && answer !== '') {
                    answers.set(question._id.toString(), answer);
                }
            }

            // Map special fieldKey values into top-level answers as well (e.g., age, gender, occupation)
            if (answers.has(question._id.toString())) {
                const valueFromId = answers.get(question._id.toString());
                const isAgeQuestion = (question.fieldKey === 'age') || (/age/i.test(question.questionText));
                if (isAgeQuestion) {
                    const numeric = typeof valueFromId === 'number' ? valueFromId : parseInt((valueFromId || '').toString().trim(), 10);
                    if (!Number.isFinite(numeric) || numeric < 0) {
                        validationErrors.push('Age must be a non-negative number');
                    } else {
                        answers.set('age', numeric);
                    }
                } else if (question.fieldKey) {
                    answers.set(question.fieldKey, valueFromId);
                }
            }
        }

        if (validationErrors.length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationErrors
            });
        }

        // Create the response with the new structure
        const responseData = {
            answers: answers,
            totalQuestions: questions.length,
            questionIds: questionIds
        };

        await Response.create(responseData);
        res.status(201).json({ message: "Response submitted successfully!" });
    } catch (error) {
        res.status(400).json({
            message: "Error in submitResponse method",
            error: error.message,
        });
    }
}

export async function getFilteredResponses(req, res) {
    try {
        const { age, gender, occupation, page = 1, limit = 10 } = req.query
        const filter = {}

        // Update filter to use the new answers structure
        if (age) filter['answers.age'] = Number(age);
        if (gender) filter['answers.gender'] = gender;
        if (occupation) filter['answers.occupation'] = { $regex: occupation, $options: 'i' };

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const responses = await Response.find(filter)
            .skip(skip)
            .limit(limitNum)
            .sort({ createdAt: -1 });

        const total = await Response.countDocuments(filter);
        const totalPages = Math.ceil(total / limitNum);

        res.status(200).json({
            responses,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalItems: total,
                itemsPerPage: limitNum,
                hasNextPage: pageNum < totalPages,
                hasPrevPage: pageNum > 1
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch responses", error: error.message })
    }
}

export async function getResponseById(req, res) {
    try {
        const { id } = req.params;
        const response = await Response.findById(id);
        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch response", error: error.message });
    }
}

export async function deleteResponse(req, res) {
    try {
        const { id } = req.params;

        const response = await Response.findByIdAndDelete(id);

        if (!response) {
            return res.status(404).json({ message: "Response not found" });
        }

        res.status(200).json({ message: "Response deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete response", error: error.message })
    }
}
