import React from 'react';

const SurveyProgress = ({ currentPage, totalPages }) => {
    const progress = ((currentPage + 1) / totalPages) * 100;

    return (
        <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-pink-600 font-medium">Progress</span>
                <span className="text-sm text-pink-600 font-medium">Page {currentPage + 1} of {totalPages}</span>
            </div>
            <div className="w-full bg-pink-100 rounded-full h-2">
                <div
                    className="bg-gradient-to-r from-pink-400 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default SurveyProgress;
