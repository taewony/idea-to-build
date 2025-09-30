import { create } from 'zustand';
import { UserGoal, Task, AISettings, AIMessage, CommunityPost, Challenge } from './types';
import { MY_GOALS, TASKS, DEFAULT_AI_SETTINGS, AI_MESSAGES, COMMUNITY_POSTS, CHALLENGES } from './constants';

interface GoalCrackerStore {
  // Data
  goals: UserGoal[];
  tasks: Task[];
  aiSettings: AISettings;
  aiMessages: AIMessage[];
  communityPosts: CommunityPost[];
  challenges: Challenge[];
  
  // Goal Actions
  addGoal: (goal: Omit<UserGoal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<UserGoal>) => void;
  deleteGoal: (id: string) => void;
  
  // Task Actions
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  
  // AI Settings Actions
  updateAISettings: (settings: Partial<AISettings>) => void;
  
  // AI Messages Actions
  addAIMessage: (message: Omit<AIMessage, 'id'>) => void;
  
  // Utility Functions
  getGoalTasks: (goalId: string) => Task[];
  getGoalProgress: (goalId: string) => number;
  getChallengeById: (id: string) => Challenge | undefined;
}

let nextGoalId = 4;
let nextTaskId = 7;
let nextMessageId = 6;

export const useGoalCrackerStore = create<GoalCrackerStore>((set, get) => ({
  // Initial Data
  goals: MY_GOALS,
  tasks: TASKS,
  aiSettings: DEFAULT_AI_SETTINGS,
  aiMessages: AI_MESSAGES,
  communityPosts: COMMUNITY_POSTS,
  challenges: CHALLENGES,
  
  // Goal Actions
  addGoal: (goalData) => {
    const newGoal: UserGoal = {
      ...goalData,
      id: `goal${nextGoalId++}`,
    };
    set((state) => ({
      goals: [...state.goals, newGoal],
    }));
  },
  
  updateGoal: (id, updates) => {
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id ? { ...goal, ...updates } : goal
      ),
    }));
  },
  
  deleteGoal: (id) => {
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== id),
      tasks: state.tasks.filter((task) => task.goalId !== id),
    }));
  },
  
  // Task Actions
  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: `task${nextTaskId++}`,
    };
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  },
  
  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    }));
  },
  
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  
  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      ),
    }));
  },
  
  // AI Settings Actions
  updateAISettings: (settings) => {
    set((state) => ({
      aiSettings: { ...state.aiSettings, ...settings },
    }));
  },
  
  // AI Messages Actions
  addAIMessage: (messageData) => {
    const newMessage: AIMessage = {
      ...messageData,
      id: `msg${nextMessageId++}`,
      timestamp: new Date().toLocaleString('ko-KR'),
      rotation: Math.floor(Math.random() * 5) - 2, // -2 to 2
    };
    set((state) => ({
      aiMessages: [newMessage, ...state.aiMessages],
    }));
  },
  
  // Utility Functions
  getGoalTasks: (goalId) => {
    return get().tasks.filter((task) => task.goalId === goalId);
  },
  
  getGoalProgress: (goalId) => {
    const tasks = get().getGoalTasks(goalId);
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.isCompleted).length;
    return Math.round((completedTasks / tasks.length) * 100);
  },
  
  getChallengeById: (id) => {
    return get().challenges.find((challenge) => challenge.id === id);
  },
}));