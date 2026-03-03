import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader } from 'lucide-react';

// Using Google's Gemini API (Free tier available)
// Get API key from: https://makersuite.google.com/app/apikey
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual key

const AdminChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            content: 'Hello! I\'m your PrepAI Admin Assistant. I can help you with:\n\n• User management queries\n• Platform statistics\n• Quick navigation\n• Best practices\n• Troubleshooting\n\nWhat would you like to know?',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Context about the platform for the AI
    const systemContext = `You are an AI assistant for PrepAI Admin Dashboard, an interview preparation platform. 

Platform Details:
- Total Users: 12,453
- Active Interviews: 892
- Questions in DB: 45,632
- Success Rate: 78.5%
- AI Model: GPT-4-Turbo (94.5% accuracy)

Admin Capabilities:
- Manage users (add, suspend, view stats)
- Add/edit interview questions
- Monitor AI performance
- View analytics and charts
- Broadcast messages to users
- Content moderation

Be helpful, concise, and professional. If asked to perform actions, explain how to do it in the dashboard.`;

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: inputMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Option 1: Using Google Gemini (Free)
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `${systemContext}\n\nUser: ${inputMessage}\n\nAssistant:`
                            }]
                        }]
                    })
                }
            );

            const data = await response.json();

            let botResponse = 'I apologize, but I\'m having trouble connecting right now. Please try again.';

            if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                botResponse = data.candidates[0].content.parts[0].text;
            }

            setMessages(prev => [...prev, {
                role: 'bot',
                content: botResponse,
                timestamp: new Date()
            }]);

        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages(prev => [...prev, {
                role: 'bot',
                content: 'Sorry, I encountered an error. Please check your API key or try again later.',
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Quick action buttons
    const quickActions = [
        { label: 'User Stats', action: () => setInputMessage('Show me user statistics') },
        { label: 'Add User', action: () => setInputMessage('How do I add a new user?') },
        { label: 'AI Status', action: () => setInputMessage('What is the current AI model status?') },
        { label: 'Help', action: () => setInputMessage('What can you help me with?') }
    ];

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group"
                >
                    <MessageSquare className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
                    <div className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Ask AI Assistant
                    </div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold">PrepAI Assistant</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-50 p-3 flex gap-2 overflow-x-auto">
                        {quickActions.map((action, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    action.action();
                                    setTimeout(() => sendMessage(), 100);
                                }}
                                className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors whitespace-nowrap flex items-center gap-1"
                            >
                                <Sparkles className="w-3 h-3" />
                                {action.label}
                            </button>
                        ))}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((message, idx) => (
                            <div
                                key={idx}
                                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                                    }`}>
                                    {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>
                                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${message.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                    }`}>
                                    <div className="whitespace-pre-wrap">{message.content}</div>
                                    <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-400'
                                        }`}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                                    <Loader className="w-4 h-4 animate-spin text-blue-600" />
                                    <span className="text-sm text-gray-500">Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="flex gap-2">
                            <textarea
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything..."
                                className="flex-1 px-4 py-2 bg-gray-100 border-0 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm max-h-20"
                                rows={1}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">
                            Powered by Google Gemini AI
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminChatbot;
