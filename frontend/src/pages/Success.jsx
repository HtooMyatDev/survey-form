import React from 'react';
import { Heart, Home, Ribbon, Flower, Star } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

// Sub-components
import SuccessDecorations from '../components/success/SuccessDecorations';
import SuccessStats from '../components/success/SuccessStats';

const Success = () => {
    const location = useLocation();
    const questionsAnswered = location.state?.questionsAnswered ?? 1;
    const totalQuestions = location.state?.totalQuestions ?? 1;

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white relative overflow-hidden">
            <SuccessDecorations />

            {/* Success Page Content */}
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border-2 border-pink-200 p-6 sm:p-12 relative">

                        <SuccessAvatar />

                        {/* Success Messages */}
                        <div className="space-y-6 relative z-10">
                            <h1 className="text-2xl sm:text-4xl font-bold text-pink-600 mb-4 flex items-center justify-center gap-3">
                                You have contributed! <Ribbon className="w-8 h-8 text-pink-400" />
                            </h1>

                            <div className="space-y-4">
                                <p className="text-lg sm:text-xl text-pink-500 font-medium">
                                    Thank you for completing our survey!
                                </p>
                                <div className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg mx-auto flex flex-col items-center gap-1">
                                    <p>Your responses are super important and will help us better understand mental health awareness.</p>
                                    <p className="flex items-center gap-2">
                                        You're amazing for taking the time to share your thoughts! <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                                    </p>
                                </div>
                            </div>

                            <SuccessStats
                                questionsAnswered={questionsAnswered}
                                totalQuestions={totalQuestions}
                            />

                            {/* Special message */}
                            <div className="bg-gradient-to-r from-pink-100 to-pink-50 rounded-2xl p-6 border border-pink-200">
                                <div className="flex items-center justify-center mb-3">
                                    <Heart size={20} className="text-pink-500 mr-2" fill="currentColor" />
                                    <span className="text-pink-600 font-semibold">Mental Health Matters</span>
                                    <Heart size={20} className="text-pink-500 ml-2" fill="currentColor" />
                                </div>
                                <div className="text-sm text-gray-600 leading-relaxed flex flex-col items-center gap-1">
                                    <p>Remember, it's okay to not be okay sometimes. Taking care of your mental health is just as important as taking care of your physical health.</p>
                                    <p className="flex items-center gap-2">
                                        You're brave and wonderful! <Flower className="w-4 h-4 text-pink-400" />
                                    </p>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                <Link to={"/"}
                                    className="btn bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 border-none text-white font-bold rounded-2xl flex items-center gap-2"
                                >
                                    <Home size={16} />
                                    Back to Home
                                </Link>
                            </div>

                            {/* Footer message */}
                            <div className="text-center text-sm text-pink-400 mt-8 pt-6 border-t border-pink-200">
                                <p>For future psychologist</p>
                                <p className="mt-1 flex items-center justify-center gap-2">
                                    From future developer! <Star className="w-4 h-4 text-pink-400 fill-pink-400" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Success;
