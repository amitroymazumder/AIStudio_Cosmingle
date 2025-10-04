import React, { useState, useCallback } from 'react';
import { getCompatibilityReport } from './services/geminiService';
import type { ZodiacSign, CompatibilityReport, User } from './types';
import { ZODIAC_SIGNS } from './constants';
import { ZodiacSelector } from './components/ZodiacSelector';
import { CompatibilityResult } from './components/CompatibilityResult';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Auth } from './components/Auth';
import { SchemaDisplay } from './components/SchemaDisplay';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [person1Sign, setPerson1Sign] = useState<ZodiacSign | null>(null);
  const [person2Sign, setPerson2Sign] = useState<ZodiacSign | null>(null);
  const [report, setReport] = useState<CompatibilityReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSchema, setShowSchema] = useState<boolean>(false);

  const handleLogin = (email: string) => {
    // In a real app, you'd call your auth provider.
    // Here, we'll create a mock user.
    const mockUser: User = {
      id: '123',
      email: email,
      // Let's assign a random sign for demo purposes
      zodiacSign: ZODIAC_SIGNS[Math.floor(Math.random() * ZODIAC_SIGNS.length)],
    };
    setCurrentUser(mockUser);
    setPerson1Sign(mockUser.zodiacSign);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPerson1Sign(null);
    setPerson2Sign(null);
    setReport(null);
  };

  const handleCalculate = useCallback(async () => {
    if (!person1Sign || !person2Sign) {
      setError('Please select a zodiac sign for both people.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setReport(null);
    try {
      const result = await getCompatibilityReport(person1Sign.name, person2Sign.name);
      setReport(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate compatibility report. The cosmos might be busy, please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [person1Sign, person2Sign]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c0a1e] to-[#1a1a3d] font-sans text-gray-200 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <Header user={currentUser} onLogout={handleLogout} />
      <main className="w-full max-w-4xl flex-grow flex flex-col items-center justify-center">
        {!currentUser ? (
          <Auth onAuth={handleLogin} />
        ) : (
          <>
            <div className="w-full bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-indigo-500/10 border border-slate-800 p-6 sm:p-8 md:p-10 transform transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <ZodiacSelector
                  title="You"
                  selectedSign={person1Sign}
                  onSignSelect={setPerson1Sign}
                  disabled
                />
                <ZodiacSelector
                  title="Your Partner"
                  selectedSign={person2Sign}
                  onSignSelect={setPerson2Sign}
                />
              </div>
              <div className="text-center">
                <button
                  onClick={handleCalculate}
                  disabled={isLoading || !person1Sign || !person2Sign}
                  className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
                >
                  {isLoading ? 'Consulting the Stars...' : 'Calculate Cosmic Compatibility'}
                </button>
              </div>
            </div>

            {isLoading && (
              <div className="mt-10 text-center">
                <LoadingSpinner />
                <p className="mt-4 text-indigo-300 animate-pulse">
                  Aligning planets and reading celestial charts...
                </p>
              </div>
            )}
            
            {error && (
              <div className="mt-10 w-full max-w-2xl text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                <p><strong>Cosmic Error:</strong> {error}</p>
              </div>
            )}

            {report && !isLoading && (
              <div className="mt-10 w-full">
                <CompatibilityResult report={report} />
              </div>
            )}
          </>
        )}
        {showSchema && <SchemaDisplay onClose={() => setShowSchema(false)} />}
      </main>
      <Footer onShowSchema={() => setShowSchema(true)} />
    </div>
  );
};

export default App;
