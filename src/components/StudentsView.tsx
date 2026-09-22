import React, { useState } from 'react';
import { Student } from '../types';
import {
  GraduationCap,
  Search,
  UserCheck,
  UserX,
  ExternalLink,
  ShieldCheck,
  Phone,
  Sparkles,
  Info,
} from 'lucide-react';

interface StudentsViewProps {
  students: Student[];
  onMarkPresent: (studentId: string) => void;
  onMarkAbsent: (studentId: string) => void;
  onSelectStudent: (student: Student) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  onMarkPresent,
  onMarkAbsent,
  onSelectStudent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      s.grade.toLowerCase().includes(term) ||
      s.parentName.toLowerCase().includes(term) ||
      s.id.toLowerCase().includes(term)
    );
  });

  const presentCount = students.filter((s) => s.todayStatus === 'present').length;
  const absentCount = students.filter((s) => s.todayStatus === 'absent').length;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Teacher's Assigned Students
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Students assigned to <span className="text-emerald-400 font-semibold">Teacher Aroush</span> for the Christmas 2026 session.
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-center">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Total</span>
            <span className="font-extrabold text-white text-base font-mono">{students.length}</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-center">
            <span className="text-emerald-400 block text-[10px] uppercase font-bold">🟢 Present</span>
            <span className="font-extrabold text-emerald-300 text-base font-mono">{presentCount}</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/30 text-xs text-center">
            <span className="text-red-400 block text-[10px] uppercase font-bold">🔴 Absent</span>
            <span className="font-extrabold text-red-300 text-base font-mono">{absentCount}</span>
          </div>
        </div>
      </div>

      {/* Search box & filter guidance */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="students-table-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student by name, grade, or guardian..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5 px-2">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>Click any student name to open comprehensive student details & history.</span>
        </div>
      </div>

      {/* Required Table: | Student | Class | Attendance | Actions | */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/90 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 sm:px-6">Student</th>
                <th className="py-3.5 px-4 sm:px-6">Class</th>
                <th className="py-3.5 px-4 sm:px-6">Attendance</th>
                <th className="py-3.5 px-4 sm:px-6 text-right sm:text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-sm">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const isPresent = student.todayStatus === 'present';
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-800/50 transition-colors group"
                    >
                      {/* Column 1: Student */}
                      <td className="py-4 px-4 sm:px-6">
                        <div
                          onClick={() => onSelectStudent(student)}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <div
                            className={`w-10 h-10 rounded-xl bg-linear-to-br ${student.avatarColor} flex items-center justify-center font-bold text-white shadow`}
                          >
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                                {student.name}
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                            </div>
                            <p className="text-xs text-slate-400">
                              ID: <span className="font-mono text-slate-300">{student.id}</span> • Roll: {student.rollNo}
                            </p>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              <span>Parent: {student.parentName} ({student.parentRelation})</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Class */}
                      <td className="py-4 px-4 sm:px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-950 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                          {student.grade}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-1">{student.section}</p>
                      </td>

                      {/* Column 3: Attendance */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold w-fit ${
                              isPresent
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow-xs'
                                : 'bg-red-950 text-red-300 border border-red-500/40 shadow-xs'
                            }`}
                          >
                            {isPresent ? (
                              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <UserX className="w-3.5 h-3.5 text-red-400" />
                            )}
                            <span>{isPresent ? '🟢 Present' : '🔴 Absent'}</span>
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {student.attendanceUpdatedAt || 'Updated today'}
                          </span>
                        </div>
                      </td>

                      {/* Column 4: Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right sm:text-center">
                        <div className="flex items-center justify-end sm:justify-center gap-2">
                          <button
                            id={`table-mark-present-${student.id}`}
                            onClick={() => onMarkPresent(student.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 border ${
                              isPresent
                                ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/50'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-600'
                            }`}
                          >
                            <span>🟢</span>
                            <span>Mark Present</span>
                          </button>

                          <button
                            id={`table-mark-absent-${student.id}`}
                            onClick={() => onMarkAbsent(student.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 border ${
                              !isPresent
                                ? 'bg-red-600 text-white border-red-400 shadow-md shadow-red-900/50'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-red-950 hover:text-red-300 hover:border-red-600'
                            }`}
                          >
                            <span>🔴</span>
                            <span>Mark Absent</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400 text-sm">
                    No students found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
