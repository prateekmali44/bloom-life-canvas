
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  DollarSign, 
  Plus, 
  Calendar, 
  ArrowRight, 
  Target, 
  Award,
  Sparkles,
  BarChart,
  CheckCircle2,
  ChevronRight,
  Edit
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const goals = [
  {
    id: 1,
    title: "Emergency Fund",
    description: "Build 3 months of expenses for emergencies",
    target: 15000,
    current: 9000,
    deadline: "2024-12-31",
    contribution: 750,
    priority: "high",
    category: "savings",
    color: "#9b87f5", // Primary Purple
    icon: "🛡️",
  },
  {
    id: 2,
    title: "Down Payment for House",
    description: "Save for 20% down payment on first home",
    target: 60000,
    current: 12000,
    deadline: "2026-06-30",
    contribution: 1500,
    priority: "medium",
    category: "savings",
    color: "#8B5CF6", // Vivid Purple
    icon: "🏠",
  },
  {
    id: 3,
    title: "New Laptop",
    description: "Replace aging laptop for work",
    target: 2000,
    current: 800,
    deadline: "2024-09-01",
    contribution: 300,
    priority: "medium",
    category: "purchase",
    color: "#0EA5E9", // Ocean Blue
    icon: "💻",
  },
  {
    id: 4,
    title: "Credit Card Debt",
    description: "Pay off remaining credit card balance",
    target: 3500,
    current: 2100,
    deadline: "2024-10-15",
    contribution: 350,
    priority: "high",
    category: "debt",
    color: "#F97316", // Bright Orange
    icon: "💳",
  },
  {
    id: 5,
    title: "Vacation Fund",
    description: "Summer trip to the beach",
    target: 2500,
    current: 1200,
    deadline: "2025-06-01",
    contribution: 200,
    priority: "low",
    category: "fun",
    color: "#33C3F0", // Sky Blue
    icon: "🏖️",
  }
];

