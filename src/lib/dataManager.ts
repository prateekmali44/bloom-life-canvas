
/**
 * Data management utilities for the application
 * Handles storage, retrieval, and manipulation of user data
 */

import { Goal, Habit, JournalEntry, KPI, Resource, VisionItem } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { ModulesData } from "@/types/modules";

// Storage keys
const STORAGE_KEYS = {
  USER_DATA: "userData",
  GOALS: "goals",
  HABITS: "habits",
  JOURNAL: "journal",
  RESOURCES: "resources",
  VISION: "vision",
  KPIS: "kpis"
};

// Default user data structure
export const getDefaultUserData = () => ({
  onboardingCompleted: false,
  name: "",
  profileImage: "",
  email: "",
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  theme: "light",
  notifications: {
    enabled: true,
    dailyReminder: true,
    reminderTime: "18:00",
    weeklyReview: "sunday",
  },
  enabledModules: {
    professional: { enabled: true, onboarded: true },
    health: { enabled: false, onboarded: false },
    financial: { enabled: false, onboarded: false },
    educational: { enabled: false, onboarded: false },
    spiritual: { enabled: false, onboarded: false },
    personal: { enabled: false, onboarded: false },
  }
});

// Get user data
export const getUserData = () => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  if (!userData) {
    return null;
  }
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error("Failed to parse user data:", error);
    return null;
  }
};

// Update user data
export const updateUserData = (data: Partial<ReturnType<typeof getDefaultUserData>>) => {
  const currentData = getUserData() || getDefaultUserData();
  const newData = { ...currentData, ...data };
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(newData));
  return newData;
};

// Update enabled modules
export const updateEnabledModules = (modules: ModulesData) => {
  const userData = getUserData() || getDefaultUserData();
  userData.enabledModules = { ...userData.enabledModules, ...modules };
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  return userData.enabledModules;
};

