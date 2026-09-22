import React from 'react';
import { TeacherProfile } from '../types';
import { User, School, MapPin, Award, Calendar, Phone, Mail, ShieldCheck, LogOut, CheckCircle2, Trees, Sparkles } from 'lucide-react';

interface ProfileViewProps {
  teacher: TeacherProfile;
  totalStudents: number;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ teacher, totalStudents, onLogout }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header Hero */}
      <div className="relative rounded-2xl bg-linear-to-r from-red-950 via-slate-900 to-emerald-950 border border-emerald-500/30 p-6 sm:p-8 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-amber-500 via-rose-600 to-emerald-600 flex items-center justify-center font-extrabold text-3xl text-white shadow-xl border-2 border-white/20">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Teacher {teacher.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                  Active
                </span>
              </div>
              <p className="text-sm text-emerald-400 font-medium mt-0.5">
                {teacher.role} • {teacher.department}
              </p>
              <p className="text-xs text-slate-300 font-mono mt-1">
                Teacher ID: <strong className="text-amber-300 font-bold">{teacher.id}</strong>
              </p>
            </div>
          </div>

          <button
            id="profile-logout-btn"
            onClick={onLogout}
            className="px-4 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-700/60 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Logout Portal</span>
          </button>
        </div>
      </div>

      {/* Required Teacher Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Official School Credentials */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <School className="w-4 h-4 text-amber-400" />
            <span>School & Program Affiliation</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start justify-between">
              <span className="text-xs text-slate-400">Teacher:</span>
              <span className="font-bold text-white text-right">{teacher.name}</span>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-xs text-slate-400">Role:</span>
              <span className="font-semibold text-emerald-400 text-right">{teacher.role}</span>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-xs text-slate-400">School:</span>
              <span className="font-bold text-white text-right">{teacher.school}</span>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-xs text-slate-400">Program:</span>
              <span className="font-semibold text-rose-300 text-right">{teacher.program}</span>
            </div>

            <div className="flex items-start justify-between pt-1 border-t border-slate-800">
              <span className="text-xs text-slate-400">Location:</span>
              <span className="font-medium text-slate-200 text-right text-xs max-w-[240px]">
                {teacher.location}
              </span>
            </div>
          </div>
        </div>

        {/* Assigned Duties & Classroom Responsibilities */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Classroom Duties & System Access</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start justify-between">
              <span className="text-xs text-slate-400">Assigned Students:</span>
              <span className="font-bold text-white font-mono text-right">{totalStudents} Students (Arnan, Eliab, Balaj)</span>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-xs text-slate-400">Assigned Grades:</span>
              <span className="font-medium text-amber-300 text-right">Grade 1 & Grade 4</span>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-xs text-slate-400">Attendance Permission:</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-400 text-right text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authorized Roll Call</span>
              </span>
            </div>

            <div className="flex items-start justify-between">
              <span className="text-xs text-slate-400">Principal Reporting:</span>
              <span className="font-medium text-slate-200 text-right">Principal Victor</span>
            </div>

            <div className="flex items-start justify-between pt-1 border-t border-slate-800">
              <span className="text-xs text-slate-400">System Mode:</span>
              <span className="font-mono text-xs text-emerald-300 text-right">Active Teacher Session</span>
            </div>
          </div>
        </div>
      </div>

      {/* School Contact Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3 text-xs">
        <div className="flex items-center gap-2 text-white font-bold">
          <Trees className="w-4 h-4 text-emerald-400" />
          <span>Victor's Christmas School Portal Information</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          The Christmas School Teacher Portal connects faculty to attendance logs, announcements, events, and family guardian records. For changes to student enrollment or official circulars, contact the Principal's administration office at Punjab, HMC, Street Number 1, Pakistan.
        </p>
      </div>
    </div>
  );
};
