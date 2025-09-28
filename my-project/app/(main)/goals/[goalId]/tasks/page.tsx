'use client';

import { useState, useMemo } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Plus, Trash2, CheckCircle, Circle, ArrowLeft } from 'lucide-react';
import * as store from '@/lib/store';

export default function TasksPage() {
  const params = useParams();
  const goalId = Number(params.goalId);

  const [goal, setGoal] = useState(store.getGoal(goalId));
  const [newTaskContent, setNewTaskContent] = useState('');
  const [filter, setFilter] = useState('all');

  const forceUpdate = () => setGoal({ ...store.getGoal(goalId)! });

  if (!goal) {
    return notFound();
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskContent.trim()) {
      store.addTask(goalId, newTaskContent.trim());
      setNewTaskContent('');
      forceUpdate();
    }
  };

  const handleToggleTask = (taskId: number) => {
    store.toggleTask(goalId, taskId);
    forceUpdate();
  };

  const handleDeleteTask = (taskId: number) => {
    store.deleteTask(goalId, taskId);
    forceUpdate();
  };

  const filteredTasks = useMemo(() => {
    if (!goal.tasks) return [];
    switch (filter) {
      case 'active':
        return goal.tasks.filter(t => !t.isCompleted);
      case 'completed':
        return goal.tasks.filter(t => t.isCompleted);
      default:
        return goal.tasks;
    }
  }, [goal.tasks, filter]);

  return (
    <div className="container mx-auto p-4">
      <Link href="/goals" className="flex items-center text-indigo-600 hover:underline mb-4">
        <ArrowLeft className="mr-2" />
        목표 목록으로 돌아가기
      </Link>
      
      <h1 className="text-3xl font-bold mb-2">{goal.title}</h1>
      <p className="text-gray-600 mb-6">할 일 관리</p>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-center">
          <input
            type="text"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            placeholder="새로운 할 일을 입력하세요..."
            className="flex-grow p-2 border rounded-l-md"
          />
          <button type="submit" className="bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700">
            <Plus />
          </button>
        </div>
      </form>

      {/* Filter Buttons */}
      <div className="mb-4">
        <button onClick={() => setFilter('all')} className={`mr-2 p-2 rounded ${filter === 'all' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}>전체</button>
        <button onClick={() => setFilter('active')} className={`mr-2 p-2 rounded ${filter === 'active' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}>진행 중</button>
        <button onClick={() => setFilter('completed')} className={`p-2 rounded ${filter === 'completed' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}>완료</button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div key={task.id} className={`p-4 rounded-lg shadow-md flex items-center justify-between ${task.isCompleted ? 'bg-green-100' : 'bg-white'}`}>
            <div className="flex items-center">
              <button onClick={() => handleToggleTask(task.id)} className="mr-4">
                {task.isCompleted ? <CheckCircle className="text-green-500" /> : <Circle className="text-gray-400" />}
              </button>
              <span className={task.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}>
                {task.content}
              </span>
            </div>
            <button onClick={() => handleDeleteTask(task.id)} className="text-red-500 hover:text-red-700">
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
