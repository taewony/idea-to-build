import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 text-sm text-slate-500 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>© {new Date().getFullYear()} LearnLLM — Made for curious builders</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300">Privacy</a>
          <a href="#" className="hover:text-slate-300">Terms</a>
          <a href="#" className="hover:text-slate-300">Contact</a>
        </div>
      </div>
    </footer>
  );
}