// Generate a unique ID
export const generateId = () => {
  return `id_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Goals management
export const getGoals = () => {
  const goals = localStorage.getItem(STORAGE_KEYS.GOALS);
  if (!goals) {
    return [];
  }
  try {
    return JSON.parse(goals) as Goal[];
  } catch (error) {
    console.error("Failed to parse goals:", error);
    return [];
  }
};

export const addGoal = (goal: Omit<Goal, "id" | "createdAt">) => {
  const goals = getGoals();
  const newGoal = {
    ...goal,
    id: generateId(),
    createdAt: new Date().toISOString(),
    status: goal.status || 'not_started',
    progress: goal.progress || 0,
    subTasks: goal.subTasks || []
  } as Goal;
  
  goals.push(newGoal);
  localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  toast({
    title: "Goal added",
    description: "Your goal has been added successfully",
  });
  return newGoal;
};

export const updateGoal = (id: string, updatedGoal: Partial<Goal>) => {
  const goals = getGoals();
  const index = goals.findIndex(goal => goal.id === id);
  if (index !== -1) {
    goals[index] = { ...goals[index], ...updatedGoal };
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    toast({
      title: "Goal updated",
      description: "Your goal has been updated successfully",
    });
    return goals[index];
  }
  return null;
};

export const deleteGoal = (id: string) => {
  let goals = getGoals();
  goals = goals.filter(goal => goal.id !== id);
  localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  toast({
    title: "Goal deleted",
    description: "Your goal has been deleted successfully",
  });
  return true;
};

// Habits management
export const getHabits = () => {
  const habits = localStorage.getItem(STORAGE_KEYS.HABITS);
  if (!habits) {
    return [];
  }
  try {
    return JSON.parse(habits) as Habit[];
  } catch (error) {
    console.error("Failed to parse habits:", error);
    return [];
  }
};

export const addHabit = (habit: Omit<Habit, "id" | "startDate" | "streak" | "history">) => {
  const habits = getHabits();
  const newHabit = {
    ...habit,
    id: generateId(),
    startDate: new Date().toISOString(),
    streak: 0,
    status: habit.status || 'active',
    history: []
  } as Habit;
  
  habits.push(newHabit);
  localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  toast({
    title: "Habit added",
    description: "Your habit has been added successfully",
  });
  return newHabit;
};

export const updateHabit = (id: string, updatedHabit: Partial<Habit>) => {
  const habits = getHabits();
  const index = habits.findIndex(habit => habit.id === id);
  if (index !== -1) {
    habits[index] = { ...habits[index], ...updatedHabit };
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    toast({
      title: "Habit updated",
      description: "Your habit has been updated successfully",
    });
    return habits[index];
  }
  return null;
};

export const toggleHabitCompletion = (id: string, completed: boolean, notes?: string) => {
  const habits = getHabits();
  const index = habits.findIndex(habit => habit.id === id);
  if (index !== -1) {
    const today = new Date().toISOString().split('T')[0];
    const habitEntry = {
      date: today,
      completed,
      notes
    };
    
    // Check if there's already an entry for today
    const todayEntryIndex = habits[index].history.findIndex(entry => 
      entry.date.startsWith(today));
    
    if (todayEntryIndex !== -1) {
      habits[index].history[todayEntryIndex] = habitEntry;
    } else {
      habits[index].history.push(habitEntry);
    }
    
    // Update streak
    if (completed) {
      habits[index].streak += 1;
    } else {
      habits[index].streak = 0;
    }
    
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    return habits[index];
  }
  return null;
};

export const deleteHabit = (id: string) => {
  let habits = getHabits();
  habits = habits.filter(habit => habit.id !== id);
  localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  toast({
    title: "Habit deleted",
    description: "Your habit has been deleted successfully",
  });
  return true;
};

// Journal management
export const getJournalEntries = () => {
  const entries = localStorage.getItem(STORAGE_KEYS.JOURNAL);
  if (!entries) {
    return [];
  }
  try {
    return JSON.parse(entries) as JournalEntry[];
  } catch (error) {
    console.error("Failed to parse journal entries:", error);
    return [];
  }
};

export const addJournalEntry = (entry: Omit<JournalEntry, "id" | "createdAt">) => {
  const entries = getJournalEntries();
  const newEntry = {
    ...entry,
    id: generateId(),
    createdAt: new Date().toISOString()
  } as JournalEntry;
  
  entries.push(newEntry);
  localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
  toast({
    title: "Journal entry added",
    description: "Your journal entry has been added successfully",
  });
  return newEntry;
};

export const updateJournalEntry = (id: string, updatedEntry: Partial<JournalEntry>) => {
  const entries = getJournalEntries();
  const index = entries.findIndex(entry => entry.id === id);
  if (index !== -1) {
    entries[index] = { ...entries[index], ...updatedEntry };
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
    toast({
      title: "Journal entry updated",
      description: "Your journal entry has been updated successfully",
    });
    return entries[index];
  }
  return null;
};

export const deleteJournalEntry = (id: string) => {
  let entries = getJournalEntries();
  entries = entries.filter(entry => entry.id !== id);
  localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
  toast({
    title: "Journal entry deleted",
    description: "Your journal entry has been deleted successfully",
  });
  return true;
};

// Resources management
export const getResources = () => {
  const resources = localStorage.getItem(STORAGE_KEYS.RESOURCES);
  if (!resources) {
    return [];
  }
  try {
    return JSON.parse(resources) as Resource[];
  } catch (error) {
    console.error("Failed to parse resources:", error);
    return [];
  }
};

export const addResource = (resource: Omit<Resource, "id" | "addedAt">) => {
  const resources = getResources();
  const newResource = {
    ...resource,
    id: generateId(),
    addedAt: new Date().toISOString()
  } as Resource;
  
  resources.push(newResource);
  localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  toast({
    title: "Resource added",
    description: "Your resource has been added successfully",
  });
  return newResource;
};

export const updateResource = (id: string, updatedResource: Partial<Resource>) => {
  const resources = getResources();
  const index = resources.findIndex(resource => resource.id === id);
  if (index !== -1) {
    resources[index] = { ...resources[index], ...updatedResource };
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
    toast({
      title: "Resource updated",
      description: "Your resource has been updated successfully",
    });
    return resources[index];
  }
  return null;
};

export const deleteResource = (id: string) => {
  let resources = getResources();
  resources = resources.filter(resource => resource.id !== id);
  localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  toast({
    title: "Resource deleted",
    description: "Your resource has been deleted successfully",
  });
  return true;
};

// Initialize data
export const initializeDataStore = () => {
  // Only initialize if data doesn't already exist
  if (!localStorage.getItem(STORAGE_KEYS.USER_DATA)) {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(getDefaultUserData()));
  }
  
  // Initialize data arrays if they don't exist
  if (!localStorage.getItem(STORAGE_KEYS.GOALS)) {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.HABITS)) {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.JOURNAL)) {
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.RESOURCES)) {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.VISION)) {
    localStorage.setItem(STORAGE_KEYS.VISION, JSON.stringify([]));
  }
  
  console.log("Data store initialized");
  return true;
};

// Add sample data for testing
export const addSampleData = () => {
  // Clear existing data
  localStorage.removeItem(STORAGE_KEYS.GOALS);
  localStorage.removeItem(STORAGE_KEYS.HABITS);
  localStorage.removeItem(STORAGE_KEYS.JOURNAL);
  localStorage.removeItem(STORAGE_KEYS.RESOURCES);
  
  // Add sample goals
  const goals: Omit<Goal, "id" | "createdAt">[] = [
    {
      title: "Complete AWS Certification",
      description: "Finish all required courses and practice tests",
      priority: "high",
      status: "in_progress",
      progress: 65,
      areaKey: "educational",
      deadline: "2024-10-01",
      subTasks: [
        { id: generateId(), title: "Complete course modules", completed: true },
        { id: generateId(), title: "Take practice exams", completed: false },
        { id: generateId(), title: "Schedule final exam", completed: false }
      ]
    },
    {
      title: "Read 12 Books This Year",
      description: "Mix of professional and personal development books",
      priority: "medium",
      status: "in_progress",
      progress: 30,
      areaKey: "educational",
      deadline: "2024-12-31",
      subTasks: [
        { id: generateId(), title: "Create reading list", completed: true },
        { id: generateId(), title: "Join book club", completed: false }
      ]
    }
  ];
  goals.forEach(goal => addGoal(goal));
  
  // Add sample habits
  const habits: Omit<Habit, "id" | "startDate" | "streak" | "history">[] = [
    {
      title: "Study for 1 hour",
      description: "Focus on technical subjects",
      frequency: "daily",
      timeOfDay: "morning",
      areaKey: "educational",
      status: "active",
    },
    {
      title: "Read a book chapter",
      description: "From current book on reading list",
      frequency: "daily",
      timeOfDay: "evening",
      areaKey: "educational",
      status: "active",
    }
  ];
  habits.forEach(habit => addHabit(habit));
  
  // Add sample journal entries
  const journals: Omit<JournalEntry, "id" | "createdAt">[] = [
    {
      title: "Study Session Reflection",
      content: "Today I learned about React hooks and how they can simplify state management...",
      areaKeys: ["educational"],
      mood: {
        primary: "productive",
        secondary: "curious"
      },
      tags: ["learning", "technology"]
    }
  ];
  journals.forEach(entry => addJournalEntry(entry));
  
  // Add sample resources
  const resources: Omit<Resource, "id" | "addedAt">[] = [
    {
      title: "React Advanced Patterns",
      description: "Course about advanced React patterns and best practices",
      url: "https://frontendmasters.com/courses/advanced-react-patterns/",
      type: "course",
      areaKeys: ["educational", "professional"],
      progress: 65,
      tags: ["programming", "react"]
    },
    {
      title: "Atomic Habits",
      description: "Book about building good habits and breaking bad ones",
      type: "book",
      areaKeys: ["educational", "personal"],
      progress: 45,
      tags: ["productivity", "self-improvement"]
    }
  ];
  resources.forEach(resource => addResource(resource));
  
  toast({
    title: "Sample data added",
    description: "Sample data has been added to your account for testing",
  });
  
  return true;
};

// Clear all data
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  toast({
    title: "Data cleared",
    description: "All your data has been cleared",
  });
  return true;
};

// Export everything for convenient access
export const dataStore = {
  getUserData,
  updateUserData,
  updateEnabledModules,
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
  getHabits,
  addHabit,
  updateHabit,
  toggleHabitCompletion,
  deleteHabit,
  getJournalEntries,
  addJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  getResources,
  addResource,
  updateResource,
  deleteResource,
  initializeDataStore,
  addSampleData,
  clearAllData
};

export default dataStore;
