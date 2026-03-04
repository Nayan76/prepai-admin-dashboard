import React, { useState } from 'react';
import { Target, Clock, Award, MessageSquare, Brain, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MetricCard from '../common/MetricCard';
import { mockAiMetrics, aiPerformanceData } from '../../data/mockData';

const AIPerformanceView = () => {
    const [currentModel, setCurrentModel] = useState('GPT-4-Turbo');
    const [showModelSwitch, setShowModelSwitch] = useState(false);
    const [temperature, setTemperature] = useState(70);

    const models = [
        { name: 'GPT-4-Turbo', description: 'Most capable model', status: 'active' },
        { name: 'GPT-4', description: 'High performance', status: 'available' },
        { name: 'GPT-3.5-Turbo', description: 'Fast and efficient', status: 'available' },
        { name: 'Claude-3-Opus', description: 'Anthropic model', status: 'available' },
    ];

    const handleSwitchModel = (modelName) => {
        setCurrentModel(modelName);
        setShowModelSwitch(false);
        alert(`Switched to ${modelName} successfully!`);
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="Response Accuracy" value="94.5%" icon={<Target />} color="blue" />
                <MetricCard title="Avg Response Time" value="1.2s" icon={<Clock />} color="green" />
                <MetricCard title="User Satisfaction" value="4.7" icon={<Award />} color="purple" />
                <MetricCard title="Daily Queries" value="15,234" icon={<MessageSquare />} color="orange" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Model Performance Over Time</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Model: {currentModel}</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={aiPerformanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#3B82F6" name="Accuracy %" />
                                <Line yAxisId="right" type="monotone" dataKey="latency" stroke="#10B981" name="Latency (s)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Model Controls</h3>

                    {showModelSwitch && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold">Switch AI Model</h3>
                                    <button onClick={() => setShowModelSwitch(false)} className="text-gray-400 hover:text-gray-600">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {models.map((model) => (
                                        <button key={model.name} onClick={() => handleSwitchModel(model.name)} className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${currentModel === model.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{model.name}</p>
                                                    <p className="text-sm text-gray-500">{model.description}</p>
                                                </div>
                                                {currentModel === model.name && <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs">Active</span>}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="font-medium text-gray-900 mb-1">Current Model</p>
                            <p className="text-sm text-gray-500 mb-3">{currentModel}</p>
                            <button onClick={() => setShowModelSwitch(true)} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                Switch Model
                            </button>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="font-medium text-gray-900 mb-1">Last Training</p>
                            <p className="text-sm text-gray-500 mb-3">2 hours ago</p>
                            <button onClick={() => alert('Retraining started!')} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                                Retrain Now
                            </button>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="font-medium text-gray-900 mb-3">Temperature: {temperature}%</p>
                            <input type="range" min="0" max="100" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Precise</span>
                                <span>Creative</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Recent AI Interactions</h3>
                <div className="space-y-4">
                    {[1001, 1002, 1003].map((id) => (
                        <div key={id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Brain className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold text-gray-900">Interview Session #{id}</p>
                                    <span className="text-xs text-gray-500">2 mins ago</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">Q: Explain the difference between REST and GraphQL...</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>Response time: 1.2s</span>
                                    <span>Tokens: 245</span>
                                    <span className="text-green-600 font-medium">Confidence: 94%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AIPerformanceView;