import { 
  LifeArea, 
  LifeAreaKey, 
  KpiData, 
  Goal, 
  Habit, 
  JournalEntry, 
  Resource,
  VisionItem
} from "@/types";

// Life Areas
export const lifeAreas: Record<LifeAreaKey, LifeArea> = {
  professional: {
    key: "professional",
    name: "Professional",
    description: "Career, work, and professional development",
    color: "#4F46E5", // Indigo
    icon: "briefcase",
  },
  health: {
    key: "health",
    name: "Health & Fitness",
    description: "Physical health, fitness, and wellness",
    color: "#10B981", // Emerald
    icon: "heart",
  },
  financial: {
    key: "financial",
    name: "Financial",
    description: "Money management, investments, and financial planning",
    color: "#6366F1", // Violet
    icon: "dollar-sign",
  },
  educational: {
    key: "educational",
    name: "Educational & Learning",
    description: "Skills, knowledge acquisition, and personal development",
    color: "#F59E0B", // Amber
    icon: "graduation-cap",
  },
  spiritual: {
    key: "spiritual",
    name: "Spiritual & Emotional",
    description: "Inner peace, emotional well-being, and spiritual growth",
    color: "#8B5CF6", // Purple
    icon: "user-circle",
  },
  personal: {
    key: "personal",
    name: "Life Progression",
    description: "Relationships, personal growth, and life satisfaction",
    color: "#EC4899", // Pink
    icon: "compass",
  },
};

// Mock KPI data for the dashboard
export const mockKpiData: KpiData[] = [
  {
    areaKey: "professional",
    score: 78,
    trend: "up",
    trendValue: 5,
    pendingGoals: 2,
    completedGoals: 3,
    activeHabits: 2,
  },
  {
    areaKey: "health",
    score: 65,
    trend: "down",
    trendValue: 3,
    pendingGoals: 3,
    completedGoals: 1,
    activeHabits: 4,
  },
  {
    areaKey: "financial",
    score: 82,
    trend: "up",
    trendValue: 7,
    pendingGoals: 1,
    completedGoals: 4,
    activeHabits: 2,
  },
  {
    areaKey: "educational",
    score: 70,
    trend: "neutral",
    trendValue: 0,
    pendingGoals: 4,
    completedGoals: 2,
    activeHabits: 1,
  },
  {
    areaKey: "spiritual",
    score: 60,
    trend: "up",
    trendValue: 2,
    pendingGoals: 3,
    completedGoals: 1,
    activeHabits: 3,
  },
  {
    areaKey: "personal",
    score: 75,
    trend: "down",
    trendValue: 1,
    pendingGoals: 2,
    completedGoals: 2,
    activeHabits: 2,
  },
];

// Mock goals
export const mockGoals: Goal[] = [
  {
    id: "g1",
    title: "Get certified in project management",
    description: "Complete PMP certification by end of Q2",
    areaKey: "professional",
    createdAt: "2025-03-15T10:00:00Z",
    deadline: "2025-06-30T23:59:59Z",
    progress: 45,
    status: "in_progress",
    priority: "high",
    subTasks: [
      { id: "st1", goalId: "g1", title: "Register for the exam", completed: true },
      { id: "st2", goalId: "g1", title: "Complete online course", completed: false },
      { id: "st3", goalId: "g1", title: "Take practice tests", completed: false },
    ],
  },
  {
    id: "g2",
    title: "Run a half marathon",
    description: "Train and complete a half marathon",
    areaKey: "health",
    createdAt: "2025-02-10T14:23:00Z",
    deadline: "2025-09-15T08:00:00Z",
    progress: 30,
    status: "in_progress",
    priority: "high",
    subTasks: [
      { id: "st4", goalId: "g2", title: "Build up to 5K", completed: true },
      { id: "st5", goalId: "g2", title: "Build up to 10K", completed: false },
      { id: "st6", goalId: "g2", title: "Complete training plan", completed: false },
    ],
  },
  {
    id: "g3",
    title: "Save $10,000 for emergency fund",
    description: "Build emergency fund for 3 months of expenses",
    areaKey: "financial",
    createdAt: "2025-01-05T09:15:00Z",
    deadline: "2025-12-31T23:59:59Z",
    progress: 60,
    status: "in_progress",
    priority: "high",
    subTasks: [
      { id: "st7", goalId: "g3", title: "Set up automatic transfers", completed: true },
      { id: "st8", goalId: "g3", title: "Reach $5,000", completed: true },
      { id: "st9", goalId: "g3", title: "Reach $10,000", completed: false },
    ],
  },
  {
    id: "g4",
    title: "Learn Spanish to conversational level",
    description: "Be able to hold basic conversations in Spanish",
    areaKey: "educational",
    createdAt: "2025-03-01T16:45:00Z",
    deadline: "2025-10-01T23:59:59Z",
    progress: 20,
    status: "in_progress",
    priority: "medium",
    subTasks: [
      { id: "st10", goalId: "g4", title: "Learn 500 most common words", completed: true },
      { id: "st11", goalId: "g4", title: "Complete beginner grammar", completed: false },
      { id: "st12", goalId: "g4", title: "Practice with language partner", completed: false },
    ],
  },
  {
    id: "g5",
    title: "Establish daily meditation practice",
    description: "Meditate for at least 10 minutes daily",
    areaKey: "spiritual",
    createdAt: "2025-01-15T08:30:00Z",
    deadline: null,
    progress: 40,
    status: "in_progress",
    priority: "medium",
    subTasks: [
      { id: "st13", goalId: "g5", title: "Find guided meditations", completed: true },
      { id: "st14", goalId: "g5", title: "Set up meditation space", completed: true },
      { id: "st15", goalId: "g5", title: "Reach 30 day streak", completed: false },
    ],
  },
];

