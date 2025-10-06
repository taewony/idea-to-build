import React from 'react';

interface LabCardProps {
  title: string;
  subtitle: string;
}

export default function LabCard({ title, subtitle }: LabCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-md hover:shadow-lg hover:border-slate-700 transition-all">
      <div className="font-semibold text-slate-50">{title}</div>
      <div className="mt-2 text-sm text-slate-400">{subtitle}</div>
      <div className="mt-6">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 border border-slate-800 bg-transparent hover:bg-slate-800 h-9 px-4 py-2">Open Lab</button>
      </div>
    </div>
  );
}