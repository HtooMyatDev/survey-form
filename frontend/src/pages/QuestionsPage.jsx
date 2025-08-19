import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../lib/axios";
import toast from "react-hot-toast";

const QuestionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [orderError, setOrderError] = useState("");
    const [formData, setFormData] = useState({
        questionText: "",
        questionType: "text",
        options: [],
        isRequired: true,
        order: 0,
        category: "general",
        fieldKey: ""
    });

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await api.get("/questions/admin");
            setQuestions(response.data);
        } catch (error) {
            toast.error("Failed to fetch questions");
        } finally {
            setLoading(false);
        }
    };

    const getNextAvailableOrder = () => {
        if (!questions || questions.length === 0) return 0;
        const maxOrder = questions.reduce((max, q) => (typeof q.order === 'number' && q.order > max ? q.order : max), -1);
        return maxOrder + 1;
    };

    const isOrderTaken = (value) => {
        return questions.some(q => q.order === value && (!editingQuestion || q._id !== editingQuestion._id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isOrderTaken(formData.order)) {
            setOrderError(`Order number ${formData.order} is already used. Choose a different number.`);
            toast.error(`Order number ${formData.order} is already used.`);
            return;
        }
        try {
            if (editingQuestion) {
                await api.put(`/questions/${editingQuestion._id}`, formData);
                toast.success("Question updated successfully");
            } else {
                await api.post("/questions", formData);
                toast.success("Question created successfully");
            }
            setShowForm(false);
            setEditingQuestion(null);
            resetForm();
            fetchQuestions();
        } catch (error) {
            toast.error("Failed to save question");
        }
    };

    const handleEdit = (question) => {
        setEditingQuestion(question);
        setFormData({
            questionText: question.questionText,
            questionType: question.questionType,
            options: question.options || [],
            isRequired: question.isRequired,
            order: question.order,
            category: question.category,
            fieldKey: question.fieldKey || ""
        });
        setOrderError("");
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            try {
                await api.delete(`/questions/${id}`);
                toast.success("Question deleted successfully");
                fetchQuestions();
            } catch (error) {
                toast.error("Failed to delete question");
            }
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await api.put(`/questions/${id}/toggle`);
            toast.success("Question status updated");
            fetchQuestions();
        } catch (error) {
            toast.error("Failed to update question status");
        }
    };

    const resetForm = () => {
        setFormData({
            questionText: "",
            questionType: "text",
            options: [],
            isRequired: true,
            order: getNextAvailableOrder(),
            category: "general",
            fieldKey: ""
        });
        setOrderError("");
    };

    const addOption = () => {
        setFormData(prev => ({
            ...prev,
            options: [...prev.options, { text: "", value: "" }]
        }));
    };

    const removeOption = (index) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index)
        }));
    };

    const updateOption = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.map((option, i) =>
                i === index ? { ...option, [field]: value } : option
            )
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-700">
                <Topbar />
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1 p-6 flex items-center justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-700">
            <Topbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">🎀 Manage Questions</h1>
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600"
                        >
                            <Plus size={20} />
                            Add Question
                        </button>
                    </div>

                    {/* Question Form */}
                    {showForm && (
                        <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border border-pink-200">
                            <h2 className="text-xl font-bold mb-4">
                                {editingQuestion ? "Edit Question" : "Add New Question"}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Question Text</label>
                                    <textarea
                                        value={formData.questionText}
                                        onChange={(e) => setFormData(prev => ({ ...prev, questionText: e.target.value }))}
                                        className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Question Type</label>
                                        <select
                                            value={formData.questionType}
                                            onChange={(e) => setFormData(prev => ({ ...prev, questionType: e.target.value }))}
                                            className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
                                        >
                                            <option value="text">Text Input</option>
                                            <option value="radio">Radio Buttons</option>
                                            <option value="checkbox">Checkboxes</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                            className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
                                        >
                                            <option value="demographics">Demographics</option>
                                            <option value="stress">Stress</option>
                                            <option value="coping">Coping</option>
                                            <option value="general">General</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Order</label>
                                        <input
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value);
                                                setFormData(prev => ({ ...prev, order: isNaN(val) ? 0 : val }));
                                                if (isOrderTaken(val)) {
                                                    setOrderError(`Order number ${val} is already used. Choose a different number.`);
                                                } else {
                                                    setOrderError("");
                                                }
                                            }}
                                            className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
                                            min="0"
                                        />
                                        {orderError && (
                                            <p className="text-xs text-red-500 mt-1">{orderError}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Field Key (optional)</label>
                                        <input
                                            type="text"
                                            value={formData.fieldKey}
                                            onChange={(e) => setFormData(prev => ({ ...prev, fieldKey: e.target.value.trim() }))}
                                            placeholder="e.g., age"
                                            className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
                                        />
                                        <p className="text-xs text-pink-400 mt-1">Use a stable key like "age" to enable special validations.</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="isRequired"
                                        checked={formData.isRequired}
                                        onChange={(e) => setFormData(prev => ({ ...prev, isRequired: e.target.checked }))}
                                        className="mr-2"
                                    />
                                    <label htmlFor="isRequired" className="text-sm font-medium">Required Question</label>
                                </div>

                                {(formData.questionType === 'radio' || formData.questionType === 'checkbox') && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Options</label>
                                        <div className="space-y-2">
                                            {formData.options.map((option, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Option text"
                                                        value={option.text}
                                                        onChange={(e) => updateOption(index, 'text', e.target.value)}
                                                        className="flex-1 p-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Value"
                                                        value={option.value}
                                                        onChange={(e) => updateOption(index, 'value', e.target.value)}
                                                        className="flex-1 p-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeOption(index)}
                                                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={addOption}
                                                className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200"
                                            >
                                                Add Option
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                                    >
                                        {editingQuestion ? "Update Question" : "Create Question"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingQuestion(null);
                                            resetForm();
                                        }}
                                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Questions List */}
                    <div className="bg-white rounded-3xl shadow-lg border border-pink-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gradient-to-r from-pink-100 to-pink-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Order</th>
                                        <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Question</th>
                                        <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Type</th>
                                        <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Category</th>
                                        <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Status</th>
                                        <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-pink-100">
                                    {questions.map((question, index) => (
                                        <tr key={question._id} className="hover:bg-pink-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {question.order}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                <div className="max-w-md truncate" title={question.questionText}>
                                                    {question.questionText}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${question.questionType === 'text' ? 'bg-blue-100 text-blue-800' :
                                                    question.questionType === 'radio' ? 'bg-green-100 text-green-800' :
                                                        'bg-purple-100 text-purple-800'
                                                    }`}>
                                                    {question.questionType}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                                                {question.category}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <button
                                                    onClick={() => handleToggleStatus(question._id)}
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${question.isActive
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {question.isActive ? (
                                                        <>
                                                            <Eye size={12} className="mr-1" />
                                                            Active
                                                        </>
                                                    ) : (
                                                        <>
                                                            <EyeOff size={12} className="mr-1" />
                                                            Inactive
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(question)}
                                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                                                    >
                                                        <Edit size={14} className="mr-1" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(question._id)}
                                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                                                    >
                                                        <Trash2 size={14} className="mr-1" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsPage;
