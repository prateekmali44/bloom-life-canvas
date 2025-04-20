
import React, { FC } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { lifeAreas } from "@/services/mockData";
import { Target, PlusCircle, ArrowRight, Check, Clock } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

// Dummy data for goals by life area
const goalsByArea = {
  professional: [
    { id: 'p1', title: 'Get Promoted', description: 'Achieve senior position', progress: 45, deadline: 'Dec 2025', priority: 'high' as const },
    { id: 'p2', title: 'Learn React Native', description: 'Build 3 mobile apps', progress: 30, deadline: 'Jun 2025', priority: 'medium' as const },
  ],
  health: [
    { id: 'h1', title: 'Run Half-Marathon', description: 'Complete 21K race', progress: 60, deadline: 'Sep 2025', priority: 'high' as const },
    { id: 'h2', title: 'Meditation Habit', description: 'Daily 10 min practice', progress: 25, deadline: 'May 2025', priority: 'medium' as const },
  ],
  financial: [
    { id: 'f1', title: 'Emergency Fund', description: 'Save 6 months expenses', progress: 65, deadline: 'Dec 2025', priority: 'high' as const },
    { id: 'f2', title: 'Investment Portfolio', description: 'Diversify investments', progress: 20, deadline: 'Nov 2025', priority: 'medium' as const },
  ],
  educational: [
    { id: 'e1', title: 'Master's Degree', description: 'Complete coursework', progress: 40, deadline: 'Jun 2026', priority: 'high' as const },
    { id: 'e2', title: 'Read 24 Books', description: '2 books per month', progress: 33, deadline: 'Dec 2025', priority: 'low' as const },
  ],
  spiritual: [
    { id: 's1', title: 'Daily Mindfulness', description: 'Practice gratitude', progress: 50, deadline: 'Ongoing', priority: 'medium' as const },
  ],
  personal: [
    { id: 'pe1', title: 'Travel to Japan', description: 'Culture exploration', progress: 15, deadline: 'Nov 2025', priority: 'medium' as const },
    { id: 'pe2', title: 'Learn Piano', description: 'Basic proficiency', progress: 10, deadline: 'Dec 2026', priority: 'low' as const },
  ],
};

// Calculate total goals
const totalGoals = Object.values(goalsByArea).reduce((sum, goals) => sum + goals.length, 0);
const completedGoals = 3; // Example value
const inProgressGoals = totalGoals - completedGoals;
const upcomingDeadlines = 2; // Example value

export interface GoalsOverviewProps {
  showHeader?: boolean;
  compact?: boolean;
}

const GoalsOverview: FC<GoalsOverviewProps> = ({
  showHeader = true,
  compact = false
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleGoToDimension = (dimension: string) => {
    navigate(`/${dimension}`);
  };

  return (
    <Card className="w-full">
      {showHeader && (
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Goals Overview</CardTitle>
              <CardDescription>Track all your goals across different life areas</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="gap-1"
                onClick={() => navigate('/goals')}
              >
                <Target className="h-4 w-4" /> All Goals
              </Button>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" /> New Goal
              </Button>
            </div>
          </div>
        </CardHeader>
      )}

      <CardContent className="p-0 pb-4">
        {!compact && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 mb-2">
            <Card className="bg-primary/5 border-none shadow-none">
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold mb-1">{totalGoals}</p>
                <p className="text-xs text-muted-foreground">Total Goals</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-none shadow-none">
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold mb-1 text-green-600">{completedGoals}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-none shadow-none">
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold mb-1 text-blue-600">{inProgressGoals}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </CardContent>
            </Card>
            <Card className="bg-amber-50 border-none shadow-none">
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold mb-1 text-amber-600">{upcomingDeadlines}</p>
                <p className="text-xs text-muted-foreground">Upcoming Deadlines</p>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="all" className="w-full px-4">
          <TabsList className={`mb-4 grid ${isMobile ? 'grid-cols-3' : 'w-auto inline-flex'}`}>
            <TabsTrigger value="all">All Goals</TabsTrigger>
            <TabsTrigger value="priority">High Priority</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0 space-y-4">
            <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'}`}>
              {Object.entries(goalsByArea).map(([area, goals]) => {
                if (goals.length === 0) return null;
                const lifeArea = lifeAreas[area as keyof typeof lifeAreas];
                return (
                  <div key={area} className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${lifeArea.color}20` }}
                        >
                          <Target 
                            className="h-4 w-4" 
                            style={{ color: lifeArea.color }} 
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{lifeArea.name} Goals</h3>
                          <p className="text-xs text-muted-foreground">{goals.length} goals</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 gap-1 px-2"
                        onClick={() => handleGoToDimension(area)}
                      >
                        View <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {goals.slice(0, 2).map(goal => (
                        <div key={goal.id} className="border rounded-md p-2">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-sm font-medium">{goal.title}</span>
                            {goal.priority === 'high' && (
                              <Badge className="text-xs">High</Badge>
                            )}
                          </div>
                          <div className="space-y-1">
                            <Progress 
                              value={goal.progress} 
                              className="h-1.5"
                              style={{
                                '--progress-background': `${lifeArea.color}30`,
                                '--progress-foreground': lifeArea.color
                              } as React.CSSProperties} 
                            />
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>{goal.progress}% complete</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{goal.deadline}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {goals.length > 2 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full text-xs h-7"
                          onClick={() => handleGoToDimension(area)}
                        >
                          {goals.length - 2} more goals
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="priority" className="mt-0">
            <div className="space-y-2">
              {Object.entries(goalsByArea)
                .flatMap(([area, goals]) => 
                  goals.filter(g => g.priority === 'high')
                    .map(goal => ({...goal, area}))
                )
                .slice(0, compact ? 3 : 6)
                .map(goal => {
                  const areaKey = goal.area as keyof typeof lifeAreas;
                  const lifeArea = lifeAreas[areaKey];
                  return (
                    <div key={goal.id} className="bg-white border rounded-lg p-3 flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${lifeArea.color}20` }}
                        >
                          <Target 
                            className="h-4 w-4" 
                            style={{ color: lifeArea.color }} 
                          />
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm truncate">{goal.title}</h4>
                          <Badge 
                            variant="outline"
                            className="ml-1 flex-shrink-0"
                            style={{ 
                              color: lifeArea.color,
                              borderColor: `${lifeArea.color}40` 
                            }}
                          >
                            {lifeArea.name}
                          </Badge>
                        </div>
                        <Progress 
                          value={goal.progress} 
                          className="h-1.5 mt-2"
                          style={{
                            '--progress-background': `${lifeArea.color}30`,
                            '--progress-foreground': lifeArea.color
                          } as React.CSSProperties} 
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                          <span className="text-xs text-muted-foreground">{goal.deadline}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-0">
            <div className="space-y-2">
              {Object.entries(goalsByArea)
                .flatMap(([area, goals]) => 
                  goals.map(goal => ({...goal, area}))
                )
                .sort((a, b) => {
                  // Simple sort by deadline (would need actual date comparison in production)
                  return a.deadline.localeCompare(b.deadline);
                })
                .slice(0, compact ? 3 : 6)
                .map(goal => {
                  const areaKey = goal.area as keyof typeof lifeAreas;
                  const lifeArea = lifeAreas[areaKey];
                  return (
                    <div key={goal.id} className="bg-white border rounded-lg p-3 flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-amber-500" />
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm">{goal.title}</h4>
                          <Badge 
                            variant="outline"
                            className="ml-1"
                            style={{ 
                              color: lifeArea.color,
                              borderColor: `${lifeArea.color}40` 
                            }}
                          >
                            {lifeArea.name}
                          </Badge>
                        </div>
                        <div className="flex justify-between mt-1">
                          <div className="flex items-center gap-1">
                            <div 
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: lifeArea.color }} 
                            />
                            <span className="text-xs">{goal.progress}% complete</span>
                          </div>
                          <span className="text-xs font-medium text-amber-600">Due: {goal.deadline}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GoalsOverview;
