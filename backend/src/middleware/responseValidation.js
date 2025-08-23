import Question from "../models/Question.js";

export const dynamicResponseValidation = async (req, res, next) => {
    try {
        const questions = await Question.find({ isActive: true });
        const errors = [];
        const body = req.body;

        questions.forEach(q => {
            const value = body[q.fieldKey];
            // Required check
            if (q.isRequired && (value === undefined || value === "" || (Array.isArray(value) && value.length === 0))) {
                errors.push({ field: q.fieldKey, msg: "This field is required." });
                return;
            }
            // Type-specific validation
            if (q.questionType === "text" && value !== undefined && typeof value !== "string") {
                errors.push({ field: q.fieldKey, msg: "Must be a string." });
            }
            if ((q.questionType === "radio" || q.questionType === "checkbox") && q.options) {
                const validValues = q.options.map(opt => opt.value);
                if (q.questionType === "radio" && value !== undefined && !validValues.includes(value)) {
                    errors.push({ field: q.fieldKey, msg: "Invalid option selected." });
                }
                if (q.questionType === "checkbox" && value !== undefined) {
                    if (!Array.isArray(value)) {
                        errors.push({ field: q.fieldKey, msg: "Must be an array." });
                    } else if (value.some(v => !validValues.includes(v))) {
                        errors.push({ field: q.fieldKey, msg: "Invalid options selected." });
                    }
                }
            }
        });

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        next();
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: "Validation error", error: err.message }] });
    }
};
