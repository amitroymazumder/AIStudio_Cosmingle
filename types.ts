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

export interface User {
  id: string;
  email: string;
  zodiacSign: ZodiacSign;
}
