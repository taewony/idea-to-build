
export interface Program {
  id: number;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  details: {
    place: string;
    time: string;
    instructor: string;
    capacity?: string;
  };
  remainingSpots?: number;
  buttonText: string;
  isButtonDisabled: boolean;
}

export interface TabData {
  id: string;
  name:string;
  programs: Program[];
}
