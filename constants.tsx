import React from 'react';
import type { ZodiacSign } from './types';

const AriesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M19 15H5v2h14v-2zm-7-9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm-5 8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm10 0c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/></svg>
);
const TaurusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-2-7h4v2h-4v-2zm-2-2c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1zm6 0c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1z"/></svg>
);
const GeminiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M6.5 2c-1.93 0-3.5 1.57-3.5 3.5S4.57 9 6.5 9s3.5-1.57 3.5-3.5S8.43 2 6.5 2zm11 0c-1.93 0-3.5 1.57-3.5 3.5S15.57 9 17.5 9s3.5-1.57 3.5-3.5S19.43 2 17.5 2zM3 11v10h2V11H3zm7 0v10h2V11h-2zm7 0v10h2V11h-2z"/></svg>
);
const CancerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16.99V19h-2v-2.01c-1.79-.57-3-2.17-3-4.18 0-2.35 1.92-4.26 4.27-4.26s4.27 1.91 4.27 4.26c0 2.01-1.21 3.61-3 4.18v2.01h2v-2.01h-2.54z"/></svg>
);
const LeoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
);
const VirgoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M13 7h-2v2h2V7zm-2 4h2v2h-2v-2zm4 0h-2v2h2v-2zM9 11v2H7v-2h2zm4 4h-2v2h2v-2zm4-4h-2v2h2v-2zm-2 4h2v2h-2v-2zM4 2v10h2v-2h2v2h2v-2h2v2h2v-2h2v2h2V2H4zm2 2h2v2H6V4zm4 0h2v2h-2V4zm4 0h2v2h-2V4zm4 0h2v2h-2V4z"/></svg>
);
const LibraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 10H5V8h14v8zM9 11h6v2H9v-2z"/></svg>
);
const ScorpioIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z"/></svg>
);
const SagittariusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M11 2v9.55c-.97.23-1.84.7-2.58 1.34L6 10.47l-1.41 1.41 2.44 2.44c-.64.74-1.11 1.61-1.34 2.58H2v2h5.09c.47 2.28 2.48 4 4.91 4s4.44-1.72 4.91-4H22v-2h-3.69c-.23-.97-.7-1.84-1.34-2.58l2.44-2.44-1.41-1.41-2.42 2.42c-.74-.64-1.61-1.11-2.58-1.34V2h-2z"/></svg>
);
const CapricornIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M4.5 9.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5zm15 0c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5zM12 2c-5.52 0-10 4.48-10 10h2c0-4.41 3.59-8 8-8s8 3.59 8 8h2c0-5.52-4.48-10-10-10zm0 14c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
);
const AquariusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M3 6l9 12 9-12H3zm3.03 2h11.94L12 14.97 6.03 8z"/></svg>
);
const PiscesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
);


export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: 'Aries', icon: AriesIcon },
  { name: 'Taurus', icon: TaurusIcon },
  { name: 'Gemini', icon: GeminiIcon },
  { name: 'Cancer', icon: CancerIcon },
  { name: 'Leo', icon: LeoIcon },
  { name: 'Virgo', icon: VirgoIcon },
  { name: 'Libra', icon: LibraIcon },
  { name: 'Scorpio', icon: ScorpioIcon },
  // Fix: Corrected a typo from `name:-` to `name:`
  { name: 'Sagittarius', icon: SagittariusIcon },
  { name: 'Capricorn', icon: CapricornIcon },
  { name: 'Aquarius', icon: AquariusIcon },
  { name: 'Pisces', icon: PiscesIcon },
];
