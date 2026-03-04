import React from 'react';
import {
    LayoutDashboard,
    Users,
    FileText,
    BarChart3,
    Settings,
    Brain,
    Zap,
    LogOut,
    X
} from 'lucide-react';

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

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, onLogout }) => {
    const menuItems = [
        { icon: <LayoutDashboard />, label: "Dashboard", id: "dashboard" },
        { icon: <Users />, label: "Users", id: "users", badge: "New" },
        { icon: <FileText />, label: "Questions DB", id: "questions" },
        { icon: <Zap />, label: "AI Performance", id: "ai-performance" },
        { icon: <BarChart3 />, label: "Analytics", id: "analytics" },
        { icon: <Settings />, label: "Settings", id: "settings" },
    ];

    return (
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
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        id={item.id}
                        active={activeTab}
                        setActive={setActiveTab}
                        collapsed={!sidebarOpen}
                        badge={item.badge}
                    />
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={onLogout}
                    className={`flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full ${!sidebarOpen && 'justify-center'}`}
                >
                    <LogOut className="w-5 h-5" />
                    {sidebarOpen && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;