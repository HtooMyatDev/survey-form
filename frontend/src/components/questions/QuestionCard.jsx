import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const QuestionCard = ({ question, onEdit, onDelete }) => (
    <div className="bg-white rounded-2xl border border-pink-200 p-4 shadow-sm">
        <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-bold bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                #{question.order}
            </span>
            <div className="flex items-center gap-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                    question.questionType === 'text' ? 'bg-blue-100 text-blue-800' :
                    question.questionType === 'radio' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                }`}>
                    {question.questionType}
                </span>
                <span className="text-xs text-gray-500 capitalize">{question.category}</span>
            </div>
        </div>
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{question.questionText}</p>
        <div className="flex items-center gap-2">
            <button
                onClick={() => onEdit(question)}
                className="flex-1 text-center px-3 py-1.5 text-xs font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
            >
                <Edit size={14} className="inline mr-1" /> Edit
            </button>
            <button
                onClick={() => onDelete(question._id)}
                className="flex-1 text-center px-3 py-1.5 text-xs font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 transition-colors"
            >
                <Trash2 size={14} className="inline mr-1" /> Delete
            </button>
        </div>
    </div>
);

export default QuestionCard;
