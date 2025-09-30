'use client';

import Link from 'next/link';
import { AIMessage, Challenge } from '@/lib/types';

interface WallPostProps {
  message: AIMessage;
  challenge?: Challenge;
}

const WallPost: React.FC<WallPostProps> = ({ message, challenge }) => {
  const isCritic = message.type === 'critic';
  const rotationClass = `transform rotate-${message.rotation < 0 ? `[${message.rotation}deg]` : message.rotation}`;
  
  return (
    <div className={`font-handwriting bg-white w-11/12 p-4 rounded-lg border border-gray-200 shadow-card transition-transform duration-200 ease-in-out hover:scale-102 ${rotationClass} ${isCritic ? '' : 'ml-auto'}`}>
      <div className={`flex items-start ${isCritic ? '' : 'flex-row-reverse'}`}>
        <div className="flex-shrink-0">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ring-2 ${isCritic ? 'bg-gray-700 ring-gray-300' : 'bg-purple-600 ring-purple-400'}`}>
            {isCritic ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            ) : (
              <span className="material-symbols-outlined text-4xl text-white">sentiment_extremely_dissatisfied</span>
            )}
          </div>
        </div>
        <div className={`flex-grow mx-4 ${isCritic ? 'text-left' : 'text-right'}`}>
          <p className={`text-lg font-bold ${isCritic ? 'text-red-600' : 'text-purple-700'}`}>{message.title}</p>
          <p className="text-gray-700 mt-2">{message.content}</p>
          {challenge && (
            <Link href={`/goal/${challenge.id}`} className="inline-flex items-center mt-3 text-sm font-bold text-accent hover:underline">
              <span className="material-symbols-outlined mr-1 text-base">east</span>
              연관 목표: {challenge.title}
            </Link>
          )}
          <span className="text-xs text-gray-400 mt-1 block">{message.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default WallPost;