// Mock habits
export const mockHabits: Habit[] = [
  {
    id: "h1",
    title: "Morning planning session",
    description: "Plan the day's priorities each morning",
    areaKey: "professional",
    frequency: "daily",
    timeOfDay: "08:00",
    streak: 12,
    createdAt: "2025-03-01T08:00:00Z",
    logs: [],
  },
  {
    id: "h2",
    title: "Exercise",
    description: "30 minutes of exercise",
    areaKey: "health",
    frequency: "daily",
    daysOfWeek: [1, 2, 3, 4, 5],
    streak: 8,
    createdAt: "2025-02-15T17:30:00Z",
    logs: [],
  },
  {
    id: "h3",
    title: "Review finances",
    description: "Check accounts and track expenses",
    areaKey: "financial",
    frequency: "weekly",
    daysOfWeek: [6],
    streak: 5,
    createdAt: "2025-01-10T19:00:00Z",
    logs: [],
  },
  {
    id: "h4",
    title: "Study Spanish",
    description: "Practice Spanish for 20 minutes",
    areaKey: "educational",
    frequency: "daily",
    timeOfDay: "19:00",
    streak: 15,
    createdAt: "2025-03-01T19:00:00Z",
    logs: [],
  },
  {
    id: "h5",
    title: "Meditation",
    description: "10-minute mindfulness meditation",
    areaKey: "spiritual",
    frequency: "daily",
    timeOfDay: "06:30",
    streak: 21,
    createdAt: "2025-01-05T06:30:00Z",
    logs: [],
  },
];

// Mock journal entries
export const mockJournalEntries: JournalEntry[] = [
  {
    id: "j1",
    title: "Reflection on work presentation",
    content: "Today I gave my quarterly presentation to the leadership team. It went better than expected, though I need to work on my timing as I rushed through some important slides...",
    mood: {
      primary: "Proud",
      energy: 70,
      pleasantness: 85,
      notes: "Feeling accomplished but tired",
    },
    areaKeys: ["professional"],
    createdAt: "2025-04-16T18:30:00Z",
    updatedAt: "2025-04-16T18:30:00Z",
  },
  {
    id: "j2",
    title: "Morning run breakthrough",
    content: "Completed my longest run yet - 8 miles! I was worried about hitting a wall but actually felt stronger in the second half. My training is paying off...",
    mood: {
      primary: "Energized",
      energy: 90,
      pleasantness: 95,
      notes: "Runner's high!",
    },
    areaKeys: ["health"],
    createdAt: "2025-04-15T09:45:00Z",
    updatedAt: "2025-04-15T09:45:00Z",
  },
  {
    id: "j3",
    title: "Meditation insights",
    content: "During meditation this morning, I had an insight about why I've been feeling anxious about the upcoming project deadline. I realized I'm putting unnecessary pressure on myself...",
    mood: {
      primary: "Peaceful",
      energy: 60,
      pleasantness: 80,
      notes: "Feeling centered and calm",
    },
    areaKeys: ["spiritual", "professional"],
    createdAt: "2025-04-14T07:15:00Z",
    updatedAt: "2025-04-14T07:15:00Z",
  },
];

// Mock resources
export const mockResources: Resource[] = [
  {
    id: "r1",
    title: "Effective Communication in Leadership",
    description: "A guide to improving communication skills as a leader",
    url: "https://example.com/leadership-communication",
    type: "article",
    areaKeys: ["professional"],
    createdAt: "2025-03-10T14:20:00Z",
  },
  {
    id: "r2",
    title: "30-Day Strength Training Program",
    description: "Complete workout plan for building strength over 30 days",
    url: "https://example.com/strength-program",
    type: "course",
    areaKeys: ["health"],
    createdAt: "2025-02-20T10:15:00Z",
  },
  {
    id: "r3",
    title: "Mindfulness for Beginners",
    description: "Introduction to mindfulness practices for daily life",
    url: "https://example.com/mindfulness-intro",
    type: "video",
    areaKeys: ["spiritual"],
    createdAt: "2025-01-15T16:40:00Z",
  },
  {
    id: "r4",
    title: "Personal Finance Fundamentals",
    description: "Essential concepts for managing your personal finances",
    url: "https://example.com/finance-basics",
    type: "book",
    areaKeys: ["financial"],
    createdAt: "2025-03-05T09:30:00Z",
  },
];

// Mock vision board items
export const mockVisionItems: VisionItem[] = [
  {
    id: "v1",
    title: "Dream home by the ocean",
    description: "Modern house with ocean views for family gatherings",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    areaKey: "personal",
    createdAt: "2025-02-10T11:20:00Z",
    timeframe: "annual",
  },
  {
    id: "v2",
    title: "Marathon finisher",
    description: "Complete my first full marathon",
    imageUrl: "https://images.unsplash.com/photo-1530137073261-dc8a8081c798",
    areaKey: "health",
    createdAt: "2025-01-05T16:45:00Z",
    timeframe: "annual",
  },
  {
    id: "v3",
    title: "Tech leadership role",
    description: "Become a senior technical leader in my field",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    areaKey: "professional",
    createdAt: "2025-03-20T14:10:00Z",
    timeframe: "lifetime",
  },
  {
    id: "v4",
    title: "Financial independence",
    description: "Achieve financial freedom through investments",
    imageUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d",
    areaKey: "financial",
    createdAt: "2025-01-15T09:30:00Z",
    timeframe: "lifetime",
  },
];
