
import React from "react";
import { OnboardingData } from "./OnboardingLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface OnboardingCompleteProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onComplete: () => void;
}

export const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ data, onComplete }) => {
  // Calculate completeness
  const hasName = data.name.trim() !== "";
  const hasValues = data.coreValues.length > 0;
  const hasGoals = Object.values(data.goals).some(goals => goals.length > 0);
  const hasHabits = Object.values(data.habits).some(habits => habits.length > 0);
  
  const completedSteps = [
    hasName, 
    hasValues,
    hasGoals,
    hasHabits
  ].filter(Boolean).length;
  
  const percentComplete = Math.min(100, Math.round((completedSteps / 4) * 100));
  
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">You're all set!</h2>
        <p className="text-muted-foreground">
          Your personal dashboard is ready to be generated
        </p>
      </div>
      
      <div className="space-y-6 mb-10">
        <div className="bg-lavender-50 p-6 rounded-xl text-left">
          <h3 className="font-medium text-lg mb-4">Here's what we'll create for you:</h3>
          
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Personal Life Dashboard</p>
                <p className="text-sm text-muted-foreground">
                  With visualization of your self-ratings across all dimensions
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Habit Tracking System</p>
                <p className="text-sm text-muted-foreground">
                  For your {Object.values(data.habits).flat().length} habits across all life dimensions
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Goal Management</p>
                <p className="text-sm text-muted-foreground">
                  Track and manage your {Object.values(data.goals).flat().length} goals with progress indicators
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Regular Check-ins</p>
                <p className="text-sm text-muted-foreground">
                  Daily check-ins at {data.notificationTime} and weekly reviews on {data.weeklyReview}s
                </p>
              </div>
            </li>
          </ul>
          
          <div className="mt-6 pt-6 border-t border-border">
            <p className="font-medium">Dashboard completion: {percentComplete}%</p>
            <div className="w-full bg-background rounded-full h-2.5 mt-2">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${percentComplete}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        size="lg" 
        onClick={onComplete}
        className="px-8 py-6 h-auto text-lg font-medium"
      >
        Create My Dashboard
      </Button>
    </div>
  );
};
