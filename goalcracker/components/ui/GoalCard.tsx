'use client';

import Link from 'next/link';
import { UserGoal } from '@/lib/types';

interface GoalCardProps {
  goal: UserGoal;
  progress: number;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, progress }) => (
  <Link href={`/goals/${goal.id}/tasks`} className="group flex flex-col bg-card-light dark:bg-card-dark rounded-xl shadow-wood hover:shadow-wood-lg transition-all duration-300 hover:-translate-y-1 p-6">
    <div className="flex justify-between items-start">
      <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">{goal.title}</h3>
      <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${goal.isPersonal ? 'bg-primary' : 'bg-accent'}`}>
        {goal.isPersonal ? '개인' : '공식'}
      </span>
    </div>
    <p className="text-sm text-text-light/80 dark:text-text-dark/80 mb-4 h-10">{goal.description}</p>
    <div className="flex items-center gap-4 text-xs text-text-light/80 dark:text-text-dark/80 mb-4">
      <div className="flex items-center gap-1">
        <span className="material-symbols-outlined text-sm">groups</span>
        <span>{goal.participantCount.toLocaleString()}명</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="material-symbols-outlined text-sm">favorite</span>
        <span>{goal.interestCount.toLocaleString()}명</span>
      </div>
    </div>
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-text-light dark:text-text-dark">진행률</span>
        <span className="text-sm font-medium text-text-light dark:text-text-dark">{progress}%</span>
      </div>
      <div className="w-full bg-background-light dark:bg-background-dark rounded-full h-2.5">
        <div className="bg-accent h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  </Link>
);

export default GoalCard;