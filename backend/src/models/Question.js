import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
        trim: true
    },
    questionType: {
        type: String,
        required: true,
        enum: ['text', 'radio', 'checkbox'],
        default: 'text'
    },
    options: [{
        text: {
            type: String,
            required: true,
            trim: true
        },
        value: {
            type: String,
            required: true,
            trim: true
        }
    }],
    isRequired: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        required: true,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        enum: ['demographics', 'stress', 'coping', 'general'],
        default: 'general'
    },
    fieldKey: {
        type: String,
        trim: true
    },
    validation: {
        minLength: Number,
        maxLength: Number,
        pattern: String
    }
}, {
    timestamps: true
});

// Index for efficient querying
questionSchema.index({ order: 1, isActive: 1 });
questionSchema.index({ category: 1, isActive: 1 });

const Question = mongoose.model('Question', questionSchema);

export default Question;
