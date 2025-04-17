
import React from "react";
import { KpiData, LifeAreaKey } from "@/types";
import { lifeAreas } from "@/services/mockData";
import { ArrowDownIcon, ArrowUpIcon, Briefcase, Compass, DollarSign, GraduationCap, Heart, Minus, UserCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  data: KpiData;
}

// Map of area keys to icons
const areaIcons = {
  professional: Briefcase,
  health: Heart,
  financial: DollarSign,
  educational: GraduationCap,
  spiritual: UserCircle,
  personal: Compass,
};

export const KpiCard: React.FC<KpiCardProps> = ({ data }) => {
  const area = lifeAreas[data.areaKey as LifeAreaKey];
  const AreaIcon = areaIcons[data.areaKey as LifeAreaKey];
  
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm p-5 border border-border animate-scale-in area-card-hover"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="h-10 w-10 rounded-md flex items-center justify-center text-white"
            style={{ backgroundColor: area.color }}
          >
            <AreaIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{area.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <span className={cn("text-lg font-semibold", getScoreColor(data.score))}>
                {data.score}%
              </span>
              
              <div className="flex items-center gap-0.5 text-sm">
                {data.trend === "up" ? (
                  <span className="text-green-600 flex items-center">
                    <ArrowUpIcon className="h-3 w-3" />
                    {data.trendValue}%
                  </span>
                ) : data.trend === "down" ? (
                  <span className="text-red-600 flex items-center">
                    <ArrowDownIcon className="h-3 w-3" />
                    {data.trendValue}%
                  </span>
                ) : (
                  <span className="text-gray-500 flex items-center">
                    <Minus className="h-3 w-3" />
                    0%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Progress 
        value={data.score} 
        className="h-1.5 mb-4"
        style={{ 
          backgroundColor: `${area.color}20`,
          "--progress-color": area.color
        } as React.CSSProperties}
      />

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
          <span className="text-muted-foreground">Goals</span>
          <span className="font-medium">
            {data.completedGoals}/{data.completedGoals + data.pendingGoals}
          </span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
          <span className="text-muted-foreground">Habits</span>
          <span className="font-medium">{data.activeHabits}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
          <span className="text-muted-foreground">Streak</span>
          <span className="font-medium">12d</span>
        </div>
      </div>
    </div>
  );
};
