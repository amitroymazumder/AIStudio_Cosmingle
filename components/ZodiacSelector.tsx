import React from 'react';
import { ZODIAC_SIGNS } from '../constants';
import type { ZodiacSign } from '../types';

interface ZodiacSelectorProps {
  title: string;
  selectedSign: ZodiacSign | null;
  onSignSelect: (sign: ZodiacSign) => void;
  disabled?: boolean;
}

export const ZodiacSelector: React.FC<ZodiacSelectorProps> = ({ title, selectedSign, onSignSelect, disabled = false }) => {
  return (
    <div className={`flex flex-col items-center ${disabled ? 'opacity-70' : ''}`}>
      <h2 className="text-2xl font-semibold text-indigo-300 mb-4">{title}</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {ZODIAC_SIGNS.map((sign) => {
          const isSelected = selectedSign?.name === sign.name;
          return (
            <button
              key={sign.name}
              onClick={() => onSignSelect(sign)}
              disabled={disabled}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 transform aspect-square
                ${isSelected 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-110' 
                  : `bg-slate-800/70 ${!disabled && 'hover:bg-slate-700 hover:scale-105'}`
                }
                ${disabled ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              <sign.icon className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="mt-1 text-xs sm:text-sm font-medium">{sign.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