const getCurrencySymbol = (code) => {
  switch(code) {
    case "USD": return "$";
    case "EUR": return "€";
    case "GBP": return "£";
    case "JPY": return "¥";
    default: return "$";
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const FinancialGoals = ({ currency = "USD", reportingStyle = "summary" }) => {
  const symbol = getCurrencySymbol(currency);
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);
  const [view, setView] = useState("active");

  // Calculate totals
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalProgress = Math.round((totalSaved / totalTarget) * 100);

  // Filter goals based on view
  const activeGoals = goals.filter(goal => goal.current < goal.target);
  const completedGoals = goals.filter(goal => goal.current >= goal.target);
  const displayedGoals = view === "active" ? activeGoals : completedGoals;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-muted-foreground">
            Track progress toward your financial dreams
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Create New Goal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-white to-lavender-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Goal Progress</h3>
                  <p className="text-sm text-muted-foreground">All financial goals</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary/10 border-primary/20">
                {activeGoals.length} Active
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Saved</span>
                <span className="font-medium">{symbol}{totalSaved.toLocaleString()}</span>
              </div>
              <Progress value={totalProgress} className="h-2" />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Goal</span>
                <span className="text-sm">{symbol}{totalTarget.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-lavender-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Monthly Contributions</h3>
                  <p className="text-sm text-muted-foreground">Across all goals</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-green-600">{symbol}{goals.reduce((sum, goal) => sum + goal.contribution, 0).toLocaleString()}</h2>
                <p className="text-sm text-muted-foreground">Total monthly</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-white p-2 rounded-md border border-green-100">
                  <p className="text-xs text-muted-foreground">Highest</p>
                  <p className="font-medium">{symbol}{Math.max(...goals.map(g => g.contribution)).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground truncate">{goals.find(g => g.contribution === Math.max(...goals.map(g => g.contribution)))?.title}</p>
                </div>
                <div className="bg-white p-2 rounded-md border border-green-100">
                  <p className="text-xs text-muted-foreground">Next Due</p>
                  <p className="font-medium">{formatDate(goals.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0].deadline)}</p>
                  <p className="text-xs text-muted-foreground truncate">{goals.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0].title}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-lavender-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Goal Achievements</h3>
                  <p className="text-sm text-muted-foreground">Your financial wins</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-50 border-blue-100 text-blue-700">
                {completedGoals.length} Completed
              </Badge>
            </div>
            
            <div className="space-y-3">
              {completedGoals.length > 0 ? (
                <div className="space-y-2">
                  {completedGoals.slice(0, 1).map(goal => (
                    <div key={goal.id} className="bg-white p-3 rounded-md border border-blue-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{goal.icon}</span>
                        <h4 className="font-medium">{goal.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Saved</span>
                        <span className="font-medium">{symbol}{goal.target.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                  
                  {completedGoals.length > 1 && (
                    <Button variant="outline" className="w-full" size="sm">
                      View {completedGoals.length - 1} more completed goals
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">Complete a goal to see it here</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Create a smaller goal to start
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Your Financial Goals
                  </CardTitle>
                  <CardDescription>Progress toward your targets</CardDescription>
                </div>
                <div className="flex border rounded-md overflow-hidden">
                  <Button 
                    variant={view === "active" ? "default" : "ghost"} 
                    size="sm" 
                    className="rounded-none"
                    onClick={() => setView("active")}
                  >
                    Active
                  </Button>
                  <Button 
                    variant={view === "completed" ? "default" : "ghost"} 
                    size="sm" 
                    className="rounded-none"
                    onClick={() => setView("completed")}
                  >
                    Completed
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-4">
                {displayedGoals.length > 0 ? (
                  displayedGoals.map((goal) => {
                    const progress = Math.round((goal.current / goal.target) * 100);
                    return (
                      <div 
                        key={goal.id} 
                        className={`border rounded-md p-4 cursor-pointer transition-all hover:border-primary/50 hover:bg-lavender-50 ${selectedGoal.id === goal.id ? 'border-primary bg-lavender-50' : ''}`}
                        onClick={() => setSelectedGoal(goal)}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="h-10 w-10 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: `${goal.color}20` }}>
                            {goal.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{goal.title}</h3>
                              <Badge className={
                                goal.priority === 'high' ? 'bg-red-100 text-red-700 hover:bg-red-100' : 
                                goal.priority === 'medium' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : 
                                'bg-blue-100 text-blue-700 hover:bg-blue-100'
                              }>
                                {goal.priority === 'high' ? 'High' : goal.priority === 'medium' ? 'Medium' : 'Low'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{goal.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{symbol}{goal.current.toLocaleString()} / {symbol}{goal.target.toLocaleString()}</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <div>
                              <span className="text-muted-foreground">Monthly: </span>
                              <span className="font-medium">{symbol}{goal.contribution.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Target: </span>
                              <span className="font-medium">{formatDate(goal.deadline)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground mb-3">No {view} goals found</p>
                    <Button>Create New Goal</Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">View All Goals</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Goal Details
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedGoal ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: `${selectedGoal.color}20` }}>
                      {selectedGoal.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedGoal.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedGoal.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{Math.round((selectedGoal.current / selectedGoal.target) * 100)}%</span>
                    </div>
                    <Progress value={Math.round((selectedGoal.current / selectedGoal.target) * 100)} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">Current</p>
                        <p className="font-medium">{symbol}{selectedGoal.current.toLocaleString()}</p>
                      </div>
                      
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">Target</p>
                        <p className="font-medium">{symbol}{selectedGoal.target.toLocaleString()}</p>
                      </div>
                      
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">Monthly</p>
                        <p className="font-medium">{symbol}{selectedGoal.contribution.toLocaleString()}</p>
                      </div>
                      
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">Target Date</p>
                        <p className="font-medium">{formatDate(selectedGoal.deadline)}</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-primary/5 border border-primary/10 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart className="h-4 w-4 text-primary" />
                        <p className="font-medium text-sm">Projection</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        At your current rate, you'll reach your goal by{" "}
                        <span className="font-medium">{formatDate(selectedGoal.deadline)}</span>
                      </p>
                    </div>
                    
                    <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-4 w-4 text-green-600" />
                        <p className="font-medium text-sm">Suggestion</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Increasing your monthly contribution by {symbol}{Math.round(selectedGoal.contribution * 0.1)} would help you reach your goal 1 month earlier.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 gap-1">
                      <Plus className="h-4 w-4" /> Add Money
                    </Button>
                    <Button variant="outline" className="flex-1 gap-1">
                      <Calendar className="h-4 w-4" /> Adjust Timeline
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">Select a goal to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-lavender-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Goal Journey</CardTitle>
              <CardDescription>Recent activities on your goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white rounded-md border">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Added {symbol}500 to Emergency Fund</p>
                    <p className="text-xs text-muted-foreground">Jul 10, 2024</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-white rounded-md border">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Created New Laptop goal</p>
                    <p className="text-xs text-muted-foreground">Jul 5, 2024</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-white rounded-md border">
                  <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <Edit className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Updated Vacation Fund target</p>
                    <p className="text-xs text-muted-foreground">Jun 29, 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full gap-1">
                View All Activities <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinancialGoals;
