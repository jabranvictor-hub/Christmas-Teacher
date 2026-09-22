import React, { useState } from 'react';
import { Announcement } from '../types';
import { Megaphone, Calendar, ShieldCheck, CheckCheck, RotateCcw, AlertTriangle, Sparkles } from 'lucide-react';

interface AnnouncementsViewProps {
  announcements: Announcement[];
  onToggleRead: (id: string) => void;
  onClearAll: () => void;
  onRestore: () => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  announcements,
  onToggleRead,
  onClearAll,
  onRestore,
}) => {
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'normal'>('all');

  const filteredAnnouncements = announcements.filter((a) => {
    if (filterPriority === 'all') return true;
    return a.priority === filterPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Megaphone className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>📢</span>
              <span>School Announcements</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Official circulars and instructions from <span className="text-emerald-400 font-semibold">Principal Victor</span>
          </p>
        </div>

        {/* Demo tools to test the required "No new announcements. 🎄" state */}
        <div className="flex items-center gap-2">
          {announcements.length > 0 ? (
            <button
              id="clear-announcements-test-btn"
              onClick={onClearAll}
              title="Test empty announcements state"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer border border-slate-700"
            >
              Simulate Empty State
            </button>
          ) : (
            <button
              id="restore-announcements-btn"
              onClick={onRestore}
              className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Announcements</span>
            </button>
          )}
        </div>
      </div>

      {/* Announcements List */}
      {filteredAnnouncements.length > 0 ? (
        <div className="space-y-4">
          {filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className={`rounded-2xl border p-5 shadow-lg transition-all ${
                ann.read
                  ? 'bg-slate-900/70 border-slate-800/80 text-slate-400'
                  : 'bg-slate-900 border-purple-500/40 text-slate-200 ring-1 ring-purple-500/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>{ann.title}</span>
                    </h3>
                    {ann.priority === 'high' && (
                      <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider">
                        High Priority
                      </span>
                    )}
                    {!ann.read && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1 text-amber-300">
                      <Calendar className="w-3.5 h-3.5" />
                      <strong>📅 Date:</strong> {ann.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{ann.author} ({ann.authorRole})</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onToggleRead(ann.id)}
                  className="self-end sm:self-start px-3 py-1 rounded-lg text-xs font-medium border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCheck className={`w-3.5 h-3.5 ${ann.read ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{ann.read ? 'Mark as Unread' : 'Mark as Read'}</span>
                </button>
              </div>

              {/* Message body */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed">
                <p className="font-medium text-slate-400 text-xs mb-1 uppercase tracking-wider">Message:</p>
                <p>{ann.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* EXACT REQUIRED EMPTY STATE STRING: "No new announcements. 🎄" */
        <div className="p-12 text-center bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl flex flex-col items-center justify-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl">
            🎄
          </div>
          <h3 className="text-xl font-extrabold text-white">
            No new announcements. 🎄
          </h3>
          <p className="text-xs text-slate-400 max-w-sm">
            All circulars from Principal Victor are currently up to date. You will be notified when new instructions arrive.
          </p>
          <button
            onClick={onRestore}
            className="mt-3 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Load Default Announcements</span>
          </button>
        </div>
      )}
    </div>
  );
};
