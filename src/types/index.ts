
// Life area identifiers
export type LifeAreaKey = 
  | "professional" 
  | "health" 
  | "financial" 
  | "educational" 
  | "spiritual" 
  | "personal";

// Life area metadata
export interface LifeArea {
  key: LifeAreaKey;
  name: string;
  description: string;
  color: string;
  icon: string;
}

// Dashboard KPI card data
export interface KpiData {
  areaKey: LifeAreaKey;
  score: number;
  trend: "up" | "down" | "neutral";
  trendValue: number;
  pendingGoals: number;
  completedGoals: number;
  activeHabits: number;
}

// Goal data structure
export interface Goal {
  id: string;
  title: string;
  description: string;
  areaKey: LifeAreaKey;
  createdAt: string;
  deadline?: string;
  completedAt?: string;
  progress: number;
  status: "not_started" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  subTasks: SubTask[];
}

// Subtask for goals
export interface SubTask {
  id: string;
  goalId: string;
  title: string;
  completed: boolean;
}

// Habit tracking
export interface Habit {
  id: string;
  title: string;
  description: string;
  areaKey: LifeAreaKey;
  frequency: "daily" | "weekly" | "monthly";
  timeOfDay?: string;
  daysOfWeek?: number[];
  streak: number;
  createdAt: string;
  logs: HabitLog[];
}

// Habit completion log
export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
  note?: string;
}

// Journal entry
export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: Mood;
  areaKeys: LifeAreaKey[];
  createdAt: string;
  updatedAt: string;
}

// Emotion/mood data
export interface Mood {
  primary: string;
  energy: number;
  pleasantness: number;
  notes?: string;
}

// Resource item
export interface Resource {
  id: string;
  title: string;
  description: string;
  url?: string;
  type: "article" | "video" | "audio" | "book" | "course" | "other";
  areaKeys: LifeAreaKey[];
  createdAt: string;
}

// Vision board item
export interface VisionItem {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  areaKey?: LifeAreaKey;
  createdAt: string;
}
