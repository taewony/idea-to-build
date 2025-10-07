// components/sections/InvitationSection.tsx
import React from 'react';

const InvitationSection = () => {
  const title = "10주년 초대글";
  const content = `
    <p>서울특별시 평생교육진흥원 10주년을 축하하고, 평생교육의 미래를 함께 열어갈 여러분을 초대합니다.</p>
    <p>지난 10년간의 성과를 돌아보고, 앞으로의 10년을 시민 여러분과 함께 만들어가고자 합니다.</p>
    <p>다양한 프로그램과 기념식이 준비되어 있으니, 오셔서 자리를 빛내주시길 바랍니다.</p>
  `;

  return (
    <section id="message" className="py-20">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2 className="text-h2 mb-6">{title}</h2>
        <div 
          className="text-body space-y-4"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </div>
    </section>
  );
};

export default InvitationSection;
