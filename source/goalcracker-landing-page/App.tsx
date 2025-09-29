
import React, { useState } from 'react';
import Header from './components/Header';
import ChallengeCard from './components/ChallengeCard';
import MyGoalItem from './components/MyGoalItem';
import AiMessageItem from './components/AiMessageItem';
import type { Challenge, Goal, AiMessage } from './types';

// --- Mock Data ---
const topChallengesData: Challenge[] = [
  {
    id: 1,
    title: '알고리즘 마스터',
    description: '매일 코딩 문제 풀며 문제 해결 능력 향상',
    participants: 1204,
    imageUrl: 'https://picsum.photos/seed/code/400/300'
  },
  {
    id: 2,
    title: '미라클 모닝 챌린지',
    description: '아침 6시 기상으로 생산성 극대화',
    participants: 982,
    imageUrl: 'https://picsum.photos/seed/morning/400/300'
  },
  {
    id: 3,
    title: '한 달에 책 4권 읽기',
    description: '다양한 분야의 책으로 지식의 지평 넓히기',
    participants: 850,
    imageUrl: 'https://picsum.photos/seed/books/400/300'
  }
];

const myGoalsData: Goal[] = [
  { id: 1, title: 'React 프로젝트 완성하기', type: 'personal' },
  { id: 2, title: '알고리즘 마스터', type: 'official' },
  { id: 3, title: '매일 30분 운동하기', type: 'official' },
  { id: 4, title: '졸업 논문 초안 작성', type: 'personal' },
];

const recentAiMessagesData: AiMessage[] = [
  { id: 1, message: '지금 안하면 졸업이 1년 늦춰질텐데... 괜찮겠어? 🤨', relatedGoal: '졸업 논문 초안 작성', author: '깐깐한 조교님' },
  { id: 2, message: '커밋 기록이 3일째 없네? 손가락이 심심하겠다!', relatedGoal: 'React 프로젝트 완성하기', author: '팩폭 개발자 선배' },
  { id: 3, message: '오늘의 LeetCode는 풀고 자야지? Easy 문제라도 하나 어때?', relatedGoal: '알고리즘 마스터', author: '실리콘밸리 엔지니어' },
  { id: 4, message: '몸이 근질근질하지 않아? 30분만 투자하면 기분 최고일걸!', relatedGoal: '매일 30분 운동하기', author: '열정 트레이너' },
  { id: 5, message: '음, 논문 주제부터 다시 생각해보는 건 어때? 더 흥미로운 걸로 말이야. ✨', relatedGoal: '졸업 논문 초안 작성', author: '다정한 지도교수' },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // In a real app, this would be part of the header or a separate component
  const AuthToggleButton = () => (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsLoggedIn(prev => !prev)}
        className="bg-accent text-white px-4 py-2 rounded-full shadow-lg hover:bg-accent/90 transition-transform hover:scale-105"
      >
        {isLoggedIn ? 'Log Out' : 'Log In'} (Dev)
      </button>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background-light/90 dark:bg-background-dark/90">
      <Header />
      <AuthToggleButton />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
          
          {/* Top 3 Challenges Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">
              <span role="img" aria-label="fire">🔥</span> 인기 공식 도전 Top 3
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topChallengesData.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </section>
          
          {/* Middle Section: My Goals or CTA */}
          <section>
            {isLoggedIn ? (
              <div>
                <h2 className="text-3xl font-bold text-center mb-8">내 목표</h2>
                <div className="bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood p-6 space-y-4">
                  {myGoalsData.map(goal => (
                    <MyGoalItem key={goal.id} goal={goal} />
                  ))}
                   <button className="w-full mt-4 bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                    내 목표 관리하기
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood-lg p-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-text-light dark:text-text-dark mb-6">
                  지금 당신의 목표를 Crack하세요!
                </h2>
                <div className="flex justify-center gap-4">
                  <button className="bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-accent/90 transition-transform hover:scale-105 shadow-md">
                    Sign In
                  </button>
                  <button className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-md">
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* AI Message Wall Section */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">최신 AI 메시지</h2>
            <div className="space-y-4">
              {recentAiMessagesData.map(msg => (
                <AiMessageItem key={msg.id} message={msg} />
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="bg-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-accent/90 transition-transform hover:scale-105 shadow-md">
                AI 메시지 담벼락 바로가기
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default App;
