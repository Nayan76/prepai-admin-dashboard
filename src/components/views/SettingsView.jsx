import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

const SettingsView = () => {
    const [settings, setSettings] = useState({
        platformName: 'PrepAI',
        supportEmail: 'admin@prepai.com',
        maintenanceMode: false,
        twoFactorAuth: false
    });

    const [showSaveSuccess, setShowSaveSuccess] = useState(false);

    const handleSave = () => {
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);
    };

    const handleResetData = () => {
        if (confirm('Are you sure you want to reset ALL data? This cannot be undone!')) {
            if (confirm('Really sure? All users, questions, and interview data will be lost!')) {
                alert('All data has been reset!');
            }
        }
    };

    const handleDeleteAccount = () => {
        if (confirm('Are you sure you want to delete your admin account?')) {
            alert('Account deletion request submitted. You will be logged out.');
        }
    };

    return (
        <div className="max-w-3xl space-y-6">
            {showSaveSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Settings saved successfully!
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">General Settings</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                        <input
                            type="text"
                            value={settings.platformName}
                            onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                        <input
                            type="email"
                            value={settings.supportEmail}
                            onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center justify-between py-4 border-t border-gray-200">
                        <div>
                            <p className="font-medium text-gray-900">Maintenance Mode</p>
                            <p className="text-sm text-gray-500">Temporarily disable access for all users</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.maintenanceMode ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Security</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, twoFactorAuth: !settings.twoFactorAuth })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${settings.twoFactorAuth ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        >
                            {settings.twoFactorAuth ? 'Enabled' : 'Enable'}
                        </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-gray-200">
                        <div>
                            <p className="font-medium text-gray-900">API Keys</p>
                            <p className="text-sm text-gray-500">Manage API access tokens</p>
                        </div>
                        <button onClick={() => alert('API Keys management modal would open here')} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                            Manage
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Save Changes
                </button>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-700 mb-4">These actions are irreversible. Please proceed with caution.</p>
                <div className="flex gap-4">
                    <button onClick={handleResetData} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                        Reset All Data
                    </button>
                    <button onClick={handleDeleteAccount} className="px-4 py-2 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;