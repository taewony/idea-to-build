import React from 'react';

type TabProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
};

export default function Tab({ children, icon, onClick }: TabProps) {
  return (
    <div 
      className="flex items-center py-2.5 px-4 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-sidebar-hover-bg text-sm"
      onClick={onClick}
    >
      {icon && <span className="mr-2.5">{icon}</span>}
      {children}
    </div>
  );
}
