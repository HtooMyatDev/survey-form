import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ChevronDown, Sparkles, Sprout, Ribbon, Heart } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Button from "../components/common/Button";

const QuestionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [orderError, setOrderError] = useState("");
    const [optionError, setOptionError] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
        } catch {
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
        if (optionError) {
            toast.error(optionError);
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
        } catch {
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
        setOptionError("");
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            try {
                await api.delete(`/questions/${id}`);
                toast.success("Question deleted successfully");
                fetchQuestions();
            } catch {
                toast.error("Failed to delete question");
            }
        }
    };

    // Removed status column; toggle handler no longer needed

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
        setOptionError("");
    };

    const addOption = () => {
        setFormData(prev => {
            const texts = prev.options.map(opt => opt.text.trim().toLowerCase());
            if (texts.includes("")) {
                setOptionError("Please fill in the previous option before adding a new one.");
                return prev;
            }
            setOptionError("");
            return {
                ...prev,
                options: [...prev.options, { text: "", value: "" }]
            };
        });
    };

    const removeOption = (index) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index)
        }));
    };

    const slugify = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '');
    };

    const updateOption = (index, field, value) => {
        setFormData(prev => {
            let newOptions = prev.options.map((option, i) => {
                if (i === index) {
                    if (field === 'text') {
                        const newText = value;
                        return { ...option, text: newText, value: slugify(newText) };
                    }
                    return { ...option, [field]: value };
                }
                return option;
            });
            // Check for duplicate option texts (case-insensitive, ignore self)
            const texts = newOptions.map(opt => opt.text.trim().toLowerCase());
            const hasDuplicate = texts.some((text, idx) => text && texts.indexOf(text) !== idx);
            setOptionError(hasDuplicate ? "Duplicate option text is not allowed." : "");
            return { ...prev, options: newOptions };
        });
    };

    // Mobile card for each question
    const MobileQuestionCard = ({ question }) => (
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
                    onClick={() => handleEdit(question)}
                    className="flex-1 text-center px-3 py-1.5 text-xs font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                    <Edit size={14} className="inline mr-1" /> Edit
                </button>
                <button
                    onClick={() => handleDelete(question._id)}
                    className="flex-1 text-center px-3 py-1.5 text-xs font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 transition-colors"
                >
                    <Trash2 size={14} className="inline mr-1" /> Delete
                </button>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-700">
                <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                <div className="flex flex-1">
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                    <div className="flex-1 min-w-0 p-6 flex items-center justify-center">
                        <div className="p-6">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-700">
            <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex flex-1">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex-1 p-3 sm:p-6 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold">🎀 Manage Questions</h1>
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center justify-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 text-sm sm:text-base w-full sm:w-auto"
                        >
                            <Plus size={20} />
                            Add Question
                        </button>
                    </div>

                    {/* Question Form */}
                    {showForm && (
                        <div className="bg-white rounded-3xl p-4 sm:p-6 mb-6 shadow-lg border border-pink-200">
                            <h2 className="text-xl sm:text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
                                {editingQuestion ? (
                                    <>
                                        <Sparkles className="w-6 h-6 text-pink-400" />
                                        Update Your Question
                                    </>
                                ) : (
                                    <>
                                        <Sprout className="w-6 h-6 text-pink-400" />
                                        Create a New Question
                                    </>
                                )}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Section 1: Question Content */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-pink-600 font-bold border-b border-pink-100 pb-2">
                                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">1</div>
                                        <h3>What would you like to ask?</h3>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            Question Text <Ribbon className="w-4 h-4 text-pink-400" />
                                        </label>
                                        <textarea
                                            value={formData.questionText}
                                            onChange={(e) => setFormData(prev => ({ ...prev, questionText: e.target.value }))}
                                            placeholder="Example: How are you feeling today?"
                                            className="w-full p-4 bg-pink-50 border-2 border-pink-100 rounded-2xl focus:border-pink-300 focus:ring-4 focus:ring-pink-50 focus:outline-none text-gray-800 transition-all min-h-[100px]"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Section 2: Response Type */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-pink-600 font-bold border-b border-pink-100 pb-2">
                                            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">2</div>
                                            <h3>How should they answer?</h3>
                                        </div>
                                        <div className="relative group">
                                            <select
                                                value={formData.questionType}
                                                onChange={(e) => setFormData(prev => ({ ...prev, questionType: e.target.value }))}
                                                className="w-full h-12 pl-4 pr-10 bg-pink-50 border-2 border-pink-100 rounded-2xl focus:border-pink-300 focus:ring-4 focus:ring-pink-50 focus:outline-none text-sm appearance-none text-gray-800 transition-all cursor-pointer"
                                            >
                                                <option value="text">Text (Type an answer)</option>
                                                <option value="radio">Single Choice (Select one)</option>
                                                <option value="checkbox">Multiple Choice (Select many)</option>
                                            </select>
                                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none group-hover:text-pink-500 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-pink-600 font-bold border-b border-pink-100 pb-2">
                                            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">3</div>
                                            <h3>Which section is this in?</h3>
                                        </div>
                                        <div className="relative group">
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                                className="w-full h-12 pl-4 pr-10 bg-pink-50 border-2 border-pink-100 rounded-2xl focus:border-pink-300 focus:ring-4 focus:ring-pink-50 focus:outline-none text-sm appearance-none text-gray-800 transition-all cursor-pointer"
                                            >
                                                <option value="demographics">About the Person (Demographics)</option>
                                                <option value="stress">Stress & Anxiety</option>
                                                <option value="coping">Coping Strategies</option>
                                                <option value="general">General Feelings</option>
                                            </select>
                                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 pointer-events-none group-hover:text-pink-500 transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Advanced Settings */}
                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center gap-2 text-pink-600 font-bold border-b border-pink-100 pb-2">
                                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">4</div>
                                        <h3>Survey Settings</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-pink-500 uppercase tracking-wider mb-2">Display Order</label>
                                            <input
                                                type="number"
                                                value={formData.order}
                                                onChange={(e) => {
                                                    const val = parseInt(e.target.value);
                                                    setFormData(prev => ({ ...prev, order: isNaN(val) ? 0 : val }));
                                                    if (isOrderTaken(val)) {
                                                        setOrderError(`Position ${val} is already occupied.`);
                                                    } else {
                                                        setOrderError("");
                                                    }
                                                }}
                                                className="w-full h-12 px-4 bg-pink-50 border-2 border-pink-100 rounded-2xl focus:border-pink-300 focus:ring-4 focus:ring-pink-50 focus:outline-none text-sm text-gray-800 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                min="0"
                                            />
                                            {orderError && (
                                                <p className="text-xs text-red-500 mt-1">{orderError}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-pink-500 uppercase tracking-wider mb-2">Logic Key (Internal)</label>
                                            <input
                                                type="text"
                                                value={formData.fieldKey}
                                                onChange={(e) => setFormData(prev => ({ ...prev, fieldKey: e.target.value.trim() }))}
                                                placeholder="e.g., age"
                                                className="w-full h-12 px-4 bg-pink-50 border-2 border-pink-100 rounded-2xl focus:border-pink-300 focus:ring-4 focus:ring-pink-50 focus:outline-none text-sm text-gray-800 transition-all"
                                            />
                                            <p className="text-[10px] text-pink-400 mt-1 leading-tight">Optional. Helps the dashboard identify specific data like age.</p>
                                        </div>
                                        <div className="flex items-center pt-6">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.isRequired}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, isRequired: e.target.checked }))}
                                                        className="checkbox checkbox-primary rounded-lg border-2"
                                                    />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-700 group-hover:text-pink-600 transition-colors">They MUST answer this</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {(formData.questionType === 'radio' || formData.questionType === 'checkbox') && (
                                    <div className="space-y-4 pt-4 border-t-2 border-pink-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-pink-600 font-bold">
                                                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">5</div>
                                                <h3>Possible Answers</h3>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={addOption}
                                                className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-xs font-bold transition-all shadow-sm active:scale-95"
                                            >
                                                + Add New Option
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {optionError && (
                                                <div className="col-span-full text-xs text-red-500 animate-pulse">{optionError}</div>
                                            )}
                                            {formData.options.map((option, index) => (
                                                <div key={index} className="flex gap-2 group">
                                                    <div className="relative flex-1">
                                                        <input
                                                            type="text"
                                                            placeholder={`Option ${index + 1}`}
                                                            value={option.text}
                                                            onChange={(e) => updateOption(index, 'text', e.target.value)}
                                                            className="w-full p-3 bg-pink-50 border-2 border-pink-100 rounded-xl focus:border-pink-300 focus:outline-none text-sm text-gray-800 transition-all"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeOption(index)}
                                                        className="w-10 h-11 bg-red-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white flex items-center justify-center transition-all shrink-0"
                                                        title="Remove this option"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            ))}
                                            {formData.options.length === 0 && (
                                                <div className="col-span-full py-8 text-center border-2 border-dashed border-pink-100 rounded-2xl text-pink-300 text-sm italic">
                                                    Click 'Add New Option' to start building your choices!
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-pink-50">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2"
                                        disabled={!!optionError}
                                    >
                                        {editingQuestion ? (
                                            <>
                                                <Sparkles className="w-4 h-4" />
                                                Update Question
                                            </>
                                        ) : (
                                            <>
                                                <Heart className="w-4 h-4" />
                                                Create Question
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="flex-1 sm:flex-none"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingQuestion(null);
                                            resetForm();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Desktop Table - hidden on mobile */}
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
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${question.questionType === 'text' ? 'bg-blue-100 text-blue-800' :
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

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3">
                        {questions.map((question) => (
                            <MobileQuestionCard key={question._id} question={question} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsPage;
