"use client";

import React, { useState } from 'react';

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <div 
        className="flex justify-between items-center py-2.5 px-4 cursor-pointer rounded-lg transition-colors duration-200 hover:bg-sidebar-hover-bg text-sm"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </div>
      {isOpen && (
        <div className="pt-1.5 pb-1.5 pl-5 pr-1.25 flex flex-col gap-1.25 text-sm">
          {React.Children.map(children, (child) => (
            <div className="py-2 px-2.5 rounded-md cursor-pointer transition-colors duration-200 hover:bg-sidebar-hover-bg">
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
