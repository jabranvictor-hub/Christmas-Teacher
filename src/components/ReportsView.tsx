import React, { useState } from 'react';
import { Student } from '../types';
import {
  BarChart3,
  Calendar,
  Filter,
  Printer,
  Sparkles,
  Users,
  CheckCircle2,
  XCircle,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';

interface ReportsViewProps {
  students: Student[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ students }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-22');

  const totalStudents = students.length;
  const presentCount = students.filter((s) => s.todayStatus === 'present').length;
  const absentCount = students.filter((s) => s.todayStatus === 'absent').length;
  const attendancePercentage = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  // Flatten all historical records for reporting
  const allHistoricalRecords = students.flatMap((student) =>
    student.history.map((h) => ({
      studentId: student.id,
      studentName: student.name,
      studentClass: student.grade,
      rollNo: student.rollNo,
      parentName: student.parentName,
      date: h.date,
      status: h.status,
      markedAt: h.markedAt,
      notes: h.notes,
    }))
  );

  // Apply filters
  const filteredRecords = allHistoricalRecords.filter((rec) => {
    if (selectedStudentId !== 'all' && rec.studentId !== selectedStudentId) return false;
    if (selectedClass !== 'all' && rec.studentClass !== selectedClass) return false;
    if (selectedDate && rec.date !== selectedDate) return false;
    return true;
  });

  // Calculate filtered stats
  const filteredPresent = filteredRecords.filter((r) => r.status === 'present').length;
  const filteredAbsent = filteredRecords.filter((r) => r.status === 'absent').length;
  const filteredTotal = filteredRecords.length;
  const filteredRate = filteredTotal > 0 ? Math.round((filteredPresent / filteredTotal) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Attendance Reports & Analytics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Attendance reports for Teacher Aroush • Victor's Christmas School
          </p>
        </div>

        <button
          id="print-attendance-report-btn"
          type="button"
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>Print / Export Summary</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Students</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{totalStudents}</p>
          <p className="text-xs text-slate-400 mt-1">Assigned to Teacher Aroush</p>
        </div>

        {/* Present Today */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Present Today</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 font-mono">{presentCount}</p>
          <p className="text-xs text-emerald-300 mt-1">Attending choir & classes</p>
        </div>

        {/* Absent Today */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-400">Absent Today</span>
            <XCircle className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-3xl font-extrabold text-red-400 font-mono">{absentCount}</p>
          <p className="text-xs text-red-300 mt-1">Parent contacted</p>
        </div>

        {/* Attendance Percentage */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Attendance Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-300 font-mono">{attendancePercentage}%</p>
          <div className="w-full bg-slate-950 h-2 rounded-full mt-2 overflow-hidden border border-slate-800">
            <div
              className="bg-linear-to-r from-amber-400 to-emerald-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Section: Filter by Student, Class, Date */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span>Filter Report Records</span>
          </h2>
          <button
            id="reset-report-filters-btn"
            onClick={() => {
              setSelectedStudentId('all');
              setSelectedClass('all');
              setSelectedDate('2026-09-22');
            }}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Filter by Student */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              👤 Filter by Student
            </label>
            <select
              id="report-filter-student-select"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Students ({students.length})</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.grade})
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Class */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              📚 Filter by Class
            </label>
            <select
              id="report-filter-class-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Classes</option>
              <option value="Grade 1">Grade 1 (Eliab & Balaj)</option>
              <option value="Grade 4">Grade 4 (Arnan)</option>
            </select>
          </div>

          {/* Filter by Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center justify-between">
              <span>📅 Filter by Date</span>
              <span className="text-[10px] text-slate-500">Pick a day</span>
            </label>
            <input
              id="report-filter-date-input"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Filtered Records Summary */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
          <div>
            Records found: <strong className="text-white font-mono">{filteredRecords.length}</strong>
            {' '}| Present: <span className="text-emerald-400 font-bold">{filteredPresent}</span>
            {' '}| Absent: <span className="text-red-400 font-bold">{filteredAbsent}</span>
          </div>
          <div className="font-semibold text-amber-300">
            Filtered Attendance Rate: {filteredRate}%
          </div>
        </div>
      </div>

      {/* Historical Report Log Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Attendance History Breakdown</span>
            </h3>
            <p className="text-xs text-slate-400">
              Verified daily attendance register records for Victor's Christmas School
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Date: {selectedDate || 'All Dates'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-950 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                <th className="py-3 px-4 sm:px-6">Date</th>
                <th className="py-3 px-4 sm:px-6">Student Name</th>
                <th className="py-3 px-4 sm:px-6">Class</th>
                <th className="py-3 px-4 sm:px-6">Guardian</th>
                <th className="py-3 px-4 sm:px-6">Status</th>
                <th className="py-3 px-4 sm:px-6">Marked Time</th>
                <th className="py-3 px-4 sm:px-6">Notes / Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-slate-300">{r.date}</td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-white">{r.studentName}</td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-amber-300 text-xs border border-amber-500/20 font-medium">
                        {r.studentClass}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-300">{r.parentName}</td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          r.status === 'present'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : 'bg-red-950 text-red-300 border border-red-500/40'
                        }`}
                      >
                        {r.status === 'present' ? '🟢 Present' : '🔴 Absent'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-400 font-mono text-xs">{r.markedAt}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-400 italic text-xs max-w-xs truncate" title={r.notes}>
                      {r.notes || 'Routine check'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No attendance records match the selected date ({selectedDate}) and filters.
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
