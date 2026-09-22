import React, { useState } from 'react';
import { Sparkles, KeyRound, User, Lock, AlertCircle, School, Gift, Trees } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      if (teacherId.trim() === 'TEACHER001' && password === 'christmas2026') {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError('Invalid Teacher ID or password. Please verify your credentials and try again.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-slate-950 via-slate-900 to-emerald-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative festive glowing spots */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header crest */}
      <div className="w-full max-w-md text-center mb-6 z-10">
        <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 text-xs font-medium tracking-wide mb-3 shadow-inner">
          <Trees className="w-3.5 h-3.5 text-emerald-400" />
          <span>Victor's Christmas School • Christmas Attendance System</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
          <span>🎄</span>
          <span className="bg-linear-to-r from-red-400 via-amber-200 to-emerald-300 bg-clip-text text-transparent">
            Christmas School Teacher Portal
          </span>
        </h1>
        <p className="text-sm text-slate-300 mt-1.5 font-light">
          Official attendance & classroom portal for <span className="font-semibold text-emerald-300">Teacher Aroush</span>
        </p>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md z-10 relative">
        {/* Festive ribbon corner banner */}
        <div className="absolute -top-3 -right-2 bg-linear-to-r from-red-600 to-rose-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg border border-red-400/40 flex items-center gap-1.5">
          <Gift className="w-3 h-3 text-amber-300" />
          <span>Program: Christmas 2026</span>
        </div>

        {/* Portal Sign-in Guidance */}
        <div className="mb-6 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-slate-300 text-xs flex items-center gap-2.5">
          <KeyRound className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Please enter your authorized Teacher ID and password to access the portal.</span>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-950/80 border border-red-500/40 rounded-xl text-red-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>👤 Teacher ID</span>
            </label>
            <div className="relative">
              <input
                id="teacher-id-input"
                type="text"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                placeholder="Enter your Teacher ID"
                className="w-full bg-slate-950/80 border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>🔒 Password</span>
            </label>
            <div className="relative">
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-slate-950/80 border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            {/* Primary Blue LOGIN Button */}
            <button
              id="login-button"
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 border border-blue-400/30 disabled:opacity-60 cursor-pointer"
            >
              <span>🔵</span>
              <span>{isLoading ? 'Verifying Teacher...' : 'LOGIN'}</span>
            </button>
          </div>
        </form>

        {/* Teacher details snippet */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-400 space-y-1 text-center">
          <p className="flex items-center justify-center gap-1.5 font-medium text-slate-300">
            <School className="w-3.5 h-3.5 text-emerald-400" />
            <span>Victor's Christmas School</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Location: Punjab, HMC, Street Number 1, Pakistan 🇵🇰
          </p>
        </div>
      </div>

      {/* Footer copyright / system note */}
      <footer className="mt-8 text-center text-xs text-slate-500 z-10">
        <p>Victor's Christmas School • Christmas Attendance System 2026</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Built for Teacher Aroush & Her Assigned Students</p>
      </footer>
    </div>
  );
};
