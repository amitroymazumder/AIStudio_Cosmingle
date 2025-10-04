import React from 'react';
import type { User } from '../types';
import { AstrologyChartDisplay } from './AstrologyChartDisplay';

interface ProfileViewProps {
  user: User;
  onEdit: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onEdit }) => {
  const { profile } = user;

  return (
    <div className="w-full max-w-4xl bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-purple-500/10 border border-slate-800 p-6 sm:p-8 md:p-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-8 pb-6 border-b border-slate-700">
        <img
          src={profile.avatarUrl}
          alt="User Avatar"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-indigo-500/50 shadow-lg"
        />
        <div className="text-center sm:text-left flex-grow">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{profile.fullName}</h2>
          <p className="text-lg text-indigo-300">@{profile.username}</p>
          <p className="mt-2 text-slate-400 max-w-lg">{profile.bio}</p>
        </div>
        <button
          onClick={onEdit}
          className="px-6 py-2 bg-slate-700 text-white font-semibold rounded-full hover:bg-slate-600 transition-colors duration-300 self-center sm:self-start"
        >
          Edit Profile
        </button>
      </div>

      {profile.natalChart ? (
        <AstrologyChartDisplay chart={profile.natalChart} />
      ) : (
        <div className="text-center py-10 px-6 bg-slate-800/40 rounded-lg">
          <h3 className="text-2xl font-bold text-indigo-300">Complete Your Cosmic Profile!</h3>
          <p className="mt-2 text-slate-400">
            Add your birth details to generate your personal natal chart and unlock deeper insights.
          </p>
          <button
            onClick={onEdit}
            className="mt-6 px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30"
          >
            Add Birth Info
          </button>
        </div>
      )}
    </div>
  );
};
