import React from 'react';

interface StepProps {
  num: number;
  title: string;
  text: string;
}

export default function Step({ num, title, text }: StepProps) {
  return (
    <li className="flex gap-4 items-start">
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-800 font-semibold text-slate-400">{num}</div>
      <div>
        <div className="font-semibold text-slate-50">{title}</div>
        <div className="text-sm text-slate-400 mt-1">{text}</div>
      </div>
    </li>
  );
}
