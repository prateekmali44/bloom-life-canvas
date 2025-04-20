
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  BarChart, 
  LineChart, 
  Download, 
  Sparkles, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  Calendar,
  PieChart,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const getCurrencySymbol = (code) => {
  switch(code) {
    case "USD": return "$";
    case "EUR": return "€";
    case "GBP": return "£";
    case "JPY": return "¥";
    default: return "$";
  }
};

const FinancialInsights = ({ currency = "USD", reportingStyle = "summary" }) => {
  const symbol = getCurrencySymbol(currency);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Financial Insights</h1>
          <p className="text-muted-foreground">
            Smart analysis and recommendations for your finances
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" /> Export Reports
          </Button>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-white to-lavender-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Your Financial Style: Mindful Planner</h2>
              <p className="text-muted-foreground">
                You're thoughtful about your spending and focused on building savings. Your financial decisions show discipline and foresight.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md border border-lavender-200">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Your Strengths
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-lg leading-tight">•</span>
                  <span>Consistent savings of 38% of income</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-lg leading-tight">•</span>
                  <span>Clear financial goals with regular progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-lg leading-tight">•</span>
                  <span>Good budget management in most categories</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-md border border-lavender-200">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                Improvement Areas
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 text-lg leading-tight">•</span>
                  <span>Transportation spending exceeds budget by 7%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 text-lg leading-tight">•</span>
                  <span>Investment diversification could be improved</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 text-lg leading-tight">•</span>
                  <span>Emergency fund at 60% of target</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-md border border-lavender-200">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Recommendations
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 text-lg leading-tight">•</span>
                  <span>Consider carpooling to reduce transport costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 text-lg leading-tight">•</span>
                  <span>Add bond allocation to balance investment portfolio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 text-lg leading-tight">•</span>
                  <span>Prioritize emergency fund completion</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="monthlyInsights">
        <TabsList>
          <TabsTrigger value="monthlyInsights">Monthly Insights</TabsTrigger>
          <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
          <TabsTrigger value="forecast">Financial Forecast</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthlyInsights">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    July 2024 Financial Insights
                  </CardTitle>
                  <CardDescription>Your financial performance this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-100 rounded-md">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mt-1">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Great Progress This Month!</h3>
                          <p className="text-sm text-muted-foreground">
                            You've managed to save 38% of your income this month, exceeding your target of 30%. Your emergency fund is growing steadily!
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          Top Money Wins
                        </h3>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs mt-0.5">✓</div>
                            <div>
                              <p className="font-medium">Reduced dining out expenses by 15%</p>
                              <p className="text-muted-foreground">Saved {symbol}45 compared to last month</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs mt-0.5">✓</div>
                            <div>
                              <p className="font-medium">Added {symbol}750 to Emergency Fund</p>
                              <p className="text-muted-foreground">Now at 60% of target</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs mt-0.5">✓</div>
                            <div>
                              <p className="font-medium">Entertainment under budget by 40%</p>
                              <p className="text-muted-foreground">Found free/low-cost activities</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium mb-3 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          Areas for Attention
                        </h3>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-xs mt-0.5">!</div>
                            <div>
                              <p className="font-medium">Transportation over budget</p>
                              <p className="text-muted-foreground">Spent {symbol}20 more than planned</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-xs mt-0.5">!</div>
                            <div>
                              <p className="font-medium">Unexpected purchase: {symbol}95 for shoes</p>
                              <p className="text-muted-foreground">Not planned in monthly budget</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <Sparkles className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">This Month's Money Insight</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Your spending on necessities is very mindful. 68% of your purchases were tagged as "Necessary" - this is a great sign of financial discipline.
                          </p>
                          <div className="p-3 bg-white rounded-md">
                            <p className="text-sm font-medium mb-1">Action Step:</p>
                            <p className="text-sm text-muted-foreground">Review your transportation costs for any optimizations, such as carpooling or using public transport more often.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Month at a Glance
                  </CardTitle>
                  <CardDescription>Key metrics for July 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">Income</p>
                        <p className="font-medium">{symbol}3,125</p>
                      </div>
                      
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">Expenses</p>
                        <p className="font-medium">{symbol}1,950</p>
                      </div>
                      
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">Saved</p>
                        <p className="font-medium text-green-600">{symbol}1,175</p>
                      </div>
                      
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground">Savings Rate</p>
                        <p className="font-medium text-green-600">38%</p>
                      </div>
                    </div>
                    
                    <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                      <BarChart className="h-8 w-8 text-muted-foreground opacity-50" />
                    </div>
                    
                    <div className="flex items-center justify-between border-t pt-3">
                      <div>
                        <p className="text-sm font-medium">vs. Last Month</p>
                        <div className="flex items-center text-green-600 text-sm">
                          <TrendingUp className="h-3.5 w-3.5 mr-1" />
                          <span>Saved {symbol}125 more</span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">+12%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white to-lavender-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Money Mood</CardTitle>
                  <CardDescription>Your spending emotion patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">😌</span>
                        <div>
                          <p className="font-medium">Necessary</p>
                          <p className="text-xs text-muted-foreground">68% of expenses</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground border-t pt-2">
                        Your essentials like rent, groceries, and utilities
                      </p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">😊</span>
                        <div>
                          <p className="font-medium">Happy</p>
                          <p className="text-xs text-muted-foreground">22% of expenses</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground border-t pt-2">
                        Thoughtful treats that brought you joy: coffee, movie night
                      </p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">😬</span>
                        <div>
                          <p className="font-medium">Guilty</p>
                          <p className="text-xs text-muted-foreground">10% of expenses</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground border-t pt-2">
                        Unplanned purchases you felt unsure about
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="spending">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Spending Patterns Analysis
              </CardTitle>
              <CardDescription>Understand your spending behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Category Breakdown</h3>
                  <div className="h-60 bg-muted rounded-md flex items-center justify-center">
                    <PieChart className="h-10 w-10 text-muted-foreground opacity-50" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🏠</span>
                        <span className="text-sm font-medium">Housing</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{symbol}1,500</p>
                        <p className="text-xs text-muted-foreground">35% of total</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🍎</span>
                        <span className="text-sm font-medium">Food</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{symbol}550</p>
                        <p className="text-xs text-muted-foreground">20% of total</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🚗</span>
                        <span className="text-sm font-medium">Transport</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{symbol}320</p>
                        <p className="text-xs text-muted-foreground">15% of total</p>
                      </div>
                    </div>
                    
                    <Button variant="ghost" className="w-full text-sm">
                      Show All Categories <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Spending Insights</h3>
                  
                  <div className="p-4 bg-white border rounded-md">
                    <h4 className="font-medium text-sm mb-3">Top Spending Trends</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <Sparkles className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm mb-1">Your highest spending days are <span className="font-medium">Saturdays</span></p>
                          <p className="text-xs text-muted-foreground">Consider planning ahead for weekend activities to reduce costs</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                          <TrendingDown className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm mb-1">Your grocery spending has <span className="font-medium">decreased 8%</span> since last month</p>
                          <p className="text-xs text-muted-foreground">Your meal planning is working well!</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center mt-1">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm mb-1">You spent <span className="font-medium">{symbol}95 on unplanned shopping</span> this month</p>
                          <p className="text-xs text-muted-foreground">Consider setting a "fun money" budget for spontaneous purchases</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Spending Frequency</CardTitle>
                      <CardDescription>When you spend the most</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40 bg-muted rounded-md flex items-center justify-center mb-3">
                        <BarChart className="h-8 w-8 text-muted-foreground opacity-50" />
                      </div>
                      
                      <div className="text-sm">
                        <p className="mb-1">Most transactions occur:</p>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">Weekends</Badge>
                          <Badge variant="outline">Mornings</Badge>
                          <Badge variant="outline">Mid-month</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Financial Forecast
              </CardTitle>
              <CardDescription>See where your finances are headed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-60 bg-muted rounded-md flex items-center justify-center mb-3">
                  <LineChart className="h-10 w-10 text-muted-foreground opacity-50" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">3-Month Forecast</CardTitle>
                      <CardDescription>By October 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Emergency Fund</p>
                          <p className="text-sm font-medium">{symbol}11,250</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Savings Rate</p>
                          <p className="text-sm font-medium">38%</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Net Worth</p>
                          <p className="text-sm font-medium">{symbol}46,200</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">6-Month Forecast</CardTitle>
                      <CardDescription>By January 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Emergency Fund</p>
                          <p className="text-sm font-medium">{symbol}13,500</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Savings Rate</p>
                          <p className="text-sm font-medium">39%</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Net Worth</p>
                          <p className="text-sm font-medium">{symbol}51,400</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">12-Month Forecast</CardTitle>
                      <CardDescription>By July 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Emergency Fund</p>
                          <p className="text-sm font-medium text-green-600">{symbol}15,000 (Complete)</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Savings Rate</p>
                          <p className="text-sm font-medium">40%</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">Net Worth</p>
                          <p className="text-sm font-medium">{symbol}61,800</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Forecast Insights</h3>
                      <div className="space-y-3 text-sm">
                        <p className="text-muted-foreground">
                          Your emergency fund will be fully funded by July 2025 if you maintain your current savings rate. After that, you could redirect those funds to your house down payment goal.
                        </p>
                        
                        <p className="text-muted-foreground">
                          Based on your spending patterns, you can safely increase your investment contributions by {symbol}100 monthly while maintaining your lifestyle.
                        </p>
                        
                        <div className="p-3 bg-white rounded-md">
                          <p className="font-medium mb-1">Action Step:</p>
                          <p className="text-muted-foreground">
                            After your emergency fund reaches {symbol}12,000 (80% of goal), consider allocating 20% of your monthly savings toward your investment portfolio to accelerate growth.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Monthly Financial Report
                </CardTitle>
                <CardDescription>Comprehensive monthly summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square flex flex-col items-center justify-center p-6 text-center bg-muted rounded-md mb-4">
                  <BarChart className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                  <h3 className="font-medium mb-1">Monthly Report</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    A complete analysis of income, expenses, savings, and recommendations
                  </p>
                  <Button>Generate Report</Button>
                </div>
                
                <div className="text-sm">
                  <p className="mb-2">Includes:</p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>Income breakdown</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>Category spending analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>Saving rate and goal progress</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>Personalized recommendations</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Net Worth Statement
                </CardTitle>
                <CardDescription>Assets, liabilities, and equity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square flex flex-col items-center justify-center p-6 text-center bg-muted rounded-md mb-4">
                  <PieChart className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                  <h3 className="font-medium mb-1">Net Worth Statement</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track your overall financial position and growth
                  </p>
                  <Button>Generate Report</Button>
                </div>
                
                <div className="text-sm">
                  <p className="mb-2">Includes:</p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>Asset inventory and valuation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>Debt and liability overview</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>Net worth calculation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>Historical comparison</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Annual Financial Review
                </CardTitle>
                <CardDescription>Year in review with forecasting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square flex flex-col items-center justify-center p-6 text-center bg-muted rounded-md mb-4">
                  <LineChart className="h-12 w-12 text-muted-foreground opacity-50 mb-3" />
                  <h3 className="font-medium mb-1">Annual Review</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive yearly analysis and future planning
                  </p>
                  <Button>Generate Report</Button>
                </div>
                
                <div className="text-sm">
                  <p className="mb-2">Includes:</p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>12-month trending analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>Goal achievement review</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>Next year's financial forecast</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>Strategic recommendations</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialInsights;
