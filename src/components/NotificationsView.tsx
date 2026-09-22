import React from 'react';
import { AppNotification } from '../types';
import { Bell, CheckCheck, Trash2, Clock, CheckCircle2, Megaphone, PartyPopper, Info } from 'lucide-react';

interface NotificationsViewProps {
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onMarkSingleRead: (id: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllAsRead,
  onClearAll,
  onMarkSingleRead,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'attendance':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'announcement':
        return <Megaphone className="w-4 h-4 text-purple-400" />;
      case 'event':
        return <PartyPopper className="w-4 h-4 text-amber-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Bell className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>🔔</span>
              <span>System & Classroom Notifications</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time updates for Teacher Aroush • You have{' '}
            <strong className="text-emerald-400">{unreadCount} unread</strong> notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              id="mark-all-read-btn"
              onClick={onMarkAllAsRead}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              <CheckCheck className="w-4 h-4 text-emerald-400" />
              <span>Mark All as Read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              id="clear-all-notifs-btn"
              onClick={onClearAll}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Notification list */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onMarkSingleRead(notif.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                notif.read
                  ? 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                  : 'bg-slate-900 border-emerald-500/40 text-slate-200 ring-1 ring-emerald-500/20 shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                    {getTypeIcon(notif.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm sm:text-base font-bold ${notif.read ? 'text-slate-300' : 'text-white'}`}>
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-mono mt-2">
                      <Clock className="w-3 h-3" />
                      <span>{notif.timestamp}</span>
                    </span>
                  </div>
                </div>

                {!notif.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkSingleRead(notif.id);
                    }}
                    className="text-xs text-emerald-400 hover:text-emerald-300 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 font-medium"
                  >
                    Mark read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl flex flex-col items-center justify-center space-y-2">
          <Bell className="w-10 h-10 text-slate-600 mb-1" />
          <h3 className="text-base font-bold text-white">No notifications</h3>
          <p className="text-xs text-slate-400">All updates and logs have been reviewed.</p>
        </div>
      )}
    </div>
  );
};
