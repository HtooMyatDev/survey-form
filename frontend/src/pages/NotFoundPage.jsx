import React from 'react';
import { Heart, Sparkles, Home } from 'lucide-react';

const NotFoundPage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-600 relative overflow-hidden">
        {/* Floating hearts and sparkles */}
        <Heart className="absolute top-10 left-10 text-pink-300 animate-bounce" size={32} fill="currentColor" />
        <Sparkles className="absolute top-20 right-20 text-pink-400 animate-pulse" size={28} />
        <Heart className="absolute bottom-20 right-10 text-pink-200 animate-bounce" size={28} fill="currentColor" />
        <Sparkles className="absolute bottom-10 left-20 text-pink-300 animate-pulse" size={24} />

        {/* Hello Kitty face */}
        <div className="mb-8 relative">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full border-4 border-pink-400 mx-auto flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full animate-pulse"></div>
                <div className="relative z-10">
                    <div className="w-20 h-16 bg-white rounded-full relative">
                        {/* Eyes - happy/closed */}
                        <div className="absolute top-4 left-3 w-3 h-1 bg-black rounded-full"></div>
                        <div className="absolute top-4 right-3 w-3 h-1 bg-black rounded-full"></div>
                        {/* Nose */}
                        <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                        {/* Happy mouth */}
                        <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-full"></div>
                        {/* Bow */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-5 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-md">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink-700 rounded-full"></div>
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

        <h1 className="text-6xl font-bold mb-2">404</h1>
        <p className="text-2xl mb-4">Oops! This page is lost in cuteness...</p>
        <p className="text-lg text-pink-500 mb-8">Let's get you back to somewhere adorable!</p>
        <a href="/" className="flex items-center gap-2 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition font-bold text-lg shadow-lg">
            <Home size={20} />
            Go Home
        </a>
    </div>
);

export default NotFoundPage;
