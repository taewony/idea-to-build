
import React from 'react';

const WelcomeShowcase: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">Welcome to Stitch Design System</h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
        Select a component from the sidebar to view its showcase and documentation. This application demonstrates various UI elements built with React and Tailwind CSS.
      </p>
    </div>
  );
};

export default WelcomeShowcase;
