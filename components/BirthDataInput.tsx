import React from 'react';

interface BirthDataInputProps {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  onBirthDataChange: (field: 'birthDate' | 'birthTime' | 'birthPlace', value: string) => void;
}

export const BirthDataInput: React.FC<BirthDataInputProps> = ({ birthDate, birthTime, birthPlace, onBirthDataChange }) => {
  return (
    <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
      <h3 className="text-xl font-semibold text-indigo-300 mb-1">Your Birth Details</h3>
      <p className="text-sm text-slate-400 mb-4">
        This information is used to generate your unique astrological natal chart.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-slate-300 mb-2">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            value={birthDate}
            onChange={(e) => onBirthDataChange('birthDate', e.target.value)}
            className="w-full input-style"
            required
          />
        </div>
        <div>
          <label htmlFor="birthTime" className="block text-sm font-medium text-slate-300 mb-2">Birth Time</label>
          <input
            type="time"
            name="birthTime"
            id="birthTime"
            value={birthTime}
            onChange={(e) => onBirthDataChange('birthTime', e.target.value)}
            className="w-full input-style"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="birthPlace" className="block text-sm font-medium text-slate-300 mb-2">Birth Place (City, Country)</label>
          <input
            type="text"
            name="birthPlace"
            id="birthPlace"
            value={birthPlace}
            onChange={(e) => onBirthDataChange('birthPlace', e.target.value)}
            placeholder="e.g., New York, USA"
            className="w-full input-style"
            required
          />
        </div>
      </div>
    </div>
  );
};
