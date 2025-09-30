'use client';

import Link from 'next/link';
import { Challenge } from '@/lib/types';

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => (
  <div className="group flex flex-col bg-card-light dark:bg-card-dark rounded-xl shadow-wood hover:shadow-wood-lg transition-shadow duration-300 overflow-hidden">
    <div className="relative w-full aspect-video">
      <img alt={challenge.category} className="w-full h-full object-cover" src={challenge.image} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-white text-lg font-bold">{challenge.title}</h3>
        <p className="text-gray-200 text-sm">{challenge.subtitle}</p>
      </div>
    </div>
    <div className="p-4 flex-grow flex flex-col">
      <p className="text-sm text-text-light/90 dark:text-text-dark/90 flex-grow mb-4">{challenge.description.substring(0, 80)}...</p>
      <div className="flex items-center gap-4 text-sm text-text-light/80 dark:text-text-dark/80 mb-4">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-base">groups</span>
          <span>{challenge.participantCount.toLocaleString()}명 참여</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-base">favorite</span>
          <span>{challenge.interestCount.toLocaleString()}명 관심</span>
        </div>
      </div>
      <div className="mt-auto">
        {challenge.isUpcoming ? (
          <button className="w-full bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-300 font-bold py-2 px-4 rounded-lg cursor-not-allowed" disabled>곧 시작</button>
        ) : (
          <Link href={`/goal/${challenge.id}`} className="block text-center w-full bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent/90 transition-colors shadow-sm">
            자세히 보기
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default ChallengeCard;