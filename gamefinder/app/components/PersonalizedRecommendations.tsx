
import React, { useState, useEffect } from 'react';
import type { Game } from '../types';
import { getPersonalizedRecommendations } from '../services/gameService';
import { GameCard } from './GameCard';

interface PersonalizedRecommendationsProps {
  userId: string;
  onSelectGame: (game: Game) => void;
  onToggleWishlist: (game: Game) => void;
  wishlist: Set<string>;
}

export const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({ userId, onSelectGame, onToggleWishlist, wishlist }) => {
  const [recommendations, setRecommendations] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        const games = await getPersonalizedRecommendations(userId);
        setRecommendations(games);
      } catch (err) {
        setError('Could not fetch your personalized recommendations.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [userId]);

  if (isLoading) {
    return (
        <div className="text-center">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
             <p className="mt-3 text-slate-400">Loading your personalized picks...</p>
        </div>
    );
  }

  if (error) {
    return <p className="text-red-400 text-center">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recommendations.map((game) => (
        // FIX: Pass the missing `onToggleWishlist` and `isWishlisted` props to the GameCard component.
        <GameCard 
          key={game.id} 
          game={game} 
          onSelectGame={onSelectGame} 
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlist.has(game.id)}
        />
      ))}
    </div>
  );
};
