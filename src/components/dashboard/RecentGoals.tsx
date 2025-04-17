
import React from "react";
import { Goal, LifeAreaKey } from "@/types";
import { lifeAreas } from "@/services/mockData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface RecentGoalsProps {
  goals: Goal[];
}

export const RecentGoals: React.FC<RecentGoalsProps> = ({ goals }) => {
  return (
    <div className="bg-white border border-border rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold">Active Goals</h3>
      </div>
      <div className="divide-y divide-border">
        {goals.length === 0 ? (
          <div className="px-5 py-6 text-center text-muted-foreground">
            No active goals found
          </div>
        ) : (
          goals.map((goal) => {
            const area = lifeAreas[goal.areaKey as LifeAreaKey];
            const deadline = goal.deadline ? new Date(goal.deadline) : null;
            const formattedDeadline = deadline
              ? deadline.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "No deadline";

            return (
              <div key={goal.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{goal.title}</h4>
                      <Badge style={{ backgroundColor: area.color }} className="text-white text-xs">
                        {area.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {goal.description}
                    </p>
                  </div>
                  
                  {goal.status === "completed" && (
                    <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Progress:</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Due:</span>
                    <span className="font-medium">{formattedDeadline}</span>
                  </div>
                </div>
                
                <Progress 
                  value={goal.progress} 
                  className="h-1.5 mt-2"
                  style={{ 
                    backgroundColor: `${area.color}20`,
                    "--progress-color": area.color
                  } as React.CSSProperties}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
