
import React from "react";
import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EmotionTracker: React.FC = () => {
  const emotions = [
    { name: "Happy", color: "#10B981" },
    { name: "Motivated", color: "#6366F1" },
    { name: "Calm", color: "#3B82F6" },
    { name: "Anxious", color: "#F59E0B" },
    { name: "Tired", color: "#8B5CF6" },
    { name: "Frustrated", color: "#EF4444" },
  ];

  return (
    <div className="bg-white border border-border rounded-xl shadow-sm animate-scale-in">
      <div className="px-5 py-4 border-b border-border flex justify-between items-center">
        <h3 className="font-semibold">How are you feeling?</h3>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {emotions.map((emotion) => (
            <button
              key={emotion.name}
              className="flex flex-col items-center justify-center py-3 px-4 rounded-lg border border-border hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div
                className="h-4 w-4 rounded-full mb-2"
                style={{ backgroundColor: emotion.color }}
              ></div>
              <span className="text-sm font-medium">{emotion.name}</span>
            </button>
          ))}
        </div>
        <Button className="w-full gap-2">
          <FilePlus className="h-4 w-4" /> New Journal Entry
        </Button>
      </div>
    </div>
  );
};
