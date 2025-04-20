import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { OnboardingWelcome } from "./OnboardingWelcome";
import { OnboardingProfile } from "./OnboardingProfile";
import { OnboardingValues } from "./OnboardingValues";
import { OnboardingSelfRating } from "./OnboardingSelfRating";
import { OnboardingGoals } from "./OnboardingGoals";
import { OnboardingHabits } from "./OnboardingHabits";
import { OnboardingNotifications } from "./OnboardingNotifications";
import { OnboardingComplete } from "./OnboardingComplete";
import { useToast } from "@/components/ui/use-toast";
import { defaultModulesData, ModulesData } from "@/types/modules";

export interface OnboardingData {
  // Profile
  name: string;
  age: number | null;
  birthday: Date | null;
  location: string;
  timezone: string;
  
  // Values
  coreValues: string[];
  topPriority: string;
  
  // Self Ratings
  selfRatings: {
    professional: number;
    health: number;
    financial: number;
    educational: number;
    spiritual: number;
    personal: number;
  };
  
  // Goals (by dimension)
  goals: {
    professional: string[];
    health: string[];
    financial: string[];
    educational: string[];
    spiritual: string[];
    personal: string[];
  };
  
  // Habits (by dimension)
  habits: {
    professional: string[];
    health: string[];
    financial: string[];
    educational: string[];
    spiritual: string[];
    personal: string[];
  };
  
  // Notifications
  notificationTime: string;
  weeklyReview: string;
  
  // Enabled Modules
  enabledModules: ModulesData;
}

export const OnboardingLayout = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    // Profile defaults
    name: "",
    age: null,
    birthday: null,
    location: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    
    // Values defaults
    coreValues: [],
    topPriority: "",
    
    // Self Ratings defaults (all start at 5)
    selfRatings: {
      professional: 5,
      health: 5,
      financial: 5,
      educational: 5,
      spiritual: 5,
      personal: 5,
    },
    
    // Empty goals
    goals: {
      professional: [],
      health: [],
      financial: [],
      educational: [],
      spiritual: [],
      personal: [],
    },
    
    // Empty habits
    habits: {
      professional: [],
      health: [],
      financial: [],
      educational: [],
      spiritual: [],
      personal: [],
    },
    
    // Default notification time (evening)
    notificationTime: "18:00",
    weeklyReview: "sunday",
    
    // Default modules (only professional enabled by default)
    enabledModules: {
      professional: { enabled: true, onboarded: false }
    },
  });
  
  const steps = [
    { id: "welcome", label: "Welcome", component: OnboardingWelcome },
    { id: "profile", label: "Profile", component: OnboardingProfile },
    { id: "values", label: "Values & Priorities", component: OnboardingValues },
    { id: "self-rating", label: "Self Rating", component: OnboardingSelfRating },
    { id: "goals", label: "Goals", component: OnboardingGoals },
    { id: "habits", label: "Habits", component: OnboardingHabits },
    { id: "notifications", label: "Notifications", component: OnboardingNotifications },
    { id: "complete", label: "Complete", component: OnboardingComplete },
  ];
  
  const CurrentStepComponent = steps[currentStep].component;
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleUpdateData = (data: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...data }));
  };
  
  const handleComplete = () => {
    // Save the user data to localStorage or backend
    localStorage.setItem("onboardingCompleted", "true");
    localStorage.setItem("userData", JSON.stringify(onboardingData));
    
    // Show success message
    toast({
      title: "Setup Complete!",
      description: "Your personal life dashboard is ready to use.",
    });
    
    // Navigate to dashboard
    window.location.href = "/";
  };
  
  const progressPercentage = ((currentStep) / (steps.length - 1)) * 100;
  
  return (
    <div className="min-h-screen bg-hazel-50 flex flex-col">
      {/* Header with progress */}
      <div className="py-6 px-4 md:px-6 border-b bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Reservoir</h1>
            <div className="text-sm font-medium">
              Step {currentStep} of {steps.length - 1}
            </div>
          </div>
          <Progress value={progressPercentage} className="mt-4" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8 animate-fade-in">
            <CurrentStepComponent 
              data={onboardingData} 
              updateData={handleUpdateData} 
              onComplete={handleComplete} 
            />
          </div>
        </div>
      </div>

      {/* Footer with navigation */}
      <div className="py-6 px-4 md:px-6 border-t bg-white">
        <div className="container mx-auto max-w-4xl flex justify-between">
          {currentStep > 0 && currentStep < steps.length - 1 ? (
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {currentStep < steps.length - 1 && (
            <Button 
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              {currentStep === 0 ? "Get Started" : "Continue"}
              <ArrowRight size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
