// components/ui/ForumProgramCard.tsx
import React from 'react';

export interface ForumProgram {
  time: string;
  title: string;
  speaker: string;
  affiliation: string;
}

const ForumProgramCard = ({ program }: { program: ForumProgram }) => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 h-full flex flex-col transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
      <div className="font-bold text-[var(--color-primary)] mb-2">
        {program.time}
      </div>
      <h4 className="text-xl font-bold mb-3 text-white">{program.title}</h4>
      <div className="text-sm text-gray-300 space-y-2 mt-auto border-t border-gray-600 pt-4">
        <p><strong>발표자:</strong> {program.speaker}</p>
        <p><strong>소속:</strong> {program.affiliation}</p>
      </div>
    </div>
  );
};

export default ForumProgramCard;
