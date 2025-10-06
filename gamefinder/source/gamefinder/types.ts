
export interface Game {
  id: string;
  title: string;
  imageUrl: string;
  price: string;
  storeUrl: string;
  recommendationReason: string;
  reviewSummary: string;
}

export interface User {
  id: string;
  username: string;
}

export interface GameFullDetails {
  about: string;
  platforms: string[];
  reviews: {
    author: string;
    date: string; // "YYYY-MM-DD"
    rating: number; // 1-5
    text: string;
    avatarSeed: string; // A random word to seed an avatar image
  }[];
  userRatings: {
    average: number;
    totalReviews: number;
    distribution: {
      '5': number;
      '4': number;
      '3': number;
      '2': number;
      '1': number;
    };
  };
}
