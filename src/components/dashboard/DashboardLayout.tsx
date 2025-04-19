
import React from "react";
import { DashboardHeader } from "./DashboardHeader";
import { KpiSection } from "./KpiSection";
import { RecentGoals } from "./RecentGoals";
import { HabitTracker } from "./HabitTracker";
import { EmotionTracker } from "./EmotionTracker";
import { RecentJournal } from "./RecentJournal";

interface DashboardLayoutProps {
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
  selectedAreas: string[];
  setSelectedAreas: (areas: string[]) => void;
  filteredKpis: any[];
  priorityGoals: any[];
  todaysHabits: any[];
  recentEntries: any[];
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  selectedTimeframe,
  setSelectedTimeframe,
  selectedAreas,
  setSelectedAreas,
  filteredKpis,
  priorityGoals,
  todaysHabits,
  recentEntries,
}) => {
  return (
    <div className="container mx-auto animate-fade-in">
      <DashboardHeader
        selectedTimeframe={selectedTimeframe}
        setSelectedTimeframe={setSelectedTimeframe}
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
      />

      <KpiSection kpis={filteredKpis} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentGoals goals={priorityGoals} />
          <HabitTracker habits={todaysHabits} />
        </div>
        
        <div className="space-y-6">
          <EmotionTracker />
          <RecentJournal entries={recentEntries} />
        </div>
      </div>
    </div>
  );
};
