import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import DeleteQuestionModal from "./DeleteQuestionModal";

const QuestionTable = ({ questions, onEdit, onDelete }) => {
    return (
        <div className="hidden md:block overflow-x-auto bg-white rounded-3xl shadow-lg border border-pink-200">
            <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-pink-100 to-pink-200">
                    <tr>
                        <th className="px-4 lg:px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Order</th>
                        <th className="px-4 lg:px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Question</th>
                        <th className="px-4 lg:px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Type</th>
                        <th className="px-4 lg:px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Category</th>
                        <th className="px-4 lg:px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-pink-100">
                    {questions.map((question) => (
                        <tr key={question._id} className="hover:bg-pink-50">
                            <td className="px-4 lg:px-6 py-4 text-sm font-medium text-gray-900">
                                {question.order}
                            </td>
                            <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">
                                <div className="max-w-xs lg:max-w-md truncate" title={question.questionText}>
                                    {question.questionText}
                                </div>
                            </td>
                            <td className="px-4 lg:px-6 py-4 text-sm">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                    question.questionType === 'text' ? 'bg-blue-100 text-blue-800' :
                                    question.questionType === 'radio' ? 'bg-green-100 text-green-800' :
                                    'bg-purple-100 text-purple-800'
                                }`}>
                                    {question.questionType}
                                </span>
                            </td>
                            <td className="px-4 lg:px-6 py-4 text-sm text-gray-700 capitalize">
                                {question.category}
                            </td>
                            <td className="px-4 lg:px-6 py-4 text-sm">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => onEdit(question)}
                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                                    >
                                        <Edit size={14} className="mr-1" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => document.getElementById(`delete_modal_${question._id}`).showModal()}
                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                                    >
                                        <Trash2 size={14} className="mr-1" />
                                        Delete
                                    </button>
                                    <DeleteQuestionModal id={question._id} onDelete={onDelete} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuestionTable;
