// components/sections/ForumDetailsSection.tsx
'use client';

import React, { useState } from 'react';
import ForumProgramCard, { ForumProgram } from '@/components/ui/ForumProgramCard';

interface ProgramCategory {
  name: string;
  programs: ForumProgram[];
}

const programCategories: ProgramCategory[] = [
  {
    name: '기조강연',
    programs: [
      {
        time: '10:00 ~ 10:40',
        title: '모두를 위한 평생학습도시',
        speaker: '김진화',
        affiliation: '국가평생교육진흥원장',
      },
    ],
  },
  {
    name: '주제발표',
    programs: [
      {
        time: '10:40 ~ 11:20',
        title: '서울시민의 평생학습 참여 실태와 과제',
        speaker: '이희수',
        affiliation: '한국평생교육학회장',
      },
      {
        time: '11:20 ~ 12:00',
        title: '디지털 대전환 시대, 서울시 평생교육의 방향',
        speaker: '김주명',
        affiliation: '서울특별시 평생교육진흥원장',
      },
      {
        time: '13:00 ~ 13:40',
        title: 'AI와 함께하는 미래 교육',
        speaker: '박서준',
        affiliation: '미래교육연구소장',
      },
    ],
  },
  {
    name: '패널토론',
    programs: [
      {
        time: '14:00 ~ 15:00',
        title: '서울시 평생교육, 나아갈 길을 묻다',
        speaker: '참여자 전체',
        affiliation: '사회: 최수영 (한국교육개발원)',
      },
    ],
  },
];

const ForumDetailsSection = () => {
  const title = "평생학습포럼";
  const [activeTab, setActiveTab] = useState(0);

  const activeCategory = programCategories[activeTab];

  return (
    <section id="forum" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-h2 text-center mb-12">{title}</h2>
        
        <div className="flex justify-center border-b border-gray-700 mb-8">
          {programCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-2 px-6 text-lg font-semibold transition-colors duration-300 ${
                activeTab === index
                  ? 'border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'text-gray-400 hover:text-[var(--color-primary)]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeCategory.programs.map((program, index) => (
            <ForumProgramCard key={index} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForumDetailsSection;
