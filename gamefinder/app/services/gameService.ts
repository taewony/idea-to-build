
import type { Game } from '../types';

const MOCK_DB: Game[] = [
  {
    id: '1',
    title: 'Stardew Valley',
    imageUrl: 'https://picsum.photos/seed/stardew/600/400',
    price: '$14.99',
    storeUrl: 'https://store.steampowered.com/app/413150/Stardew_Valley/',
    recommendationReason: 'Perfect for players looking for a relaxing, cozy farming simulation with deep RPG elements.',
    reviewSummary: 'Overwhelmingly Positive - A masterpiece of the farming sim genre.',
  },
  {
    id: '2',
    title: 'Cyberpunk 2077',
    imageUrl: 'https://picsum.photos/seed/cyberpunk/600/400',
    price: '$59.99',
    storeUrl: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/',
    recommendationReason: 'Ideal for those wanting a fast-paced, immersive sci-fi shooter with a rich story and world.',
    reviewSummary: 'Very Positive - A stunning open-world RPG, especially after recent updates.',
  },
  {
    id: '3',
    title: 'The Witcher 3: Wild Hunt',
    imageUrl: 'https://picsum.photos/seed/witcher3/600/400',
    price: '$39.99',
    storeUrl: 'https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/',
    recommendationReason: 'A must-play for fans of epic fantasy RPGs with incredible storytelling and vast open worlds.',
    reviewSummary: 'Overwhelmingly Positive - Widely considered one of the greatest games ever made.',
  },
  {
    id: '4',
    title: 'Hades',
    imageUrl: 'https://picsum.photos/seed/hades/600/400',
    price: '$24.99',
    storeUrl: 'https://store.steampowered.com/app/1145360/Hades/',
    recommendationReason: 'Excellent for players who love challenging, fast-paced roguelike action with a compelling story.',
    reviewSummary: 'Overwhelmingly Positive - A god-like roguelike that sets a new standard for the genre.',
  },
  {
    id: '5',
    title: 'Elden Ring',
    imageUrl: 'https://picsum.photos/seed/eldenring/600/400',
    price: '$59.99',
    storeUrl: 'https://store.steampowered.com/app/1245620/ELDEN_RING/',
    recommendationReason: 'For those seeking a challenging, dark fantasy adventure with deep exploration and combat.',
    reviewSummary: 'Very Positive - A monumental achievement in open-world design and action RPG gameplay.',
  },
  {
    id: '6',
    title: 'Portal 2',
    imageUrl: 'https://picsum.photos/seed/portal2/600/400',
    price: '$9.99',
    storeUrl: 'https://store.steampowered.com/app/620/Portal_2/',
    recommendationReason: 'A top choice for fans of mind-bending puzzle games with a hilarious story and great co-op.',
    reviewSummary: 'Overwhelmingly Positive - A perfectly crafted puzzle game with brilliant writing.',
  },
];

// Simulate a vector DB search
export const searchGames = (query: string): Promise<Game[]> => {
  console.log(`Searching for: ${query}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate an AI that always finds 3 relevant games.
      // For the mock, we'll shuffle the whole DB and take the first 3.
      const shuffled = MOCK_DB.sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, 3));
    }, 1000); // Simulate network delay
  });
};

// Simulate fetching personalized recommendations for a logged-in user
export const getPersonalizedRecommendations = (userId: string): Promise<Game[]> => {
  console.log(`Fetching recommendations for user: ${userId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      // For this demo, we'll just return a specific curated list for any logged-in user.
      const recommendedGames = [
          MOCK_DB.find(g => g.id === '1'), // Stardew Valley
          MOCK_DB.find(g => g.id === '6'), // Portal 2
          MOCK_DB.find(g => g.id === '3'), // Witcher 3
      ].filter(g => g !== undefined) as Game[];
      resolve(recommendedGames);
    }, 1200); // Simulate network delay
  });
};

// Simulate fetching the hottest games
export const getHottestGames = (): Promise<Game[]> => {
  console.log(`Fetching hottest games`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const hottestGames = [
        MOCK_DB.find(g => g.id === '2'), // Cyberpunk 2077
        MOCK_DB.find(g => g.id === '5'), // Elden Ring
        MOCK_DB.find(g => g.id === '4'), // Hades
      ].filter(g => g !== undefined) as Game[];
      resolve(hottestGames);
    }, 800); // Simulate network delay
  });
};
