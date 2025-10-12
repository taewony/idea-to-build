import React from 'react';

export default function Footer() {
  return (
    <footer className="flex justify-between items-center py-4 px-6 bg-card-bg border-t border-border h-[50px] text-xs text-foreground/60">
      <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
      <div>
        <a href="#" className="text-foreground/60 no-underline ml-5 hover:underline">Terms of Service</a>
        <a href="#" className="text-foreground/60 no-underline ml-5 hover:underline">Privacy Policy</a>
      </div>
    </footer>
  );
}
