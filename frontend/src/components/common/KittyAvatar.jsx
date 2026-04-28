import React from 'react';
import { Sparkles } from 'lucide-react';

const KittyAvatar = ({ withCelebration = false, size = "large" }) => {
    const containerClasses = size === "large" 
        ? "w-24 h-24 sm:w-32 sm:h-32" 
        : "w-16 h-16 sm:w-20 sm:h-20";
    
    const faceClasses = size === "large"
        ? "w-20 h-16"
        : "w-14 h-10";

    return (
        <div className={`bg-gradient-to-br from-pink-200 to-pink-300 rounded-full border-4 border-pink-400 mx-auto flex items-center justify-center shadow-lg relative overflow-hidden ${containerClasses}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full animate-pulse"></div>
            <div className="relative z-10">
                <div className={`bg-white rounded-full relative ${faceClasses}`}>
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
                        {withCelebration && (
                            <>
                                <div className="absolute -top-1 -left-1 text-yellow-300">
                                    <Sparkles size={8} />
                                </div>
                                <div className="absolute -top-1 -right-1 text-yellow-300">
                                    <Sparkles size={8} />
                                </div>
                            </>
                        )}
                    </div>
                    {/* Whiskers */}
                    <div className="absolute top-6 left-0 w-3 h-0.5 bg-gray-400 rounded-full"></div>
                    <div className="absolute top-8 left-0 w-3 h-0.5 bg-gray-400 rounded-full"></div>
                    <div className="absolute top-6 right-0 w-3 h-0.5 bg-gray-400 rounded-full"></div>
                    <div className="absolute top-8 right-0 w-3 h-0.5 bg-gray-400 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default KittyAvatar;
