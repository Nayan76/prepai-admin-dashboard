import React, { useState } from 'react';
import { Plus, Upload, FileText, Activity, Award, MoreVertical, X } from 'lucide-react';
import { mockQuestions } from '../../data/mockData';

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
                alert(`File "${file.name}" selected for import!`);
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
                            <textarea name="question" placeholder="Enter question text..." required className="w-full px-4 py-2 border rounded-lg h-24 resize-none" />
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
                    <button onClick={() => setShowAddQuestion(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Question
                    </button>
                    <button onClick={handleImportCSV} className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Import CSV
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                        {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
                    </select>
                    <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                        {difficulties.map(diff => <option key={diff} value={diff}>{diff === 'all' ? 'All Difficulties' : diff}</option>)}
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
                                <span className="flex items-center gap-1"><Activity className="w-4 h-4" />{q.usage}</span>
                                <span className="flex items-center gap-1"><Award className="w-4 h-4" />{q.avgScore}/10</span>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${q.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
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

export default QuestionsView;