import React from 'react';

const QuickActionButton = ({ icon, label, color, onClick }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
        green: 'bg-green-50 text-green-700 hover:bg-green-100',
        purple: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
        red: 'bg-red-50 text-red-700 hover:bg-red-100',
        orange: 'bg-orange-50 text-orange-700 hover:bg-orange-100'
    };

    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${colors[color]}`}
        >
            {React.cloneElement(icon, { className: "w-5 h-5" })}
            <span className="font-medium">{label}</span>
        </button>
    );
};

export default QuickActionButton;