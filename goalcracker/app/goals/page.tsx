'use client';

import GoalCard from '@/components/ui/GoalCard';
import { useGoalCrackerStore } from '@/lib/store';

export default function MyGoalsPage() {
  const goals = useGoalCrackerStore(state => state.goals);
  const getGoalProgress = useGoalCrackerStore(state => state.getGoalProgress);

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">나의 목표</h1>
                <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">현재 진행 중인 목표를 확인하고 관리하세요.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map(goal => (
                    <GoalCard key={goal.id} goal={goal} progress={getGoalProgress(goal.id)} />
                ))}
                <div className="flex items-center justify-center bg-transparent border-4 border-dashed border-card-light dark:border-card-dark rounded-xl hover:bg-card-light/40 dark:hover:bg-card-dark/40 transition-colors cursor-pointer min-h-[280px]">
                    <div className="text-center p-6">
                        <span className="material-symbols-outlined text-5xl text-accent">add_circle</span>
                        <p className="mt-2 font-bold text-text-light dark:text-text-dark">새 목표 추가하기</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
