// components/sections/HeroSection.tsx
import React from 'react';

const HeroSection = () => {
  const title = "서울특별시 평생교육진흥원 10주년 기념식";
  const subtitle = "10년의 선물 평생교육 미래를 열다";
  const eventDate = "2025. 10. 17 (금) 10:00 ~ 17:00";
  const location = "서울시민대학 동남권캠퍼스(강동구 고덕)";

  return (
    <section 
      id="intro" 
      className="py-20 md:py-32"
    >
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-h1 text-white">
          {title}
        </h1>
        <p className="text-h3 mt-4 text-white">
          {subtitle}
        </p>
        <div className="mt-8 text-body text-gray-300">
          <p>{eventDate}</p>
          <p>{location}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
