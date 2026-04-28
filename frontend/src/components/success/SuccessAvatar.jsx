import React from 'react';
import { PartyPopper, Sparkles, Heart } from 'lucide-react';
import KittyAvatar from '../common/KittyAvatar';
import FloatingElement from '../common/FloatingElement';

const SuccessAvatar = () => {
    return (
        <div className="relative mb-8 pt-4">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-200/50 blur-3xl rounded-full -z-10 animate-pulse"></div>

            {/* Floating Particles around Avatar */}
            <div className="absolute inset-0 pointer-events-none">
                <FloatingElement className="top-0 left-1/4 text-yellow-400" delay="0.2s">
                    <Sparkles size={20} />
                </FloatingElement>
                <FloatingElement className="top-4 right-1/4 text-pink-400" delay="0.5s">
                    <Heart size={16} fill="currentColor" />
                </FloatingElement>
                <FloatingElement className="bottom-0 left-1/3 text-pink-300" delay="0.8s">
                    <PartyPopper size={18} />
                </FloatingElement>
                <FloatingElement className="bottom-4 right-1/3 text-yellow-300" delay="1.1s">
                    <Sparkles size={14} />
                </FloatingElement>
            </div>

            {/* Main Avatar */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="transform hover:scale-110 transition-transform duration-500 cursor-pointer">
                    <KittyAvatar withCelebration={true} size="large" />
                </div>
                
                {/* Badge or Label */}
                <div className="mt-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border-2 border-white animate-bounce">
                    YOU'RE AWESOME!
                </div>
            </div>

            {/* Celebration Effects */}
            <div className="absolute -top-4 -left-4 text-pink-400 animate-ping opacity-75">
                <Heart size={24} fill="currentColor" />
            </div>
            <div className="absolute -top-4 -right-4 text-yellow-400 animate-ping opacity-75" style={{ animationDelay: '0.5s' }}>
                <Sparkles size={24} />
            </div>
        </div>
    );
};

export default SuccessAvatar;
