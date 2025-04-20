
import React, { useState } from "react";
import { lifeAreas } from "@/services/mockData";
import { LifeAreaKey } from "@/types";
import { 
  BarChart4,
  CheckCircle,
  ChevronDownIcon, 
  Clock, 
  Plus, 
  Search,
  Target,
  Filter,
  TagIcon,
  CalendarIcon,
  LayoutGrid,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal } from "@/components/shared/DimensionGoals";

// Sample consolidated goals data from all dimensions
const allGoals: (Goal & { areaKey: LifeAreaKey })[] = [
  { 
    id: 'f1', 
    title: 'Emergency Fund', 
    description: 'Save 6 months of expenses', 
    progress: 65, 
    deadline: 'Dec 2025', 
    priority: 'high',
    areaKey: 'financial',
    color: '#f59e0b'
  },
  { 
    id: 'f2', 
    title: 'Investment Portfolio', 
    description: 'Diversify investments', 
    progress: 20, 
    deadline: 'Nov 2025', 
    priority: 'medium',
    areaKey: 'financial',
    color: '#f59e0b'
  },
  { 
    id: 'p1', 
    title: 'Learn to Play Piano', 
    description: 'Master basic scales and chords', 
    progress: 30, 
    deadline: 'Dec 2025', 
    priority: 'medium',
    areaKey: 'personal',
    color: '#ec4899'
  },
  { 
    id: 'p2', 
    title: 'Travel to Japan', 
    description: 'Experience Japanese culture', 
    progress: 15, 
    deadline: 'May 2026', 
    priority: 'high',
    areaKey: 'personal',
    color: '#ec4899'
  },
  { 
    id: 'h1', 
    title: 'Run Half-Marathon', 
    description: 'Complete 21K race', 
    progress: 60, 
    deadline: 'Sep 2025', 
    priority: 'high',
    areaKey: 'health',
    color: '#10b981'
  },
  { 
    id: 'h2', 
    title: 'Meditation Habit', 
    description: 'Daily 10 min practice', 
    progress: 25, 
    deadline: 'May 2025', 
    priority: 'medium',
    areaKey: 'health',
    color: '#10b981'
  },
  { 
    id: 'e1', 
    title: 'Master\'s Degree', 
    description: 'Complete coursework', 
    progress: 40, 
    deadline: 'Jun 2026', 
    priority: 'high',
    areaKey: 'educational',
    color: '#3b82f6'
  },
  { 
    id: 'e2', 
    title: 'Read 24 Books', 
    description: '2 books per month', 
    progress: 33, 
    deadline: 'Dec 2025', 
    priority: 'low',
    areaKey: 'educational',
    color: '#3b82f6'
  },
  { 
    id: 'pr1', 
    title: 'Get Promoted', 
    description: 'Achieve senior position', 
    progress: 45, 
    deadline: 'Dec 2025', 
    priority: 'high',
    areaKey: 'professional',
    color: '#6366f1'
  },
  { 
    id: 'pr2', 
    title: 'Learn React Native', 
    description: 'Build 3 mobile apps', 
    progress: 30, 
    deadline: 'Jun 2025', 
    priority: 'medium',
    areaKey: 'professional',
    color: '#6366f1'
  },
  { 
    id: 's1', 
    title: 'Daily Mindfulness', 
    description: 'Practice gratitude', 
    progress: 50, 
    deadline: 'Ongoing', 
    priority: 'medium',
    areaKey: 'spiritual',
    color: '#8b5cf6'
  }
];

