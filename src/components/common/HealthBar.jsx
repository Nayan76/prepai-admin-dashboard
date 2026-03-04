import React from 'react';

const HealthBar = ({ label, value, color }) => (
    <div>
        <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-sm font-medium text-gray-900">{value}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
                className={`h-2 rounded-full ${color === 'green' ? 'bg-green-500' : color === 'blue' ? 'bg-blue-500' : 'bg-yellow-500'}`}
                style={{ width: `${value}%` }}
            ></div>
        </div>
    </div>
);

export default HealthBar;