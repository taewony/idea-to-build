import React from 'react';
import { Program } from '../types';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <li className="bg-white rounded-3xl shadow-xl flex flex-col">
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
          <figure className="flex-shrink-0 w-full sm:w-36 h-28 rounded-lg overflow-hidden">
            <img src={program.imageUrl} alt={program.title} className="w-full h-full object-cover" />
          </figure>
          <div className="text-sm text-gray-800 space-y-2 flex-grow">
              <dl className="grid grid-cols-[auto,1fr] gap-x-2 gap-y-1">
                  <dt className="font-semibold text-gray-500">장소 :</dt>
                  <dd>{program.details.place}</dd>
                  <dt className="font-semibold text-gray-500">시간 :</dt>
                  <dd>{program.details.time}</dd>
                  <dt className="font-semibold text-gray-500">강사 :</dt>
                  <dd dangerouslySetInnerHTML={{ __html: program.details.instructor }}></dd>
                  {program.details.capacity && (
                      <>
                          <dt className="font-semibold text-gray-500">인원 :</dt>
                          <dd>{program.details.capacity}</dd>
                      </>
                  )}
              </dl>
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