
import React from "react";
import { AreaFilter } from "./AreaFilter";

interface DashboardHeaderProps {
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
  selectedAreas: string[];
  setSelectedAreas: (areas: string[]) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedTimeframe,
  setSelectedTimeframe,
  selectedAreas,
  setSelectedAreas,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-muted-foreground">
            Your life balance overview and key metrics
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-secondary rounded-md flex p-1">
            {["Day", "Week", "Month", "Year"].map((timeframe) => (
              <button
                key={timeframe}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  selectedTimeframe === timeframe.toLowerCase()
                    ? "bg-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setSelectedTimeframe(timeframe.toLowerCase())}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <AreaFilter 
        selectedAreas={selectedAreas} 
        setSelectedAreas={setSelectedAreas} 
      />
    </div>
  );
};
