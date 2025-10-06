
import React, { useState, useEffect } from 'react';
import type { Game, GameFullDetails } from '../types';
import { getGameFullDetails } from '../services/geminiService';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { StarIcon } from './icons/StarIcon';
import { StarOutlineIcon } from './icons/StarOutlineIcon';
import { StarHalfIcon } from './icons/StarHalfIcon';

interface GameDetailPageProps {
  game: Game;
  onBack: () => void;
}

const StarRating: React.FC<{ rating: number; className?: string, starSize?: string }> = ({ rating, className = '', starSize = 'w-5 h-5' }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.4;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className={`flex items-center ${className}`}>
        {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className={`${starSize} text-yellow-400`} />)}
        {halfStar && <StarHalfIcon key="half" className={`${starSize} text-yellow-400`} />}
        {[...Array(emptyStars)].map((_, i) => <StarOutlineIcon key={`empty-${i}`} className={`${starSize} text-slate-500`} />)}
      </div>
    );
};

const PremiumCTA: React.FC = () => (
    <div className="p-6 rounded-lg bg-purple-600/20 border border-purple-500/50 text-center mt-8">
        <h3 className="text-xl font-bold text-white mb-2">Go Pro!</h3>
        <p className="text-sm text-purple-300/80 mb-4">
            Want expert tips and walkthroughs for this game? Subscribe to our Premium plan for exclusive content.
        </p>
        <button className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
            Learn More
        </button>
    </div>
);

export const GameDetailPage: React.FC<GameDetailPageProps> = ({ game, onBack }) => {
  const [details, setDetails] = useState<GameFullDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const geminiResponse = await getGameFullDetails(game.title);
        setDetails(geminiResponse);
      } catch (err) {
        setError('Failed to load AI-powered details. This might be due to API restrictions or a network issue. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [game]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
            <p className="mt-4 text-slate-400">Generating AI-powered game details...</p>
        </div>
      );
    }
    
    if (error) {
      return <div className="text-red-400 bg-red-900/50 p-4 rounded-md text-center">{error}</div>;
    }

    if (!details) return null;

    return (
        <>
            <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">{game.title}</h1>
                <p className="text-slate-400">{details.about.split('.')[0]}.</p>
                <p className="text-sm text-slate-500 mt-2">
                    Available on: {details.platforms.join(', ')}
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold border-b border-slate-700 pb-2 mb-4 text-slate-100">About the Game</h2>
                        <p className="text-slate-300 leading-relaxed">{details.about}</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold border-b border-slate-700 pb-2 mb-4 text-slate-100">Reviews</h2>
                        <div className="space-y-6">
                           {details.reviews.map((review, index) => (
                               <div key={index} className="p-4 rounded-lg bg-slate-800/50">
                                   <div className="flex items-start gap-4">
                                       <img src={`https://picsum.photos/seed/${review.avatarSeed}/40/40`} alt="avatar" className="size-10 rounded-full flex-shrink-0" />
                                       <div className="flex-grow">
                                           <div className="flex items-center justify-between">
                                               <div>
                                                   <p className="font-semibold text-white">{review.author}</p>
                                                   <p className="text-xs text-slate-400">{review.date}</p>
                                               </div>
                                               <StarRating rating={review.rating} />
                                           </div>
                                           <p className="mt-2 text-slate-300 text-sm">{review.text}</p>
                                       </div>
                                   </div>
                               </div>
                           ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-8">
                     <div>
                        <h2 className="text-2xl font-bold border-b border-slate-700 pb-2 mb-4 text-slate-100">User Ratings</h2>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-4xl font-bold text-white">{details.userRatings.average.toFixed(1)}</div>
                            <div>
                                <StarRating rating={details.userRatings.average} starSize="w-6 h-6" />
                                <p className="text-sm text-slate-400">Based on {details.userRatings.totalReviews.toLocaleString()} reviews</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {Object.entries(details.userRatings.distribution).reverse().map(([star, percent]) => (
                                <div key={star} className="flex items-center gap-2 text-sm">
                                    <span className="text-slate-400 w-3">{star}</span>
                                    <div className="w-full bg-slate-700 rounded-full h-2">
                                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
                                    </div>
                                    <span className="text-slate-400 w-8 text-right">{percent}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <PremiumCTA />
                </div>
            </div>
        </>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-5xl mx-auto">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors mb-6 group">
                <ArrowLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span>Back to Search</span>
            </button>
            <div
                className="w-full aspect-[16/9] rounded-xl bg-cover bg-center mb-8 bg-slate-800"
                style={{ backgroundImage: `url(${game.imageUrl})` }}
            ></div>
            {renderContent()}
      </div>
    </main>
  );
};
