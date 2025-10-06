// components/sections/ProgramGuideSection.tsx
import React from 'react';

interface Program {
  title: string;
  description: string;
}

const programs: Program[] = [
  {
    title: '10주년 기념식',
    description: '지난 10년의 발자취를 돌아보고, 미래 비전을 공유하는 시간',
  },
  {
    title: '평생학습포럼',
    description: '전문가들과 함께 평생교육의 현재와 미래를 논의하는 포럼',
  },
  {
    title: '시민 체험 세션',
    description: '다양한 평생학습 프로그램을 직접 체험해보는 시민 참여의 장',
  },
];

const ProgramGuideSection = () => {
  const title = "10주년 프로그램 안내";

  return (
    <section id="program" className="py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-h2 mb-12">{title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div key={program.title} className="bg-gray-800 p-8 rounded-[var(--border-radius-medium)] shadow-lg">
              <h3 className="text-h3 mb-4 text-white">{program.title}</h3>
              <p className="text-body text-gray-300">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramGuideSection;
