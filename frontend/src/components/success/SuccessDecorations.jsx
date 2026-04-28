import React from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';
import FloatingElement from '../common/FloatingElement';

const SuccessDecorations = () => {
    return (
        <>
            {/* Background floating elements */}
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

            {/* Confetti-like floating elements inside the card area (positioned relative to container in parent) */}
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
        </>
    );
};

export default SuccessDecorations;
