// components/sections/SessionDetailsSection.tsx
'use client';

import React, { useState } from 'react';
import ProgramCard, { Program } from '@/components/ui/ProgramCard';

interface ProgramCategory {
  name: string;
  programs: Program[];
}

const categories: ProgramCategory[] = [
  {
    name: '체험 프로그램',
    programs: [
      { title: '나만의 머그컵 만들기', instructor: '김세라', time: '10:00 ~ 12:00', location: '체험존 A', capacity: '20명' },
      { title: '업사이클링 화분 제작', instructor: '이민준', time: '13:00 ~ 15:00', location: '체험존 B', capacity: '15명' },
      { title: 'VR로 만나는 세계 여행', instructor: '박서연', time: '상시', location: '디지털존', capacity: '5명씩' },
    ],
  },
  {
    name: '강의형 프로그램',
    programs: [
      { title: '성공적인 은퇴 설계', instructor: '최현우', time: '10:00 ~ 11:00', location: '강의실 1', capacity: '50명' },
      { title: 'AI 시대의 자녀 교육법', instructor: '정유진', time: '11:00 ~ 12:00', location: '강의실 2', capacity: '50명' },
    ],
  },
  {
    name: '명사특강 프로그램',
    programs: [
      { title: '인생 2막, 새로운 시작', instructor: '김영하 작가', time: '15:00 ~ 16:00', location: '대강당', capacity: '200명' },
    ],
  },
];

const SessionDetailsSection = () => {
  const title = "시민 체험 세션";
  const [activeTab, setActiveTab] = useState(0);

  const activeCategory = categories[activeTab];

  return (
    <section id="session" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-h2 text-center mb-12">{title}</h2>
        
        <div className="flex justify-center border-b border-gray-700 mb-8">
          {categories.map((category, index) => (
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeCategory.programs.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SessionDetailsSection;
