import React from 'react';
import { AlertCircle } from 'lucide-react';

const Alert = ({ type = 'info', title, message, onClose }) => {
    const colors = {
        success: 'bg-green-100 border-green-300 text-green-800',
        error: 'bg-red-100 border-red-300 text-red-800',
        warning: 'bg-yellow-100 border-yellow-300 text-yellow-800',
        info: 'bg-blue-100 border-blue-300 text-blue-800'
    };

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    return (
        <div className={`border-l-4 ${colors[type]} p-4 rounded-lg flex items-start justify-between`}>
            <div className="flex items-start gap-3">
                <span className="text-2xl">{icons[type]}</span>
                <div>
                    {title && <h4 className="font-semibold mb-1">{title}</h4>}
                    {message && <p className="text-sm">{message}</p>}
                </div>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="text-lg opacity-70 hover:opacity-100 transition-opacity"
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default Alert;
