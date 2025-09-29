
import React from 'react';
import type { Goal } from '../types';

interface MyGoalItemProps {
  goal: Goal;
}

const MyGoalItem: React.FC<MyGoalItemProps> = ({ goal }) => {
  const isOfficial = goal.type === 'official';
  return (
    <div className="flex items-center justify-between bg-background-light dark:bg-background-dark p-3 rounded-lg shadow-inner">
      <span className="font-medium">{goal.title}</span>
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          isOfficial 
            ? 'bg-accent/80 text-white' 
            : 'bg-primary/80 text-white'
        }`}>
        {isOfficial ? '공식' : '개인'}
      </span>
    </div>
  );
};

export default MyGoalItem;
