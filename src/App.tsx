import React, { useState } from 'react';
import {
  ActiveTab,
  Student,
  TeacherProfile,
  Announcement,
  ChristmasEvent,
  TimetableItem,
  AppNotification,
} from './types';
import {
  INITIAL_TEACHER,
  INITIAL_STUDENTS,
  INITIAL_TIMETABLE,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVENTS,
  INITIAL_NOTIFICATIONS,
} from './data/initialData';

import { LoginView } from './components/LoginView';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { StudentsView } from './components/StudentsView';
import { AttendanceView } from './components/AttendanceView';
import { ReportsView } from './components/ReportsView';
import { TimetableView } from './components/TimetableView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { EventsView } from './components/EventsView';
import { NotificationsView } from './components/NotificationsView';
import { ProfileView } from './components/ProfileView';
import { StudentDetailModal } from './components/StudentDetailModal';
import { SnowEffect } from './components/SnowEffect';
import { CheckCircle2, UserCheck, UserX } from 'lucide-react';

export default function App() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Core application data (stored in browser memory)
  const [teacher] = useState<TeacherProfile>(INITIAL_TEACHER);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [timetable] = useState<TimetableItem[]>(INITIAL_TIMETABLE);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [events] = useState<ChristmasEvent[]>(INITIAL_EVENTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Active student detail modal state
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Snowfall effect toggle
  const [snowEnabled, setSnowEnabled] = useState(true);

  // Mobile sidebar menu open state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'present' | 'absent' | 'info' } | null>(null);

  const showToast = (text: string, type: 'present' | 'absent' | 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Helper to mark attendance
  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent') => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const todayDate = '2026-09-22';

    let updatedStudentName = '';

    setStudents((prev) =>
      prev.map((student) => {
        if (student.id !== studentId) return student;

        updatedStudentName = student.name;

        // Check if history already has entry for today
        const existingHistory = student.history || [];
        const hasTodayEntry = existingHistory.some((h) => h.date === todayDate);

        let updatedHistory;
        if (hasTodayEntry) {
          updatedHistory = existingHistory.map((h) =>
            h.date === todayDate
              ? { ...h, status, markedAt: timeStr, notes: `Updated to ${status} by Teacher Aroush.` }
              : h
          );
        } else {
          updatedHistory = [
            {
              date: todayDate,
              status,
              markedAt: timeStr,
              notes: `Marked ${status} by Teacher Aroush.`,
            },
            ...existingHistory,
          ];
        }

        return {
          ...student,
          todayStatus: status,
          attendanceUpdatedAt: `Today, ${timeStr}`,
          history: updatedHistory,
        };
      })
    );

    // If modal is open for this student, update selected student
    if (selectedStudent && selectedStudent.id === studentId) {
      setSelectedStudent((prev) => (prev ? { ...prev, todayStatus: status, attendanceUpdatedAt: `Today, ${timeStr}` } : null));
    }

    // Add a live notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: '🔔 Attendance Updated',
      message: `${updatedStudentName || 'Student'} marked as ${status === 'present' ? '🟢 Present' : '🔴 Absent'} by Teacher Aroush.`,
      type: 'attendance',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Show toast message
    showToast(
      `${updatedStudentName} marked ${status.toUpperCase()} successfully!`,
      status
    );
  };

  const handleMarkPresent = (studentId: string) => {
    handleMarkAttendance(studentId, 'present');
  };

  const handleMarkAbsent = (studentId: string) => {
    handleMarkAttendance(studentId, 'absent');
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
    setSelectedStudent(null);
    setIsMobileMenuOpen(false);
  };

  // Announcements actions
  const handleToggleAnnouncementRead = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((ann) => (ann.id === id ? { ...ann, read: !ann.read } : ann))
    );
  };

  const handleClearAnnouncements = () => {
    setAnnouncements([]);
    showToast('Announcements cleared for empty state testing.', 'info');
  };

  const handleRestoreAnnouncements = () => {
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    showToast('Default announcements restored.', 'info');
  };

  // Notifications actions
  const handleMarkAllNotifsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared.', 'info');
  };

  const handleMarkSingleNotifRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Unread badge counts
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const unreadAnnouncementsCount = announcements.filter((a) => !a.read).length;

  // 1. If not logged in, show Teacher Login View
  if (!isLoggedIn) {
    return (
      <>
        <SnowEffect enabled={snowEnabled} />
        <LoginView onLoginSuccess={() => setIsLoggedIn(true)} />
      </>
    );
  }

  // 2. Logged-in Teacher Dashboard & Portal
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white relative">
      <SnowEffect enabled={snowEnabled} />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom duration-200">
          <div
            className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border text-xs sm:text-sm font-semibold backdrop-blur-md ${
              toastMessage.type === 'present'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                : toastMessage.type === 'absent'
                ? 'bg-red-950/90 border-red-500/50 text-red-200'
                : 'bg-slate-900/90 border-slate-700 text-slate-200'
            }`}
          >
            {toastMessage.type === 'present' && <UserCheck className="w-4 h-4 text-emerald-400" />}
            {toastMessage.type === 'absent' && <UserX className="w-4 h-4 text-red-400" />}
            {toastMessage.type === 'info' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Navigation Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        teacher={teacher}
        students={students}
        unreadNotifsCount={unreadNotifsCount}
        snowEnabled={snowEnabled}
        setSnowEnabled={setSnowEnabled}
        onLogout={handleLogout}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          teacher={teacher}
          unreadNotifsCount={unreadNotifsCount}
          unreadAnnouncementsCount={unreadAnnouncementsCount}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <DashboardView
              teacher={teacher}
              students={students}
              announcements={announcements}
              events={events}
              timetable={timetable}
              onNavigate={(tab) => setActiveTab(tab)}
              onMarkPresent={handleMarkPresent}
              onMarkAbsent={handleMarkAbsent}
              onSelectStudent={(student) => setSelectedStudent(student)}
            />
          )}

          {activeTab === 'students' && (
            <StudentsView
              students={students}
              onMarkPresent={handleMarkPresent}
              onMarkAbsent={handleMarkAbsent}
              onSelectStudent={(student) => setSelectedStudent(student)}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceView
              students={students}
              onMarkPresent={handleMarkPresent}
              onMarkAbsent={handleMarkAbsent}
              onSelectStudent={(student) => setSelectedStudent(student)}
            />
          )}

          {activeTab === 'reports' && <ReportsView students={students} />}

          {activeTab === 'timetable' && <TimetableView timetable={timetable} />}

          {activeTab === 'announcements' && (
            <AnnouncementsView
              announcements={announcements}
              onToggleRead={handleToggleAnnouncementRead}
              onClearAll={handleClearAnnouncements}
              onRestore={handleRestoreAnnouncements}
            />
          )}

          {activeTab === 'events' && <EventsView events={events} />}

          {activeTab === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllNotifsAsRead}
              onClearAll={handleClearNotifications}
              onMarkSingleRead={handleMarkSingleNotifRead}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              teacher={teacher}
              totalStudents={students.length}
              onLogout={handleLogout}
            />
          )}
        </main>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onMarkPresent={handleMarkPresent}
          onMarkAbsent={handleMarkAbsent}
        />
      )}
    </div>
  );
}
