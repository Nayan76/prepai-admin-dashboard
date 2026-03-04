import React, { useState } from 'react';
import {
    Users,
    FileText,
    MessageSquare,
    Target,
    Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../common/StatCard';
import QuickActionButton from '../common/QuickActionButton';
import { userGrowthData } from '../../data/mockData';

const DashboardView = () => {
    const [activeModal, setActiveModal] = useState(null);

    const quickActions = [
        {
            icon: <FileText />,
            label: "Add Question",
            color: "green",
            action: () => setActiveModal('question')
        },
        {
            icon: <MessageSquare />,
            label: "Broadcast Message",
            color: "orange",
            action: () => setActiveModal('broadcast')
        },
    ];

    return (
        <div className="space-y-8">
            {/* Modals */}
            {activeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">
                                {activeModal === 'question' && "Add New Question"}
                                {activeModal === 'broadcast' && "Broadcast Message"}
                            </h3>
                            <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {activeModal === 'question' && (
                                <>
                                    <textarea placeholder="Enter question text..." className="w-full px-4 py-2 border rounded-lg h-24 resize-none" />
                                    <select className="w-full px-4 py-2 border rounded-lg">
                                        <option>Select Category</option>
                                        <option>System Design</option>
                                        <option>Algorithms</option>
                                        <option>Behavioral</option>
                                        <option>React</option>
                                        <option>JavaScript</option>
                                    </select>
                                    <select className="w-full px-4 py-2 border rounded-lg">
                                        <option>Select Difficulty</option>
                                        <option>Easy</option>
                                        <option>Medium</option>
                                        <option>Hard</option>
                                    </select>
                                    <button
                                        onClick={() => { alert('Question added successfully!'); setActiveModal(null); }}
                                        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        Add Question
                                    </button>
                                </>
                            )}

                            {activeModal === 'broadcast' && (
                                <>
                                    <textarea placeholder="Type your message to all users..." className="w-full px-4 py-2 border rounded-lg h-32 resize-none" />
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-gray-100 rounded-full text-xs">All Users</button>
                                        <button className="px-3 py-1 bg-gray-100 rounded-full text-xs">Pro Only</button>
                                        <button className="px-3 py-1 bg-gray-100 rounded-full text-xs">Mentors</button>
                                    </div>
                                    <button
                                        onClick={() => { alert('Message broadcasted to all users!'); setActiveModal(null); }}
                                        className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                    >
                                        Send Broadcast
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Grid - Trends removed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value="12,453"
                    icon={<Users className="w-6 h-6 text-blue-600" />}
                    color="blue"
                />
                <StatCard
                    title="Active Interviews"
                    value="892"
                    icon={<Activity className="w-6 h-6 text-green-600" />}
                    color="green"
                />
                <StatCard
                    title="Questions Generated"
                    value="45,632"
                    icon={<FileText className="w-6 h-6 text-purple-600" />}
                    color="purple"
                />
                <StatCard
                    title="Success Rate"
                    value="78.5%"
                    icon={<Target className="w-6 h-6 text-orange-600" />}
                    color="orange"
                />
            </div>

            {/* Charts & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Platform Overview</h3>
                        <select className="text-sm border border-gray-300 rounded-lg p-2">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                        </select>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={userGrowthData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="users" stroke="#3B82F6" fillOpacity={1} fill="url(#colorUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        {quickActions.map((action, idx) => (
                            <QuickActionButton
                                key={idx}
                                icon={action.icon}
                                label={action.label}
                                color={action.color}
                                onClick={action.action}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Interviews Only */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Interviews</h3>
                <div className="space-y-4">
                    {[1001, 1002, 1003, 1004].map((id) => (
                        <div key={id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900">User #{id}</p>
                                <p className="text-sm text-gray-500">System Design Interview • 45 mins</p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Completed</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardView;