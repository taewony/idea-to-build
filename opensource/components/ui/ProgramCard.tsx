// components/ui/ProgramCard.tsx
import React from 'react';
import Image from 'next/image';
import { Program } from '@/lib/types';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <li className="bg-white rounded-3xl shadow-xl flex flex-col text-gray-800 h-full">
      <div className="p-6 flex-grow flex flex-col">
        {/* Category Badge */}
        <div>
          <span className="bg-[#FF0A73] text-white text-xs font-bold px-4 py-1.5 rounded-full">
            {program.category}
          </span>
        </div>

        {/* Title and Description */}
        <div className="my-4">
          <h4 className="text-xl font-bold text-[#FF0A73] leading-tight">{program.title}</h4>
          <p className="text-gray-600 text-sm mt-2" dangerouslySetInnerHTML={{ __html: program.description.replace(/<br\s*\/?>/gi, ' ') }}></p>
        </div>
        
        {/* Content with Image and Details */}
        <div className="flex flex-col sm:flex-row gap-4 items-start mt-4">
          <figure className="flex-shrink-0 w-full sm:w-36 h-28 rounded-lg overflow-hidden relative">
            <Image src={program.imageUrl} alt={program.title} layout="fill" className="w-full h-full object-cover" />
          </figure>
          <div className="flex-grow space-y-1 text-xs text-gray-800">
              <div className="flex">
                <div className="font-semibold text-gray-500 w-12 flex-shrink-0">장소 :</div>
                <div>{program.details.place}</div>
              </div>
              <div className="flex">
                <div className="font-semibold text-gray-500 w-12 flex-shrink-0">시간 :</div>
                <div>{program.details.time}</div>
              </div>
              <div className="flex">
                <div className="font-semibold text-gray-500 w-12 flex-shrink-0">강사 :</div>
                <div dangerouslySetInnerHTML={{ __html: program.details.instructor }}></div>
              </div>
              {program.details.capacity && (
                <div className="flex">
                  <div className="font-semibold text-gray-500 w-12 flex-shrink-0">인원 :</div>
                  <div>{program.details.capacity}</div>
                </div>
              )}
              
              {typeof program.remainingSpots === 'number' && (
                  <div className="mt-3 p-2 rounded-lg bg-pink-50 flex justify-between items-center text-xs">
                      <span className="font-bold text-gray-600">현재 신청가능 인원 :</span>
                      <span className="text-lg font-bold text-[#FF0A73]">{program.remainingSpots}명</span>
                  </div>
              )}
          </div>
        </div>

        {/* Button container */}
        <div className="mt-auto pt-6">
            <button
            type="button"
            className={`w-full px-8 py-3 rounded-full text-white font-bold text-base transition-colors duration-300 shadow-md ${
                program.isButtonDisabled
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800'
            }`}
            disabled={program.isButtonDisabled}
            >
            {program.buttonText}
            </button>
        </div>
      </div>
    </li>
  );
};

export default ProgramCard;