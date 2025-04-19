
import React, { useState } from "react";
import { OnboardingData } from "./OnboardingLayout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  ListCheck, 
  Plus, 
  X 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OnboardingHabitsProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onComplete: () => void;
}

type LifeDimension = keyof OnboardingData['habits'];

interface DimensionInfo {
  key: LifeDimension;
  label: string;
  color: string;
  suggestions: string[];
}

export const OnboardingHabits: React.FC<OnboardingHabitsProps> = ({ data, updateData }) => {
  const [activeTab, setActiveTab] = useState<LifeDimension>("professional");
  const [newHabit, setNewHabit] = useState("");
  
  const dimensions: DimensionInfo[] = [
    {
      key: "professional",
      label: "Professional",
      color: "bg-hazel-500",
      suggestions: [
        "Review goals every Monday",
        "Block 1 hour for deep work daily",
        "Check email only twice a day",
        "Learn something new every week",
        "Network with one person weekly"
      ]
    },
    {
      key: "health",
      label: "Health",
      color: "bg-lavender-500",
      suggestions: [
        "Exercise for 30 minutes daily",
        "Drink 8 glasses of water daily",
        "10 minutes stretching/yoga in morning",
        "Get 7-8 hours of sleep",
        "Take walking breaks during workday"
      ]
    },
    {
      key: "financial",
      label: "Financial",
      color: "bg-hazel-500", 
      suggestions: [
        "Track expenses daily",
        "Review budget weekly",
        "No impulse purchases",
        "Pack lunch to work",
        "One no-spend day per week"
      ]
    },
    {
      key: "educational",
      label: "Educational",
      color: "bg-lavender-500",
      suggestions: [
        "Read for 30 minutes daily",
        "Listen to educational podcast",
        "Practice new skill for 20 minutes",
        "Take notes on what you learn",
        "Watch one tutorial per week"
      ]
    },
    {
      key: "spiritual",
      label: "Spiritual",
      color: "bg-hazel-500",
      suggestions: [
        "5 minutes of meditation daily",
        "Write 3 gratitudes every night",
        "Practice mindfulness during meals",
        "No phone first hour after waking",
        "Reflect on the day before bed"
      ]
    },
    {
      key: "personal",
      label: "Personal",
      color: "bg-lavender-500",
      suggestions: [
        "Call a friend or family member weekly",
        "30 minutes of hobby time daily",
        "Technology-free evenings once a week",
        "Plan one fun activity each weekend",
        "Journal for 5 minutes daily"
      ]
    }
  ];
  
  const currentDimension = dimensions.find(d => d.key === activeTab) || dimensions[0];
  
  const handleAddHabit = () => {
    if (newHabit.trim() === "") return;
    
    const updatedHabits = {
      ...data.habits,
      [activeTab]: [...data.habits[activeTab], newHabit.trim()]
    };
    
    updateData({ habits: updatedHabits });
    setNewHabit("");
  };
  
  const handleAddSuggestion = (suggestion: string) => {
    if (data.habits[activeTab].includes(suggestion)) return;
    
    const updatedHabits = {
      ...data.habits,
      [activeTab]: [...data.habits[activeTab], suggestion]
    };
    
    updateData({ habits: updatedHabits });
  };
  
  const handleRemoveHabit = (dimension: LifeDimension, habit: string) => {
    const updatedHabits = {
      ...data.habits,
      [dimension]: data.habits[dimension].filter(h => h !== habit)
    };
    
    updateData({ habits: updatedHabits });
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Set Your Habits</h2>
        <p className="text-muted-foreground">
          Choose habits you want to track for each life dimension
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as LifeDimension)}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          {dimensions.map((dimension) => (
            <TabsTrigger 
              key={dimension.key} 
              value={dimension.key}
              className="relative"
            >
              {dimension.label}
              {data.habits[dimension.key].length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {data.habits[dimension.key].length}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {dimensions.map((dimension) => (
          <TabsContent key={dimension.key} value={dimension.key} className="space-y-6">
            {/* Add new habit */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Add your {dimension.label} habits:</h3>
              
              <div className="flex gap-2">
                <Input
                  placeholder={`Enter a ${dimension.label.toLowerCase()} habit...`}
                  value={dimension.key === activeTab ? newHabit : ""}
                  onChange={(e) => setNewHabit(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddHabit();
                    }
                  }}
                />
                <Button onClick={handleAddHabit} className="shrink-0">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
            
            {/* Current habits */}
            {data.habits[dimension.key].length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Your {dimension.label} habits:</h3>
                <div className="space-y-2">
                  {data.habits[dimension.key].map((habit, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-background rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <ListCheck className="h-4 w-4 text-primary" />
                        <span>{habit}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveHabit(dimension.key, habit)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Suggestions */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Suggested {dimension.label} habits:</h3>
              <div className="flex flex-wrap gap-2">
                {dimension.suggestions.map((suggestion) => {
                  const isAdded = data.habits[dimension.key].includes(suggestion);
                  return (
                    <Badge 
                      key={suggestion}
                      variant={isAdded ? "default" : "outline"}
                      className={`cursor-pointer px-3 py-1.5 ${
                        isAdded 
                          ? "bg-primary text-white" 
                          : "hover:bg-primary/10"
                      }`}
                      onClick={() => handleAddSuggestion(suggestion)}
                    >
                      {suggestion}
                      {isAdded && <Check className="ml-1 h-3 w-3" />}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
