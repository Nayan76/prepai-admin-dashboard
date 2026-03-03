import AdminChatbot from './AdminChatbot';
import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Users,
    FileText,
    MessageSquare,
    BarChart3,
    Settings,
    Shield,
    Brain,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    Clock,
    Search,
    Filter,
    MoreVertical,
    LogOut,
    X,
    Zap,
    Target,
    Award,
    Activity,
    Plus,
    Upload,
    Download,
    ChevronLeft,
    ChevronRight,
    UserPlus,
    Trash2,
    Edit,
    Eye
} from 'lucide-react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    AreaChart,
    Area
} from 'recharts';

// Mock Data
const mockStats = {
    totalUsers: 12453,
    activeInterviews: 892,
    questionsGenerated: 45632,
    successRate: 78.5,
    weeklyGrowth: 12.3,
    avgSessionTime: 24.5
};

const mockUsers = [
    { id: 1, name: "Sarah Chen", email: "sarah@email.com", role: "user", status: "active", interviews: 12, lastActive: "2 mins ago", plan: "Pro" },
    { id: 2, name: "Mike Ross", email: "mike@email.com", role: "user", status: "active", interviews: 8, lastActive: "1 hour ago", plan: "Free" },
    { id: 3, name: "Emma Watson", email: "emma@email.com", role: "mentor", status: "active", interviews: 45, lastActive: "5 mins ago", plan: "Enterprise" },
    { id: 4, name: "John Doe", email: "john@email.com", role: "user", status: "suspended", interviews: 3, lastActive: "3 days ago", plan: "Free" },
    { id: 5, name: "Alice Johnson", email: "alice@email.com", role: "admin", status: "active", interviews: 0, lastActive: "Just now", plan: "Enterprise" },
    { id: 6, name: "Bob Smith", email: "bob@email.com", role: "user", status: "active", interviews: 15, lastActive: "10 mins ago", plan: "Pro" },
    { id: 7, name: "Carol White", email: "carol@email.com", role: "mentor", status: "active", interviews: 32, lastActive: "1 day ago", plan: "Enterprise" },
    { id: 8, name: "David Brown", email: "david@email.com", role: "user", status: "suspended", interviews: 5, lastActive: "5 days ago", plan: "Free" },
];

const mockQuestions = [
    { id: 1, category: "System Design", difficulty: "Hard", question: "Design a distributed cache like Redis", usage: 1234, avgScore: 7.2, status: "active" },
    { id: 2, category: "Algorithms", difficulty: "Medium", question: "Explain QuickSort algorithm with complexity analysis", usage: 892, avgScore: 8.1, status: "active" },
    { id: 3, category: "Behavioral", difficulty: "Easy", question: "Tell me about yourself and your background", usage: 2341, avgScore: 6.8, status: "review" },
    { id: 4, category: "React", difficulty: "Medium", question: "Explain useEffect hook and its dependencies", usage: 1567, avgScore: 7.9, status: "active" },
    { id: 5, category: "System Design", difficulty: "Medium", question: "Design a URL shortener service", usage: 2156, avgScore: 8.3, status: "active" },
    { id: 6, category: "JavaScript", difficulty: "Easy", question: "Explain closures in JavaScript", usage: 3421, avgScore: 7.5, status: "active" },
    { id: 7, category: "Algorithms", difficulty: "Hard", question: "Implement LRU Cache", usage: 567, avgScore: 6.9, status: "review" },
    { id: 8, category: "Behavioral", difficulty: "Medium", question: "Describe a challenging project you worked on", usage: 1890, avgScore: 7.1, status: "active" },
];

const mockAiMetrics = {
    responseAccuracy: 94.5,
    avgResponseTime: 1.2,
    userSatisfaction: 4.7,
    dailyQueries: 15234,
    modelVersion: "GPT-4-Turbo",
    lastUpdated: "2 hours ago"
};

