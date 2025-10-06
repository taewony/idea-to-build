import React from 'react';
import type { Game } from '../types';
import { StarIcon } from './icons/StarIcon';

interface GameCardProps {
  game: Game;
  onSelectGame: (game: Game) => void;
  onToggleWishlist: (game: Game) => void;
  isWishlisted: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onSelectGame, onToggleWishlist, isWishlisted }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row transform hover:-translate-y-1 transition-transform duration-300">
      <img src={game.imageUrl} alt={game.title} className="w-full md:w-1/3 h-64 md:h-auto object-cover" />
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
          <div className="flex items-center mb-3">
            <StarIcon className="w-5 h-5 text-yellow-400 mr-2" />
            <p className="text-slate-300 text-sm italic">"{game.reviewSummary}"</p>
          </div>
          <p className="text-sm font-semibold text-slate-300 mb-1">Recommendation Reason:</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">{game.recommendationReason}</p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <button 
            onClick={() => onSelectGame(game)}
            className="flex-1 text-center px-4 py-2 text-sm font-semibold bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            View Details
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(game);
            }}
            className={`flex-1 text-center px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
              isWishlisted 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
          >
            {isWishlisted ? 'Added to Wishlist ✓' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};
