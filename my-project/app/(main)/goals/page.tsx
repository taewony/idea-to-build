'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import * as store from '@/lib/store';

export default function GoalsPage() {
  const [goals, setGoals] = useState(store.getGoals());
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalType, setNewGoalType] = useState<'short' | 'long'>('short');
  const [filter, setFilter] = useState('all');

  const forceUpdate = () => setGoals([...store.getGoals()]);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalTitle.trim()) {
      store.addGoal(newGoalTitle.trim(), newGoalType);
      setNewGoalTitle('');
      forceUpdate();
    }
  };

  const handleToggleGoal = (id: number) => {
    store.toggleGoal(id);
    forceUpdate();
  };

  const handleDeleteGoal = (id: number) => {
    store.deleteGoal(id);
    forceUpdate();
  };

  const filteredGoals = useMemo(() => {
    switch (filter) {
      case 'short':
        return goals.filter(g => g.type === 'short');
      case 'long':
        return goals.filter(g => g.type === 'long');
      case 'achieved':
        return goals.filter(g => g.is_achieved);
      default:
        return goals;
    }
  }, [goals, filter]);

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">나의 목표</h1>

        {/* Add Goal Form */}
        <form onSubmit={handleAddGoal} className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex items-center">
            <input
              type="text"
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              placeholder="새로운 목표를 입력하세요..."
              className="flex-grow p-2 border rounded-l-md"
            />
            <select value={newGoalType} onChange={(e) => setNewGoalType(e.target.value as any)} className="p-2 border-t border-b">
              <option value="short">단기</option>
              <option value="long">장기</option>
            </select>
            <button type="submit" className="bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700">
              <Plus />
            </button>
          </div>
        </form>

        {/* Filter Buttons */}
        <div className="mb-4">
          <button onClick={() => setFilter('all')} className={`mr-2 p-2 rounded ${filter === 'all' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}>전체</button>
          <button onClick={() => setFilter('short')} className={`mr-2 p-2 rounded ${filter === 'short' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}>단기</button>
          <button onClick={() => setFilter('long')} className={`mr-2 p-2 rounded ${filter === 'long' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}>장기</button>
          <button onClick={() => setFilter('achieved')} className={`p-2 rounded ${filter === 'achieved' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}>달성</button>
        </div>

        {/* Goal List */}
        <div className="space-y-4">
          {filteredGoals.map(goal => (
            <div key={goal.id} className={`p-4 rounded-lg shadow-md flex items-center justify-between ${goal.is_achieved ? 'bg-green-100' : 'bg-white'}`}>
              <div className="flex items-center">
                <button onClick={() => handleToggleGoal(goal.id)} className="mr-4">
                  {goal.is_achieved ? <CheckCircle className="text-green-500" /> : <Circle className="text-gray-400" />}
                </button>
                <Link href={`/goals/${goal.id}/tasks`} className={`font-bold ${goal.is_achieved ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {goal.title}
                </Link>
                <span className={`ml-4 text-xs px-2 py-1 rounded-full ${goal.type === 'short' ? 'bg-blue-200 text-blue-800' : 'bg-purple-200 text-purple-800'}`}>
                  {goal.type === 'short' ? '단기' : '장기'}
                </span>
              </div>
              <button onClick={() => handleDeleteGoal(goal.id)} className="text-red-500 hover:text-red-700">
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      </div>
  );
}