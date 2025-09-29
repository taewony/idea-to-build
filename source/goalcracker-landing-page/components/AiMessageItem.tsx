
import React from 'react';
import type { AiMessage } from '../types';

interface AiMessageItemProps {
  message: AiMessage;
}

const AiMessageItem: React.FC<AiMessageItemProps> = ({ message }) => {
  return (
    <div className="bg-card-light/70 dark:bg-card-dark/70 rounded-xl shadow-wood p-4 flex items-start space-x-4">
       <div className="flex-shrink-0 size-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
        {message.author.charAt(0)}
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-1">
          <p className="font-bold text-primary dark:text-accent">{message.author}</p>
          <span className="text-xs text-text-light/70 dark:text-text-dark/70">
            to: {message.relatedGoal}
          </span>
        </div>
        <p className="text-text-light dark:text-text-dark">{message.message}</p>
      </div>
    </div>
  );
};

export default AiMessageItem;
