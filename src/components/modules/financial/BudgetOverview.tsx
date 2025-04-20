
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  BarChart, 
  PieChart, 
  Settings, 
  AlertCircle, 
  Award, 
  Plus, 
  Edit,
  Sparkles,
  Check
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { 
    name: "Housing", 
    emoji: "🏠",
    spent: 1500, 
    budget: 1600, 
    percent: 94,
    status: "good" 
  },
  { 
    name: "Food & Groceries", 
    emoji: "🍎",
    spent: 550, 
    budget: 600, 
    percent: 92,
    status: "good"
  },
  { 
    name: "Transportation", 
    emoji: "🚗",
    spent: 320, 
    budget: 300, 
    percent: 107,
    status: "over"
  },
  { 
    name: "Entertainment", 
    emoji: "🎭",
    spent: 120, 
    budget: 200, 
    percent: 60,
    status: "good"
  },
  { 
    name: "Shopping", 
    emoji: "🛍️",
    spent: 180, 
    budget: 250, 
    percent: 72,
    status: "good"
  },
  { 
    name: "Utilities", 
    emoji: "💡",
    spent: 240, 
    budget: 250, 
    percent: 96,
    status: "good"
  },
  { 
    name: "Health", 
    emoji: "⚕️",
    spent: 60, 
    budget: 150, 
    percent: 40,
    status: "good"
  },
  { 
    name: "Education", 
    emoji: "📚",
    spent: 35, 
    budget: 100, 
    percent: 35,
    status: "good"
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

const achievements = [
  {
    title: "Budget Master",
    description: "Stayed under budget in 5 categories",
    icon: <Award className="h-4 w-4 text-primary" />,
    badge: "New",
  },
  {
    title: "Food Saver",
    description: "Saved 10% on food budget this month",
    icon: <Check className="h-4 w-4 text-green-600" />,
  }
];

const BudgetOverview = ({ currency = "USD", reportingStyle = "summary" }) => {
  const symbol = getCurrencySymbol(currency);
  
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const overallPercent = Math.round((totalSpent / totalBudget) * 100);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Smart Budget</h1>
          <p className="text-muted-foreground">
            Track spending against your plans
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Settings className="h-4 w-4" /> Adjust Budgets
          </Button>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Monthly Budget Status
                </CardTitle>
                <CardDescription>Track your spending against planned budget</CardDescription>
              </div>
              <Badge variant={overallPercent <= 95 ? "outline" : "destructive"} className={overallPercent <= 95 ? "bg-green-50 text-green-700 border-green-200" : ""}>
                {totalSpent.toFixed(0)}/{totalBudget.toFixed(0)} ({overallPercent}%)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-5">
              {categories.map((category) => (
                <div className="space-y-2" key={category.name}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.emoji}</span>
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
                    <div className="text-sm flex items-center gap-2">
                      <span className={category.status === "over" ? "font-medium text-red-500" : "font-medium"}>
                        {symbol}{category.spent}
                      </span>
                      <span className="text-muted-foreground">
                        / {symbol}{category.budget}
                      </span>
                      {category.status === "over" && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Progress 
                    value={category.percent} 
                    className={`h-2 ${category.status === "over" ? "bg-red-100" : ""}`} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-white to-lavender-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Budget Achievements
              </CardTitle>
              <CardDescription>Your financial milestones</CardDescription>
            </CardHeader>
            <CardContent>
              {achievements.length > 0 ? (
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div className="flex items-center gap-3 p-3 bg-white rounded-md border" key={index}>
                      <div className="h-8 w-8 bg-lavender-100 rounded-full flex items-center justify-center">
                        {achievement.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{achievement.title}</p>
                          {achievement.badge && (
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                              {achievement.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground text-sm">Complete budget goals to earn achievements</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Budget Allocation
              </CardTitle>
              <CardDescription>How your budget is distributed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square flex items-center justify-center mb-4">
                <PieChart className="h-32 w-32 text-muted-foreground opacity-50" />
              </div>
              
              <div className="space-y-2">
                {categories.slice(0, 4).map((category) => (
                  <div className="flex items-center justify-between" key={category.name}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{category.emoji}</span>
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium">{Math.round((category.budget / totalBudget) * 100)}%</span>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📊</span>
                    <span className="text-sm">Other</span>
                  </div>
                  <span className="text-sm font-medium">
                    {Math.round((categories.slice(4).reduce((sum, cat) => sum + cat.budget, 0) / totalBudget) * 100)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="monthlyBudget">
        <TabsList>
          <TabsTrigger value="monthlyBudget">Monthly Budget</TabsTrigger>
          <TabsTrigger value="smartInsights">Smart Insights</TabsTrigger>
          <TabsTrigger value="budgetHistory">Budget History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthlyBudget">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Monthly Budget Trends
              </CardTitle>
              <CardDescription>See how your spending evolves month to month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted rounded-md flex items-center justify-center">
                <BarChart className="h-10 w-10 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground ml-2">Monthly spending comparison will appear here</p>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-1">This Month</h3>
                  <div className="text-2xl font-bold">{symbol}{totalSpent.toFixed(0)}</div>
                  <div className="flex items-center mt-1 text-sm">
                    <span className="text-muted-foreground">{overallPercent}% of budget</span>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-1">Last Month</h3>
                  <div className="text-2xl font-bold">{symbol}{(totalSpent * 1.05).toFixed(0)}</div>
                  <div className="flex items-center mt-1 text-sm text-green-500">
                    <span>5% less this month</span>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-1">Average Monthly</h3>
                  <div className="text-2xl font-bold">{symbol}{(totalSpent * 1.02).toFixed(0)}</div>
                  <div className="flex items-center mt-1 text-sm text-green-500">
                    <span>2% below average</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="smartInsights">
          <Card>
            <CardHeader>
              <CardTitle>Budget Insights</CardTitle>
              <CardDescription>
                Personalized recommendations to optimize your budget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <Sparkles className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">You're on track!</h3>
                      <p className="text-sm text-muted-foreground">
                        You're managing most budget categories well. Keep up the good work!
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center mt-1">
                      <AlertCircle className="h-4 w-4 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Transportation over budget</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        You've spent {symbol}20 (7%) more than planned on transportation this month.
                      </p>
                      <div className="text-sm">
                        <strong>Suggestion:</strong> Consider carpooling or using public transport more often to reduce costs.
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <Sparkles className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Opportunity: Entertainment Budget</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        You've only used 60% of your entertainment budget. Consider using the remaining {symbol}80 for:
                      </p>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Adding to your savings goal</li>
                        <li>Planning a special activity</li>
                        <li>Putting it toward your transportation overage</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budgetHistory">
          <Card>
            <CardHeader>
              <CardTitle>Budget History</CardTitle>
              <CardDescription>
                Review past budget performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-60 bg-muted rounded-md flex items-center justify-center">
                  <BarChart className="h-10 w-10 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground ml-2">Budget history will appear here</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Past 3 Months</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">July 2024</p>
                        <p className="text-xs text-muted-foreground">Current Month</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{symbol}{totalSpent.toFixed(0)}</p>
                        <p className="text-xs text-green-500">{overallPercent}% of budget</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">June 2024</p>
                        <p className="text-xs text-muted-foreground">Last Month</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{symbol}{(totalSpent * 1.05).toFixed(0)}</p>
                        <p className="text-xs text-amber-500">105% of budget</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">May 2024</p>
                        <p className="text-xs text-muted-foreground">2 Months Ago</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{symbol}{(totalSpent * 1.02).toFixed(0)}</p>
                        <p className="text-xs text-green-500">98% of budget</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Download Budget Reports</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetOverview;
