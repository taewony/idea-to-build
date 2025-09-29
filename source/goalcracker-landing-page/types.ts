
export interface Challenge {
  id: number;
  title: string;
  description: string;
  participants: number;
  imageUrl: string;
}

export interface Goal {
  id: number;
  title: string;
  type: 'personal' | 'official';
}

export interface AiMessage {
  id: number;
  message: string;
  relatedGoal: string;
  author: string;
}
