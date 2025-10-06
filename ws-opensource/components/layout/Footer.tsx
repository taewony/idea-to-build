// components/layout/Footer.tsx
import React from 'react';

const Footer = () => {
  const address = '서울특별시 평생교육진흥원';
  const contact = {
    address: '04550 서울특별시 중구 서소문로 120, 2층(서소문동, 라이프플래닝)',
    phone: '02-719-6422',
    fax: '02-719-6422',
    email: '10th@smile.seoul.kr',
  };

  return (
    <footer className="py-8 border-t border-gray-700">
      <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
        <h3 className="font-bold mb-2 text-white">{address}</h3>
        <p>{contact.address}</p>
        <p>
          <span>TEL: {contact.phone}</span> | <span>FAX: {contact.fax}</span>
        </p>
        <p>
          <span>E-mail: {contact.email}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
