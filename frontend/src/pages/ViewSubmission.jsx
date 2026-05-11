import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Loader2, Sparkles, Ribbon } from 'lucide-react';
import api from '../lib/axios';
import toast, { Toaster } from 'react-hot-toast';

const ViewSubmission = () => {
    const { id } = useParams();
    const [submission, setSubmission] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sRes, qRes] = await Promise.all([
                    api.get(`/responses/${id}`),
                    api.get('/questions')
                ]);
                setSubmission(sRes.data);
                setQuestions(qRes.data);
            } catch (err) {
                console.error("Error fetching submission:", err);
                toast.error("Failed to load your responses.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white flex flex-col items-center justify-center p-4">
                <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
                <p className="text-pink-600 font-medium">Retrieving your responses...</p>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-pink-200 text-center max-w-md">
                    <h2 className="text-2xl font-bold text-pink-600 mb-4">Oops!</h2>
                    <p className="text-gray-600 mb-6">We couldn't find that submission. It might have been removed or the link is incorrect.</p>
                    <Link to="/" className="btn bg-pink-500 text-white hover:bg-pink-600 rounded-2xl border-none">
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white p-4 sm:p-8">
            <Toaster />
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/" className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-bold transition-colors">
                        <ArrowLeft size={20} />
                        <span>Home</span>
                    </Link>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-pink-200 shadow-sm">
                        <Ribbon className="text-pink-400 w-4 h-4" />
                        <span className="text-pink-600 font-bold text-sm">My Contribution</span>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-pink-200 overflow-hidden">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-pink-400 to-pink-500 p-8 text-white text-center">
                        <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                            <Heart size={32} fill="white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Thank you for sharing!</h1>
                        <p className="text-pink-50 opacity-90 text-sm sm:text-base">
                            Submitted on {new Date(submission.createdAt).toLocaleDateString()} at {new Date(submission.createdAt).toLocaleTimeString()}
                        </p>
                    </div>

                    {/* Responses List */}
                    <div className="p-6 sm:p-10 space-y-8">
                        {questions.sort((a,b) => a.order - b.order).map((q, idx) => {
                            const answer = submission.answers[q._id];
                            if (answer === undefined || answer === null || (Array.isArray(answer) && answer.length === 0)) return null;

                            return (
                                <div key={q._id} className="relative group">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-pink-100 text-pink-500 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 mb-3 text-lg">{q.questionText}</h3>
                                            
                                            <div className="bg-pink-50/50 border border-pink-100 rounded-2xl p-4 transition-all group-hover:bg-pink-50">
                                                {Array.isArray(answer) ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {answer.map((item, i) => (
                                                            <span key={i} className="bg-white border border-pink-200 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-pink-700 font-medium">{answer}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="bg-pink-50 p-8 border-t border-pink-100 text-center">
                        <div className="flex items-center justify-center gap-2 text-pink-600 font-bold mb-4">
                            <Sparkles className="w-5 h-5" />
                            <span>Your voice matters!</span>
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <p className="text-gray-500 text-sm max-w-md mx-auto">
                            This data is being used to improve mental health awareness and support systems. 
                            Your contribution helps us build a more empathetic world.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center text-pink-400 text-sm flex items-center justify-center gap-2">
                    <span>Generated with love for psychology and technology</span>
                    <Heart size={14} fill="currentColor" />
                </div>
            </div>
        </div>
    );
};

export default ViewSubmission;
