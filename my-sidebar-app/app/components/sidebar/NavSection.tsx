import React from 'react';

type NavSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function NavSection({ title, children }: NavSectionProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-xs font-bold text-sidebar-muted-foreground uppercase mb-2 px-2.5">{title}</h2>
      {children}
    </div>
  );
}
