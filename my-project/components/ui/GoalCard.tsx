'use client';

import Link from 'next/link';
import { UserGoal } from '@/lib/types';

interface GoalCardProps {
  goal: UserGoal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => (
  <div className="group flex flex-col bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood hover:shadow-wood-lg transition-shadow duration-300 overflow-hidden h-full">
    <div className="p-6 flex-grow flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-1 pr-4">{goal.title}</h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${goal.isPersonal ? 'bg-blue-200 text-blue-800' : 'bg-purple-200 text-purple-800'}`}>
          {goal.isPersonal ? '개인' : '공식'}
        </span>
      </div>
      <p className="text-sm text-text-light/80 dark:text-text-dark/80 flex-grow mb-4">{goal.description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-text-light/90 dark:text-text-dark/90">진행률</span>
          <span className="text-sm font-bold text-accent">{goal.progress ?? 0}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div className="bg-accent h-2.5 rounded-full" style={{ width: `${goal.progress ?? 0}%` }}></div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-text-light/80 dark:text-text-dark/80 mb-6">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-base">groups</span>
          <span>{goal.participantCount.toLocaleString()}명 참여</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-base">favorite</span>
          <span>{goal.interestCount.toLocaleString()}명 관심</span>
        </div>
      </div>

      <div className="mt-auto">
        <Link href={`/goals/${goal.id}/tasks`} className="block text-center w-full bg-primary text-white font-bold py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
          할 일 관리
        </Link>
      </div>
    </div>
  </div>
);

export default GoalCard;
