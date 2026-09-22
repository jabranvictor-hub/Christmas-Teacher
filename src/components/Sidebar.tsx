import React from 'react';
import { ActiveTab, TeacherProfile } from '../types';
import {
  LayoutDashboard,
  GraduationCap,
  CheckCircle2,
  BarChart3,
  CalendarDays,
  Megaphone,
  PartyPopper,
  Bell,
  User,
  LogOut,
  X,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  teacher: TeacherProfile;
  unreadNotifsCount: number;
  unreadAnnouncementsCount: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  teacher,
  unreadNotifsCount,
  unreadAnnouncementsCount,
  isMobileOpen,
  onCloseMobile,
  onLogout,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'students', label: 'My Students', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'attendance', label: 'Attendance', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'timetable', label: 'Timetable', icon: <CalendarDays className="w-4 h-4" /> },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: <Megaphone className="w-4 h-4" />,
      badge: unreadAnnouncementsCount > 0 ? unreadAnnouncementsCount : undefined,
    },
    { id: 'events', label: 'Events', icon: <PartyPopper className="w-4 h-4" /> },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      badge: unreadNotifsCount > 0 ? unreadNotifsCount : undefined,
    },
    { id: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[61px] left-0 h-screen lg:h-[calc(100vh-61px)] w-72 bg-slate-900 border-r border-slate-800 z-50 lg:z-10 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header inside mobile sidebar */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎄</span>
            <div>
              <p className="font-bold text-white text-sm">{teacher.school}</p>
              <p className="text-xs text-emerald-400">Teacher {teacher.name}</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Portal Navigation</span>
            <Sparkles className="w-3 h-3 text-amber-400" />
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-linear-to-r from-red-900/80 to-emerald-950 border border-emerald-500/40 text-white shadow-md shadow-emerald-950/50'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-600 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2">
            <button
              id="sidebar-logout-btn"
              onClick={() => {
                onCloseMobile();
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-950/60 hover:text-red-100 transition-colors border border-transparent hover:border-red-800/40 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Teacher profile summary card at sidebar bottom */}
        <div className="p-3.5 m-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-linear-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-xs text-white">
              A
            </div>
            <div>
              <p className="font-bold text-white">Teacher: {teacher.name}</p>
              <p className="text-[11px] text-emerald-400">{teacher.role} • {teacher.program}</p>
            </div>
          </div>
          <p className="text-slate-300 font-medium mb-1">
            🏫 {teacher.school}
          </p>
          <p className="text-slate-400 flex items-start gap-1 text-[11px] leading-tight">
            <MapPin className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
            <span>Punjab, HMC, Street Number 1, Pakistan 🇵🇰</span>
          </p>
        </div>
      </aside>
    </>
  );
};
