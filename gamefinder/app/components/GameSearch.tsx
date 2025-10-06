
import React, { useState, useCallback } from 'react';
import type { Game } from '../types';
import { GameCard } from './GameCard';

interface GameSearchProps {
  onSelectGame: (game: Game) => void;
  onToggleWishlist: (game: Game) => void;
  wishlist: Set<string>;
  onSearch: (query: string) => void;
  results: Game[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

export const GameSearch: React.FC<GameSearchProps> = ({ 
  onSelectGame, 
  onToggleWishlist, 
  wishlist,
  onSearch,
  results,
  isLoading,
  error,
  hasSearched 
}) => {
  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setValidationError('Please enter a search query.');
      return;
    }
    setValidationError(null);
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div id="search-section">
      <h2 className="text-3xl font-bold text-center mb-6 text-slate-100">Search for a Game</h2>
      <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (validationError) setValidationError(null);
            }}
            placeholder="e.g., 'cozy farming sim' or 'fast-paced sci-fi shooter'"
            className="w-full pl-4 pr-32 py-4 text-lg bg-slate-800 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 px-6 py-2.5 text-md font-semibold text-slate-900 bg-cyan-400 rounded-md hover:bg-cyan-300 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {(validationError || error) && <p className="text-red-400 mt-2 text-center">{validationError || error}</p>}
      </form>
      
      {isLoading && (
        <div className="text-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="mt-4 text-slate-400">Searching our game database...</p>
        </div>
      )}

      {!isLoading && hasSearched && results.length === 0 && (
         <div className="text-center py-10 bg-slate-800/50 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-200">No Games Found</h3>
            <p className="text-slate-400 mt-2">Try a different search query to find your perfect game.</p>
         </div>
      )}

      {results.length > 0 && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {results.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onSelectGame={onSelectGame}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.has(game.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
