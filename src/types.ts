export interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNo: string;
  parentName: string;
  parentRelation: string;
  parentPhone: string;
  todayStatus: 'present' | 'absent';
  attendanceUpdatedAt?: string;
  avatarColor: string;
  history: AttendanceHistoryItem[];
}

export interface AttendanceHistoryItem {
  date: string;
  status: 'present' | 'absent';
  markedAt: string;
  notes?: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  role: string;
  school: string;
  program: string;
  location: string;
  email: string;
  phone: string;
  department: string;
  joinedYear: string;
}

export interface Announcement {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  date: string;
  content: string;
  priority: 'normal' | 'high' | 'urgent';
  read: boolean;
}

export interface ChristmasEvent {
  id: string;
  title: string;
  icon: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  targetAudience: string;
  coordinator: string;
  isPrincipalManaged: boolean;
}

export interface TimetableItem {
  id: string;
  time: string;
  activity: string;
  emoji: string;
  duration: string;
  description: string;
  leadTeacher: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'attendance' | 'announcement' | 'event' | 'system';
  timestamp: string;
  read: boolean;
}

export type ActiveTab =
  | 'dashboard'
  | 'students'
  | 'attendance'
  | 'reports'
  | 'timetable'
  | 'announcements'
  | 'events'
  | 'notifications'
  | 'profile';
