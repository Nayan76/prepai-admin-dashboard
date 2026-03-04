import React from 'react';

const MetricCard = ({ title, value, icon, color }) => {
    const bgColors = {
        blue: 'bg-blue-100',
        green: 'bg-green-100',
        purple: 'bg-purple-100',
        orange: 'bg-orange-100'
    };

    const textColors = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        purple: 'text-purple-600',
        orange: 'text-orange-600'
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className={`w-12 h-12 ${bgColors[color]} rounded-xl flex items-center justify-center mb-4`}>
                {React.cloneElement(icon, { className: `w-6 h-6 ${textColors[color]}` })}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    );
};

export default MetricCard;