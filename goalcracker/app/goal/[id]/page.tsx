'use client';

import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { useGoalCrackerStore } from '@/lib/store';

export default function GoalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getChallengeById, addGoal } = useGoalCrackerStore();
  
  const challenge = getChallengeById(id);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background-light/90 dark:bg-background-dark/90">
        <Header />
        <div className="text-center py-20">
          <p className="text-text-light dark:text-text-dark">목표를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const handleAddToMyGoals = () => {
    // Add challenge as a personal goal
    addGoal({
      challengeId: challenge.id,
      title: challenge.title,
      description: challenge.description,
      isPersonal: false,
      participantCount: challenge.participantCount,
      interestCount: challenge.interestCount,
    });
    
    alert(`'${challenge.title}' 목표를 시작합니다! 이제 당신의 목표입니다.`);
    router.push('/goals');
  };

  return (
    <div className="min-h-screen bg-background-light/90 dark:bg-background-dark/90">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood-lg overflow-hidden">
          <div className="relative">
            <img className="w-full h-64 object-cover" src={challenge.image} alt={challenge.title} />
            <div className="absolute inset-0 bg-black/40"></div>
            <button 
              onClick={() => router.back()} 
              className="absolute top-4 left-4 bg-white/20 text-white rounded-full p-2 hover:bg-white/40 transition-colors z-10"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="absolute bottom-6 left-6 text-white z-10">
              <span className="bg-accent/80 text-xs font-bold px-2 py-1 rounded">{challenge.category}</span>
              <h1 className="text-4xl font-bold mt-2">{challenge.title}</h1>
              <p className="text-lg">{challenge.subtitle}</p>
            </div>
          </div>
          <div className="p-8">
            <p className="text-text-light dark:text-text-dark text-base leading-relaxed mb-8">{challenge.description}</p>
            
            {/* Challenge Stats */}
            <div className="flex items-center gap-6 text-text-light/80 dark:text-text-dark/80 mb-8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">groups</span>
                <span>{challenge.participantCount.toLocaleString()}명 참여</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">favorite</span>
                <span>{challenge.interestCount.toLocaleString()}명 관심</span>
              </div>
            </div>
            
            {challenge.isUpcoming ? (
              <button 
                className="w-full bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-300 text-xl font-bold py-4 px-6 rounded-lg cursor-not-allowed" 
                disabled
              >
                곧 시작 예정
              </button>
            ) : (
              <button 
                onClick={handleAddToMyGoals}
                className="w-full bg-primary text-white text-xl font-bold py-4 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">bolt</span>
                Cracking! (내 목표로 삼기)
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}