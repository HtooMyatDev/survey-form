import React, { useState, useEffect } from 'react';
import { Heart, Star, Sparkles, Ribbon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from "../lib/axios.js"
import { useNavigate } from "react-router"

// Sub-components
import SurveyQuestion from '../components/survey/SurveyQuestion';
import SurveyProgress from '../components/survey/SurveyProgress';
import SurveyNavigation from '../components/survey/SurveyNavigation';
import FloatingElement from '../components/common/FloatingElement';
import KittyAvatar from '../components/common/KittyAvatar';

// Utilities
import { validateSurveyPage, processFormDataForSubmit, getRequiredMessage } from '../utils/surveyUtils';

const QUESTIONS_PER_PAGE = 5;

const Survey = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otherInputs, setOtherInputs] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await api.get('/questions');
            const data = Array.isArray(response.data) ? response.data : [];
            const sortedQuestions = data.sort((a, b) => a.order - b.order);
            setQuestions(sortedQuestions);

            const initialFormData = {};
            sortedQuestions.forEach(question => {
                initialFormData[question._id] = question.questionType === 'checkbox' ? [] : '';
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
        setFormData(prev => ({ ...prev, [questionId]: value }));
    };

    const handleCheckboxChange = (questionId, value) => {
        setFormData(prev => ({
            ...prev,
            [questionId]: prev[questionId].includes(value)
                ? prev[questionId].filter(item => item !== value)
                : [...prev[questionId], value]
        }));
    };

    const handleOtherRadioSelect = (questionId) => {
        setFormData(prev => ({ ...prev, [questionId]: '__other__' }));
    };

    const handleOtherRadioInput = (questionId, value) => {
        setOtherInputs(prev => ({ ...prev, [questionId]: value }));
    };

    const handleOtherCheckboxToggle = (questionId, checked) => {
        setFormData(prev => {
            const arr = prev[questionId] || [];
            if (checked) {
                return { ...prev, [questionId]: [...arr, '__other__'] };
            } else {
                return { ...prev, [questionId]: arr.filter(v => v !== '__other__') };
            }
        });
        if (!checked) setOtherInputs(prev => ({ ...prev, [questionId]: '' }));
    };

    const handleOtherCheckboxInput = (questionId, value) => {
        setOtherInputs(prev => ({ ...prev, [questionId]: value }));
    };

    const handleNextPage = () => {
        if (!validateSurveyPage(questions, currentPage, QUESTIONS_PER_PAGE, formData)) return;
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
        if (!validateSurveyPage(questions, currentPage, QUESTIONS_PER_PAGE, formData)) return;

        // Validate all required questions
        const requiredQuestions = questions.filter(q => q.isRequired);
        for (const question of requiredQuestions) {
            const value = formData[question._id];
            if (question.questionType === 'checkbox' ? (!value || value.length === 0) : (!value || value.trim() === '')) {
                toast.error(getRequiredMessage(question));
                return;
            }
        }

        // Global age validation
        for (const question of questions) {
            if (question.fieldKey === 'age' || /age/i.test(question.questionText)) {
                const value = formData[question._id];
                if (!value || !/^\d+$/.test(value.toString().trim())) {
                    toast.error('Enter a valid numeric age');
                    return;
                }
            }
        }

        setIsSubmitting(true);
        try {
            const processedFormData = processFormDataForSubmit(formData, otherInputs);
            await api.post("/responses", processedFormData);

            toast.success('Thank you for sharing, cutie!', {
                duration: 5000,
                icon: '💖',
                style: { background: '#FFB6C1', color: '#FF1493', border: '2px solid #FF69B4', borderRadius: '20px', fontWeight: 'bold' }
            });

            const questionsAnswered = questions.filter(q => {
                const val = formData[q._id];
                return Array.isArray(val) ? val.length > 0 : (val !== undefined && val !== null && val !== '');
            }).length;

            navigate("/success", {
                state: { questionsAnswered, totalQuestions: questions.length }
            });
        } catch (error) {
            if (error.response?.status === 429) {
                toast.error("Slow down, you are submitting surveys way too fast", { icon: "👀" });
            } else {
                toast.error("Failed to submit survey");
            }
        } finally {
            setIsSubmitting(false);
        }
    };


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
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length);
    const pageQuestions = questions.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white relative overflow-hidden">
            <Toaster position="top-center" />

            {/* Decorations */}
            <FloatingElement className="top-10 left-10 text-pink-300"><Heart size={24} fill="currentColor" /></FloatingElement>
            <FloatingElement className="top-20 right-20 text-pink-400" delay="1s"><Star size={20} fill="currentColor" /></FloatingElement>
            <FloatingElement className="top-40 left-1/4 text-pink-200" delay="2s"><Sparkles size={18} /></FloatingElement>
            <FloatingElement className="bottom-20 right-10 text-pink-300" delay="0.5s"><Heart size={20} fill="currentColor" /></FloatingElement>
            <FloatingElement className="bottom-40 left-20 text-pink-400" delay="1.5s"><Star size={22} fill="currentColor" /></FloatingElement>

            <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block relative">
                        <KittyAvatar size="small" />
                        <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-2">Mental Health Survey</h1>
                        <p className="text-pink-400 text-sm flex items-center justify-center gap-2">
                            Help us understand mental health awareness <Ribbon className="w-4 h-4" />
                        </p>
                    </div>
                </div>

                <SurveyProgress currentPage={currentPage} totalPages={totalPages} />

                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border-2 border-pink-200 p-4 sm:p-8">
                        <div className="mb-8 space-y-8">
                            {pageQuestions.map((question) => (
                                <SurveyQuestion
                                    key={question._id}
                                    question={question}
                                    value={formData[question._id]}
                                    otherValue={otherInputs[question._id]}
                                    onInputChange={handleInputChange}
                                    onCheckboxChange={handleCheckboxChange}
                                    onOtherRadioSelect={handleOtherRadioSelect}
                                    onOtherRadioInput={handleOtherRadioInput}
                                    onOtherCheckboxToggle={handleOtherCheckboxToggle}
                                    onOtherCheckboxInput={handleOtherCheckboxInput}
                                />
                            ))}
                        </div>

                        <SurveyNavigation
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPrevious={handlePreviousPage}
                            onNext={handleNextPage}
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Survey;
