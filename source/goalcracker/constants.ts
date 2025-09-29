import { Challenge, AIMessage, UserGoal, Task, CommunityPost, AISettings } from './types';

export const CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "고요한 마음 30일",
    subtitle: "매일 명상으로 스트레스 줄이기",
    description: "매일 10분간의 명상 세션을 통해 마음의 평화를 찾고 집중력을 높이세요. 이 도전은 꾸준한 명상 습관을 형성하여 내면의 안정과 정신적 명료함을 찾는 데 도움을 줄 것입니다.",
    image: "https://picsum.photos/seed/mindfulness/600/400",
    category: "마음챙김",
    isUpcoming: false,
    participantCount: 1250,
    interestCount: 5300,
  },
  {
    id: "2",
    title: "매일 30분 운동 챌린지",
    subtitle: "건강한 습관 만들기",
    description: "어떤 운동이든 매일 30분씩 꾸준히 하여 체력을 증진하고 활력을 되찾으세요. 조깅, 요가, 홈 트레이닝 등 원하는 활동으로 건강한 라이프스타일을 만들어보세요.",
    image: "https://picsum.photos/seed/exercise/600/400",
    category: "운동",
    isUpcoming: false,
    participantCount: 890,
    interestCount: 3200,
  },
  {
    id: "3",
    title: "한 달에 책 4권 읽기",
    subtitle: "지식의 지평을 넓히세요",
    description: "한 주에 한 권씩, 다양한 분야의 책을 읽으며 새로운 지식과 영감을 얻어보세요. 소설, 비문학, 자기계발 등 장르에 구애받지 않고 독서의 즐거움을 느껴보세요.",
    image: "https://picsum.photos/seed/reading/600/400",
    category: "독서",
    isUpcoming: false,
    participantCount: 2100,
    interestCount: 7800,
  },
  {
    id: "4",
    title: "알고리즘 마스터",
    subtitle: "매일 코딩 문제 풀기",
    description: "매일 최소 한 개의 알고리즘 문제를 풀며 코딩 실력과 문제 해결 능력을 향상시키세요. LeetCode, HackerRank 등 다양한 플랫폼을 활용하여 실력을 키워나갑니다.",
    image: "https://picsum.photos/seed/coding/600/400",
    category: "코딩",
    isUpcoming: false,
    participantCount: 3400,
    interestCount: 12000,
  },
  {
    id: "5",
    title: "미라클 모닝 챌린지",
    subtitle: "아침 6시 기상하기",
    description: "하루를 더 일찍 시작하여 나만의 시간을 확보하고 생산성을 극대화하세요. 아침 명상, 독서, 운동 등으로 하루를 활기차게 시작하는 습관을 만듭니다.",
    image: "https://picsum.photos/seed/morning/600/400",
    category: "새벽 기상",
    isUpcoming: false,
    participantCount: 760,
    interestCount: 4100,
  },
  {
    id: "6",
    title: "수분 충전! 하루 2L",
    subtitle: "매일 물 2리터 마시기",
    description: "충분한 수분 섭취로 건강한 신체와 맑은 피부를 유지하세요. 하루 동안 꾸준히 물을 마시는 습관을 들여 몸의 신진대사를 활발하게 만듭니다.",
    image: "https://picsum.photos/seed/water/600/400",
    category: "물 마시기",
    isUpcoming: false,
    participantCount: 550,
    interestCount: 2500,
  },
  {
    id: "7",
    title: "외국어 정복 프로젝트",
    subtitle: "매일 20분 외국어 공부",
    description: "새로운 언어를 배우며 다른 문화를 이해하고 소통의 폭을 넓혀보세요. 매일 꾸준한 학습으로 언어 능력을 향상시키고 새로운 기회를 만들어보세요.",
    image: "https://picsum.photos/seed/language/600/400",
    category: "언어 학습",
    isUpcoming: false,
    participantCount: 1800,
    interestCount: 6200,
  },
  {
    id: "8",
    title: "하루 세 가지 감사 일기",
    subtitle: "긍정적인 마음 갖기",
    description: "매일 잠들기 전, 하루 동안 감사했던 세 가지 일을 기록하며 긍정적인 태도를 길러요. 작은 것에도 감사하는 마음을 통해 삶의 만족도를 높일 수 있습니다.",
    image: "https://picsum.photos/seed/gratitude/600/400",
    category: "감사 일기",
    isUpcoming: false,
    participantCount: 980,
    interestCount: 4500,
  },
  {
    id: "9",
    title: "재정적 자유 얻기",
    subtitle: "현명한 저축과 투자",
    description: "매일 10분간의 명상 세션을 통해 마음의 평화를 찾고 집중력을 높이세요.",
    image: "https://picsum.photos/seed/finance/600/400",
    category: "재정 관리",
    isUpcoming: true,
    participantCount: 0,
    interestCount: 8900,
  },
  {
    id: "10",
    title: "건강한 식습관 형성",
    subtitle: "균형 잡힌 식단과 계획",
    description: "매일 10분간의 명상 세션을 통해 마음의 평화를 찾고 집중력을 높이세요.",
    image: "https://picsum.photos/seed/eating/600/400",
    category: "건강한 식습관",
    isUpcoming: true,
    participantCount: 0,
    interestCount: 6700,
  },
];


