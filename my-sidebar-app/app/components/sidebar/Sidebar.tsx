"use client";

import React from 'react';

type SidebarProps = {
  children: React.ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-[250px] h-screen bg-sidebar-bg text-sidebar-foreground p-5 flex flex-col shadow-lg">
      <div className="text-2xl font-bold mb-8 text-center text-white">My App</div>
      <nav className="flex flex-col gap-5">
        {children}
      </nav>
    </aside>
  );
}
