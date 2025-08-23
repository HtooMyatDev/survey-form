import Response from "../models/Response.js"
import Question from "../models/Question.js"

export async function submitResponse(req, res) {
    try {
        // Step 1: Fetch all active questions, sorted by their order
        const questions = await Question.find({ isActive: true }).sort({ order: 1 });

        // Step 2: If there are no active questions, return an error
        if (questions.length === 0) {
            return res.status(400).json({
                message: "No active questions found. Survey is not available.",
            });
        }

        // Step 3: Prepare containers for validation errors, answers, and question IDs
        const validationErrors = [];
        const answers = {}; // Use plain object for easier serialization
        const questionIds = [];

        // Helper: Checks if a question is answered
        function isAnswered(question, answer) {
            if (question.questionType === 'checkbox') {
                // Checkbox answers must be a non-empty array
                return Array.isArray(answer) && answer.length > 0;
            }
            // Other types: must not be empty (if string, must not be blank)
            return answer && (typeof answer !== 'string' || answer.trim() !== '');
        }

        // Helper: Checks if a question is an age question
        function isAgeQuestion(question) {
            return (question.fieldKey === 'age') || (/age/i.test(question.questionText));
        }

        // Step 4: Validate each question and collect answers
        for (const question of questions) {
            questionIds.push(question._id);
            const answer = req.body[question._id];

            // Step 4a: Validate required questions
            if (question.isRequired && !isAnswered(question, answer)) {
                validationErrors.push(`Question "${question.questionText}" is required`);
                continue; // Skip to next question if not answered
            }

            // Step 4b: Add answer if present (for required or optional questions)
            if (isAnswered(question, answer)) {
                answers[question._id.toString()] = answer;
            }

            // Step 4c: For special questions (like age, gender, occupation),
            // also map their answers to a top-level key for easier access later
            if (answers[question._id.toString()] !== undefined) {
                const valueFromId = answers[question._id.toString()];
                if (isAgeQuestion(question)) {
                    // Validate and store age as a non-negative number
                    const numeric = typeof valueFromId === 'number' ? valueFromId : parseInt((valueFromId || '').toString().trim(), 10);
                    if (!Number.isFinite(numeric) || numeric < 0) {
                        validationErrors.push('Age must be a non-negative number');
                    } else {
                        answers['age'] = numeric;
                    }
                } else if (question.fieldKey) {
                    // For other special fields, map to their fieldKey
                    answers[question.fieldKey] = valueFromId;
                }
            }
        }

        // Step 5: If there are any validation errors, return them to the client
        if (validationErrors.length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationErrors
            });
        }

        // Step 6: Prepare the response data object
        const responseData = {
            answers: answers,
            totalQuestions: questions.length,
            questionIds: questionIds
        };

        // Step 7: Save the response to the database
        await Response.create(responseData);
        res.status(201).json({ message: "Response submitted successfully!" });
    } catch (error) {
        // Step 8: Handle unexpected errors
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
