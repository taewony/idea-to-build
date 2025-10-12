
import React from 'react';
import { ComponentType } from '../../types';

interface HeaderProps {
  activeComponent: ComponentType;
  isDarkMode: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeComponent, isDarkMode, toggleTheme, toggleSidebar }) => {
  return (
    <header className="flex flex-shrink-0 items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-gray-700/50 px-4 sm:px-6 h-16">
      <div className="flex items-center gap-4">
        <button className="sm:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300" onClick={toggleSidebar}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="hidden sm:flex items-center gap-4">
            <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Stitch</h2>
        </div>
         <div className="text-sm font-medium text-gray-500 dark:text-gray-400">/ {activeComponent}</div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={toggleTheme} className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/50">
          <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/50">
            <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/id/237/200/200')` }}></div>
      </div>
    </header>
  );
};

export default Header;
