import React from 'react';
import type { NatalChart } from '../types';
import { ZODIAC_SIGNS } from '../constants';

interface AstrologyChartDisplayProps {
  chart: NatalChart;
}

const ChartCard: React.FC<{ title: string, sign: string, icon: React.FC<React.SVGProps<SVGSVGElement>> | undefined }> = ({ title, sign, icon: Icon }) => (
    <div className="flex flex-col items-center justify-center text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700 h-full">
        <p className="text-sm text-indigo-300 font-semibold">{title}</p>
        {Icon && <Icon className="w-12 h-12 my-2 text-purple-400" />}
        <p className="text-lg font-bold text-white">{sign}</p>
    </div>
);

const PlanetRow: React.FC<{ planet: string, sign: string, interpretation: string }> = ({ planet, sign, interpretation }) => {
    const PlanetIcon = ZODIAC_SIGNS.find(s => s.name === sign)?.icon;
    return (
        <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-800/40 transition-colors duration-200">
            <div className="flex-shrink-0 w-20 text-right">
                <p className="font-bold text-slate-200">{planet}</p>
                <p className="text-sm text-indigo-300">{sign}</p>
            </div>
            <div className="flex-shrink-0 mt-1">
                {PlanetIcon && <PlanetIcon className="w-6 h-6 text-slate-400" />}
            </div>
            <p className="text-slate-400 leading-relaxed">
                {interpretation}
            </p>
        </div>
    );
};

export const AstrologyChartDisplay: React.FC<AstrologyChartDisplayProps> = ({ chart }) => {
  const getIcon = (signName: string) => ZODIAC_SIGNS.find(s => s.name === signName)?.icon;

  return (
    <div className="space-y-8">
        <div>
            <h3 className="text-2xl font-bold text-center text-indigo-300 mb-6">Your Big Three</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <ChartCard title="Sun Sign" sign={chart.sunSign} icon={getIcon(chart.sunSign)} />
                <ChartCard title="Moon Sign" sign={chart.moonSign} icon={getIcon(chart.moonSign)} />
                <ChartCard title="Rising Sign" sign={chart.risingSign} icon={getIcon(chart.risingSign)} />
            </div>
        </div>
        
        <div>
            <h3 className="text-2xl font-bold text-center text-indigo-300 mb-6">Planetary Placements</h3>
            <div className="bg-slate-800/20 rounded-xl p-4 border border-slate-800 divide-y divide-slate-700/50">
                {chart.planetaryPlacements.map(p => (
                    <PlanetRow key={p.planet} {...p} />
                ))}
            </div>
        </div>
    </div>
  );
};
