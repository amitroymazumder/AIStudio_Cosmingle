
import React from 'react';
import type { CompatibilityReport, ZodiacSign } from '../types';
import { ZODIAC_SIGNS } from '../constants';

interface CompatibilityResultProps {
  report: CompatibilityReport;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
    <h3 className="text-xl font-bold text-indigo-300 mb-3">{title}</h3>
    <p className="text-slate-300 leading-relaxed">{children}</p>
  </div>
);

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 52; // 2 * pi * radius
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let scoreColorClass = 'text-green-400';
  if (score < 75) scoreColorClass = 'text-yellow-400';
  if (score < 50) scoreColorClass = 'text-orange-400';

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          className="text-slate-700"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
        />
        <circle
          className={`${scoreColorClass.replace('text-','stroke-')} transition-all duration-1000 ease-out`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${scoreColorClass}`}>
        <span className="text-4xl font-bold">{score}</span>
        <span className="text-sm font-medium">%</span>
      </div>
    </div>
  );
};

export const CompatibilityResult: React.FC<CompatibilityResultProps> = ({ report }) => {
  const Sign1Icon = ZODIAC_SIGNS.find(s => s.name === report.sign1)?.icon;
  const Sign2Icon = ZODIAC_SIGNS.find(s => s.name === report.sign2)?.icon;
  
  return (
    <div className="w-full max-w-4xl bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-purple-500/10 border border-slate-800 p-6 sm:p-8 md:p-10 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-slate-700">
        <div className="flex items-center gap-4">
          {Sign1Icon && <Sign1Icon className="w-16 h-16 text-pink-400" />}
          <span className="text-3xl font-bold text-slate-300">{report.sign1}</span>
        </div>
        <div className="text-4xl text-purple-400 font-light my-4 md:my-0">&</div>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-slate-300">{report.sign2}</span>
          {Sign2Icon && <Sign2Icon className="w-16 h-16 text-indigo-400" />}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col items-center justify-center text-center gap-4 p-6 bg-slate-800/30 rounded-xl">
          <h3 className="text-xl font-bold text-indigo-300">Cosmic Score</h3>
          <ScoreCircle score={report.score} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <ResultCard title="Overall Summary">{report.summary}</ResultCard>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResultCard title="💬 Communication">{report.communication}</ResultCard>
        <ResultCard title="💖 Emotional Connection">{report.emotional}</ResultCard>
        <ResultCard title="🔥 Romance & Passion">{report.romance}</ResultCard>
        <ResultCard title="⚠️ Potential Challenges">{report.challenges}</ResultCard>
      </div>
    </div>
  );
};
