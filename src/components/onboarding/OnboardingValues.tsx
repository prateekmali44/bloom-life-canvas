
import React from "react";
import { OnboardingData } from "./OnboardingLayout";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

interface OnboardingValuesProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onComplete: () => void;
}

export const OnboardingValues: React.FC<OnboardingValuesProps> = ({ data, updateData }) => {
  const allValues = [
    "Growth", "Peace", "Discipline", "Adventure", "Love",
    "Health", "Creativity", "Family", "Wealth", "Spirituality",
    "Freedom", "Security", "Recognition", "Compassion", "Achievement",
    "Balance", "Knowledge", "Integrity", "Joy", "Contribution"
  ];
  
  const handleValueClick = (value: string) => {
    if (data.coreValues.includes(value)) {
      // Remove if already selected
      updateData({
        coreValues: data.coreValues.filter(v => v !== value)
      });
    } else if (data.coreValues.length < 3) {
      // Add if less than 3 are selected
      updateData({
        coreValues: [...data.coreValues, value]
      });
    }
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Core Values & Priorities</h2>
        <p className="text-muted-foreground">
          Knowing what matters most helps create alignment in your life
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Core Values Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Select your top 3 core values</Label>
            <span className="text-sm text-muted-foreground">
              {data.coreValues.length}/3 selected
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allValues.map((value) => (
              <Badge
                key={value}
                variant={data.coreValues.includes(value) ? "default" : "outline"}
                className={`cursor-pointer text-sm py-1 px-3 ${
                  data.coreValues.includes(value) 
                    ? "bg-primary" 
                    : "hover:bg-primary/10"
                }`}
                onClick={() => handleValueClick(value)}
              >
                {value}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Top Priority */}
        <div className="space-y-2">
          <Label htmlFor="priority">What's your top priority right now?</Label>
          <div className="relative">
            <Input
              id="priority"
              placeholder="e.g., Getting healthier, Finding a new job, Improving relationships"
              value={data.topPriority}
              onChange={(e) => updateData({ topPriority: e.target.value })}
              className="pl-10"
            />
            <Star className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
      
      {/* Selected Values Summary */}
      {data.coreValues.length > 0 && (
        <div className="mt-8 p-4 bg-lavender-50 rounded-lg">
          <p className="font-medium mb-2">Your selected values:</p>
          <div className="flex gap-2">
            {data.coreValues.map((value) => (
              <Badge key={value} className="bg-primary">{value}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
