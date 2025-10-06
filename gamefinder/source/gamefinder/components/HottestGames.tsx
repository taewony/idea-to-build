
import React, { useState, useEffect } from 'react';
import type { Game } from '../types';
import { getHottestGames } from '../services/gameService';
import { GameCard } from './GameCard';

interface HottestGamesProps {
  onSelectGame: (game: Game) => void;
  onToggleWishlist: (game: Game) => void;
  wishlist: Set<string>;
}

export const HottestGames: React.FC<HottestGamesProps> = ({ onSelectGame, onToggleWishlist, wishlist }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const fetchedGames = await getHottestGames();
        setGames(fetchedGames);
      } catch (err) {
        setError('Could not fetch the hottest games right now.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGames();
  }, []);

  if (isLoading) {
    return (
        <div className="text-center">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
             <p className="mt-3 text-slate-400">Loading trending games...</p>
        </div>
    );
  }

  if (error) {
    return <p className="text-red-400 text-center">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {games.map((game) => (
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
