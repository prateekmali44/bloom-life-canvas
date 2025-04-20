
import { LifeArea, LifeAreaKey } from "./modules";

export interface KPI {
  id: string;
  title: string;
  value: number;
  target: number;
  unit: string;
  change: number;
  timeframe: string;
  areaKey: LifeAreaKey;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  areaKey: LifeAreaKey;
  deadline?: string;
  createdAt: string;
  subTasks: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export interface Habit {
  id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  timeOfDay?: string;
  daysOfWeek?: number[];
  streak: number;
  areaKey: LifeAreaKey;
  startDate: string;
  status: 'active' | 'paused' | 'completed';
  history: {
    date: string;
    completed: boolean;
    notes?: string;
  }[];
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  areaKeys: LifeAreaKey[];
  createdAt: string;
  mood: {
    primary: string;
    secondary?: string;
    note?: string;
  };
  tags?: string[];
}

export interface VisionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  areaKey: LifeAreaKey;
  createdAt: string;
  timeframe: 'annual' | 'lifetime';
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url?: string;
  type: 'article' | 'video' | 'audio' | 'book' | 'course';
  areaKeys: LifeAreaKey[];
  completedAt?: string;
  addedAt: string;
  tags?: string[];
  progress?: number;
}

export interface { LifeArea, LifeAreaKey };
