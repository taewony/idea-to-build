import React from 'react';

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-card-bg border-b border-border h-[60px]">
      <div className="text-xl font-semibold">Dashboard</div>
      <div className="flex items-center gap-5">
        <input 
          type="text" 
          placeholder="Search..." 
          className="py-2 px-3 rounded-md border border-border text-sm bg-background text-foreground"
        />
        <button className="bg-transparent border-none cursor-pointer text-sm text-foreground">Notifications</button>
        <button className="bg-transparent border-none cursor-pointer text-sm text-foreground">Profile</button>
      </div>
    </header>
  );
}
