
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
  Plus, 
  Target, 
  X 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OnboardingGoalsProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onComplete: () => void;
}

type LifeDimension = keyof OnboardingData['goals'];

interface DimensionInfo {
  key: LifeDimension;
  label: string;
  color: string;
  suggestions: string[];
}

export const OnboardingGoals: React.FC<OnboardingGoalsProps> = ({ data, updateData }) => {
  const [activeTab, setActiveTab] = useState<LifeDimension>("professional");
  const [newGoal, setNewGoal] = useState("");
  
  const dimensions: DimensionInfo[] = [
    {
      key: "professional",
      label: "Professional",
      color: "bg-hazel-500",
      suggestions: [
        "Get promoted in the next 6 months",
        "Improve presentation skills",
        "Network with 5 new people each month",
        "Complete job certification",
        "Find a new job with better work-life balance"
      ]
    },
    {
      key: "health",
      label: "Health",
      color: "bg-lavender-500",
      suggestions: [
        "Exercise 4x per week",
        "Sleep 8 hours every night",
        "Reduce sugar intake",
        "Train for a half marathon",
        "Meditate for 10 minutes daily"
      ]
    },
    {
      key: "financial",
      label: "Financial",
      color: "bg-hazel-500", 
      suggestions: [
        "Save ₹10,000 per month",
        "Pay off credit card debt",
        "Create an emergency fund",
        "Increase passive income streams",
        "Invest 15% of income"
      ]
    },
    {
      key: "educational",
      label: "Educational",
      color: "bg-lavender-500",
      suggestions: [
        "Read 10 books this year",
        "Learn a new language",
        "Take an online course each quarter",
        "Attend a workshop or conference",
        "Learn a new skill monthly"
      ]
    },
    {
      key: "spiritual",
      label: "Spiritual",
      color: "bg-hazel-500",
      suggestions: [
        "Practice daily gratitude",
        "Join a community group",
        "Journal weekly about emotions",
        "Volunteer monthly",
        "Develop a mindfulness practice"
      ]
    },
    {
      key: "personal",
      label: "Personal",
      color: "bg-lavender-500",
      suggestions: [
        "Spend quality time with family weekly",
        "Take a vacation every 6 months",
        "Develop a new hobby",
        "Improve work-life balance",
        "Connect with friends regularly"
      ]
    }
  ];
  
  const currentDimension = dimensions.find(d => d.key === activeTab) || dimensions[0];
  
  const handleAddGoal = () => {
    if (newGoal.trim() === "") return;
    
    const updatedGoals = {
      ...data.goals,
      [activeTab]: [...data.goals[activeTab], newGoal.trim()]
    };
    
    updateData({ goals: updatedGoals });
    setNewGoal("");
  };
  
  const handleAddSuggestion = (suggestion: string) => {
    if (data.goals[activeTab].includes(suggestion)) return;
    
    const updatedGoals = {
      ...data.goals,
      [activeTab]: [...data.goals[activeTab], suggestion]
    };
    
    updateData({ goals: updatedGoals });
  };
  
  const handleRemoveGoal = (dimension: LifeDimension, goal: string) => {
    const updatedGoals = {
      ...data.goals,
      [dimension]: data.goals[dimension].filter(g => g !== goal)
    };
    
    updateData({ goals: updatedGoals });
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Set Your Goals</h2>
        <p className="text-muted-foreground">
          Add 1-3 specific goals for each life dimension
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
              {data.goals[dimension.key].length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {data.goals[dimension.key].length}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {dimensions.map((dimension) => (
          <TabsContent key={dimension.key} value={dimension.key} className="space-y-6">
            {/* Add new goal */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Add your {dimension.label} goals:</h3>
              
              <div className="flex gap-2">
                <Input
                  placeholder={`Enter a ${dimension.label.toLowerCase()} goal...`}
                  value={dimension.key === activeTab ? newGoal : ""}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddGoal();
                    }
                  }}
                />
                <Button onClick={handleAddGoal} className="shrink-0">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
            
            {/* Current goals */}
            {data.goals[dimension.key].length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Your {dimension.label} goals:</h3>
                <div className="space-y-2">
                  {data.goals[dimension.key].map((goal, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-background rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span>{goal}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveGoal(dimension.key, goal)}
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
              <h3 className="text-lg font-medium">Suggested {dimension.label} goals:</h3>
              <div className="flex flex-wrap gap-2">
                {dimension.suggestions.map((suggestion) => {
                  const isAdded = data.goals[dimension.key].includes(suggestion);
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