// Chart Data
const userGrowthData = [
    { name: 'Jan', users: 4000 },
    { name: 'Feb', users: 5500 },
    { name: 'Mar', users: 7200 },
    { name: 'Apr', users: 8900 },
    { name: 'May', users: 10500 },
    { name: 'Jun', users: 12453 },
];

const interviewCategoriesData = [
    { name: 'System Design', value: 35, color: '#3B82F6' },
    { name: 'Algorithms', value: 25, color: '#8B5CF6' },
    { name: 'Behavioral', value: 20, color: '#10B981' },
    { name: 'React', value: 12, color: '#F59E0B' },
    { name: 'JavaScript', value: 8, color: '#EF4444' },
];

const aiPerformanceData = [
    { time: '00:00', accuracy: 92, latency: 1.4 },
    { time: '04:00', accuracy: 93, latency: 1.3 },
    { time: '08:00', accuracy: 94, latency: 1.2 },
    { time: '12:00', accuracy: 94.5, latency: 1.1 },
    { time: '16:00', accuracy: 95, latency: 1.2 },
    { time: '20:00', accuracy: 94.5, latency: 1.2 },
    { time: '23:59', accuracy: 94, latency: 1.3 },
];

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
        // In real app: window.location.href = '/login';
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardView onLogoutClick={handleLogout} />;
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
                return <DashboardView onLogoutClick={handleLogout} />;
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
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col fixed h-full z-20`}>
                <div className="p-6 flex items-center justify-between">
                    <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        {sidebarOpen && <span className="font-bold text-xl tracking-tight">PrepAI</span>}
                    </div>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-8">
                    <SidebarItem icon={<LayoutDashboard />} label="Dashboard" id="dashboard" active={activeTab} setActive={setActiveTab} collapsed={!sidebarOpen} />
                    <SidebarItem icon={<Users />} label="Users" id="users" active={activeTab} setActive={setActiveTab} collapsed={!sidebarOpen} badge="New" />
                    <SidebarItem icon={<FileText />} label="Questions DB" id="questions" active={activeTab} setActive={setActiveTab} collapsed={!sidebarOpen} />
                    <SidebarItem icon={<Zap />} label="AI Performance" id="ai-performance" active={activeTab} setActive={setActiveTab} collapsed={!sidebarOpen} />
                    <SidebarItem icon={<BarChart3 />} label="Analytics" id="analytics" active={activeTab} setActive={setActiveTab} collapsed={!sidebarOpen} />
                    <SidebarItem icon={<Settings />} label="Settings" id="settings" active={activeTab} setActive={setActiveTab} collapsed={!sidebarOpen} />
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full ${!sidebarOpen && 'justify-center'}`}
                    >
                        <LogOut className="w-5 h-5" />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Header */}
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

                {/* Content */}
                <div className="p-8">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

