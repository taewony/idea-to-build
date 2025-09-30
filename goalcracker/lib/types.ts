export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  isUpcoming: boolean;
  participantCount: number;
  interestCount: number;
}

export interface UserGoal {
  id: string;
  challengeId?: string;
  title: string;
  description: string;
  isPersonal: boolean;
  participantCount: number;
  interestCount: number;
}

export interface Task {
  id: string;
  goalId: string;
  content: string;
  isCompleted: boolean;
}

export interface AIMessage {
  id: string;
  type: 'critic' | 'swearer';
  title: string;
  content: string;
  timestamp: string;
  goalId: string;
  rotation: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  type: '질문' | '요청' | '일반';
  title: string;
  content: string;
}

export type AIPersona = 'critic' | 'swearer' | 'realist';

export interface AISettings {
  persona: AIPersona;
  tone: 'gentle' | 'normal' | 'harsh';
}