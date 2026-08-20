import { Course, Video } from './lms';

export interface TeacherCourse extends Course {
  videos_count?: number;
  students_count?: number;
  role_in_course?: 'primary' | 'co_instructor';
  [key: string]: any;
}

export interface TeacherData {
  courses: TeacherCourse[];
  total_students: number;
  total_videos: number;
}

export interface TeacherStats {
  totalCourses?: number;
  totalStudents?: number;
  totalVideos?: number;
  totalRevenue?: number;
  recordedCourses?: number;
  liveCourses?: number;
  freeCourses?: number;
  recordedEarnings?: number;
  liveEarnings?: number;
  paidWorkEarnings?: number;
  totalEarnings?: number;
  pendingWithdrawals?: number;
  pendingWithdrawal?: number;
  availableBalance?: number;
  [key: string]: any;
}

export interface RevenueRecord {
  id?: string;
  course_id?: string;
  amount?: number;
  date?: string;
  created_at?: string;
  [key: string]: any;
}

export interface PaidWork {
  id?: string;
  title?: string;
  amount?: number;
  status?: string;
  created_at?: string;
  [key: string]: any;
}

export interface StudentProgress {
  id?: string;
  student_name?: string;
  course_title?: string;
  progress_percentage?: number;
  last_active?: string;
  [key: string]: any;
}

export interface SupportTicket {
  id?: string;
  subject?: string;
  status?: string;
  created_at?: string;
  [key: string]: any;
}

export interface WithdrawalRequest {
  id?: string;
  amount?: number;
  status?: string;
  created_at?: string;
  [key: string]: any;
}
