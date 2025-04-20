
import React, { FC } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, PlusCircle, ChevronRight } from "lucide-react";
import { Badge } from '@/components/ui/badge';

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  color?: string;
}

export interface DimensionGoalsProps {
  title: string;
  description?: string;
  goals: Goal[];
  dimensionColor?: string;
  compact?: boolean;
  showHeader?: boolean;
  onAddGoal?: () => void;
  onViewAllGoals?: () => void;
}

const DimensionGoals: FC<DimensionGoalsProps> = ({
  title,
  description = "Track your progress towards your goals",
  goals,
  dimensionColor = "#8b5cf6", // Default purple
  compact = false,
  showHeader = true,
  onAddGoal,
  onViewAllGoals
}) => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge>High Priority</Badge>;
      case 'medium':
        return <Badge variant="outline">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={`w-full ${compact ? 'border-none shadow-none' : ''}`}>
      {showHeader && (
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="gap-1"
            onClick={onAddGoal}
          >
            <PlusCircle className="h-4 w-4" /> Add Goal
          </Button>
        </CardHeader>
      )}
      <CardContent className={`space-y-4 ${compact ? 'px-0' : ''}`}>
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <Target className="h-12 w-12 mx-auto text-muted-foreground opacity-30 mb-3" />
            <p className="text-muted-foreground">No goals set yet</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-3 gap-1"
              onClick={onAddGoal}
            >
              <PlusCircle className="h-4 w-4" /> Add Your First Goal
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {goals.slice(0, compact ? 1 : 3).map((goal) => (
              <div key={goal.id} className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="p-2 rounded-full" 
                      style={{ backgroundColor: `${goal.color || dimensionColor}20` }}
                    >
                      <Target 
                        className="h-4 w-4" 
                        style={{ color: goal.color || dimensionColor }} 
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                  </div>
                  {getPriorityBadge(goal.priority)}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress 
                    value={goal.progress} 
                    className="h-2"
                    style={{
                      '--progress-background': `${goal.color || dimensionColor}30`,
                      '--progress-foreground': goal.color || dimensionColor
                    } as React.CSSProperties} 
                  />
                </div>
                <div className="mt-3 flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Due: {goal.deadline}</span>
                  <Button variant="ghost" size="sm" className="h-7 gap-0.5 px-2">
                    Details <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {!compact && goals.length > 0 && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full gap-1"
            onClick={onViewAllGoals}
          >
            <Target className="h-4 w-4" /> View All {title}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default DimensionGoals;
