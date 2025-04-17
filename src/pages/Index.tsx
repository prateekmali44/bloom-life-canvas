
import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
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

  // Filter KPIs by selected areas
  const filteredKpis = mockKpiData.filter((kpi) =>
    selectedAreas.includes(kpi.areaKey)
  );

  // Get recent goals (in progress)
  const recentGoals = mockGoals
    .filter((goal) => goal.status === "in_progress")
    .slice(0, 3);

  // Get today's habits
  const todaysHabits = mockHabits.slice(0, 4);

  // Get recent journal entries
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
          <KpiCard key={kpi.areaKey} data={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentGoals goals={recentGoals} />
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
