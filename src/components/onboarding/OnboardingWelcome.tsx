
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ModuleSelection } from "@/components/shared/ModuleSelection";
import { LifeModule } from "@/types/modules";
import { OnboardingData } from "./OnboardingLayout";

interface OnboardingWelcomeProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onComplete: () => void;
}

export const OnboardingWelcome: React.FC<OnboardingWelcomeProps> = ({
  data,
  updateData,
}) => {
  const handleModuleChange = (modules: LifeModule[]) => {
    // Create modules object with enabled state
    const modulesData = Object.fromEntries(
      modules.map(moduleId => [
        moduleId, 
        { enabled: true, onboarded: false }
      ])
    );
    
    updateData({ enabledModules: modulesData });
  };

  return (
    <div className="text-center max-w-2xl mx-auto py-10">
      <div className="w-20 h-20 bg-hazel-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z"/>
          <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z"/>
          <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z"/>
          <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z"/>
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Welcome to Reservoir</h1>
      <p className="text-xl text-muted-foreground mb-8">Your Self-Alignment Dashboard</p>
      
      <div className="space-y-6 mb-10">
        <p className="text-lg">
          We'll help you build your personal life operating system. Choose which life dimensions you want to focus on:
        </p>
        
        <div className="mt-6">
          <ModuleSelection 
            selectedModules={Object.keys(data.enabledModules || {}) as LifeModule[]}
            onChange={handleModuleChange}
          />
        </div>
        
        <div className="bg-lavender-50 p-4 rounded-lg text-left mt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> You can always enable or disable modules later in settings. Disabled modules will preserve your data.
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-muted-foreground">
          This will take about 5 minutes to complete. Let's get started!
        </p>
      </div>
    </div>
  );
};
