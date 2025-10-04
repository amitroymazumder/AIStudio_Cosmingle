import React from 'react';
import type { User } from '../types';

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="w-full max-w-4xl text-center mb-8 md:mb-12 relative">
      <div className="absolute top-0 right-0">
          {user && (
              <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-400 hidden sm:inline">{user.email}</span>
                  <button 
                    onClick={onLogout}
                    className="px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-full hover:bg-slate-600 transition-colors duration-300"
                  >
                      Logout
                  </button>
              </div>
          )}
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient-x">
        Cosmingle
      </h1>
      <p className="mt-2 text-lg sm:text-xl text-indigo-200">
        {user ? 'Check Your Cosmic Compatibility' : 'Sign In to Discover Your Cosmic Connections'}
      </p>
    </header>
  );
};
