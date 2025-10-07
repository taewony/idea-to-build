// components/sections/CeremonyDetailsSection.tsx
import React from 'react';

interface ScheduleItem {
  time: string;
  event: string;
  details?: string;
}

const schedule: ScheduleItem[] = [
  { time: '13:30 ~ 14:00', event: '등록 및 접수' },
  { time: '14:00 ~ 14:10', event: '개회 및 국민의례' },
  { time: '14:10 ~ 14:25', event: '기념사 및 축사', details: '서울시, 시의회, 교육청 등' },
  { time: '14:25 ~ 15:00', event: '유공자 표창 및 비전 선포', details: '평생교육 유공자 표창, 서울시민 평생학습 비전 선포' },
  { time: '15:00 ~ 15:10', event: '기념공연', details: '축하 공연' },
  { time: '15:10 ~ 15:30', event: '기념촬영 및 폐회' },
];

const CeremonyDetailsSection = () => {
  const title = "10주년 기념식";

  return (
    <section id="ceremony" className="py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-h2 text-center mb-12">{title}</h2>
        <div className="border-t border-gray-700">
          {schedule.map((item, index) => (
            <div key={index} className="border-b border-gray-700 grid md:grid-cols-3 gap-4 py-6">
              <div className="font-bold text-[var(--color-primary)] md:text-right">
                {item.time}
              </div>
              <div className="md:col-span-2">
                <p className="font-semibold text-lg text-white">{item.event}</p>
                {item.details && <p className="text-gray-400 mt-1">{item.details}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CeremonyDetailsSection;
