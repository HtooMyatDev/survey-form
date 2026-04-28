import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'text-pink-600' }) => {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl shadow-md border border-pink-200 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {Icon && <Icon size={24} className={`${color} opacity-70`} />}
      </div>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
  );
};

export default StatCard;
