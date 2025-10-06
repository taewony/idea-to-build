// components/ui/ProgramCard.tsx
import React from 'react';

export interface Program {
  title: string;
  instructor: string;
  time: string;
  location: string;
  capacity: string;
}

const ProgramCard = ({ program }: { program: Program }) => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 h-full flex flex-col transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
      <h4 className="text-xl font-bold mb-3 text-white">{program.title}</h4>
      <div className="text-sm text-gray-300 space-y-2 mt-auto border-t border-gray-600 pt-4">
        <p><strong>강사:</strong> {program.instructor}</p>
        <p><strong>시간:</strong> {program.time}</p>
        <p><strong>장소:</strong> {program.location}</p>
        <p><strong>정원:</strong> {program.capacity}</p>
      </div>
    </div>
  );
};

export default ProgramCard;
