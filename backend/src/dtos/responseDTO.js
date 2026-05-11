/**
 * DTO to sanitize Response data for the client.
 */
export const toResponseDTO = (response) => {
    return {
        id: response._id,
        _id: response._id,
        answers: response.answers,
        totalQuestions: response.totalQuestions,
        questionIds: response.questionIds,
        completedAt: response.completedAt,
        createdAt: response.createdAt
    };
};

/**
 * DTO to sanitize a list of Responses.
 */
export const toResponseListDTO = (responses) => {
    return responses.map(toResponseDTO);
};
