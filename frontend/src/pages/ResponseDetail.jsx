import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import api from "../lib/axios"
import { 
    getResponseAnswer, 
    getQuestionText, 
    formatDetailedAnswer 
} from '../utils/responseUtils'

const ResponseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-700">
                <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
                <div className="flex flex-1">
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                    <div className="flex-1 p-6 flex items-center justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
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
                <main className="flex-1 p-2 sm:p-6 min-w-0">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-4 px-4 py-2 rounded-full bg-pink-200 text-pink-700 font-semibold hover:bg-pink-300 transition shadow-sm"
                    >
                        ← Back
                    </button>
                    
                    <section className="bg-white rounded-3xl border border-pink-200 p-4 sm:p-6 shadow-md w-full">
                        {error && (
                            <div className="text-red-500 text-center py-10">{error}</div>
                        )}
                        {response && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Survey Response Details</h2>

                                {/* Response Metadata */}
                                <div className="mb-6 p-4 bg-pink-50 rounded-2xl border border-pink-100">
                                    <h3 className="text-lg font-semibold mb-2 text-pink-700">Response Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="font-semibold text-pink-600">Total Questions:</span> {response.totalQuestions || 'N/A'}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-pink-600">Submitted:</span> {new Date(response.createdAt).toLocaleString()}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-pink-600">Response ID:</span> <span className="text-gray-400 font-mono text-xs">{response._id}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Answers */}
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-pink-700 mb-3 ml-1">Answers</h3>

                                    {/* Handle both new and old structure */}
                                    {(response.questionIds || questions).map((q, index) => {
                                        const qid = typeof q === 'string' ? q : q._id;
                                        const answer = getResponseAnswer(response, qid);
                                        const qText = typeof q === 'string' ? getQuestionText(questions, qid) : q.questionText;
                                        const formattedAnswer = formatDetailedAnswer(questions, qid, answer);

                                        return (
                                            <DetailRow
                                                key={qid}
                                                label={`${index + 1}. ${qText}`}
                                                value={formattedAnswer}
                                            />
                                        );
                                    })}
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
    <div className="flex flex-col sm:flex-row sm:items-start border-b border-pink-100 py-4 px-2 hover:bg-pink-50 transition-colors rounded-lg">
        <span className="font-semibold w-full sm:w-80 mb-2 sm:mb-0 text-pink-700 leading-tight">{label}:</span>
        <span className="ml-0 sm:ml-4 break-words flex-1 text-gray-700">{value}</span>
    </div>
)

export default ResponseDetail;
