import React from 'react';
import type { User } from '../types';

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
    onNavigate: (view: 'calculator' | 'profileView') => void;
    currentView: 'calculator' | 'profileView' | 'profileEdit';
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate, currentView }) => {
  const isProfileActive = currentView === 'profileView' || currentView === 'profileEdit';

  return (
    <header className="w-full max-w-4xl text-center mb-8 md:mb-12 relative">
      <div className="absolute top-0 right-0">
          {user && (
              <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => onNavigate('calculator')}
                    className={`px-3 sm:px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${!isProfileActive ? 'bg-indigo-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'}`}
                  >
                    Calculator
                  </button>
                  <button
                    onClick={() => onNavigate('profileView')}
                    className={`px-3 sm:px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${isProfileActive ? 'bg-indigo-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'}`}
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={onLogout}
                    className="px-3 sm:px-4 py-2 bg-slate-700 text-white text-sm font-semibold rounded-full hover:bg-slate-600 transition-colors duration-300"
                  >
                      Logout
                  </button>
              </div>
          )}
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient-x mt-16 sm:mt-12 md:mt-0">
        Cosmingle
      </h1>
      <p className="mt-2 text-lg sm:text-xl text-indigo-200">
        {user ? 'Discover Your Cosmic Connections' : 'Sign In to Begin'}
      </p>
    </header>
  );
};
