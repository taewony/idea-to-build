import React from 'react';

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: string;
}

export default function FeatureCard({ title, desc, icon }: FeatureCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-800 hover:-translate-y-1 hover:border-slate-700 transition-all duration-300">
      <div className="text-4xl">{icon}</div>
      <h5 className="mt-4 font-semibold text-slate-50">{title}</h5>
      <p className="mt-2 text-sm text-slate-400">{desc}</p>
    </div>
  );
}
