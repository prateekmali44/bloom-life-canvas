
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
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
    <DashboardLayout
      selectedTimeframe={selectedTimeframe}
      setSelectedTimeframe={setSelectedTimeframe}
      selectedAreas={selectedAreas}
      setSelectedAreas={setSelectedAreas}
      filteredKpis={filteredKpis}
      priorityGoals={priorityGoals}
      todaysHabits={todaysHabits}
      recentEntries={recentEntries}
    />
  );
};

export default Dashboard;
