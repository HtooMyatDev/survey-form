import React from 'react';
import { Sparkles } from 'lucide-react';

const SuccessStats = ({ questionsAnswered, totalQuestions }) => {
    return (
        <div className="bg-pink-50 rounded-2xl p-6 border border-pink-200 mx-auto max-w-md">
            <h3 className="text-pink-600 font-semibold mb-3 flex items-center justify-center gap-2">
                Survey Complete! <Sparkles className="w-4 h-4 text-pink-400" />
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                    <div className="text-2xl font-bold text-pink-500">{questionsAnswered}</div>
                    <div className="text-pink-400">Questions Answered</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-pink-500">
                        {totalQuestions > 0 ? `${Math.round((questionsAnswered / totalQuestions) * 100)}%` : '100%'}
                    </div>
                    <div className="text-pink-400">Survey Progress</div>
                </div>
            </div>
        </div>
    );
};

export default SuccessStats;
