
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md shadow-wood">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="text-primary size-8">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">GoalCracker</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-primary font-semibold border-b-2 border-primary" href="#">Home</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">My Goals</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Challenges</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">AI Wall</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Community</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">notifications</span>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: `url("https://picsum.photos/seed/avatar/100")`}}></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
