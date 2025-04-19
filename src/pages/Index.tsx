import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { GraphicalKpiCard } from "@/components/dashboard/GraphicalKpiCard";
import { RecentGoals } from "@/components/dashboard/RecentGoals";
import { HabitTracker } from "@/components/dashboard/HabitTracker";
import { RecentJournal } from "@/components/dashboard/RecentJournal";
import { EmotionTracker } from "@/components/dashboard/EmotionTracker";
import { LifeAreaKey } from "@/types";
import { mockKpiData, mockGoals, mockHabits, mockJournalEntries } from "@/services/mockData";

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  const [selectedAreas, setSelectedAreas] = useState<string[]>(
    Object.values(mockKpiData).map((kpi) => kpi.areaKey)
  );

  const filteredKpis = mockKpiData.filter((kpi) =>
    selectedAreas.includes(kpi.areaKey)
  );

  const priorityGoals = mockGoals
    .filter((goal) => goal.status === "in_progress" && goal.priority === "high")
    .slice(0, 3);

  const todaysHabits = mockHabits.slice(0, 4);

  const recentEntries = mockJournalEntries.slice(0, 3);

  return (
    <div className="container mx-auto animate-fade-in">
      <DashboardHeader
        selectedTimeframe={selectedTimeframe}
        setSelectedTimeframe={setSelectedTimeframe}
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredKpis.map((kpi) => (
          <GraphicalKpiCard key={kpi.areaKey} data={kpi} />
        ))}
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
    </div>
  );
};

export default Dashboard;
