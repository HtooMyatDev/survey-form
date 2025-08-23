import React from 'react';
import { Heart, Star, Sparkles, Home, Download, Share2 } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

// Success page component for survey completion
const HelloKittySuccess = () => {
    // Get the number of questions answered from location state (passed from survey page)
    const location = useLocation();
    const questionsAnswered = location.state?.questionsAnswered ?? 1;
    const totalQuestions = location.state?.totalQuestions ?? 1;

    // Floating decorative element component
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white relative overflow-hidden">
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
            <FloatingElement className="top-60 right-1/4 text-pink-300" delay="2.5s">
                <Heart size={18} fill="currentColor" />
            </FloatingElement>
            <FloatingElement className="bottom-20 right-10 text-pink-300" delay="0.5s">
                <Heart size={20} fill="currentColor" />
            </FloatingElement>
            <FloatingElement className="bottom-40 left-20 text-pink-400" delay="1.5s">
                <Star size={22} fill="currentColor" />
            </FloatingElement>
            <FloatingElement className="bottom-60 left-1/3 text-pink-200" delay="3s">
                <Sparkles size={16} />
            </FloatingElement>

            {/* Success Page Content */}
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-pink-200 p-12 relative">

                        {/* Confetti effect */}
                        <div className="absolute inset-0 pointer-events-none">
                            <FloatingElement className="top-4 left-8 text-pink-400" delay="0.2s">
                                <Heart size={12} fill="currentColor" />
                            </FloatingElement>
                            <FloatingElement className="top-6 right-12 text-pink-500" delay="0.8s">
                                <Star size={10} fill="currentColor" />
                            </FloatingElement>
                            <FloatingElement className="top-12 left-16 text-pink-300" delay="1.2s">
                                <Sparkles size={8} />
                            </FloatingElement>
                            <FloatingElement className="top-8 right-20 text-pink-400" delay="1.6s">
                                <Heart size={10} fill="currentColor" />
                            </FloatingElement>
                            <FloatingElement className="bottom-4 left-12 text-pink-500" delay="2s">
                                <Star size={8} fill="currentColor" />
                            </FloatingElement>
                            <FloatingElement className="bottom-8 right-16 text-pink-300" delay="2.4s">
                                <Heart size={12} fill="currentColor" />
                            </FloatingElement>
                        </div>

                        {/* Main Hello Kitty Success Avatar */}
                        <div className="mb-8 relative">
                            <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full border-4 border-pink-400 mx-auto mb-6 flex items-center justify-center shadow-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full animate-pulse"></div>
                                <div className="relative z-10">
                                    {/* Hello Kitty face */}
                                    <div className="w-20 h-16 bg-white rounded-full relative">
                                        {/* Eyes - happy/closed */}
                                        <div className="absolute top-4 left-3 w-3 h-1 bg-black rounded-full"></div>
                                        <div className="absolute top-4 right-3 w-3 h-1 bg-black rounded-full"></div>
                                        {/* Nose */}
                                        <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                        {/* Happy mouth */}
                                        <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-full"></div>
                                        {/* Special celebration bow */}
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-5 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-md">
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink-700 rounded-full"></div>
                                            {/* Bow sparkles */}
                                            <div className="absolute -top-1 -left-1 text-yellow-300">
                                                <Sparkles size={8} />
                                            </div>
                                            <div className="absolute -top-1 -right-1 text-yellow-300">
                                                <Sparkles size={8} />
                                            </div>
                                        </div>
                                        {/* Whiskers */}
                                        <div className="absolute top-6 left-0 w-3 h-0.5 bg-gray-400 rounded-full"></div>
                                        <div className="absolute top-8 left-0 w-3 h-0.5 bg-gray-400 rounded-full"></div>
                                        <div className="absolute top-6 right-0 w-3 h-0.5 bg-gray-400 rounded-full"></div>
                                        <div className="absolute top-8 right-0 w-3 h-0.5 bg-gray-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Success Messages */}
                        <div className="space-y-6 relative z-10">
                            <h1 className="text-4xl font-bold text-pink-600 mb-4">
                                You have contributed! 🎀
                            </h1>

                            <div className="space-y-4">
                                <p className="text-xl text-pink-500 font-medium">
                                    Thank you for completing our survey!
                                </p>
                                <p className="text-gray-600 leading-relaxed max-w-lg mx-auto">
                                    Your responses are super important and will help us better understand mental health awareness.
                                    You're amazing for taking the time to share your thoughts! 💕
                                </p>
                            </div>

                            {/* Stats or confirmation */}
                            <div className="bg-pink-50 rounded-2xl p-6 border border-pink-200 mx-auto max-w-md">
                                <h3 className="text-pink-600 font-semibold mb-3">Survey Complete! ✨</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-center">
                                        {/* Dynamically show how many questions were answered */}
                                        <div className="text-2xl font-bold text-pink-500">{questionsAnswered}</div>
                                        <div className="text-pink-400">Questions Answered</div>
                                    </div>
                                    <div className="text-center">
                                        {/* Show survey progress as a percentage */}
                                        <div className="text-2xl font-bold text-pink-500">{totalQuestions > 0 ? `${Math.round((questionsAnswered / totalQuestions) * 100)}%` : '100%'}</div>
                                        <div className="text-pink-400">Survey Progress</div>
                                    </div>
                                </div>
                            </div>

                            {/* Special message */}
                            <div className="bg-gradient-to-r from-pink-100 to-pink-50 rounded-2xl p-6 border border-pink-200">
                                <div className="flex items-center justify-center mb-3">
                                    <Heart size={20} className="text-pink-500 mr-2" fill="currentColor" />
                                    <span className="text-pink-600 font-semibold">Mental Health Matters</span>
                                    <Heart size={20} className="text-pink-500 ml-2" fill="currentColor" />
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Remember, it's okay to not be okay sometimes. Taking care of your mental health is just as important as taking care of your physical health. You're brave and wonderful! 🌸
                                </p>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                {/* <button
                                    onClick={handleDownloadResults}
                                    className="btn btn-outline border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 rounded-2xl flex items-center gap-2"
                                >
                                    <Download size={16} />
                                    Download Summary
                                </button> */}

                                {/* <button
                                    onClick={handleShareResults}
                                    className="btn btn-outline border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 rounded-2xl flex items-center gap-2"
                                >
                                    <Share2 size={16} />
                                    Share Survey
                                </button> */}

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
                                <p className="mt-1">From future developer! 🌟</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
        </div>
    );
};

export default HelloKittySuccess;
