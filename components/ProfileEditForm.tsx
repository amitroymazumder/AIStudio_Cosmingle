import React, { useState } from 'react';
import type { User, Profile } from '../types';
import { BirthDataInput } from './BirthDataInput';

interface ProfileEditFormProps {
  user: User;
  onSave: (updatedProfile: Profile) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ user, onSave, onCancel, isLoading, error }) => {
  const [profile, setProfile] = useState<Profile>(user.profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleBirthDataChange = (field: 'birthDate' | 'birthTime' | 'birthPlace', value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfile({ ...profile, avatarUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <div className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-indigo-500/10 border border-slate-800 p-6 sm:p-8 md:p-10 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-indigo-300 mb-8">Edit Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="flex items-center gap-6">
          <img src={profile.avatarUrl} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover border-4 border-slate-700" />
          <div>
            <label htmlFor="avatar-upload" className="block text-sm font-medium text-slate-300 mb-2">
              Profile Picture
            </label>
            <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"/>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input type="text" name="fullName" id="fullName" value={profile.fullName} onChange={handleChange} className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <input type="text" name="username" id="username" value={profile.username} onChange={handleChange} className="w-full input-style" />
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
          <textarea name="bio" id="bio" rows={3} value={profile.bio} onChange={handleChange} className="w-full input-style"></textarea>
        </div>

        <BirthDataInput
          birthDate={profile.birthDate}
          birthTime={profile.birthTime}
          birthPlace={profile.birthPlace}
          onBirthDataChange={handleBirthDataChange}
        />

        {error && (
            <div className="text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                <p><strong>Cosmic Error:</strong> {error}</p>
            </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 bg-slate-700 text-white font-semibold rounded-full hover:bg-slate-600 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isLoading} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-wait transition-colors">
            {isLoading ? 'Calculating...' : 'Calculate & Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Add a shared style class to index.html or a global CSS file for consistency
const InputStyle: React.FC = () => (
    <style>{`
        .input-style {
            background-color: #1e293b; /* slate-800 */
            border: 1px solid #334155; /* slate-700 */
            border-radius: 0.375rem; /* rounded-md */
            padding: 0.5rem 1rem;
            color: white;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-style:focus {
            outline: none;
            border-color: #6366f1; /* indigo-500 */
            box-shadow: 0 0 0 2px #4f46e5; /* ring-2 ring-indigo-600 */
        }
    `}</style>
  );
  
// It's better to add this to your main stylesheet, but for this component structure it's included here.
(function() {
    if (document.getElementById('input-style-sheet')) return;
    const style = document.createElement('style');
    style.id = 'input-style-sheet';
    style.innerHTML = `
    .input-style {
        background-color: rgb(30 41 59 / 1);
        border: 1px solid rgb(51 65 85 / 1);
        border-radius: 0.375rem;
        padding: 0.5rem 1rem;
        color: white;
        width: 100%;
        transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input-style::placeholder {
        color: rgb(100 116 139 / 1);
    }
    .input-style:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 2px #4338ca;
    }
    `;
    document.head.appendChild(style);
})();
