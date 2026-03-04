// Mock Data for the entire application

export const mockStats = {
    totalUsers: 12453,
    activeInterviews: 892,
    questionsGenerated: 45632,
    successRate: 78.5,
    weeklyGrowth: 12.3,
    avgSessionTime: 24.5
};

export const mockUsers = [
    { id: 1, name: "Sarah Chen", email: "sarah@email.com", role: "user", status: "active", interviews: 12, lastActive: "2 mins ago", plan: "Pro" },
    { id: 2, name: "Mike Ross", email: "mike@email.com", role: "user", status: "active", interviews: 8, lastActive: "1 hour ago", plan: "Free" },
    { id: 3, name: "Emma Watson", email: "emma@email.com", role: "mentor", status: "active", interviews: 45, lastActive: "5 mins ago", plan: "Enterprise" },
    { id: 4, name: "John Doe", email: "john@email.com", role: "user", status: "suspended", interviews: 3, lastActive: "3 days ago", plan: "Free" },
    { id: 5, name: "Alice Johnson", email: "alice@email.com", role: "admin", status: "active", interviews: 0, lastActive: "Just now", plan: "Enterprise" },
    { id: 6, name: "Bob Smith", email: "bob@email.com", role: "user", status: "active", interviews: 15, lastActive: "10 mins ago", plan: "Pro" },
    { id: 7, name: "Carol White", email: "carol@email.com", role: "mentor", status: "active", interviews: 32, lastActive: "1 day ago", plan: "Enterprise" },
    { id: 8, name: "David Brown", email: "david@email.com", role: "user", status: "suspended", interviews: 5, lastActive: "5 days ago", plan: "Free" },
];

export const mockQuestions = [
    { id: 1, category: "System Design", difficulty: "Hard", question: "Design a distributed cache like Redis", usage: 1234, avgScore: 7.2, status: "active" },
    { id: 2, category: "Algorithms", difficulty: "Medium", question: "Explain QuickSort algorithm with complexity analysis", usage: 892, avgScore: 8.1, status: "active" },
    { id: 3, category: "Behavioral", difficulty: "Easy", question: "Tell me about yourself and your background", usage: 2341, avgScore: 6.8, status: "review" },
    { id: 4, category: "React", difficulty: "Medium", question: "Explain useEffect hook and its dependencies", usage: 1567, avgScore: 7.9, status: "active" },
    { id: 5, category: "System Design", difficulty: "Medium", question: "Design a URL shortener service", usage: 2156, avgScore: 8.3, status: "active" },
    { id: 6, category: "JavaScript", difficulty: "Easy", question: "Explain closures in JavaScript", usage: 3421, avgScore: 7.5, status: "active" },
    { id: 7, category: "Algorithms", difficulty: "Hard", question: "Implement LRU Cache", usage: 567, avgScore: 6.9, status: "review" },
    { id: 8, category: "Behavioral", difficulty: "Medium", question: "Describe a challenging project you worked on", usage: 1890, avgScore: 7.1, status: "active" },
];

export const mockAiMetrics = {
    responseAccuracy: 94.5,
    avgResponseTime: 1.2,
    userSatisfaction: 4.7,
    dailyQueries: 15234,
    modelVersion: "GPT-4-Turbo",
    lastUpdated: "2 hours ago"
};

// Chart Data
export const userGrowthData = [
    { name: 'Jan', users: 4000 },
    { name: 'Feb', users: 5500 },
    { name: 'Mar', users: 7200 },
    { name: 'Apr', users: 8900 },
    { name: 'May', users: 10500 },
    { name: 'Jun', users: 12453 },
];

export const interviewCategoriesData = [
    { name: 'System Design', value: 35, color: '#3B82F6' },
    { name: 'Algorithms', value: 25, color: '#8B5CF6' },
    { name: 'Behavioral', value: 20, color: '#10B981' },
    { name: 'React', value: 12, color: '#F59E0B' },
    { name: 'JavaScript', value: 8, color: '#EF4444' },
];

export const aiPerformanceData = [
    { time: '00:00', accuracy: 92, latency: 1.4 },
    { time: '04:00', accuracy: 93, latency: 1.3 },
    { time: '08:00', accuracy: 94, latency: 1.2 },
    { time: '12:00', accuracy: 94.5, latency: 1.1 },
    { time: '16:00', accuracy: 95, latency: 1.2 },
    { time: '20:00', accuracy: 94.5, latency: 1.2 },
    { time: '23:59', accuracy: 94, latency: 1.3 },
];