export const AI_MESSAGES: AIMessage[] = [
    {
        id: 'msg1',
        type: 'critic',
        title: '또 딴짓했네. 목표 달성은 다음 생에 하려고?',
        content: '벌써 3시간째 유튜브만 보고 있잖아. 그 시간에 코딩 한 줄이라도 더 했으면 지금쯤 커밋 10개는 했겠다. 정신 안 차리면 도태되는 건 순식간이야.',
        timestamp: '2시간 전',
        goalId: '4',
        rotation: -1,
    },
    {
        id: 'msg2',
        type: 'swearer',
        title: '야, 그걸 해내네? 독한 놈.',
        content: '꾸역꾸역 해내는 꼴이 가상하군. 스스로에게 고기라도 사줘라. 내일도 이 악물고 해봐! 너 같은 놈은 뭐든지 할 수 있겠다.',
        timestamp: '1시간 전',
        goalId: '2',
        rotation: 1,
    },
    {
        id: 'msg3',
        type: 'critic',
        title: '그렇게 대충 할 거면 시작도 하지 마.',
        content: '방금 제출한 보고서 말이야. 오탈자 천지에 논리도 엉망이던데? 다시 검토하고 제대로 만들어서 제출해. 프로는 결과로 말하는 거야.',
        timestamp: '30분 전',
        goalId: '3',
        rotation: 1,
    },
    {
        id: 'msg4',
        type: 'swearer',
        title: '네 머리에서 그런 생각이 나온다고?',
        content: '회의 때 냈던 아이디어, 다들 놀라더라. 가끔은 쓸만하네. 그 창의력, 계속 쥐어짜내 봐! 기대해주지.',
        timestamp: '10분 전',
        goalId: '8',
        rotation: -2,
    },
    {
        id: 'msg5',
        type: 'critic',
        title: '벌써 자려고? 경쟁자들은 아직도 달리고 있어.',
        content: '성공은 편안한 잠자리에서 오지 않아. 남들보다 딱 한 시간만 더 집중해봐. 그 한 시간이 내일의 너를 바꿀 테니까.',
        timestamp: '방금 전',
        goalId: '5',
        rotation: -2,
    }
];

export const MY_GOALS: UserGoal[] = [
  { id: 'mygoal1', challengeId: '2', title: '매일 30분 운동 챌린지', description: '건강한 습관 만들기', isPersonal: false, participantCount: 890, interestCount: 3200 },
  { id: 'mygoal2', title: 'React 프로젝트 완성하기', description: '포트폴리오에 추가할 개인 프로젝트를 1달 안에 완성한다.', isPersonal: true, participantCount: 1, interestCount: 5 },
  { id: 'mygoal3', challengeId: '8', title: '하루 세 가지 감사 일기', description: '긍정적인 마음 갖기', isPersonal: false, participantCount: 980, interestCount: 4500 },
];

export const TASKS: Task[] = [
  { id: 'task1', goalId: 'mygoal1', content: '오늘의 30분 달리기 완료', isCompleted: true },
  { id: 'task2', goalId: 'mygoal1', content: '내일 아침 요가 예약하기', isCompleted: false },
  { id: 'task3', goalId: 'mygoal2', content: '컴포넌트 구조 설계', isCompleted: true },
  { id: 'task4', goalId: 'mygoal2', content: '상태 관리 라이브러리 선정', isCompleted: true },
  { id: 'task5', goalId: 'mygoal2', content: 'API 연동 작업 시작', isCompleted: false },
  { id: 'task6', goalId: 'mygoal3', content: '오늘 감사한 일 3가지 적기', isCompleted: false },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
    { id: 'post1', author: '개발꿈나무', avatar: 'https://picsum.photos/seed/user1/100/100', timestamp: '2시간 전', type: '질문', title: 'React 상태 관리, 어떤 게 가장 좋은가요?', content: '이제 막 React를 시작했는데, Redux, MobX, Zustand 등 너무 많은 선택지가 있어서 고민입니다. 간단한 프로젝트에 사용하기 좋은 상태 관리 라이브러리 추천 부탁드립니다!' },
    { id: 'post2', author: '운동매니아', avatar: 'https://picsum.photos/seed/user2/100/100', timestamp: '5시간 전', type: '일반', title: '다들 오늘 운동 인증!', content: '저는 오늘 공원에서 5km 달리기 완료했습니다! 다들 오늘 어떤 운동 하셨나요? 같이 공유해요!' },
    { id: 'post3', author: '책벌레', avatar: 'https://picsum.photos/seed/user3/100/100', timestamp: '1일 전', type: '요청', title: 'SF 소설 추천 좀 해주세요!', content: '최근에 읽을 만한 SF 소설을 찾고 있습니다. 여러분의 인생 SF 소설은 무엇이었나요? 추천 부탁드립니다.' },
];

export const AI_NUDGE_MESSAGES = {
    critic: {
        harsh: "이것도 못하면 아무것도 못해. 당장 시작해.",
        normal: "지금 집중하지 않으면 나중에 후회할 겁니다.",
        gentle: "조금만 더 힘내보면 어떨까요? 할 수 있어요."
    },
    swearer: {
        harsh: "이 XX야, 안하면 죽어. 그냥 닥치고 해.",
        normal: "정신 안차리냐? 지금 니가 놀 때야?",
        gentle: "야, 이 정도는 해야 사람 구실하지 않겠냐?"
    },
    realist: {
        harsh: "현실적으로 이건 오늘 안에 끝내야 합니다.",
        normal: "계획대로 진행되고 있는지 점검할 시간입니다.",
        gentle: "목표 달성을 위해 가장 중요한 다음 단계가 무엇인지 생각해봅시다."
    }
};

export const DEFAULT_AI_SETTINGS: AISettings = {
    persona: 'critic',
    tone: 'normal'
};