import React from 'react';

const StatCard = ({ title, value, trend, trendUp, icon, color }) => {
    const bgColors = {
        blue: 'bg-blue-100',
        green: 'bg-green-100',
        purple: 'bg-purple-100',
        orange: 'bg-orange-100'
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${bgColors[color]}`}>
                    {icon}
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {trendUp ? '↑' : '↓'} {trend}
                </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    );
};

export default StatCard;