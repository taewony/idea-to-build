'use client';

import Link from 'next/link';
import ChallengeCard from '@/components/ui/ChallengeCard';
import GoalCard from '@/components/ui/GoalCard';
import WallPost from '@/components/ui/WallPost';
import { useGoalCrackerStore } from '@/lib/store';

export default function Home() {
  const { challenges, goals, aiMessages, getGoalProgress, getChallengeById } = useGoalCrackerStore();
  
  // Get top 3 popular challenges (by participant count)
  const popularChallenges = challenges
    .filter(c => !c.isUpcoming)
    .sort((a, b) => b.participantCount - a.participantCount)
    .slice(0, 3);
  
  // Get latest 5 AI messages
  const latestMessages = aiMessages.slice(0, 5);
  
  // Simulate logged in state - in real app this would come from auth
  const isLoggedIn = true;

  return (
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[calc(100vh-4rem)] flex items-center justify-center text-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/home/1920/1080')" }}></div>
          <div className="absolute inset-0 bg-primary/50"></div>
          <div className="relative z-10 p-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter drop-shadow-lg">목표를 깨부수는 즐거움</h1>
            <p className="mt-4 text-xl md:text-2xl font-medium max-w-2xl mx-auto drop-shadow-md">GoalCracker와 함께라면, 어떤 목표든 달성할 수 있습니다. AI의 도움으로 당신의 잠재력을 폭발시키세요.</p>
            <Link href="/challenges" className="mt-8 inline-block bg-accent text-white text-lg font-bold py-3 px-8 rounded-lg hover:bg-accent/90 transition-all duration-300 transform hover:scale-110 shadow-xl">
              도전 시작하기
            </Link>
          </div>
        </div>

        {/* Popular Challenges Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">인기 도전 과제</h2>
              <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">가장 많은 사람들이 참여하고 있는 도전들을 확인해보세요</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/challenges" className="inline-block bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                모든 도전 보기
              </Link>
            </div>
          </div>
        </section>

        {/* My Goals Preview (if logged in) */}
        {isLoggedIn && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-background">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">나의 목표</h2>
                <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">현재 진행 중인 목표들을 확인하고 관리하세요</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.slice(0, 3).map(goal => (
                  <GoalCard key={goal.id} goal={goal} progress={getGoalProgress(goal.id)} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/goals" className="inline-block bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors">
                  모든 목표 보기
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Latest AI Messages */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">최신 AI 잔소리</h2>
              <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">AI의 따끔한 충고와 따뜻한 격려를 확인해보세요</p>
            </div>
            <div className="space-y-8">
              {latestMessages.map(message => {
                const associatedChallenge = getChallengeById(message.goalId);
                return <WallPost key={message.id} message={message} challenge={associatedChallenge} />;
              })}
            </div>
            <div className="text-center mt-8">
              <Link href="/wall" className="inline-block bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                AI 담벼락 보기
              </Link>
            </div>
          </div>
        </section>

        {/* Login/Signup Section (if not logged in) */}
        {!isLoggedIn && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4">지금 시작하세요!</h2>
              <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-8">GoalCracker와 함께 목표를 달성하고 성장하세요</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors">
                  회원가입
                </button>
                <button className="bg-transparent border-2 border-primary text-primary font-bold py-3 px-8 rounded-lg hover:bg-primary hover:text-white transition-colors">
                  로그인
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
  );
}