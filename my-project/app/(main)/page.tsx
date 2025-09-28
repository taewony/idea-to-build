import Link from 'next/link';
import { ArrowRight, Star, Users, Target } from 'lucide-react';

// --- In-Memory DB ---
const user = {
  name: '열정적인 개발자',
};

const myGoals = [
  { id: 1, title: 'Next.js 앱 프로토타입 완성', progress: 75, dDay: 3 },
  { id: 2, title: 'Tailwind CSS 마스터하기', progress: 50, dDay: 15 },
  { id: 3, title: '운동 꾸준히 하기', progress: 90, dDay: 1 },
];

const popularChallenges = [
  { id: 1, title: '오픈소스 경진대회 참여', participants: 128, dDay: 10 },
  { id: 2, title: 'AI 스타트업 해커톤', participants: 76, dDay: 25 },
  { id: 3, title: 'UX/UI 디자인 공모전', participants: 212, dDay: 40 },
];
// --- End In-Memory DB ---

// --- Reusable Components ---
const GoalCard = ({ goal }: { goal: { id: number; title: string; progress: number; dDay: number } }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start">
      <h3 className="font-bold text-gray-800">{goal.title}</h3>
      <span className="text-sm font-bold px-2.5 py-1 rounded-md bg-red-100 text-red-600">D-{goal.dDay}</span>
    </div>
    <div className="mt-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600">진행률</span>
        <span className="text-sm font-semibold text-indigo-600">{goal.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
      </div>
    </div>
    <Link href={`/tasks/${goal.id}`} className="text-sm font-bold text-indigo-600 hover:underline mt-4 inline-block">
      할 일 관리 &rarr;
    </Link>
  </div>
);

const ChallengeCard = ({ challenge }: { challenge: { id: number; title: string; participants: number; dDay: number } }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start">
      <h3 className="font-bold text-gray-800">{challenge.title}</h3>
      <span className="text-sm font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-600">D-{challenge.dDay}</span>
    </div>
    <div className="flex justify-between items-center mt-4 border-t border-gray-200 pt-3">
      <div className="flex items-center space-x-2 text-gray-600">
        <Users className="h-4 w-4" />
        <span className="font-semibold">{challenge.participants.toLocaleString()}명 참여중</span>
      </div>
      <button className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-yellow-100 transition-colors">
        <Star className="h-4 w-4 text-gray-400" />
        <span className="text-sm font-semibold">참여하기</span>
      </button>
    </div>
  </div>
);

// --- Main Page Component ---
export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#D4BFA9] bg-opacity-50" style={{
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            <span className="text-indigo-600">'{user.name}'</span>님,
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            오늘도 목표를 향해 달릴 준비 되셨나요? AI가 당신의 성장을 돕습니다.
          </p>
        </header>

        <main className="space-y-12">
          {/* My Goals Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center"><Target className="mr-2"/> 내 목표</h2>
              <Link href="/goals" className="text-indigo-600 font-bold hover:underline flex items-center">
                전체 보기 <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myGoals.map(goal => <GoalCard key={goal.id} goal={goal} />)}
            </div>
          </section>

          {/* Popular Challenges Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">🔥 인기 도전과제</h2>
              <Link href="/challenges" className="text-indigo-600 font-bold hover:underline flex items-center">
                전체 보기 <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {popularChallenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} />)}
            </div>
          </section>
        </main>

      </div>
    </div>
  );
}