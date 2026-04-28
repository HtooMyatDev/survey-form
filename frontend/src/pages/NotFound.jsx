import React from 'react';
import { Heart, Sparkles, Home } from 'lucide-react';
import FloatingElement from '../components/common/FloatingElement';
import KittyAvatar from '../components/common/KittyAvatar';
import { Link } from 'react-router';

const NotFound = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-600 relative overflow-hidden">
        {/* Floating decorative elements */}
        <FloatingElement className="top-10 left-10 text-pink-300" delay="0s">
            <Heart size={32} fill="currentColor" />
        </FloatingElement>
        <FloatingElement className="top-20 right-20 text-pink-400" delay="1s">
            <Sparkles size={28} />
        </FloatingElement>
        <FloatingElement className="bottom-20 right-10 text-pink-200" delay="0.5s">
            <Heart size={28} fill="currentColor" />
        </FloatingElement>
        <FloatingElement className="bottom-10 left-20 text-pink-300" delay="1.5s">
            <Sparkles size={24} />
        </FloatingElement>

        <div className="mb-8 relative">
            <KittyAvatar />
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold mb-2">404</h1>
        <p className="text-xl sm:text-2xl mb-4 px-4 text-center">Oops! This page is lost in cuteness...</p>
        <p className="text-base sm:text-lg text-pink-500 mb-8 px-4 text-center">Let's get you back to somewhere adorable!</p>
        
        <Link 
            to="/" 
            className="flex items-center gap-2 px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all font-bold text-lg shadow-lg hover:shadow-pink-200 active:scale-95"
        >
            <Home size={20} />
            Go Home
        </Link>
    </div>
);

export default NotFound;