// Dashboard View with Working Quick Actions
const DashboardView = ({ onLogoutClick }) => {
    const [activeModal, setActiveModal] = useState(null);

    const quickActions = [
        { icon: <Shield />, label: "Moderate Content", color: "red", action: () => setActiveModal('moderate') },
        { icon: <Brain />, label: "Retrain AI Model", color: "purple", action: () => setActiveModal('retrain') },
        { icon: <Users />, label: "Add New Mentor", color: "blue", action: () => setActiveModal('mentor') },
        { icon: <FileText />, label: "Add Question", color: "green", action: () => setActiveModal('question') },
        { icon: <MessageSquare />, label: "Broadcast Message", color: "orange", action: () => setActiveModal('broadcast') },
    ];

    return (
        <div className="space-y-8">
            {/* Modals */}
            {activeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">
                                {activeModal === 'moderate' && "Content Moderation"}
                                {activeModal === 'retrain' && "Retrain AI Model"}
                                {activeModal === 'mentor' && "Add New Mentor"}
                                {activeModal === 'question' && "Add New Question"}
                                {activeModal === 'broadcast' && "Broadcast Message"}
                            </h3>
                            <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {activeModal === 'moderate' && (
                                <>
                                    <p className="text-gray-600">Review flagged content:</p>
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {['Inappropriate language in interview #1234', 'Spam question reported', 'Offensive user comment'].map((item, i) => (
                                            <div key={i} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                                                <span className="text-sm">{item}</span>
                                                <div className="flex gap-2">
                                                    <button className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Approve</button>
                                                    <button className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {activeModal === 'retrain' && (
                                <>
                                    <p className="text-gray-600 mb-4">Start AI model retraining process?</p>
                                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                        <p className="text-sm text-blue-800">Current Model: GPT-4-Turbo</p>
                                        <p className="text-sm text-blue-600">Last trained: 2 hours ago</p>
                                    </div>
                                    <button
                                        onClick={() => { alert('Retraining started! This may take 30-60 minutes.'); setActiveModal(null); }}
                                        className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                    >
                                        Start Retraining
                                    </button>
                                </>
                            )}

                            {activeModal === 'mentor' && (
                                <>
                                    <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg" />
                                    <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded-lg" />
                                    <select className="w-full px-4 py-2 border rounded-lg">
                                        <option>Select Expertise</option>
                                        <option>System Design</option>
                                        <option>Algorithms</option>
                                        <option>Behavioral</option>
                                        <option>Full Stack</option>
                                    </select>
                                    <button
                                        onClick={() => { alert('Mentor invitation sent!'); setActiveModal(null); }}
                                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Send Invitation
                                    </button>
                                </>
                            )}

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

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value="12,453" trend="+12.3%" trendUp={true} icon={<Users className="w-6 h-6 text-blue-600" />} color="blue" />
                <StatCard title="Active Interviews" value="892" trend="+5.2%" trendUp={true} icon={<Activity className="w-6 h-6 text-green-600" />} color="green" />
                <StatCard title="Questions Generated" value="45,632" trend="+8.1%" trendUp={true} icon={<FileText className="w-6 h-6 text-purple-600" />} color="purple" />
                <StatCard title="Success Rate" value="78.5%" trend="+2.4%" trendUp={true} icon={<Target className="w-6 h-6 text-orange-600" />} color="orange" />
            </div>

            {/* Charts & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Platform Overview</h3>
                        <select className="text-sm border border-gray-300 rounded-lg p-2">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
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
                            <button
                                key={idx}
                                onClick={action.action}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${action.color === 'blue' ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' :
                                    action.color === 'green' ? 'bg-green-50 text-green-700 hover:bg-green-100' :
                                        action.color === 'purple' ? 'bg-purple-50 text-purple-700 hover:bg-purple-100' :
                                            action.color === 'red' ? 'bg-red-50 text-red-700 hover:bg-red-100' :
                                                'bg-orange-50 text-orange-700 hover:bg-orange-100'
                                    }`}
                            >
                                {React.cloneElement(action.icon, { className: "w-5 h-5" })}
                                <span className="font-medium">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Interviews & System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Recent Interviews</h3>
                        <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1001, 1002, 1003, 1004].map((id) => (
                            <div key={id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
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

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">System Health</h3>
                    <div className="space-y-6">
                        <HealthBar label="API Response Time" value={92} color="green" />
                        <HealthBar label="AI Model Accuracy" value={94} color="blue" />
                        <HealthBar label="Database Load" value={67} color="yellow" />
                        <HealthBar label="Storage Capacity" value={45} color="green" />
                    </div>
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 font-medium">All systems operational</span>
                    </div>
                </div>
            </div>

            {/* ✅ PLACE CHATBOT HERE - Only shows on Dashboard */}
            <AdminChatbot />
        </div>
    );

};

// Users View with Working Pagination and Add User
const UsersView = () => {
    const [users, setUsers] = useState(mockUsers);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddUser, setShowAddUser] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    const usersPerPage = 5;

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const displayedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

    const handleAddUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newUser = {
            id: users.length + 1,
            name: formData.get('name'),
            email: formData.get('email'),
            role: formData.get('role'),
            status: 'active',
            interviews: 0,
            lastActive: 'Just now',
            plan: formData.get('plan')
        };
        setUsers([...users, newUser]);
        setShowAddUser(false);
        alert('User added successfully!');
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Name,Email,Role,Status,Plan,Interviews\n"
            + users.map(u => `${u.name},${u.email},${u.role},${u.status},${u.plan},${u.interviews}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "users_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            {/* Add User Modal */}
            {showAddUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">Add New User</h3>
                            <button onClick={() => setShowAddUser(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <input name="name" type="text" placeholder="Full Name" required className="w-full px-4 py-2 border rounded-lg" />
                            <input name="email" type="email" placeholder="Email Address" required className="w-full px-4 py-2 border rounded-lg" />
                            <select name="role" required className="w-full px-4 py-2 border rounded-lg">
                                <option value="">Select Role</option>
                                <option value="user">User</option>
                                <option value="mentor">Mentor</option>
                                <option value="admin">Admin</option>
                            </select>
                            <select name="plan" required className="w-full px-4 py-2 border rounded-lg">
                                <option value="">Select Plan</option>
                                <option value="Free">Free</option>
                                <option value="Pro">Pro</option>
                                <option value="Enterprise">Enterprise</option>
                            </select>
                            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Add User
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="relative">
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            />
                        </div>
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Roles</option>
                            <option value="user">User</option>
                            <option value="mentor">Mentor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowAddUser(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <UserPlus className="w-4 h-4" />
                            Add User
                        </button>
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Interviews</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Plan</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Last Active</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {displayedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                            user.role === 'mentor' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{user.interviews}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.plan === 'Enterprise' ? 'bg-orange-100 text-orange-700' :
                                            user.plan === 'Pro' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1 text-gray-400 hover:text-blue-600" title="View">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-green-600" title="Edit">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-red-600" title="Delete">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Showing {startIndex + 1}-{Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded-lg text-sm ${currentPage === page ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Questions View with Working Filters
const QuestionsView = () => {
    const [questions, setQuestions] = useState(mockQuestions);
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterDifficulty, setFilterDifficulty] = useState('all');

    const filteredQuestions = questions.filter(q => {
        const matchesCategory = filterCategory === 'all' || q.category === filterCategory;
        const matchesDifficulty = filterDifficulty === 'all' || q.difficulty === filterDifficulty;
        return matchesCategory && matchesDifficulty;
    });

    const categories = ['all', ...new Set(questions.map(q => q.category))];
    const difficulties = ['all', ...new Set(questions.map(q => q.difficulty))];

    const handleAddQuestion = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newQuestion = {
            id: questions.length + 1,
            question: formData.get('question'),
            category: formData.get('category'),
            difficulty: formData.get('difficulty'),
            usage: 0,
            avgScore: 0,
            status: 'active'
        };
        setQuestions([...questions, newQuestion]);
        setShowAddQuestion(false);
        alert('Question added successfully!');
    };

    const handleImportCSV = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                alert(`File "${file.name}" selected for import! (Processing would happen here)`);
            }
        };
        input.click();
    };

    return (
        <div className="space-y-6">
            {/* Add Question Modal */}
            {showAddQuestion && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">Add New Question</h3>
                            <button onClick={() => setShowAddQuestion(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAddQuestion} className="space-y-4">
                            <textarea
                                name="question"
                                placeholder="Enter question text..."
                                required
                                className="w-full px-4 py-2 border rounded-lg h-24 resize-none"
                            />
                            <select name="category" required className="w-full px-4 py-2 border rounded-lg">
                                <option value="">Select Category</option>
                                <option value="System Design">System Design</option>
                                <option value="Algorithms">Algorithms</option>
                                <option value="Behavioral">Behavioral</option>
                                <option value="React">React</option>
                                <option value="JavaScript">JavaScript</option>
                            </select>
                            <select name="difficulty" required className="w-full px-4 py-2 border rounded-lg">
                                <option value="">Select Difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setShowAddQuestion(false)} className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Add Question
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowAddQuestion(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Question
                    </button>
                    <button
                        onClick={handleImportCSV}
                        className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <Upload className="w-4 h-4" />
                        Import CSV
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === 'all' ? 'All Categories' : cat}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filterDifficulty}
                        onChange={(e) => setFilterDifficulty(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {difficulties.map(diff => (
                            <option key={diff} value={diff}>
                                {diff === 'all' ? 'All Difficulties' : diff}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuestions.map((q) => (
                    <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${q.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                                q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                }`}>
                                {q.difficulty}
                            </span>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{q.question}</h4>
                        <p className="text-sm text-gray-500 mb-4">{q.category}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Activity className="w-4 h-4" />
                                    {q.usage}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Award className="w-4 h-4" />
                                    {q.avgScore}/10
                                </span>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${q.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {q.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredQuestions.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No questions found matching your filters.</p>
                </div>
            )}
        </div>
    );
};

// AI Performance View with Working Model Switch
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

                    {/* Model Switch Modal */}
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
                                        <button
                                            key={model.name}
                                            onClick={() => handleSwitchModel(model.name)}
                                            className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${currentModel === model.name
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{model.name}</p>
                                                    <p className="text-sm text-gray-500">{model.description}</p>
                                                </div>
                                                {currentModel === model.name && (
                                                    <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs">Active</span>
                                                )}
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
                            <button
                                onClick={() => setShowModelSwitch(true)}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                            >
                                Switch Model
                            </button>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="font-medium text-gray-900 mb-1">Last Training</p>
                            <p className="text-sm text-gray-500 mb-3">2 hours ago</p>
                            <button
                                onClick={() => alert('Retraining started! This will take 30-60 minutes.')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100"
                            >
                                Retrain Now
                            </button>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="font-medium text-gray-900 mb-3">Temperature: {temperature}%</p>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={temperature}
                                onChange={(e) => setTemperature(e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
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

// Analytics View with Real Charts
const AnalyticsView = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">User Growth</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={userGrowthData}>
                                <defs>
                                    <linearGradient id="colorUsersAnalytics" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="users" stroke="#3B82F6" fillOpacity={1} fill="url(#colorUsersAnalytics)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Interview Categories</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={interviewCategoriesData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {interviewCategoriesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Top Performing Questions</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockQuestions.slice(0, 5)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="question" tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="usage" fill="#3B82F6" name="Usage Count" />
                            <Bar dataKey="avgScore" fill="#10B981" name="Avg Score" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

// Settings View with Working Buttons
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
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.maintenanceMode ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                                }`} />
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
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${settings.twoFactorAuth
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {settings.twoFactorAuth ? 'Enabled' : 'Enable'}
                        </button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-gray-200">
                        <div>
                            <p className="font-medium text-gray-900">API Keys</p>
                            <p className="text-sm text-gray-500">Manage API access tokens</p>
                        </div>
                        <button
                            onClick={() => alert('API Keys management modal would open here')}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                        >
                            Manage
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-700 mb-4">These actions are irreversible. Please proceed with caution.</p>
                <div className="flex gap-4">
                    <button
                        onClick={handleResetData}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                    >
                        Reset All Data
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper Components
const SidebarItem = ({ icon, label, id, active, setActive, collapsed, badge }) => (
    <button
        onClick={() => setActive(id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative mb-1 ${active === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
    >
        {React.cloneElement(icon, { className: "w-5 h-5 flex-shrink-0" })}
        {!collapsed && <span className="font-medium">{label}</span>}
        {!collapsed && badge && (
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{badge}</span>
        )}
        {collapsed && badge && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
    </button>
);

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

export default AdminDashboard;