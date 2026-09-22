import React from 'react';
import { ActiveTab, TeacherProfile, Student } from '../types';
import { Bell, LogOut, Menu, Snowflake, Trees, UserCheck, UserX } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  teacher: TeacherProfile;
  students: Student[];
  unreadNotifsCount: number;
  snowEnabled: boolean;
  setSnowEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  setActiveTab,
  teacher,
  students,
  unreadNotifsCount,
  snowEnabled,
  setSnowEnabled,
  onLogout,
  onToggleMobileMenu,
}) => {
  const presentCount = students.filter((s) => s.todayStatus === 'present').length;
  const absentCount = students.filter((s) => s.todayStatus === 'absent').length;

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 border-b border-emerald-900/40 backdrop-blur-md px-4 sm:px-6 py-3 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle-btn"
            onClick={onToggleMobileMenu}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-red-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-950 border border-emerald-400/40 group-hover:scale-105 transition-transform">
              <Trees className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  🎄 {teacher.school}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {teacher.program}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-light flex items-center gap-1">
                <span>Teacher Portal</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Teacher {teacher.name}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live attendance quick badge */}
        <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 text-xs">
          <span className="text-slate-400 font-medium">Today's Attendance:</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-semibold">
            <UserCheck className="w-3 h-3 text-emerald-400" />
            <span>{presentCount} Present</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 font-semibold">
            <UserX className="w-3 h-3 text-red-400" />
            <span>{absentCount} Absent</span>
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Snowfall toggle */}
          <button
            id="toggle-snow-btn"
            onClick={() => setSnowEnabled((prev) => !prev)}
            title={snowEnabled ? 'Pause Snowflake Effect' : 'Enable Snowflake Effect'}
            className={`p-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer border ${
              snowEnabled
                ? 'bg-emerald-900/60 border-emerald-500/50 text-emerald-200'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Snowflake className={`w-4 h-4 ${snowEnabled ? 'text-cyan-300 animate-spin-slow' : ''}`} />
            <span className="hidden xl:inline text-xs">{snowEnabled ? 'Snow: On' : 'Snow: Off'}</span>
          </button>

          {/* Notifications button */}
          <button
            id="navbar-notif-btn"
            onClick={() => setActiveTab('notifications')}
            title="View Notifications"
            className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-slate-900 animate-pulse">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* Teacher Profile Quick Pill */}
          <button
            id="navbar-profile-btn"
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-linear-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-xs text-white">
              A
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold leading-tight text-white">Teacher {teacher.name}</p>
              <p className="text-[10px] text-emerald-400 leading-tight">Victor's School</p>
            </div>
          </button>

          {/* Logout button */}
          <button
            id="navbar-logout-btn"
            onClick={onLogout}
            title="Logout of Teacher Portal"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-red-950/70 hover:bg-red-900/90 text-red-200 border border-red-700/50 hover:border-red-500 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
