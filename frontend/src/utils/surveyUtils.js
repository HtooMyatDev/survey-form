import toast from 'react-hot-toast';

export const getRequiredMessage = (question) => {
    if (question.questionType === 'checkbox') {
        return `Select at least one option for "${question.questionText}".`;
    }
    if (question.questionType === 'radio') {
        return `Choose one option for "${question.questionText}".`;
    }
    return `Enter a response for "${question.questionText}".`;
};

export const validateSurveyPage = (questions, currentPage, QUESTIONS_PER_PAGE, formData) => {
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = startIndex + QUESTIONS_PER_PAGE;
    const pageQuestions = questions.slice(startIndex, endIndex);

    for (const question of pageQuestions) {
        const value = formData[question._id];

        if (question.isRequired) {
            if (question.questionType === 'checkbox') {
                if (!value || value.length === 0) {
                    toast.error(getRequiredMessage(question));
                    return false;
                }
            } else {
                if (!value || value.trim() === '') {
                    toast.error(getRequiredMessage(question));
                    return false;
                }
            }
        }

        // Age-specific numeric validation
        if (question.fieldKey === 'age' || /age/i.test(question.questionText)) {
            const trimmed = (value || '').toString().trim();
            if (trimmed !== '' && !/^\d+$/.test(trimmed)) {
                toast.error('Enter a valid numeric age');
                return false;
            }
        }
    }
    return true;
};

export const processFormDataForSubmit = (formData, otherInputs) => {
    const processed = { ...formData };
    Object.keys(processed).forEach(qid => {
        const val = processed[qid];
        const custom = otherInputs[qid];
        if (val === '__other__' && custom && custom.trim() !== '') {
            processed[qid] = custom;
        } else if (Array.isArray(val)) {
            processed[qid] = val.map(v => v === '__other__' && custom && custom.trim() !== '' ? custom : v)
                .filter(v => v !== '__other__');
        }
    });
    return processed;
};
