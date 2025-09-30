import GoalCard from '@/components/ui/GoalCard';
import { getGoals } from '@/lib/store';

export default function MyGoalsPage() {
  const goals = getGoals();

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">나의 목표</h1>
        {/* 'Add new goal' card can be a special item in the grid */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
         {/* Placeholder for adding a new goal */}
        <div className="group flex flex-col items-center justify-center bg-card-light/50 dark:bg-card-dark/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-accent dark:hover:border-accent transition-colors duration-300 min-h-[280px] cursor-pointer">
            <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 group-hover:text-accent transition-colors duration-300">add_circle</span>
            <p className="mt-2 text-lg font-bold text-gray-500 dark:text-gray-400 group-hover:text-accent transition-colors duration-300">새 목표 추가</p>
        </div>
      </div>
    </div>
  );
}
