
export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  isUpcoming: boolean;
}

export interface AIMessage {
  id: string;
  type: 'critic' | 'praiser';
  title: string;
  content: string;
  timestamp: string;
  goalId: string;
  rotation: number;
}
