import React, { useState } from 'react';
import { Search, Filter, UserPlus, Download, ChevronLeft, ChevronRight, Eye, Edit, Trash2, X } from 'lucide-react';
import { mockUsers } from '../../data/mockData';

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

export default UsersView;