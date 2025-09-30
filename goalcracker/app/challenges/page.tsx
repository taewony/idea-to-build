'use client';

import ChallengeCard from '@/components/ui/ChallengeCard';
import { useGoalCrackerStore } from '@/lib/store';

export default function ChallengesPage() {
  const { challenges } = useGoalCrackerStore();
  
  const activeChallenges = challenges.filter(c => !c.isUpcoming);
  const upcomingChallenges = challenges.filter(c => c.isUpcoming);

  return (
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">공식 도전 과제</h1>
            <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">다른 사람들과 함께 목표를 달성하고 동기를 유지하세요.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChallenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark">예정된 도전 과제</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>
        </div>
      </main>
  );
}