import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
    {
        // Dynamic answers object - will store questionId: answer pairs
        answers: {
            type: Map,
            of: mongoose.Schema.Types.Mixed, // Can be String, Array, Number, etc.
            required: true,
            default: new Map()
        },

        // Optional metadata fields that might be useful
        totalQuestions: {
            type: Number,
            required: true
        },

        completedAt: {
            type: Date,
            default: Date.now
        },

        // Optional: Store which questions were active when this response was submitted
        questionIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }]
    },
    {
        timestamps: true,
        // Allow dynamic fields to be added
        strict: false
    }
);

// Index for efficient querying
responseSchema.index({ createdAt: -1 });
responseSchema.index({ 'answers.age': 1 });
responseSchema.index({ 'answers.gender': 1 });
responseSchema.index({ 'answers.occupation': 1 });

// Virtual getter for common fields (for backward compatibility)
responseSchema.virtual('age').get(function () {
    return this.answers.get('age');
});

responseSchema.virtual('gender').get(function () {
    return this.answers.get('gender');
});

responseSchema.virtual('occupation').get(function () {
    return this.answers.get('occupation');
});

// Ensure virtuals are serialized
responseSchema.set('toJSON', { virtuals: true });
responseSchema.set('toObject', { virtuals: true });

const Response = mongoose.model("Response", responseSchema);
export default Response;
