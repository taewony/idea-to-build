// components/layout/Header.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
    { href: '#intro', label: 'Intro' },
    { href: '#message', label: '초대 메시지' },
    { href: '#program', label: '프로그램 구성' },
    { href: '#ceremony', label: '10주년 기념식' },
    { href: '#forum', label: '평생학습포럼' },
    { href: '#session', label: '시민 체험 세션' },
    { href: '#location', label: '오시는 길' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[var(--color-background)] shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <Link href="/" className="text-xl font-bold text-[var(--color-text-default)]">
            WooSong
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open Menu">
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;