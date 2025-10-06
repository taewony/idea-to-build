
import React from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginClick, onLogoutClick }) => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-800">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
           <svg className="w-8 h-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
            </svg>

          <span className="text-xl font-bold text-white">GameFinder</span>
        </div>
        {isLoggedIn ? (
          <button
            onClick={onLogoutClick}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={onLoginClick}
            className="px-4 py-2 text-sm font-semibold text-slate-900 bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors duration-300"
          >
            Sign In for More
          </button>
        )}
      </nav>
    </header>
  );
};
