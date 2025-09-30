import { UserGoal, Task, Challenge } from './types';

const MY_GOALS: UserGoal[] = [
  {
    id: '1',
    title: 'Next.js 앱 프로토타입 완성',
    description: '기본 기능과 UI를 포함한 프로토타입을 개발합니다.',
    isPersonal: false,
    participantCount: 1,
    interestCount: 1,
    progress: 66,
  },
  {
    id: '2',
    title: 'Tailwind CSS 마스터하기',
    description: '공식 문서와 실습을 통해 Tailwind CSS 사용법을 익힙니다.',
    isPersonal: true,
    participantCount: 1,
    interestCount: 3,
    progress: 10,
  },
  {
    id: '3',
    title: '운동 꾸준히 하기',
    description: '주 3회 이상 꾸준히 유산소 및 근력 운동을 진행합니다.',
    isPersonal: true,
    participantCount: 1,
    interestCount: 12,
    progress: 90,
  },
    {
    id: '4',
    challengeId: '1',
    title: '오픈소스 경진대회 참여',
    description: '유명 오픈소스 프로젝트에 기여하고 실력을 증명하세요.',
    isPersonal: false,
    participantCount: 128,
    interestCount: 256,
    progress: 0,
  },
];

const TASKS: Task[] = [
    { id: '1', goalId: '1', content: '기본 레이아웃 구현', isCompleted: true },
    { id: '2', goalId: '1', content: '메인 대시보드 UI 구현', isCompleted: true },
    { id: '3', goalId: '1', content: '목표 관리 페이지 구현', isCompleted: false },
];

let challenges: Challenge[] = [
    { id: '1', title: '오픈소스 경진대회 참여', subtitle: '오픈소스', description: '유명 오픈소스 프로젝트에 기여하고 실력을 증명하세요.', image: '/images/challenge1.jpg', category: '개발', isUpcoming: false, participantCount: 128, interestCount: 256 },
    { id: '2', title: 'AI 스타트업 해커톤', subtitle: 'AI', description: '혁신적인 AI 모델을 개발하고 투자의 기회를 잡으세요.', image: '/images/challenge2.jpg', category: '개발', isUpcoming: false, participantCount: 76, interestCount: 180 },
    { id: '3', title: 'UX/UI 디자인 공모전', subtitle: '디자인', description: '사용자 중심의 아름다운 디자인을 선보이세요.', image: '/images/challenge3.jpg', category: '디자인', isUpcoming: true, participantCount: 212, interestCount: 450 },
];


export const getGoals = () => MY_GOALS;
export const getTasks = (goalId: string) => TASKS.filter(t => t.goalId === goalId);
export const getChallenges = () => challenges;

// --- AI Settings ---

export interface AiCharacter {
    id: string;
    name: string;
    description: string;
    avatar: string;
}

export interface AiSettings {
    character: AiCharacter;
}

const availableCharacters: AiCharacter[] = [
    { id: 'critic', name: '심장을 찌르는 욕쟁이', description: '팩트 폭격과 거친 언어로 당신의 심장을 찌릅니다.', avatar: '😠' },
    { id: 'ice-princess', name: '가차없는 얼음공주', description: '냉정하고 논리적인 피드백으로 감정을 쏙 뺍니다.', avatar: '❄️' },
    { id: 'boss', name: '무서운 사장님', description: '실적과 결과만을 중시하며, 과정은 궁금해하지 않습니다.', avatar: '💼' },
    { id: 'sweet-praiser', name: '달콤한 칭찬요정', description: '작은 성공도 놓치지 않고 칭찬하며 동기를 부여합니다.', avatar: '🧚' },
];

let aiSettings: AiSettings = {
    character: availableCharacters[0], // Default character
};

export const getAvailableCharacters = () => availableCharacters;
export const getAiSettings = () => aiSettings;
export const setAiCharacter = (characterId: string) => {
    const character = availableCharacters.find(c => c.id === characterId);
    if (character) {
        aiSettings.character = character;
        return character;
    }
    return null;
};