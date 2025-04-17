
import React from "react";
import { Habit, LifeAreaKey } from "@/types";
import { lifeAreas } from "@/services/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";

interface HabitTrackerProps {
  habits: Habit[];
}

export const HabitTracker: React.FC<HabitTrackerProps> = ({ habits }) => {
  return (
    <div className="bg-white border border-border rounded-xl shadow-sm">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold">Today's Habits</h3>
      </div>
      <div className="divide-y divide-border">
        {habits.length === 0 ? (
          <div className="px-5 py-6 text-center text-muted-foreground">
            No habits scheduled for today
          </div>
        ) : (
          habits.map((habit) => {
            const area = lifeAreas[habit.areaKey as LifeAreaKey];
            
            return (
              <div key={habit.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{habit.title}</h4>
                    <Badge style={{ backgroundColor: area.color }} className="text-white text-xs">
                      {area.name}
                    </Badge>
                  </div>
                  
                  <div className="mt-1 text-sm text-muted-foreground">
                    <span>{habit.description}</span>
                    {habit.timeOfDay && (
                      <span className="ml-2 px-1.5 py-0.5 bg-gray-100 rounded text-xs">
                        {habit.timeOfDay}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-1 text-xs">
                    <span className="text-emerald-600 font-medium">
                      {habit.streak} day streak
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 rounded-full border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full bg-emerald-500 hover:bg-emerald-600"
                  >
                    <CheckIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
