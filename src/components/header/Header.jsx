import React from 'react';
import { Search, AlertCircle } from 'lucide-react';

const Header = ({ activeTab, searchQuery, setSearchQuery }) => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-8 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome back, Admin</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                        <AlertCircle className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            AD
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-semibold">Admin User</p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;