import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
    {
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },

        // Q5: Multiple choice (select all that apply)
        mental_illness_causes: {
            type: [String],
            required: true,
        },

        // Q6
        mental_illness_treatable: {
            type: String, // e.g., 'strongly_agree', 'agree'
            required: true,
        },

        // Q7
        know_where_to_seek_help: {
            type: String, // true = Yes, false = No
            required: true,
        },

        // Q8
        perceive_mentally_ill_as_dangerous: {
            type: String, // e.g., 'agree', 'disagree', etc.
            required: true,
        },

        // Q9
        spoken_with_professional: {
            type: String, // true = Yes, false = No
            required: true,
        },

        // Q10
        barrier_to_mental_health_support: {
            type: String,
            required: true,
        },

        mental_serious_as_physical: {
            type: String,
            required: true,
        },
        live_normal: {
            type: String,
            required: true,
        },
        believe_spiritual_helps: {
            type: String,
            required: true,
        },
        think_about_mental: {
            type: String,
            required: true,
        },
        do_when_feel_stressed: {
            type: String,
            required: true,
        },
        describe_in_one_word: {
            type: String,
            required: true,
        },
        rate_mental_health: {
            type: String,
            required: true,
        },
        mental_health_day: {
            type: String,
            required: true,
        },
        easier_to_open_up: {
            type: [String],
            required: true,
        },
        future_connection: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);
export default Response;
