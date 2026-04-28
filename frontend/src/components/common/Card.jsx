import React from 'react';

const Card = ({ children, className = '', title, subtitle }) => {
  return (
    <div className={`bg-white rounded-3xl border border-pink-200 p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
