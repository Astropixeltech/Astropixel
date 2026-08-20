export type AppRole = 'admin' | 'student' | 'teacher' | 'user';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  role: AppRole;
  linked_team_member_id?: string | null;
  phone?: string | null;
  created_at: string;
  [key: string]: any;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  price: number | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

export interface Video {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  video_url: string;
  order_index: number;
  duration_seconds: number | null;
  is_published: boolean;
  created_at: string;
  [key: string]: any;
}

export interface CourseWithVideos extends Course {
  videos: Video[];
}

export interface VideoProgress {
  id: string;
  user_id: string;
  video_id: string;
  completed: boolean;
  is_completed?: boolean;
  last_position_seconds: number;
  updated_at: string;
  [key: string]: any;
}

export interface VideoWithProgress extends Video {
  progress?: VideoProgress | null;
  is_locked?: boolean;
  [key: string]: any;
}

export interface CourseWithProgress extends Course {
  videos: VideoWithProgress[];
  completed_videos_count: number;
  total_videos_count: number;
  progress_percentage: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  is_important?: boolean;
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  user_name?: string;
  content: string;
  created_at: string;
}

export interface LiveClass {
  id: string;
  title: string;
  meeting_url: string;
  start_time: string;
  is_active: boolean;
}
