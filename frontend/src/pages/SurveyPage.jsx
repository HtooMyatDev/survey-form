import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Send, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from "../lib/axios.js"
import { useNavigate } from "react-router"

const HelloKittySurvey = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await api.get('/questions');
            const sortedQuestions = response.data.sort((a, b) => a.order - b.order);
            setQuestions(sortedQuestions);

            // Initialize form data with empty values for each question
            const initialFormData = {};
            sortedQuestions.forEach(question => {
                if (question.questionType === 'checkbox') {
                    initialFormData[question._id] = [];
                } else {
                    initialFormData[question._id] = '';
                }
            });
            setFormData(initialFormData);
        } catch (error) {
            toast.error('Failed to load survey questions');
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (questionId, value) => {
        setFormData(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleCheckboxChange = (questionId, value) => {
        setFormData(prev => ({
            ...prev,
            [questionId]: prev[questionId].includes(value)
                ? prev[questionId].filter(item => item !== value)
                : [...prev[questionId], value]
        }));
    };

    const QUESTIONS_PER_PAGE = 5;

    const getRequiredMessage = (question) => {
        if (question.questionType === 'checkbox') {
            return `Select at least one option for "${question.questionText}".`;
        }
        if (question.questionType === 'radio') {
            return `Choose one option for "${question.questionText}".`;
        }
        return `Enter a response for "${question.questionText}".`;
    };

    const validatePage = () => {
        const startIndex = currentPage * QUESTIONS_PER_PAGE;
        const endIndex = startIndex + QUESTIONS_PER_PAGE;
        const pageQuestions = questions.slice(startIndex, endIndex);

        for (const question of pageQuestions) {
            const value = formData[question._id];

            if (question.isRequired) {
                if (question.questionType === 'checkbox') {
                    if (!value || value.length === 0) {
                        toast.error(getRequiredMessage(question));
                        return false;
                    }
                } else {
                    if (!value || value.trim() === '') {
                        toast.error(getRequiredMessage(question));
                        return false;
                    }
                }
            }

            // Age-specific numeric validation using fieldKey or question text fallback
            if (question.fieldKey === 'age' || /age/i.test(question.questionText)) {
                const trimmed = (value || '').toString().trim();
                if (trimmed !== '' && !/^\d+$/.test(trimmed)) {
                    toast.error('Enter a valid numeric age');
                    return false;
                }
            }
        }
        return true;
    };

    const handleNextPage = () => {
        if (!validatePage()) return;
        const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSubmit = async () => {
        if (!validatePage()) return;

        // Validate all required questions
        const requiredQuestions = questions.filter(q => q.isRequired);
        for (const question of requiredQuestions) {
            const value = formData[question._id];
            if (question.questionType === 'checkbox') {
                if (!value || value.length === 0) {
                    toast.error(getRequiredMessage(question));
                    return;
                }
            } else {
                if (!value || value.trim() === '') {
                    toast.error(getRequiredMessage(question));
                    return;
                }
            }
        }

        // Global age validation across all questions (not just current page)
        for (const question of questions) {
            if (question.fieldKey === 'age' || /age/i.test(question.questionText)) {
                const value = formData[question._id];
                const trimmed = (value || '').toString().trim();
                if (trimmed === '' || !/^\d+$/.test(trimmed)) {
                    toast.error('Enter a valid numeric age');
                    return;
                }
            }
        }

        setIsSubmitting(true);
        try {
            await api.post("/responses", formData);
            toast.success('Thank you for sharing, cutie! Your responses help us understand mental health better! 💕', {
                duration: 5000,
                style: {
                    background: '#FFB6C1',
                    color: '#FF1493',
                    border: '2px solid #FF69B4',
                    borderRadius: '20px',
                    fontWeight: 'bold'
                }
            });
            // Count all questions the user was presented with
            const totalQuestions = questions.length;
            // Count how many questions the user actually answered (not blank, not empty array)
            const questionsAnswered = questions.filter(q => {
                const val = formData[q._id];
                if (Array.isArray(val)) return val.length > 0;
                return val !== undefined && val !== null && val !== '';
            }).length;
            navigate("/success", {
                state: {
                    questionsAnswered,
                    totalQuestions
                }
            });
        } catch (error) {
            if (error.response?.status === 429) {
                toast.error("Slow down, you are submitting surveys way too fast", {
                    duration: 4000,
                    icon: "👀",
                });
            } else {
                toast.error("Failed to submit survey");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderQuestion = (question) => {
        const value = formData[question._id];

        switch (question.questionType) {
            case 'text':
                return (
                    <input
                        type={question.fieldKey === 'age' ? 'number' : 'text'}
                        value={value || ''}
                        onChange={(e) => {
                            let v = e.target.value;
                            if (question.fieldKey === 'age') {
                                v = (v || '').toString().replace(/[^0-9]/g, '');
                            }
                            handleInputChange(question._id, v);
                        }}
                        placeholder="Enter your answer..."
                        className="input input-bordered w-full bg-pink-50 border-pink-200 focus:border-pink-400 rounded-2xl text-gray-800 placeholder-pink-400"
                        required={question.isRequired}
                        min={question.fieldKey === 'age' ? 0 : undefined}
                        inputMode={question.fieldKey === 'age' ? 'numeric' : undefined}
                    />
                );

            case 'radio':
                return (
                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <label key={index} className="flex items-center gap-3 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors">
                                <input
                                    type="radio"
                                    name={question._id}
                                    value={option.value}
                                    checked={value === option.value}
                                    onChange={(e) => handleInputChange(question._id, e.target.value)}
                                    className="radio radio-primary radio-sm"
                                    required={question.isRequired}
                                />
                                <span className="text-gray-700">{option.text}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'checkbox':
                return (
                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <label key={index} className="flex items-center gap-3 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors">
                                <input
                                    type="checkbox"
                                    checked={value?.includes(option.value) || false}
                                    onChange={() => handleCheckboxChange(question._id, option.value)}
                                    className="checkbox checkbox-primary checkbox-sm"
                                />
                                <span className="text-gray-700">{option.text}</span>
                            </label>
                        ))}
                    </div>
                );

            default:
                return <p className="text-red-500">Unsupported question type</p>;
        }
    };

    const FloatingElement = ({ children, className, delay = "0s" }) => (
        <div
            className={`absolute ${className}`}
            style={{
                animation: `float 3s ease-in-out infinite`,
                animationDelay: delay
            }}
        >
            {children}
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-pink-500"></span>
                    <p className="mt-4 text-pink-600">Loading survey questions...</p>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-pink-600 text-xl">No survey questions available</p>
                    <p className="text-pink-400 mt-2">Please check back later!</p>
                </div>
            </div>
        );
    }

    const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
    const progress = ((currentPage + 1) / totalPages) * 100;
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length);
    const pageQuestions = questions.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white relative overflow-hidden">
            <Toaster position="top-center" />

            {/* Floating decorative elements */}
            <FloatingElement className="top-10 left-10 text-pink-300" delay="0s">
                <Heart size={24} fill="currentColor" />
            </FloatingElement>
            <FloatingElement className="top-20 right-20 text-pink-400" delay="1s">
                <Star size={20} fill="currentColor" />
            </FloatingElement>
            <FloatingElement className="top-40 left-1/4 text-pink-200" delay="2s">
                <Sparkles size={18} />
            </FloatingElement>
            <FloatingElement className="bottom-20 right-10 text-pink-300" delay="0.5s">
                <Heart size={20} fill="currentColor" />
            </FloatingElement>
            <FloatingElement className="bottom-40 left-20 text-pink-400" delay="1.5s">
                <Star size={22} fill="currentColor" />
            </FloatingElement>

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block relative">
                        <div className="w-20 h-20 bg-white rounded-full border-4 border-pink-300 mx-auto mb-4 flex items-center justify-center shadow-lg">
                            <div className="relative">
                                <div className="w-14 h-10 bg-pink-100 rounded-full relative">
                                    <div className="absolute top-2 left-1 w-1.5 h-1.5 bg-black rounded-full"></div>
                                    <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-black rounded-full"></div>
                                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full"></div>
                                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-pink-400 rounded-full">
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-pink-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-pink-600 mb-2">Mental Health Survey</h1>
                        <p className="text-pink-400 text-sm">Help us understand mental health awareness 🎀</p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-pink-600 font-medium">Progress</span>
                        <span className="text-sm text-pink-600 font-medium">Page {currentPage + 1} of {totalPages}</span>
                    </div>
                    <div className="w-full bg-pink-100 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-pink-400 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Survey Content */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-pink-200 p-8">
                        {/* Questions on current page */}
                        <div className="mb-8 space-y-8">
                            {pageQuestions.map((question) => (
                                <div key={question._id}>
                                    <h2 className="text-xl font-bold text-pink-600 mb-4">
                                        {question.questionText}
                                        {question.isRequired && <span className="text-red-500 ml-1">*</span>}
                                    </h2>
                                    {renderQuestion(question)}
                                </div>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 0}
                                className="flex items-center gap-2 px-6 py-2 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Previous
                            </button>

                            {currentPage < totalPages - 1 ? (
                                <button
                                    onClick={handleNextPage}
                                    className="flex items-center gap-2 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                                >
                                    Next
                                    <Send size={16} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 disabled:opacity-50 transition-colors"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Survey
                                            <Send size={16} />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelloKittySurvey;
