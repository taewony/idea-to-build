// components/sections/LocationSection.tsx
import React from 'react';

const LocationSection = () => {
  const title = "오시는 길";
  const address = "서울시민대학 동남권캠퍼스 (강동구 고덕)";
  const fullAddress = "서울특별시 강동구 고덕로 399";
  const transportInfo = [
    "지하철: 5호선 고덕역 4번 출구, 도보 10분",
    "버스: 3412, 3413번 버스 이용, '고덕 아이파크' 정류장 하차",
  ];

  return (
    <section id="location" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-h2 text-center mb-12">{title}</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-h3 mb-4 text-white">{address}</h3>
            <p className="text-body mb-6 text-gray-300">{fullAddress}</p>
            <div className="space-y-2">
              {transportInfo.map((info, index) => (
                <p key={index} className="text-body text-gray-400">{info}</p>
              ))}
            </div>
          </div>
          <div className="bg-gray-800 w-full h-80 rounded-[var(--border-radius-medium)] flex items-center justify-center">
            <p className="text-gray-400">Kakao Map Embed Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
