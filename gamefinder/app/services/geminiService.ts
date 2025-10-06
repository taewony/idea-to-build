
import type { GameFullDetails } from '../types';

// This is a mock function to simulate fetching detailed game information.
// In a real application, this would make an API call to a backend service
// or directly to an AI service like Google's Gemini.

export const getGameFullDetails = (gameTitle: string): Promise<GameFullDetails> => {
  console.log(`Fetching AI-powered details for: ${gameTitle}`);

  // Create mock data that is consistent and realistic.
  const mockDetails: GameFullDetails = {
    about: `This is a detailed, AI-generated description for "${gameTitle}". It's an expansive open-world adventure known for its deep lore, challenging combat, and breathtaking visuals. Players can explore a vast kingdom, uncover ancient secrets, and forge their own path in a world shaped by their decisions.`,
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X'],
    reviews: [
      {
        author: 'GamerGal_92',
        date: '2024-10-22',
        rating: 5,
        text: `Absolutely phenomenal! The world is incredibly immersive and the story kept me hooked for over 100 hours. A must-play!`,
        avatarSeed: 'gamergal'
      },
      {
        author: 'RPG_Master',
        date: '2024-10-20',
        rating: 4,
        text: `A solid RPG with satisfying combat. The world can feel a bit empty at times, but the main quest is fantastic.`,
        avatarSeed: 'rpgmaster'
      },
      {
        author: 'CasualPlayerX',
        date: '2024-10-15',
        rating: 4.5,
        text: `I'm not usually into huge RPGs, but this one is special. It's challenging but fair. Highly recommend giving it a try.`,
        avatarSeed: 'casual'
      }
    ],
    userRatings: {
      average: 4.7,
      totalReviews: 18453,
      distribution: {
        '5': 75, // 75%
        '4': 18, // 18%
        '3': 5,  // 5%
        '2': 1,  // 1%
        '1': 1   // 1%
      }
    }
  };

  // Simulate a network delay to mimic a real API call.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDetails);
    }, 1500); // 1.5 second delay
  });
};
