import { MinusCircle, Award, Target } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

// --- In-Memory DB (Hierarchical) ---
const goals = [
  { id: 1, title: 'Next.js 앱 프로토타입 완성' },
  { id: 2, title: 'Tailwind CSS 마스터하기' },
  { id: 3, title: '운동 꾸준히 하기' },
];

const wallPosts = [
  {
    id: 1,
    goalId: 1,
    goalTitle: goals[0].title,
    character: 'critic',
    avatarBg: 'bg-gray-700',
    icon: MinusCircle,
    title: '또 딴짓했네. 목표 달성은 다음 생에 하려고?',
    content: '벌써 3시간째 유튜브만 보고 있잖아. 그 시간에 코딩 한 줄이라도 더 했으면 지금쯤 커밋 10개는 했겠다.',
    timestamp: '2시간 전',
    rotation: '-rotate-1',
    alignment: 'justify-start'
  },
  {
    id: 2,
    goalId: 3,
    goalTitle: goals[2].title,
    character: 'praiser',
    avatarBg: 'bg-yellow-500',
    icon: Award,
    title: '대단해! 오늘 목표 완벽하게 클리어했잖아!',
    content: '꾸준히 해내는 모습이 정말 멋져. 스스로에게 작은 선물이라도 해주는 거 어때? 이 기세로 내일도 화이팅!',
    timestamp: '1시간 전',
    rotation: 'rotate-1',
    alignment: 'justify-end'
  },
  {
    id: 3,
    goalId: 1,
    goalTitle: goals[0].title,
    character: 'critic',
    avatarBg: 'bg-gray-700',
    icon: MinusCircle,
    title: '그렇게 대충 할 거면 시작도 하지 마.',
    content: '방금 제출한 보고서 말이야. 오탈자 천지에 논리도 엉망이던데? 다시 검토하고 제대로 만들어 제출해.',
    timestamp: '30분 전',
    rotation: 'rotate-1',
    alignment: 'justify-start'
  },
  {
    id: 4,
    goalId: 2,
    goalTitle: goals[1].title,
    character: 'praiser',
    avatarBg: 'bg-yellow-500',
    icon: Award,
    title: '와, 아이디어 진짜 반짝이는데?',
    content: '회의 때 냈던 아이디어, 다들 감탄했어. 역시 넌 그냥 평범한 사람이 아니라니까. 그 창의력, 계속 보여줘!',
    timestamp: '10분 전',
    rotation: '-rotate-2',
    alignment: 'justify-end'
  }
];
// --- End In-Memory DB ---

// --- Reusable Components ---
const WallPostCard = ({ post }: { post: typeof wallPosts[0] }) => {
  const Icon = post.icon;
  const isPraiser = post.character === 'praiser';

  return (
    <div className={clsx('w-full flex', post.alignment)}>
      <div className={clsx('card flex items-start w-11/12 p-4 rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow transform', post.rotation)}>
        {/* Avatar */}
        <div className={clsx('flex-shrink-0', { 'order-last ml-4': isPraiser, 'mr-4': !isPraiser })}>
          <div className={clsx('w-16 h-16 rounded-full flex items-center justify-center ring-2', post.avatarBg, { 'ring-yellow-300': isPraiser, 'ring-gray-300': !isPraiser })}>
            <Icon className="h-10 w-10 text-white" />
          </div>
        </div>
        
        {/* Content */}
        <div className={clsx('flex-grow', { 'text-right': isPraiser, 'text-left': !isPraiser })}>
          {/* Goal Title Link */}
          <Link href={`/tasks/${post.goalId}`} className="group inline-flex items-center mb-2">
            <Target className="h-4 w-4 text-gray-400 group-hover:text-indigo-600" />
            <span className="ml-2 text-sm font-bold text-gray-500 group-hover:text-indigo-600 group-hover:underline">
              RE: {post.goalTitle}
            </span>
          </Link>
          
          <p className={clsx('text-lg font-bold', { 'text-blue-600': isPraiser, 'text-red-600': !isPraiser })}>
            {post.title}
          </p>
          <p className="text-gray-700 mt-2">{post.content}</p>
          <span className="text-xs text-gray-400 mt-3 block">{post.timestamp}</span>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component ---
export default function WallPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
        오늘의 AI 잔소리 담벼락
      </h1>
      <div className="space-y-8">
        {wallPosts.map(post => <WallPostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
