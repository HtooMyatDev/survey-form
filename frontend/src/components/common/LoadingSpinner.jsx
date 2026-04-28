import React from 'react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
    const sizes = {
        sm: 'loading-sm',
        md: 'loading-md',
        lg: 'loading-lg'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <span className={`loading loading-spinner ${sizes[size]} text-pink-600`}></span>
            {message && <p className="text-pink-600 font-semibold">{message}</p>}
        </div>
    );
};

export default LoadingSpinner;
