import React from 'react';
import { ArrowLeft, Send } from 'lucide-react';

const SurveyNavigation = ({ 
    currentPage, 
    totalPages, 
    onPrevious, 
    onNext, 
    onSubmit, 
    isSubmitting 
}) => {
    return (
        <div className="flex justify-between items-center">
            <button
                onClick={onPrevious}
                disabled={currentPage === 0}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
                <ArrowLeft size={16} />
                Previous
            </button>

            {currentPage < totalPages - 1 ? (
                <button
                    onClick={onNext}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors text-sm sm:text-base"
                >
                    Next
                    <Send size={16} />
                </button>
            ) : (
                <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 disabled:opacity-50 transition-colors text-sm sm:text-base"
                >
                    {isSubmitting ? (
                        <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Submitting...
                        </>
                    ) : (
                        <>
                            Submit Survey
                            <Send size={16} />
                        </>
                    )}
                </button>
            )}
        </div>
    );
};

export default SurveyNavigation;
