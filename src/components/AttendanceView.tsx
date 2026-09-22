import React, { useState } from 'react';
import { Student } from '../types';
import {
  CheckCircle2,
  XCircle,
  Search,
  UserCheck,
  UserX,
  Users,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Phone,
  Clock,
  Filter,
} from 'lucide-react';

interface AttendanceViewProps {
  students: Student[];
  onMarkPresent: (studentId: string) => void;
  onMarkAbsent: (studentId: string) => void;
  onSelectStudent: (student: Student) => void;
}

type AttendanceFilter = 'all' | 'present' | 'absent';

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  students,
  onMarkPresent,
  onMarkAbsent,
  onSelectStudent,
}) => {
  const [filter, setFilter] = useState<AttendanceFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const presentCount = students.filter((s) => s.todayStatus === 'present').length;
  const absentCount = students.filter((s) => s.todayStatus === 'absent').length;

  const filteredStudents = students.filter((student) => {
    // Attendance filter
    if (filter === 'present' && student.todayStatus !== 'present') return false;
    if (filter === 'absent' && student.todayStatus !== 'absent') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = student.name.toLowerCase().includes(q);
      const matchGrade = student.grade.toLowerCase().includes(q);
      const matchParent = student.parentName.toLowerCase().includes(q);
      const matchId = student.id.toLowerCase().includes(q);
      return matchName || matchGrade || matchParent || matchId;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Attendance Management
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Christmas 2026 Daily Roll Call • Victor's Christmas School
          </p>
        </div>

        {/* Counter chips */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400">Total: </span>
            <span className="font-bold text-white font-mono">{students.length}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300">
            <span>🟢 Present: </span>
            <span className="font-bold font-mono">{presentCount}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-red-950/80 border border-red-500/40 text-xs text-red-300">
            <span>🔴 Absent: </span>
            <span className="font-bold font-mono">{absentCount}</span>
          </div>
        </div>
      </div>

      {/* TWO LARGE VIEW/FILTER BUTTONS (Required by User Prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 🟢 VIEW PRESENT STUDENTS */}
        <button
          id="btn-view-present-students"
          type="button"
          onClick={() => setFilter('present')}
          className={`py-4 px-6 rounded-2xl border transition-all duration-200 flex items-center justify-between shadow-xl cursor-pointer group ${
            filter === 'present'
              ? 'bg-linear-to-r from-emerald-900 to-teal-950 border-emerald-400 ring-2 ring-emerald-500/50 scale-[1.01]'
              : 'bg-slate-900/90 hover:bg-emerald-950/40 border-emerald-500/40 hover:border-emerald-400'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🟢
            </div>
            <div className="text-left">
              <span className="text-base sm:text-lg font-extrabold text-white block tracking-wide">
                VIEW PRESENT STUDENTS
              </span>
              <span className="text-xs text-emerald-300">
                Filters view to show only students currently marked Present
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold font-mono text-sm sm:text-base">
              {presentCount} Students
            </span>
          </div>
        </button>

        {/* 🔴 VIEW ABSENT STUDENTS */}
        <button
          id="btn-view-absent-students"
          type="button"
          onClick={() => setFilter('absent')}
          className={`py-4 px-6 rounded-2xl border transition-all duration-200 flex items-center justify-between shadow-xl cursor-pointer group ${
            filter === 'absent'
              ? 'bg-linear-to-r from-red-900 to-rose-950 border-red-400 ring-2 ring-red-500/50 scale-[1.01]'
              : 'bg-slate-900/90 hover:bg-red-950/40 border-red-500/40 hover:border-red-400'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🔴
            </div>
            <div className="text-left">
              <span className="text-base sm:text-lg font-extrabold text-white block tracking-wide">
                VIEW ABSENT STUDENTS
              </span>
              <span className="text-xs text-red-300">
                Filters view to show only students currently marked Absent
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="px-3 py-1 rounded-full bg-red-950 border border-red-500/50 text-red-300 font-bold font-mono text-sm sm:text-base">
              {absentCount} Students
            </span>
          </div>
        </button>
      </div>

      {/* Secondary filter chips + Search Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Quick filter buttons: ALL STUDENTS, PRESENT, ABSENT */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter:</span>
            </span>

            <button
              id="filter-all-students-btn"
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50 border border-blue-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              ALL STUDENTS ({students.length})
            </button>

            <button
              id="filter-present-btn"
              type="button"
              onClick={() => setFilter('present')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                filter === 'present'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50 border border-emerald-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <span>🟢</span>
              <span>PRESENT ({presentCount})</span>
            </button>

            <button
              id="filter-absent-btn"
              type="button"
              onClick={() => setFilter('absent')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                filter === 'absent'
                  ? 'bg-red-600 text-white shadow-md shadow-red-900/50 border border-red-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <span>🔴</span>
              <span>ABSENT ({absentCount})</span>
            </button>
          </div>

          {/* Search Box: "Search student..." */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="attendance-search-student-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Current Active Filter Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
          <div>
            Showing: <span className="text-white font-semibold capitalize">{filter} Students</span>
            {searchQuery && (
              <span> matching "<span className="text-emerald-300">{searchQuery}</span>"</span>
            )}
            {' '}({filteredStudents.length} of {students.length} students)
          </div>
          {filter !== 'all' && (
            <button
              onClick={() => setFilter('all')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer underline"
            >
              Reset to All Students
            </button>
          )}
        </div>
      </div>

      {/* Student Attendance Cards */}
      <div className="space-y-3">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => {
            const isPresent = student.todayStatus === 'present';
            return (
              <div
                key={student.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
              >
                {/* Left: Avatar + Details */}
                <div
                  onClick={() => onSelectStudent(student)}
                  className="flex items-start sm:items-center gap-3.5 cursor-pointer group flex-1"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${student.avatarColor} flex items-center justify-center font-bold text-white text-lg shadow-md shrink-0`}
                  >
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {student.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 font-semibold border border-amber-500/30">
                        {student.grade}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        ({student.id})
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Guardian: <strong className="text-slate-300 font-medium">{student.parentName}</strong></span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{student.parentPhone}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Status badge & Toggle actions */}
                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <div className="text-right hidden md:block">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        isPresent
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : 'bg-red-950 text-red-300 border border-red-500/40'
                      }`}
                    >
                      {isPresent ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                      <span>{isPresent ? '🟢 Present Today' : '🔴 Absent Today'}</span>
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {student.attendanceUpdatedAt || 'Recorded'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id={`attendance-mark-present-${student.id}`}
                      type="button"
                      onClick={() => onMarkPresent(student.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                        isPresent
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-600'
                      }`}
                    >
                      <span>🟢</span>
                      <span>Mark Present</span>
                    </button>

                    <button
                      id={`attendance-mark-absent-${student.id}`}
                      type="button"
                      onClick={() => onMarkAbsent(student.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                        !isPresent
                          ? 'bg-red-600 text-white border-red-400 shadow-md shadow-red-950'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-red-950 hover:text-red-300 hover:border-red-600'
                      }`}
                    >
                      <span>🔴</span>
                      <span>Mark Absent</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400">
            <p className="text-sm">No students found matching your criteria.</p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
