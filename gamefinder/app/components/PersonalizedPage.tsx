
import React from 'react';
import type { Game } from '../types';
import { PersonalizedRecommendations } from './PersonalizedRecommendations';
import { HottestGames } from './HottestGames';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface PersonalizedPageProps {
  isLoggedIn: boolean;
  onBack: () => void;
  onSelectGame: (game: Game) => void;
  onToggleWishlist: (game: Game) => void;
  wishlist: Set<string>;
}

export const PersonalizedPage: React.FC<PersonalizedPageProps> = ({ isLoggedIn, onBack, onSelectGame, onToggleWishlist, wishlist }) => {
  const subtitle = isLoggedIn 
    ? "Welcome back! Here are some games we picked just for you."
    : "Here's a taste of what GameFinder offers. Sign in for a fully personalized experience.";
  
  const userId = isLoggedIn ? "user-123" : "guest-user";

  return (
    <main className="container mx-auto px-4 py-8 md:py-12 animate-fade-in">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors mb-8 group">
            <ArrowLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Search</span>
        </button>
      
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
                Discover Your Next Adventure
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                {subtitle}
            </p>
        </div>

        <section className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
                <SparklesIcon className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl font-bold text-slate-100 text-center">Curated For You</h2>
            </div>
            <PersonalizedRecommendations 
                userId={userId}
                onSelectGame={onSelectGame}
                onToggleWishlist={onToggleWishlist}
                wishlist={wishlist}
            />
        </section>

        <section>
            <div className="flex items-center justify-center gap-3 mb-8">
                <svg className="w-8 h-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.287 8.287 0 0 0 3-2.553Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3V2.25A2.25 2.25 0 0 0 9.75 0h-3.75A2.25 2.25 0 0 0 3.75 2.25V4.5 4.5A2.25 2.25 0 0 0 6 6.75h3.75a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25h-1.5A2.25 2.25 0 0 0 6 6v3" />
                </svg>
                <h2 className="text-3xl font-bold text-slate-100 text-center">Trending Now</h2>
            </div>
            <HottestGames 
                onSelectGame={onSelectGame}
                onToggleWishlist={onToggleWishlist}
                wishlist={wishlist}
            />
        </section>
    </main>
  );
};
