import { body, validationResult } from "express-validator"

export const submitResponseValidationRules = [
    body("age").isInt({ min: 0 }).withMessage("Age must be a positive integer"),
    body("gender").notEmpty().withMessage("Gender is required"),
    body("occupation").notEmpty().withMessage("Occupation is required"),
    body("mental_illness_causes").isArray({ min: 1 }).withMessage("Select at least one cause"),
    body("mental_illness_treatable").notEmpty().withMessage("Answer is required"),
    body("know_where_to_seek_help").notEmpty().withMessage("Answer is required"),
    body("perceive_mentally_ill_as_dangerous").notEmpty().withMessage("Answer is required"),
    body("spoken_with_professional").notEmpty().withMessage("Answer is required"),
    body("barrier_to_mental_health_support").notEmpty().withMessage("Answer is required"),
    body("mental_serious_as_physical").notEmpty().withMessage("Answer is required"),
    body("live_normal").notEmpty().withMessage("Answer is required"),
    body("believe_spiritual_helps").notEmpty().withMessage("Answer is required"),
    body("think_about_mental").notEmpty().withMessage("Answer is required"),
    body("do_when_feel_stressed").notEmpty().withMessage("Answer is required"),
    body("describe_in_one_word").notEmpty().withMessage("Answer is required"),
    body("rate_mental_health").notEmpty().withMessage("Answer is required"),
    body("mental_health_day").notEmpty().withMessage("Answer is required"),
    body("easier_to_open_up").isArray({ min: 1 }).withMessage("Select at least one cause"),
    body("future_connection").notEmpty().withMessage("Answer is required"),

];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