const GoalsPage = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [areaFilter, setAreaFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Filter goals
  const filteredGoals = allGoals.filter((goal) => {
    const matchesSearch = goal.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? (
      statusFilter === "completed" ? goal.progress === 100 :
      statusFilter === "in_progress" ? (goal.progress > 0 && goal.progress < 100) :
      goal.progress === 0
    ) : true;
    const matchesArea = areaFilter ? goal.areaKey === areaFilter : true;
    const matchesPriority = priorityFilter ? goal.priority === priorityFilter : true;
    return matchesSearch && matchesStatus && matchesArea && matchesPriority;
  });

  // Group goals by area
  const groupedGoals = filteredGoals.reduce<Record<string, typeof filteredGoals>>((acc, goal) => {
    if (!acc[goal.areaKey]) {
      acc[goal.areaKey] = [];
    }
    acc[goal.areaKey].push(goal);
    return acc;
  }, {});

  // Stats
  const completedGoals = filteredGoals.filter(g => g.progress === 100).length;
  const inProgressGoals = filteredGoals.filter(g => g.progress > 0 && g.progress < 100).length;
  const notStartedGoals = filteredGoals.filter(g => g.progress === 0).length;
  const highPriorityGoals = filteredGoals.filter(g => g.priority === "high").length;

  return (
    <div className="container mx-auto animate-fade-in pb-20 md:pb-8">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Goals</h1>
            <p className="text-muted-foreground">
              Set, track, and achieve your goals across all life areas
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> New Goal
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search goals..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={statusFilter || ""}
              onChange={(e) => setStatusFilter(e.target.value || null)}
            >
              <option value="">All Progress</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={priorityFilter || ""}
              onChange={(e) => setPriorityFilter(e.target.value || null)}
            >
              <option value="">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <div>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={areaFilter || ""}
              onChange={(e) => setAreaFilter(e.target.value || null)}
            >
              <option value="">All Areas</option>
              {Object.values(lifeAreas).map((area) => (
                <option key={area.key} value={area.key}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Goals</p>
                <h3 className="text-2xl font-bold">{filteredGoals.length}</h3>
              </div>
              <div className="h-10 w-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold">{completedGoals}</h3>
              </div>
              <div className="h-10 w-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <h3 className="text-2xl font-bold">{inProgressGoals}</h3>
              </div>
              <div className="h-10 w-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <h3 className="text-2xl font-bold">{highPriorityGoals}</h3>
              </div>
              <div className="h-10 w-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                <TagIcon className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Goals</h2>
        <div className="flex gap-1">
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("list")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("grid")}
          >
            <BarChart4 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className={`mb-6 ${isMobile ? 'grid grid-cols-2' : ''}`}>
          <TabsTrigger value="all">All Goals</TabsTrigger>
          <TabsTrigger value="by-area">By Life Area</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {filteredGoals.length === 0 ? (
            <div className="bg-white border border-border rounded-xl shadow-sm p-10 text-center text-muted-foreground">
              <Target className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-2" />
              <h3 className="text-lg font-medium mb-1">No goals found</h3>
              <p className="text-sm mb-4">Try adjusting your search or filters</p>
              <Button className="mx-auto gap-1">
                <Plus className="h-4 w-4" /> Add New Goal
              </Button>
            </div>
          ) : viewMode === "list" ? (
            <div className="bg-white border border-border rounded-xl shadow-sm">
              <div className="divide-y divide-border">
                {filteredGoals.map((goal) => {
                  const area = lifeAreas[goal.areaKey];
                  
                  return (
                    <div key={goal.id} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-medium text-gray-900">{goal.title}</h4>
                            <Badge
                              style={{ backgroundColor: goal.color || area.color }}
                              className="text-white"
                            >
                              {area.name}
                            </Badge>
                            {goal.priority === 'high' && (
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                                High Priority
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground">{goal.description}</p>
                        </div>

                        <Button variant="ghost" size="sm" className="gap-1 shrink-0">
                          Edit <ChevronDownIcon className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between mb-3 gap-y-2">
                        <div className="flex items-center gap-5">
                          <div className="text-sm flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Due:</span>
                            <span className="font-medium">{goal.deadline}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{goal.progress}%</span>
                          <Progress
                            value={goal.progress}
                            className="h-2 w-24"
                            style={{
                              backgroundColor: `${area.color}20`,
                              '--progress-foreground': area.color,
                            } as React.CSSProperties}
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <h5 className="text-sm font-medium mb-2">Subtasks</h5>
                        <div className="space-y-1">
                          {[1, 2, 3].map((_, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div
                                className={`h-4 w-4 rounded-full flex items-center justify-center ${
                                  index === 0
                                    ? "bg-green-500 text-white"
                                    : "border border-gray-300"
                                }`}
                              >
                                {index === 0 && (
                                  <CheckCircle2 className="h-3 w-3" />
                                )}
                              </div>
                              <span
                                className={
                                  index === 0 ? "line-through text-muted-foreground" : ""
                                }
                              >
                                {goal.title} subtask {index + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGoals.map((goal) => {
                const area = lifeAreas[goal.areaKey];
                return (
                  <Card key={goal.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                          <CardDescription>{goal.description}</CardDescription>
                        </div>
                        <Badge 
                          style={{ backgroundColor: goal.color || area.color }}
                          className="text-white shrink-0"
                        >
                          {area.name}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{goal.progress}%</span>
                          </div>
                          <Progress 
                            value={goal.progress} 
                            className="h-2"
                            style={{
                              backgroundColor: `${goal.color || area.color}20`,
                              '--progress-foreground': goal.color || area.color
                            } as React.CSSProperties}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-1.5">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Due: </span>
                            <span>{goal.deadline}</span>
                          </div>
                          <Badge variant={
                            goal.priority === 'high' ? 'default' : 
                            goal.priority === 'medium' ? 'outline' : 'secondary'
                          }>
                            {goal.priority === 'high' ? 'High' : 
                              goal.priority === 'medium' ? 'Medium' : 'Low'} Priority
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="by-area" className="mt-0">
          <div className="space-y-8">
            {Object.entries(groupedGoals).map(([areaKey, goals]) => {
              const area = lifeAreas[areaKey as LifeAreaKey];
              return (
                <div key={areaKey}>
                  <div className="flex items-center gap-2 mb-4">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${area.color}20` }}
                    >
                      <Target 
                        className="h-4 w-4" 
                        style={{ color: area.color }} 
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{area.name} Goals</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {goals.map((goal) => (
                      <Card key={goal.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{goal.title}</CardTitle>
                            <Badge variant={
                              goal.priority === 'high' ? 'default' : 
                              goal.priority === 'medium' ? 'outline' : 'secondary'
                            }>
                              {goal.priority === 'high' ? 'High' : 
                                goal.priority === 'medium' ? 'Medium' : 'Low'}
                            </Badge>
                          </div>
                          <CardDescription>{goal.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{goal.progress}%</span>
                              </div>
                              <Progress 
                                value={goal.progress} 
                                className="h-2"
                                style={{
                                  backgroundColor: `${area.color}20`,
                                  '--progress-foreground': area.color
                                } as React.CSSProperties}
                              />
                            </div>
                            
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-1.5">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span>Due: {goal.deadline}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Card className="border-dashed flex items-center justify-center p-6 hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="text-center">
                        <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="font-medium">Add {area.name} Goal</p>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoalsPage;
