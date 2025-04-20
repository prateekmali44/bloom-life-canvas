
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Briefcase, Heart, DollarSign, GraduationCap, UserCircle, Compass } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { LifeModule } from "@/types/modules";

interface ModuleSelectionProps {
  selectedModules: LifeModule[];
  onChange: (modules: LifeModule[]) => void;
}

export const ModuleSelection: React.FC<ModuleSelectionProps> = ({
  selectedModules,
  onChange,
}) => {
  const modules: Array<{
    id: LifeModule;
    name: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "professional",
      name: "Professional",
      description: "Track career goals, work achievements, and professional growth",
      icon: <Briefcase className="h-5 w-5 text-primary" />,
    },
    {
      id: "health",
      name: "Health & Fitness",
      description: "Monitor physical wellbeing, exercise, nutrition, and mental health",
      icon: <Heart className="h-5 w-5 text-primary" />,
    },
    {
      id: "financial",
      name: "Financial",
      description: "Track income, expenses, savings, investments, and financial goals",
      icon: <DollarSign className="h-5 w-5 text-primary" />,
    },
    {
      id: "educational",
      name: "Learning / Intellectual Growth",
      description: "Monitor knowledge acquisition, skills development, and learning goals",
      icon: <GraduationCap className="h-5 w-5 text-primary" />,
    },
    {
      id: "spiritual",
      name: "Spiritual & Emotional",
      description: "Track inner peace, emotional balance, meaning, and spiritual practices",
      icon: <UserCircle className="h-5 w-5 text-primary" />,
    },
    {
      id: "personal",
      name: "Personal Development",
      description: "Monitor personal growth, life goals, relationships, and hobbies",
      icon: <Compass className="h-5 w-5 text-primary" />,
    },
  ];

  const handleToggle = (moduleId: LifeModule) => {
    if (selectedModules.includes(moduleId)) {
      onChange(selectedModules.filter(id => id !== moduleId));
    } else {
      onChange([...selectedModules, moduleId]);
    }
  };

  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <div key={module.id} className="flex flex-col space-y-2">
          <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              {module.icon}
              <div>
                <Label htmlFor={`module-${module.id}`} className="text-base font-medium">
                  {module.name}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {module.description}
                </p>
              </div>
            </div>
            <Switch
              id={`module-${module.id}`}
              checked={selectedModules.includes(module.id)}
              onCheckedChange={() => handleToggle(module.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
