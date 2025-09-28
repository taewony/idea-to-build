'use client';

import { useState } from 'react';
import { Users, Target, PlusCircle } from 'lucide-react';
import * as store from '@/lib/store';

export default function ChallengesPage() {
  const [challenges] = useState(store.getChallenges());

  const handleAddChallenge = (challenge: store.Challenge) => {
    const newGoal = store.addChallengeToGoals(challenge);
    if (newGoal) {
      alert(`'${challenge.title}' 챌린지가 나의 목표에 추가되었습니다!`);
    } else {
      alert('이미 목표 목록에 있는 챌린지입니다.');
    }
  };

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">도전 목록</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map(challenge => (
            <div key={challenge.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl text-gray-800">{challenge.title}</h3>
                <span className="text-sm font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-600">D-{challenge.deadline}</span>
              </div>
              <p className="text-gray-600 mb-4 flex-grow">{challenge.description}</p>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">{challenge.participant_count.toLocaleString()}명 참여중</span>
                </div>
                <button 
                  onClick={() => handleAddChallenge(challenge)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors text-yellow-900 font-bold">
                  <PlusCircle className="h-5 w-5" />
                  <span>내 목표로 추가</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}