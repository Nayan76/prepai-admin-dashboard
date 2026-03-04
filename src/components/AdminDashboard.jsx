import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import DashboardView from './views/DashboardView';
import UsersView from './views/UsersView';
import QuestionsView from './views/QuestionsView';
import AIPerformanceView from './views/AIPerformanceView';
import AnalyticsView from './views/AnalyticsView';
import SettingsView from './views/SettingsView';
import AdminChatbot from './AdminChatbot';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        alert('Logged out successfully!');
        setShowLogoutConfirm(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardView />;
            case 'users':
                return <UsersView />;
            case 'questions':
                return <QuestionsView />;
            case 'ai-performance':
                return <AIPerformanceView />;
            case 'analytics':
                return <AnalyticsView />;
            case 'settings':
                return <SettingsView />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl">
                        <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                Cancel
                            </button>
                            <button onClick={confirmLogout} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <Header activeTab={activeTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <div className="p-8">
                    {renderContent()}
                </div>
            </main>

            {/* AI Chatbot */}
            <AdminChatbot />
        </div>
    );
};

export default AdminDashboard;