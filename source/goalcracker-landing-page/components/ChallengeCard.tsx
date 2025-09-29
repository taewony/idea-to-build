
import React from 'react';
import type { Challenge } from '../types';

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  return (
    <div className="group flex flex-col bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood hover:shadow-wood-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative w-full aspect-video">
        <img alt={challenge.title} className="w-full h-full object-cover" src={challenge.imageUrl} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white text-lg font-bold">{challenge.title}</h3>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-sm text-text-light/90 dark:text-text-dark/90 flex-grow mb-4">{challenge.description}</p>
        <div className="flex items-center text-sm font-medium text-primary dark:text-accent mb-4">
            <span className="material-symbols-outlined text-base mr-1">groups</span>
            {challenge.participants.toLocaleString()}명 참여중
        </div>
        <div className="mt-auto">
          <button className="w-full bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent/90 transition-colors shadow-sm">
            도전하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
