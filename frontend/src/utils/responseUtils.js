export const getFieldFromResponse = (res, fieldKey, questions = []) => {
    // 1. Try direct virtual field (e.g., res.gender)
    if (res[fieldKey] !== undefined && res[fieldKey] !== null && res[fieldKey] !== '') {
        return res[fieldKey];
    }
    // 2. Try answers[fieldKey] (lowercase)
    if (res.answers && res.answers[fieldKey] !== undefined && res.answers[fieldKey] !== null && res.answers[fieldKey] !== '') {
        return res.answers[fieldKey];
    }
    // 3. Try answers[CapitalizedFieldKey]
    const capitalized = fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1);
    if (res.answers && res.answers[capitalized] !== undefined && res.answers[capitalized] !== null && res.answers[capitalized] !== '') {
        return res.answers[capitalized];
    }
    // 4. Try answers[question._id] (legacy or fallback)
    const q = questions.find(q => q.fieldKey === fieldKey);
    if (q && res.answers && res.answers[q._id] !== undefined && res.answers[q._id] !== null && res.answers[q._id] !== '') {
        return res.answers[q._id];
    }
    return undefined;
};

export const formatGenderDisplay = (gender) => {
    if (!gender || gender === '') return 'N/A';

    // Handle different possible formats
    const lowerGender = gender.toLowerCase().trim();

    if (lowerGender === 'male') return 'Male';
    if (lowerGender === 'female') return 'Female';
    if (lowerGender === 'prefer_not_to_say' || lowerGender === 'prefer not to say') {
        return 'Prefer not to say';
    }

    // For any other values, capitalize first letter
    return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
};

export const getGenderDisplayClass = (gender) => {
    if (!gender || gender === '') return 'bg-gray-100 text-gray-800';

    const lowerGender = gender.toLowerCase().trim();

    if (lowerGender === 'female') return 'bg-pink-100 text-pink-800';
    if (lowerGender === 'male') return 'bg-blue-100 text-blue-800';
    if (lowerGender === 'prefer_not_to_say' || lowerGender === 'prefer not to say') {
        return 'bg-gray-100 text-gray-800';
    }

    return 'bg-gray-100 text-gray-800';
};

export const formatAge = (ageVal) => {
    if (ageVal === undefined || ageVal === null || ageVal === '') return 'N/A';
    const num = parseInt(ageVal, 10);
    return Number.isFinite(num) ? `${num} years` : 'N/A';
};

export const getResponseAnswer = (response, questionId) => {
    if (!response || !response.answers) return 'N/A';
    const answer = response.answers[questionId];
    if (answer !== undefined) {
        return Array.isArray(answer) ? answer.join(', ') : answer;
    }
    return 'N/A';
};

export const getQuestionText = (questions, questionId) => {
    const question = questions.find(q => q._id === questionId);
    return question ? question.questionText : `Question ${questionId}`;
};

export const formatDetailedAnswer = (questions, questionId, answer) => {
    if (!answer || answer === 'N/A') return 'Not answered';
    const question = questions.find(q => q._id === questionId);
    if (!question) return answer;

    if (question.questionType === 'radio' || question.questionType === 'checkbox') {
        if (Array.isArray(answer)) {
            return answer.map(val => {
                const option = question.options.find(opt => opt.value === val);
                return option ? option.text : val;
            }).join(', ');
        } else {
            const option = question.options.find(opt => opt.value === answer);
            return option ? option.text : answer;
        }
    }
    return answer;
};
