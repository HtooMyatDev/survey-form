import Question from "../models/Question.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { toQuestionDTO, toQuestionListDTO } from "../dtos/questionDTO.js";

// Get all active questions ordered by their order field
export const getAllQuestions = catchAsync(async (req, res, next) => {
    const questions = await Question.find({ isActive: true })
        .sort({ order: 1, createdAt: 1 });
    res.status(200).json(toQuestionListDTO(questions));
});

// Get all questions (including inactive) for admin management
export const getAllQuestionsAdmin = catchAsync(async (req, res, next) => {
    const questions = await Question.find()
        .sort({ order: 1, createdAt: 1 });
    res.status(200).json(toQuestionListDTO(questions));
});

// Get a single question by ID
export const getQuestionById = catchAsync(async (req, res, next) => {
    const question = await Question.findById(req.params.id);
    if (!question) {
        return next(new AppError("Question not found", 404));
    }
    res.status(200).json(toQuestionDTO(question));
});

// Create a new question
export const createQuestion = catchAsync(async (req, res, next) => {
    if (typeof req.body.order === 'number') {
        const existing = await Question.findOne({ order: req.body.order });
        if (existing) {
            return next(new AppError(`Order ${req.body.order} is already in use.`, 400));
        }
    }
    const question = await Question.create(req.body);
    res.status(201).json(toQuestionDTO(question));
});

// Update a question
export const updateQuestion = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    if (typeof req.body.order === 'number') {
        const duplicate = await Question.findOne({ order: req.body.order, _id: { $ne: id } });
        if (duplicate) {
            return next(new AppError(`Order ${req.body.order} is already in use.`, 400));
        }
    }
    const question = await Question.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!question) {
        return next(new AppError("Question not found", 404));
    }
    res.status(200).json(toQuestionDTO(question));
});

// Delete a question
export const deleteQuestion = catchAsync(async (req, res, next) => {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
        return next(new AppError("Question not found", 404));
    }
    res.status(200).json({ message: "Question deleted successfully" });
});

// Reorder questions
export const reorderQuestions = catchAsync(async (req, res, next) => {
    const { questionOrders } = req.body; 
    const updatePromises = questionOrders.map(({ id, order }) =>
        Question.findByIdAndUpdate(id, { order }, { new: true })
    );
    await Promise.all(updatePromises);
    const questions = await Question.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json(toQuestionListDTO(questions));
});

// Toggle question active status
export const toggleQuestionStatus = catchAsync(async (req, res, next) => {
    const question = await Question.findById(req.params.id);
    if (!question) {
        return next(new AppError("Question not found", 404));
    }
    question.isActive = !question.isActive;
    await question.save();
    res.status(200).json(toQuestionDTO(question));
});
