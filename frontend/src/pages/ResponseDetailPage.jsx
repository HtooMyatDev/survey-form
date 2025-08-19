import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import api from "../lib/axios"

const ResponseDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const [responseRes, questionsRes] = await Promise.all([
                    api.get(`/responses/${id}`),
                    api.get('/questions')
                ]);

                setResponse(responseRes.data);
                setQuestions(questionsRes.data);
            } catch {
                setError('Failed to fetch response.');
            } finally {
                setLoading(false);
            }
        };
        fetchResponse();
    }, [id]);

    const getAnswerValue = (questionId) => {
        if (!response || !response.answers) return 'N/A';

        // Try to get from the new answers structure first
        const answer = response.answers[questionId];
        if (answer !== undefined) {
            if (Array.isArray(answer)) {
                return answer.join(', ');
            }
            return answer;
        }

        // Fallback to old structure for backward compatibility
        return 'N/A';
    };

    const getQuestionText = (questionId) => {
        const question = questions.find(q => q._id === questionId);
        return question ? question.questionText : `Question ${questionId}`;
    };

    const formatAnswer = (questionId, answer) => {
        if (!answer || answer === 'N/A') return 'Not answered';

        const question = questions.find(q => q._id === questionId);
        if (!question) return answer;

        // For radio and checkbox questions, show the option text instead of value
        if (question.questionType === 'radio' || question.questionType === 'checkbox') {
            if (Array.isArray(answer)) {
                // For checkbox questions
                return answer.map(val => {
                    const option = question.options.find(opt => opt.value === val);
                    return option ? option.text : val;
                }).join(', ');
            } else {
                // For radio questions
                const option = question.options.find(opt => opt.value === answer);
                return option ? option.text : answer;
            }
        }

        return answer;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-700">
            <Topbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-2 sm:p-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-4 px-4 py-2 rounded-full bg-pink-200 text-pink-700 font-semibold hover:bg-pink-300 transition"
                    >
                        ← Back
                    </button>
                    <section className="bg-white rounded-3xl border border-pink-200 p-4 sm:p-6 shadow-md w-full">
                        {loading && (
                            <div className="flex justify-center items-center min-h-40 text-lg">Loading response...</div>
                        )}
                        {error && (
                            <div className="text-red-500 text-center">{error}</div>
                        )}
                        {response && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Survey Response Details</h2>

                                {/* Response Metadata */}
                                <div className="mb-6 p-4 bg-pink-50 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2 text-pink-700">Response Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium">Total Questions:</span> {response.totalQuestions || 'N/A'}
                                        </div>
                                        <div>
                                            <span className="font-medium">Submitted:</span> {new Date(response.createdAt).toLocaleString()}
                                        </div>
                                        <div>
                                            <span className="font-medium">Response ID:</span> {response._id}
                                        </div>
                                    </div>
                                </div>

                                {/* Answers */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-pink-700">Answers</h3>

                                    {response.questionIds && response.questionIds.length > 0 ? (
                                        // New structure - show questions in order
                                        response.questionIds.map((questionId, index) => {
                                            const answer = getAnswerValue(questionId);
                                            const questionText = getQuestionText(questionId);
                                            const formattedAnswer = formatAnswer(questionId, answer);

                                            return (
                                                <DetailRow
                                                    key={questionId}
                                                    label={`${index + 1}. ${questionText}`}
                                                    value={formattedAnswer}
                                                />
                                            );
                                        })
                                    ) : (
                                        // Fallback for old structure or when questionIds is not available
                                        questions.map((question, index) => {
                                            const answer = getAnswerValue(question._id);
                                            const formattedAnswer = formatAnswer(question._id, answer);

                                            return (
                                                <DetailRow
                                                    key={question._id}
                                                    label={`${index + 1}. ${question.questionText}`}
                                                    value={formattedAnswer}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    )
}

const DetailRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-start border-b border-pink-100 py-3">
        <span className="font-semibold w-full sm:w-80 mb-2 sm:mb-0 text-pink-700">{label}:</span>
        <span className="ml-0 sm:ml-4 break-words flex-1">{value}</span>
    </div>
)

export default ResponseDetailPage
