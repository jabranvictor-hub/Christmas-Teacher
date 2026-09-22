import React from 'react';
import { Student, TeacherProfile, Announcement, ChristmasEvent, TimetableItem, ActiveTab } from '../types';
import {
  Users,
  CheckCircle,
  XCircle,
  BookOpen,
  Megaphone,
  PartyPopper,
  ArrowRight,
  Sparkles,
  Trees,
  Clock,
  UserCheck,
  UserX,
  ExternalLink,
} from 'lucide-react';

interface DashboardViewProps {
  teacher: TeacherProfile;
  students: Student[];
  announcements: Announcement[];
  events: ChristmasEvent[];
  timetable: TimetableItem[];
  onNavigate: (tab: ActiveTab) => void;
  onMarkPresent: (studentId: string) => void;
  onMarkAbsent: (studentId: string) => void;
  onSelectStudent: (student: Student) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  teacher,
  students,
  announcements,
  events,
  timetable,
  onNavigate,
  onMarkPresent,
  onMarkAbsent,
  onSelectStudent,
}) => {
  const totalStudents = students.length;
  const presentCount = students.filter((s) => s.todayStatus === 'present').length;
  const absentCount = students.filter((s) => s.todayStatus === 'absent').length;
  const attendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  // Distinct classes
  const classesList = Array.from(new Set(students.map((s) => s.grade)));

  return (
    <div className="space-y-6">
      {/* Festive Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-red-950 via-slate-900 to-emerald-950 border border-emerald-500/30 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-20 w-60 h-60 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold">
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>🎄 {teacher.school} • {teacher.program}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2 flex-wrap">
              <span>👩‍🏫</span>
              <span>Welcome, Teacher {teacher.name}!</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light">
              Welcome to your Victor's Christmas School Teacher Portal. Record daily Christmas choir and class attendance, review school timetable, check announcements from Principal Victor, and support your students.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-emerald-300">Teacher:</span> {teacher.name} ({teacher.role})
              <span>•</span>
              <span className="font-semibold text-emerald-300">Location:</span> Punjab, HMC, Street 1, Pakistan 🇵🇰
            </div>
          </div>

          {/* Today's Attendance Quick Summary Box */}
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-4 sm:p-5 shrink-0 shadow-lg min-w-[260px]">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Today's Attendance</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                {attendanceRate}% Present
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Total Students:</span>
                </span>
                <span className="font-bold text-white font-mono">{totalStudents}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">🟢</span>
                  <span>Present:</span>
                </span>
                <span className="font-bold text-emerald-400 font-mono">{presentCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <span className="text-red-400 font-bold">🔴</span>
                  <span>Absent:</span>
                </span>
                <span className="font-bold text-red-400 font-mono">{absentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards Grid: 6 cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Students */}
        <div
          id="summary-card-total-students"
          onClick={() => onNavigate('students')}
          className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-xl p-4 transition-all hover:-translate-y-0.5 cursor-pointer shadow-md group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Students</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{totalStudents}</p>
          <p className="text-[11px] text-slate-400 mt-1">Assigned to Aroush</p>
        </div>

        {/* Present Today */}
        <div
          id="summary-card-present-today"
          onClick={() => onNavigate('attendance')}
          className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all hover:-translate-y-0.5 cursor-pointer shadow-md group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Present Today</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">{presentCount}</p>
          <p className="text-[11px] text-emerald-300 mt-1">🟢 In Class</p>
        </div>

        {/* Absent Today */}
        <div
          id="summary-card-absent-today"
          onClick={() => onNavigate('attendance')}
          className="bg-slate-900/90 border border-slate-800 hover:border-red-500/50 rounded-xl p-4 transition-all hover:-translate-y-0.5 cursor-pointer shadow-md group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Absent Today</span>
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500/20">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-red-400 font-mono">{absentCount}</p>
          <p className="text-[11px] text-red-300 mt-1">🔴 Requires Follow-up</p>
        </div>

        {/* My Classes */}
        <div
          id="summary-card-my-classes"
          onClick={() => onNavigate('students')}
          className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-xl p-4 transition-all hover:-translate-y-0.5 cursor-pointer shadow-md group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">My Classes</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{classesList.length}</p>
          <p className="text-[11px] text-slate-400 mt-1 truncate">Grade 1 & Grade 4</p>
        </div>

        {/* Announcements */}
        <div
          id="summary-card-announcements"
          onClick={() => onNavigate('announcements')}
          className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 rounded-xl p-4 transition-all hover:-translate-y-0.5 cursor-pointer shadow-md group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Announcements</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20">
              <Megaphone className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{announcements.length}</p>
          <p className="text-[11px] text-purple-300 mt-1">By Principal Victor</p>
        </div>

        {/* Upcoming Events */}
        <div
          id="summary-card-upcoming-events"
          onClick={() => onNavigate('events')}
          className="bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 rounded-xl p-4 transition-all hover:-translate-y-0.5 cursor-pointer shadow-md group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Upcoming Events</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20">
              <PartyPopper className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{events.length}</p>
          <p className="text-[11px] text-rose-300 mt-1">Christmas 2026</p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Teacher Quick Actions</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            id="quick-action-take-attendance"
            onClick={() => onNavigate('attendance')}
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer"
          >
            <span>✅</span>
            <span>Take Attendance</span>
          </button>

          <button
            id="quick-action-my-students"
            onClick={() => onNavigate('students')}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
          >
            <span>👨‍🎓</span>
            <span>My Students</span>
          </button>

          <button
            id="quick-action-view-reports"
            onClick={() => onNavigate('reports')}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
          >
            <span>📊</span>
            <span>View Reports</span>
          </button>

          <button
            id="quick-action-announcements"
            onClick={() => onNavigate('announcements')}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
          >
            <span>📢</span>
            <span>Announcements</span>
          </button>
        </div>
      </div>

      {/* Two Column Section: My Students List & Next Christmas Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Teacher's Students Quick Table */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>👨‍🎓</span>
                <span>My Students ({students.length})</span>
              </h2>
              <p className="text-xs text-slate-400">Students assigned to Teacher Aroush for Christmas 2026</p>
            </div>

            <button
              id="view-all-students-link"
              onClick={() => onNavigate('students')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {students.map((student) => {
              const isPresent = student.todayStatus === 'present';
              return (
                <div
                  key={student.id}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                >
                  <div
                    onClick={() => onSelectStudent(student)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-linear-to-br ${student.avatarColor} flex items-center justify-center font-bold text-white text-base shadow`}
                    >
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white group-hover:text-emerald-400 transition-colors text-sm sm:text-base">
                          {student.name}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-semibold border border-amber-500/20">
                          {student.grade}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Parent: <span className="text-slate-300 font-medium">{student.parentName}</span> • Roll: {student.rollNo}
                      </p>
                    </div>
                  </div>

                  {/* Attendance Controls */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
                        isPresent
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : 'bg-red-950 text-red-300 border border-red-500/40'
                      }`}
                    >
                      {isPresent ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                      <span>{isPresent ? 'Present' : 'Absent'}</span>
                    </span>

                    <button
                      id={`dash-mark-present-${student.id}`}
                      onClick={() => onMarkPresent(student.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        isPresent
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:bg-emerald-950 hover:text-emerald-300'
                      }`}
                    >
                      🟢 Present
                    </button>

                    <button
                      id={`dash-mark-absent-${student.id}`}
                      onClick={() => onMarkAbsent(student.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        !isPresent
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:bg-red-950 hover:text-red-300'
                      }`}
                    >
                      🔴 Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Christmas Timetable & Latest Announcement Previews */}
        <div className="space-y-6">
          {/* Latest Announcement Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-purple-400" />
                <span>School Announcement</span>
              </h3>
              <button
                onClick={() => onNavigate('announcements')}
                className="text-xs text-purple-400 hover:text-purple-300 font-medium"
              >
                View All
              </button>
            </div>

            {announcements.length > 0 ? (
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-purple-200">{announcements[0].title}</h4>
                  <span className="text-[10px] text-purple-300 font-mono">{announcements[0].date}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{announcements[0].content}</p>
                <p className="text-[11px] text-purple-300 font-medium pt-1">
                  Posted by: {announcements[0].author} ({announcements[0].authorRole})
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No new announcements. 🎄</p>
            )}
          </div>

          {/* Timetable Snippet */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Christmas Timetable</span>
              </h3>
              <button
                onClick={() => onNavigate('timetable')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                Full Schedule
              </button>
            </div>

            <div className="space-y-2">
              {timetable.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs"
                >
                  <span className="font-mono text-amber-300 font-semibold">{item.time}</span>
                  <span className="text-slate-200 font-medium truncate max-w-[140px]">{item.activity}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('timetable')}
              className="w-full mt-3 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View All 10 Activities</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
