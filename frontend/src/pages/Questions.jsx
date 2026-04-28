import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../lib/axios";
import toast from "react-hot-toast";

// Sub-components
import QuestionForm from "../components/questions/QuestionForm";
import QuestionList from "../components/questions/QuestionList";

// Utilities
import { getNextAvailableOrder, isOrderTaken } from "../utils/questionUtils";

const Questions = () => {
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
            return response.data;
        } catch {
            toast.error("Failed to fetch questions");
            return [];
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isOrderTaken(questions, formData.order, editingQuestion?._id)) {
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
            const updatedQuestions = await fetchQuestions();
            setShowForm(false);
            setEditingQuestion(null);
            resetForm(updatedQuestions);
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

        try {
            await api.delete(`/questions/${id}`);
            toast.success("Question deleted successfully");
            fetchQuestions();
        } catch {
            toast.error("Failed to delete question");

        }
    };

    const resetForm = (currentQuestions = questions) => {
        setFormData({
            questionText: "",
            questionType: "text",
            options: [],
            isRequired: true,
            order: getNextAvailableOrder(currentQuestions),
            category: "general",
            fieldKey: ""
        });
        setOrderError("");
        setOptionError("");
    };

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
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                            className="flex items-center justify-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 text-sm sm:text-base w-full sm:w-auto"
                        >
                            <Plus size={20} />
                            Add Question
                        </button>
                    </div>

                    {showForm && (
                        <QuestionForm
                            formData={formData}
                            setFormData={setFormData}
                            editingQuestion={editingQuestion}
                            orderError={orderError}
                            setOrderError={setOrderError}
                            optionError={optionError}
                            setOptionError={setOptionError}
                            onSubmit={handleSubmit}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingQuestion(null);
                                resetForm();
                            }}
                            questions={questions}
                        />
                    )}

                    <QuestionList
                        questions={questions}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default Questions;
