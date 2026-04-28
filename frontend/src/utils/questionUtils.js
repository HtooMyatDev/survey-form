export const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
};

export const getNextAvailableOrder = (questions) => {
    if (!questions || questions.length === 0) return 0;
    const maxOrder = questions.reduce((max, q) => (typeof q.order === 'number' && q.order > max ? q.order : max), -1);
    return maxOrder + 1;
};

export const isOrderTaken = (questions, value, editingQuestionId = null) => {
    return questions.some(q => q.order === value && (!editingQuestionId || q._id !== editingQuestionId));
};
