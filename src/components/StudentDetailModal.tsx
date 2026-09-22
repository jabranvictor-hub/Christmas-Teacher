import React from 'react';
import { Student } from '../types';
import { X, UserCheck, UserX, Calendar, ShieldCheck, HeartHandshake, Phone, Award, Clock } from 'lucide-react';

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
  onMarkPresent: (id: string) => void;
  onMarkAbsent: (id: string) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onMarkPresent,
  onMarkAbsent,
}) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Festive Header */}
        <div className="relative bg-linear-to-r from-red-900 via-slate-900 to-emerald-950 p-5 border-b border-emerald-500/20 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${student.avatarColor} flex items-center justify-center text-xl font-bold text-white shadow-md border border-white/20`}>
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight text-white">{student.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/90 text-amber-300 border border-amber-500/30 font-semibold">
                  {student.grade}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                ID: {student.id} • Roll: {student.rollNo} • Section: {student.section}
              </p>
            </div>
          </div>

          <button
            id="close-student-detail-btn"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Today's Attendance status block */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Today's Attendance</span>
              <div className="flex items-center gap-2 mt-1">
                {student.todayStatus === 'present' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-sm font-bold">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>🟢 Marked Present</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-sm font-bold">
                    <UserX className="w-4 h-4 text-red-400" />
                    <span>🔴 Marked Absent</span>
                  </span>
                )}
                {student.attendanceUpdatedAt && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{student.attendanceUpdatedAt}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Quick action buttons in modal */}
            <div className="flex items-center gap-2">
              <button
                id="modal-mark-present-btn"
                onClick={() => onMarkPresent(student.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  student.todayStatus === 'present'
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/50'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-600'
                }`}
              >
                <span>🟢</span>
                <span>Mark Present</span>
              </button>

              <button
                id="modal-mark-absent-btn"
                onClick={() => onMarkAbsent(student.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  student.todayStatus === 'absent'
                    ? 'bg-red-600 text-white border-red-400 shadow-md shadow-red-900/50'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-red-950 hover:text-red-300 hover:border-red-600'
                }`}
              >
                <span>🔴</span>
                <span>Mark Absent</span>
              </button>
            </div>
          </div>

          {/* Parent/Guardian Information */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              <span>Parent / Guardian Contact (School Duty)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-sm">
              <div>
                <p className="text-xs text-slate-400">Parent/Guardian Name</p>
                <p className="font-semibold text-white flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{student.parentName}</span>
                  <span className="text-xs text-slate-400 font-normal">({student.parentRelation})</span>
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Contact Number</p>
                <p className="font-semibold text-emerald-300 flex items-center gap-1.5 mt-0.5 font-mono text-xs">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{student.parentPhone}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Attendance History Section */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Attendance History (Recent Days)</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">Victor's Christmas School Records</span>
            </div>

            <div className="space-y-2">
              {student.history.map((h, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-slate-300">{h.date}</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        h.status === 'present'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-red-950 text-red-300 border border-red-500/30'
                      }`}
                    >
                      {h.status === 'present' ? '🟢 Present' : '🔴 Absent'}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] text-slate-400">{h.markedAt}</p>
                    {h.notes && (
                      <p className="text-[10px] text-slate-400 italic max-w-[200px] truncate" title={h.notes}>
                        {h.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Christmas Program Note */}
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Assigned to Teacher Aroush for Christmas 2026 Choir & Pageant activities.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            id="close-student-detail-footer-btn"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
