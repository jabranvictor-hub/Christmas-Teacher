import React, { useState } from 'react';
import { TimetableItem } from '../types';
import { CalendarDays, Clock, Sparkles, Printer, User, Trees } from 'lucide-react';

interface TimetableViewProps {
  timetable: TimetableItem[];
}

export const TimetableView: React.FC<TimetableViewProps> = ({ timetable }) => {
  const [selectedItem, setSelectedItem] = useState<TimetableItem | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <CalendarDays className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>📅</span>
              <span>Christmas School Timetable</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Official evening program schedule for <span className="text-emerald-400 font-semibold">Victor's Christmas School • Christmas 2026</span>
          </p>
        </div>

        <button
          id="print-timetable-btn"
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>Print Timetable</span>
        </button>
      </div>

      {/* Timetable Table Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-linear-to-r from-red-950/40 via-slate-900 to-emerald-950/40">
          <div className="flex items-center gap-2">
            <Trees className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Evening Program Schedule (6:00 PM – 8:30 PM)
            </h2>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-semibold">
            10 Festive Activities
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/90 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                <th className="py-3.5 px-4 sm:px-6 w-32">Time</th>
                <th className="py-3.5 px-4 sm:px-6">Activity</th>
                <th className="py-3.5 px-4 sm:px-6 hidden sm:table-cell">Duration</th>
                <th className="py-3.5 px-4 sm:px-6 hidden md:table-cell">Lead / Coordinator</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-sm">
              {timetable.map((item, index) => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`hover:bg-slate-800/50 transition-colors cursor-pointer group ${
                      isSelected ? 'bg-slate-800/80 ring-1 ring-emerald-500/40' : ''
                    }`}
                  >
                    {/* Time */}
                    <td className="py-4 px-4 sm:px-6 font-mono font-bold text-amber-300">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                        <span>{item.time}</span>
                      </div>
                    </td>

                    {/* Activity */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl shrink-0">{item.emoji}</span>
                        <div>
                          <p className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {item.activity}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5 max-w-md hidden sm:block">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="py-4 px-4 sm:px-6 text-slate-300 text-xs font-mono hidden sm:table-cell">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {item.duration}
                      </span>
                    </td>

                    {/* Lead */}
                    <td className="py-4 px-4 sm:px-6 text-xs text-slate-300 hidden md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{item.leadTeacher}</span>
                      </div>
                    </td>

                    {/* Action / Sequence Badge */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-950 text-slate-400 border border-slate-800 group-hover:border-emerald-500/40 group-hover:text-emerald-300 transition-colors">
                        <span>Step #{index + 1}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Item Detail Drawer if clicked */}
      {selectedItem && (
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-xl animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedItem.emoji}</span>
              <div>
                <h3 className="text-base font-bold text-white">{selectedItem.activity}</h3>
                <p className="text-xs text-amber-300 font-mono">Scheduled at: {selectedItem.time} ({selectedItem.duration})</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 cursor-pointer"
            >
              Dismiss
            </button>
          </div>

          <div className="mt-3 text-xs sm:text-sm text-slate-300 space-y-2">
            <p><strong>Overview:</strong> {selectedItem.description}</p>
            <p><strong>Coordinator:</strong> {selectedItem.leadTeacher}</p>
            <p className="text-emerald-400 text-xs">
              🎄 Teachers are requested to ensure all student line-ups remain orderly during this segment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
