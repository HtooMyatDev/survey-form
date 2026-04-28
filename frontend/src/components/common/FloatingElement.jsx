import React from 'react';

const FloatingElement = ({ children, className, delay = "0s" }) => {
    return (
        <div
            className={`absolute ${className}`}
            style={{
                animation: `float 3s ease-in-out infinite`,
                animationDelay: delay
            }}
        >
            {children}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
};

export default FloatingElement;
