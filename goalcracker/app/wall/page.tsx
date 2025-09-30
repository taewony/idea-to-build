'use client';

import WallPost from '@/components/ui/WallPost';
import { useGoalCrackerStore } from '@/lib/store';

export default function WallPage() {
  const { aiMessages, getChallengeById } = useGoalCrackerStore();

  return (
    <main className="flex-grow py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">AI 잔소리 담벼락</h1>
          <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">AI의 따끔한 충고와 따뜻한 격려를 확인해보세요.</p>
        </div>
        {aiMessages.map(message => {
          const associatedChallenge = getChallengeById(message.goalId);
          return <WallPost key={message.id} message={message} challenge={associatedChallenge} />
        })}
      </div>
    </main>
  );
}
