import React from 'react';

interface FooterProps {
  onShowSchema: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowSchema }) => {
  return (
    <footer className="w-full max-w-4xl text-center text-sm text-slate-500 mt-12 py-4 border-t border-slate-800">
      <p>Powered by the Stars & Gemini AI</p>
      <div className="mt-2">
        <button onClick={onShowSchema} className="text-slate-400 hover:text-indigo-300 transition-colors">
          View Database Schema
        </button>
        <span className="mx-2">|</span>
        <span>&copy; {new Date().getFullYear()} Cosmingle. All rights reserved.</span>
      </div>
    </footer>
  );
};
