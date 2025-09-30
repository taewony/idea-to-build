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
  progress?: number; // Added for progress bar
}

export interface Task {
  id: string;
  goalId: string;
  content: string;
  isCompleted: boolean;
}
