export interface Task {
  id: number;
  goalId: number;
  content: string;
  isCompleted: boolean;
}

export interface Goal {
  id: number;
  title: string;
  type: 'short' | 'long';
  is_achieved: boolean;
  tasks: Task[];
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  deadline: number; // D-day
  participant_count: number;
}

let goals: Goal[] = [
  { id: 1, title: 'Next.js 앱 프로토타입 완성', type: 'long', is_achieved: false, tasks: [
    { id: 1, goalId: 1, content: '기본 레이아웃 구현', isCompleted: true },
    { id: 2, goalId: 1, content: '메인 대시보드 UI 구현', isCompleted: true },
    { id: 3, goalId: 1, content: '목표 관리 페이지 구현', isCompleted: false },
  ]},
  { id: 2, title: 'Tailwind CSS 마스터하기', type: 'long', is_achieved: false, tasks: [] },
  { id: 3, title: '운동 꾸준히 하기', type: 'short', is_achieved: true, tasks: [] },
];

let challenges: Challenge[] = [
    { id: 1, title: '오픈소스 경진대회 참여', description: '유명 오픈소스 프로젝트에 기여하고 실력을 증명하세요.', deadline: 10, participant_count: 128 },
    { id: 2, title: 'AI 스타트업 해커톤', description: '혁신적인 AI 모델을 개발하고 투자의 기회를 잡으세요.', deadline: 25, participant_count: 76 },
    { id: 3, title: 'UX/UI 디자인 공모전', description: '사용자 중심의 아름다운 디자인을 선보이세요.', deadline: 40, participant_count: 212 },
    { id: 4, title: '알고리즘 30일 챌린지', description: '매일 한 문제씩 해결하며 코딩 테스트에 대비하세요.', deadline: 30, participant_count: 540 },
];


let nextGoalId = 4;
let nextTaskId = 4;

// --- Goal Functions ---

export const getGoals = () => goals;

export const getGoal = (id: number) => goals.find(g => g.id === id);

export const addGoal = (title: string, type: 'short' | 'long') => {
  const newGoal: Goal = {
    id: nextGoalId++,
    title,
    type,
    is_achieved: false,
    tasks: [],
  };
  goals.push(newGoal);
  return newGoal;
};

export const toggleGoal = (id: number) => {
  const goal = getGoal(id);
  if (goal) {
    goal.is_achieved = !goal.is_achieved;
  }
};

export const deleteGoal = (id: number) => {
  goals = goals.filter(g => g.id !== id);
};

// --- Task Functions ---

export const addTask = (goalId: number, content: string) => {
  const goal = getGoal(goalId);
  if (goal) {
    const newTask: Task = {
      id: nextTaskId++,
      goalId,
      content,
      isCompleted: false,
    };
    goal.tasks.push(newTask);
    return newTask;
  }
};

export const toggleTask = (goalId: number, taskId: number) => {
  const goal = getGoal(goalId);
  if (goal) {
    const task = goal.tasks.find(t => t.id === taskId);
    if (task) {
      task.isCompleted = !task.isCompleted;
    }
  }
};

export const deleteTask = (goalId: number, taskId: number) => {
  const goal = getGoal(goalId);
  if (goal) {
    goal.tasks = goal.tasks.filter(t => t.id !== taskId);
  }
}

// --- Challenge Functions ---

export const getChallenges = () => challenges;

export const addChallengeToGoals = (challenge: Challenge) => {
    const existingGoal = goals.find(g => g.title === challenge.title);
    if (existingGoal) {
        return null; // 이미 목표가 존재하면 추가하지 않음
    }
    const newGoal: Goal = {
        id: nextGoalId++,
        title: challenge.title,
        type: 'long', // 챌린지는 장기 목표로 설정
        is_achieved: false,
        tasks: [],
    };
    goals.push(newGoal);
    return newGoal;
}

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