/**
 * DTO to sanitize Question data for the client.
 * Hides internal fields like 'isActive' or 'updatedAt' if needed.
 */
export const toQuestionDTO = (question) => {
    return {
        id: question._id,
        questionText: question.questionText,
        questionType: question.questionType,
        options: question.options,
        isRequired: question.isRequired,
        order: question.order,
        category: question.category,
        fieldKey: question.fieldKey
    };
};

export const toQuestionListDTO = (questions) => {
    return questions.map(toQuestionDTO);
};
