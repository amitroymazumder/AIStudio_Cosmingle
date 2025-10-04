import React, { useState } from 'react';

interface AuthProps {
    onAuth: (email: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuth }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        // Basic email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        // In a real app, you would have separate logic for login vs signup
        // For this mock, both will just log the user in.
        onAuth(email);
    };

    return (
        <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-indigo-500/10 border border-slate-800 p-8">
            <h2 className="text-3xl font-bold text-center text-indigo-300 mb-2">
                {isLogin ? 'Welcome Back' : 'Join the Cosmos'}
            </h2>
            <p className="text-center text-slate-400 mb-8">
                {isLogin ? 'Log in to continue your journey.' : 'Create an account to get started.'}
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete={isLogin ? "current-password" : "new-password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        placeholder="••••••••"
                    />
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}
                
                <div>
                    <button
                        type="submit"
                        className="w-full px-8 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-500 disabled:bg-slate-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
                    >
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </div>
            </form>
            <div className="mt-6 text-center">
                <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-slate-400 hover:text-indigo-300 transition">
                    {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
                </button>
            </div>
        </div>
    );
};
