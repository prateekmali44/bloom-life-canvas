
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  DollarSign, 
  Plus, 
  PieChart, 
  ArrowUp, 
  ArrowDown, 
  Calendar, 
  Landmark, 
  LineChart, 
  CreditCard, 
  Wallet, 
  BellRing,
  Award,
  BarChart,
  TrendingUp,
  Zap,
  Target
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import FinancialOnboarding from "@/components/modules/financial/FinancialOnboarding";
import ExpenseTracker from "@/components/modules/financial/ExpenseTracker";
import BudgetOverview from "@/components/modules/financial/BudgetOverview";
import FinancialGoals from "@/components/modules/financial/FinancialGoals";
import InvestmentTracker from "@/components/modules/financial/InvestmentTracker";
import FinancialInsights from "@/components/modules/financial/FinancialInsights";
import WeeklyCheckIn from "@/components/modules/financial/WeeklyCheckIn";

const Financial = () => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [userPreferences, setUserPreferences] = useState({
    reportingStyle: "summary", // or "detailed"
    interactionLevel: "minimal", // or "moderate", "deep"
    currency: "USD",
    financialIntent: "save", // or "spend", "invest", "debt"
    userAvatar: "beginner" // or "intermediate", "expert"
  });
  
  // Check if onboarding is completed
  useEffect(() => {
    const isComplete = localStorage.getItem("financialOnboardingComplete") === "true";
    setOnboardingComplete(isComplete);
    
    // Load user preferences if they exist
    const savedPreferences = localStorage.getItem("financialPreferences");
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    }
  }, []);
  
  const completeOnboarding = (preferences) => {
    localStorage.setItem("financialOnboardingComplete", "true");
    localStorage.setItem("financialPreferences", JSON.stringify(preferences));
    setUserPreferences(preferences);
    setOnboardingComplete(true);
  };

  if (!onboardingComplete) {
    return <FinancialOnboarding onComplete={completeOnboarding} />;
  }

  // Mock data for weekly check-in
  const hasWeeklyUpdate = false; // This would be determined by last check-in date

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Journey</h1>
            <p className="text-muted-foreground">
              Track your money flow with ease and clarity
            </p>
          </div>
          <div className="flex gap-2">
            {hasWeeklyUpdate && (
              <Button variant="outline" className="gap-1 bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100">
                <Zap className="h-4 w-4" /> Weekly Check-In
              </Button>
            )}
            <Button className="gap-1" variant="outline">
              <Plus className="h-4 w-4" /> Quick Log
            </Button>
            <Button className="gap-1">
              <Target className="h-4 w-4" /> New Goal
            </Button>
          </div>
        </div>
      </div>

      {/* Financial Health Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-white to-lavender-50 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Money Flow</p>
                <h3 className="text-2xl font-bold">{userPreferences.currency === "USD" ? "$" : "€"}2,410</h3>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Progress value={65} className="h-2" />
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">65% of monthly goal</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-lavender-50 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Savings Health</p>
                <h3 className="text-2xl font-bold">Good</h3>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Progress value={75} className="h-2 bg-green-100" />
            </div>
            <div className="flex items-center mt-1 text-sm">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12%</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-lavender-50 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Spending Mood</p>
                <h3 className="text-2xl font-bold">Mindful 😌</h3>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex w-full justify-between">
                <span className="text-xs">😔</span>
                <span className="text-xs">😊</span>
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">Most purchases: Necessary</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-lavender-50 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Next Goal</p>
                <h3 className="text-2xl font-bold truncate">Emergency Fund</h3>
              </div>
              <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Progress value={38} className="h-2" />
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">38% complete · 4 months left</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Money Flow</TabsTrigger>
          <TabsTrigger value="budgets">Smart Budget</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Weekly Check-in Card (shows only when needed) */}
              {hasWeeklyUpdate && (
                <WeeklyCheckIn />
              )}
              
              {/* Money Flow Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    Money Flow
                  </CardTitle>
                  <CardDescription>How your money is flowing in and out</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72 bg-muted rounded-md flex items-center justify-center">
                    <LineChart className="h-10 w-10 text-muted-foreground opacity-50" />
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest financial movements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-lavender-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">🍎</span>
                        </div>
                        <div>
                          <p className="font-medium">Groceries</p>
                          <p className="text-xs text-muted-foreground">Jul 20 · Essentials</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-500">-$120</p>
                        <p className="text-xs text-muted-foreground">😌 Necessary</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-lavender-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">🏠</span>
                        </div>
                        <div>
                          <p className="font-medium">Utilities</p>
                          <p className="text-xs text-muted-foreground">Jul 18 · Housing</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-500">-$85</p>
                        <p className="text-xs text-muted-foreground">😌 Necessary</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">💼</span>
                        </div>
                        <div>
                          <p className="font-medium">Salary</p>
                          <p className="text-xs text-muted-foreground">Jul 15 · Income</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-500">+$3,125</p>
                        <p className="text-xs text-muted-foreground">🎉 Payday</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-lavender-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">☕</span>
                        </div>
                        <div>
                          <p className="font-medium">Coffee Shop</p>
                          <p className="text-xs text-muted-foreground">Jul 12 · Fun</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-500">-$8</p>
                        <p className="text-xs text-muted-foreground">😊 Treat</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">View All Activity</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              {/* Financial Personality Card */}
              <Card className="bg-gradient-to-b from-lavender-50 to-white border-lavender-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Financial Style</CardTitle>
                  <CardDescription>Based on your recent activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-3 py-4">
                    <div className="h-20 w-20 bg-lavender-100 rounded-full flex items-center justify-center">
                      <Award className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-center">Mindful Planner</h3>
                    <p className="text-sm text-center text-muted-foreground">
                      You're thoughtful about your spending and focused on building savings.
                    </p>
                    <Badge variant="outline" className="bg-lavender-50">Level 2</Badge>
                  </div>
                </CardContent>
              </Card>
              
              {/* Spending Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Spending Categories
                  </CardTitle>
                  <CardDescription>Where your money goes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square flex items-center justify-center mb-4">
                    <PieChart className="h-32 w-32 text-muted-foreground opacity-50" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lavender-100">
                          <span className="text-sm">🏠</span>
                        </span>
                        <span className="text-sm">Housing</span>
                      </div>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lavender-100">
                          <span className="text-sm">🍎</span>
                        </span>
                        <span className="text-sm">Food</span>
                      </div>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lavender-100">
                          <span className="text-sm">🚗</span>
                        </span>
                        <span className="text-sm">Transport</span>
                      </div>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lavender-100">
                          <span className="text-sm">💡</span>
                        </span>
                        <span className="text-sm">Utilities</span>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lavender-100">
                          <span className="text-sm">🎭</span>
                        </span>
                        <span className="text-sm">Fun</span>
                      </div>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Upcoming Bills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellRing className="h-5 w-5 text-primary" />
                    Coming Up
                  </CardTitle>
                  <CardDescription>Upcoming payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">💳</span>
                        <div>
                          <p className="font-medium">Credit Card</p>
                          <p className="text-xs text-muted-foreground">July 27</p>
                        </div>
                      </div>
                      <Badge>$650</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🌐</span>
                        <div>
                          <p className="font-medium">Internet</p>
                          <p className="text-xs text-muted-foreground">July 30</p>
                        </div>
                      </div>
                      <Badge>$75</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">💡</span>
                        <div>
                          <p className="font-medium">Electricity</p>
                          <p className="text-xs text-muted-foreground">August 2</p>
                        </div>
                      </div>
                      <Badge>$120</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Achievement Section */}
              <Card className="bg-gradient-to-br from-white to-green-50 border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Achievements</CardTitle>
                  <CardDescription>Your financial wins</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-white rounded-md border border-green-100">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Savings Streak</p>
                        <p className="text-xs text-muted-foreground">3 weeks in a row!</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 bg-white rounded-md border border-green-100">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Budget Master</p>
                        <p className="text-xs text-muted-foreground">Under budget in 3 categories</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="expenses" className="mt-0">
          <ExpenseTracker 
            currency={userPreferences.currency}
            reportingStyle={userPreferences.reportingStyle}
          />
        </TabsContent>
        
        <TabsContent value="budgets" className="mt-0">
          <BudgetOverview 
            currency={userPreferences.currency}
            reportingStyle={userPreferences.reportingStyle}
          />
        </TabsContent>
        
        <TabsContent value="goals" className="mt-0">
          <FinancialGoals 
            currency={userPreferences.currency}
            reportingStyle={userPreferences.reportingStyle}
          />
        </TabsContent>
        
        <TabsContent value="investments" className="mt-0">
          <InvestmentTracker 
            currency={userPreferences.currency}
            reportingStyle={userPreferences.reportingStyle}
          />
        </TabsContent>
        
        <TabsContent value="insights" className="mt-0">
          <FinancialInsights 
            currency={userPreferences.currency}
            reportingStyle={userPreferences.reportingStyle}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Financial;
