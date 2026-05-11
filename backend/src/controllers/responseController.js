import Response from "../models/Response.js"
import Question from "../models/Question.js"
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { toResponseDTO, toResponseListDTO } from "../dtos/responseDTO.js";

export const submitResponse = catchAsync(async (req, res, next) => {
    // Step 1: Fetch all active questions, sorted by their order
    const questions = await Question.find({ isActive: true }).sort({ order: 1 });

    // Step 2: If there are no active questions, return an error
    if (questions.length === 0) {
        return next(new AppError("No active questions found. Survey is not available.", 400));
    }

    // Step 3: Prepare containers for validation errors, answers, and question IDs
    const validationErrors = [];
    const answers = {}; 
    const questionIds = [];

    // Helpers
    const isAnswered = (question, answer) => {
        if (question.questionType === 'checkbox') return Array.isArray(answer) && answer.length > 0;
        return answer && (typeof answer !== 'string' || answer.trim() !== '');
    };

    const isAgeQuestion = (question) => (question.fieldKey === 'age') || (/age/i.test(question.questionText));

    // Step 4: Validate each question and collect answers
    for (const question of questions) {
        questionIds.push(question._id);
        const answer = req.body[question._id];

        if (question.isRequired && !isAnswered(question, answer)) {
            validationErrors.push(`Question "${question.questionText}" is required`);
            continue;
        }

        if (isAnswered(question, answer)) {
            const val = answer;
            answers[question._id.toString()] = val;
            
            if (isAgeQuestion(question)) {
                const numeric = typeof val === 'number' ? val : parseInt((val || '').toString().trim(), 10);
                if (!Number.isFinite(numeric) || numeric < 0) validationErrors.push('Age must be a non-negative number');
                else answers['age'] = numeric;
            } else if (question.fieldKey) {
                const specialFields = ['gender', 'occupation', 'education'];
                const key = specialFields.includes(question.fieldKey.toLowerCase()) ? question.fieldKey.toLowerCase() : question.fieldKey;
                answers[key] = val;
            }
        }
    }

    if (validationErrors.length > 0) {
        return next(new AppError("Validation failed: " + validationErrors.join(", "), 400));
    }

    const responseData = {
        answers: answers,
        totalQuestions: questions.length,
        questionIds: questionIds
    };

    const savedResponse = await Response.create(responseData);
    res.status(201).json({ 
        message: "Response submitted successfully!",
        id: savedResponse._id 
    });
});

export const getFilteredResponses = catchAsync(async (req, res, next) => {
    const { age, gender, occupation, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (age) filter['answers.age'] = Number(age);
    if (gender) {
        if (gender.toLowerCase() === 'prefer not to say') {
            filter['answers.gender'] = { $in: ['prefer not to say', 'prefer_not_to_say', 'Prefer not to say', 'Prefer_not_to_say'] };
        } else {
            filter['answers.gender'] = gender;
        }
    }
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
        responses: toResponseListDTO(responses),
        pagination: {
            currentPage: pageNum,
            totalPages,
            totalItems: total,
            itemsPerPage: limitNum,
            hasNextPage: pageNum < totalPages,
            hasPrevPage: pageNum > 1
        }
    });
});

export const getResponseById = catchAsync(async (req, res, next) => {
    const response = await Response.findById(req.params.id);
    if (!response) {
        return next(new AppError("Response not found", 404));
    }
    res.status(200).json(toResponseDTO(response));
});

export const deleteResponse = catchAsync(async (req, res, next) => {
    const response = await Response.findByIdAndDelete(req.params.id);
    if (!response) {
        return next(new AppError("Response not found", 404));
    }
    res.status(200).json({ message: "Response deleted successfully" });
});
