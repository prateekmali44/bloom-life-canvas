
import React from "react";
import { DashboardHeader } from "./DashboardHeader";
import { KpiSection } from "./KpiSection";
import { RecentGoals } from "./RecentGoals";
import { HabitTracker } from "./HabitTracker";
import { EmotionTracker } from "./EmotionTracker";
import { RecentJournal } from "./RecentJournal";
import GoalsOverview from "./GoalsOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { LayoutGrid, BarChart3, Target } from "lucide-react";

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
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto animate-fade-in pt-2 pb-20 md:pb-12">
      <DashboardHeader
        selectedTimeframe={selectedTimeframe}
        setSelectedTimeframe={setSelectedTimeframe}
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
      />

      {isMobile ? (
        <Tabs defaultValue="overview" className="w-full mt-4">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview" className="flex gap-1 items-center">
              <LayoutGrid className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex gap-1 items-center">
              <BarChart3 className="h-4 w-4" /> Metrics
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex gap-1 items-center">
              <Target className="h-4 w-4" /> Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0 space-y-6">
            <KpiSection kpis={filteredKpis} />
            <HabitTracker habits={todaysHabits} />
            <EmotionTracker />
            <RecentJournal entries={recentEntries} />
          </TabsContent>

          <TabsContent value="metrics" className="mt-0 space-y-6">
            <KpiSection kpis={filteredKpis} />
          </TabsContent>

          <TabsContent value="goals" className="mt-0 space-y-6">
            <GoalsOverview />
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <KpiSection kpis={filteredKpis} />

          <div className="mt-6 mb-6">
            <GoalsOverview compact={true} />
          </div>

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
        </>
      )}
    </div>
  );
};
