import type React from 'react';

export interface ZodiacSign {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface CompatibilityReport {
  sign1: string;
  sign2:string;
  score: number;
  summary: string;
  communication: string;
  emotional: string;
  romance: string;
  challenges: string;
}

export interface PlanetaryPlacement {
  planet: string;
  sign: string;
  interpretation: string;
}

export interface NatalChart {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  planetaryPlacements: PlanetaryPlacement[];
}

export interface Profile {
  username: string;
  fullName: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  birthPlace: string;
  bio: string;
  avatarUrl: string; // Can be a URL or a base64 string
  natalChart: NatalChart | null;
}

export interface User {
  id: string;
  email: string;
  profile: Profile;
}
