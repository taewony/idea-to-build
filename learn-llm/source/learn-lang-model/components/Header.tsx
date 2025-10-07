import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const linkClass = "text-slate-400 hover:text-slate-50 transition-colors";
  const activeLinkClass = "text-slate-50 font-medium";

  return (
    <header className="max-w-6xl mx-auto p-6 flex items-center justify-between sticky top-0 bg-slate-950/80 backdrop-blur-sm z-10 border-b border-slate-800/50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-50 font-bold shadow-md">LL</div>
        <div>
          <h1 className="text-lg font-semibold text-slate-50">LearnLLM</h1>
          <p className="text-sm text-slate-400">From fundamentals to local Small‑LMs</p>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <NavLink to="/" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Home</NavLink>
        <NavLink to="/community" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Community</NavLink>
        <a href="/#labs" className={linkClass}>Labs</a>
        <NavLink to="/learn/build-llm-from-scratch" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Local LM</NavLink>
      </nav>
      <div>
         <a href="#pricing" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-slate-50 text-slate-900 hover:bg-slate-50/90 h-10 px-4 py-2">Get Started</a>
      </div>
    </header>
  );
}