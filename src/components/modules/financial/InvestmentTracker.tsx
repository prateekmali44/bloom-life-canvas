
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  RefreshCw,
  Calendar,
  AlertCircle,
  Info,
  DollarSign
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const investments = [
  {
    id: 1,
    name: "Stocks (VTI)",
    amount: 19500,
    allocation: 60,
    return: 10.2,
    type: "stock",
    color: "#0EA5E9", // Ocean Blue
  },
  {
    id: 2,
    name: "Bonds (BND)",
    amount: 8125,
    allocation: 25,
    return: 4.5,
    type: "bond",
    color: "#33C3F0", // Sky Blue
  },
  {
    id: 3,
    name: "Real Estate",
    amount: 3250,
    allocation: 10,
    return: 7.8,
    type: "realestate",
    color: "#F97316", // Bright Orange
  },
  {
    id: 4,
    name: "Cash",
    amount: 1625,
    allocation: 5,
    return: 1.8,
    type: "cash",
    color: "#8B5CF6", // Vivid Purple
  }
];

const investmentHistory = [
  { month: "Jan", value: 30000 },
  { month: "Feb", value: 30500 },
  { month: "Mar", value: 29800 },
  { month: "Apr", value: 31200 },
  { month: "May", value: 32000 },
  { month: "Jun", value: 31500 },
  { month: "Jul", value: 32500 }
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

const InvestmentTracker = ({ currency = "USD", reportingStyle = "summary" }) => {
  const symbol = getCurrencySymbol(currency);
  
  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const overallReturn = (investments.reduce((sum, inv) => sum + (inv.amount * inv.return / 100), 0) / totalInvestment) * 100;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Investment Portfolio</h1>
          <p className="text-muted-foreground">
            Track and grow your investments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" /> Update Values
          </Button>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> Add Investment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-white to-lavender-50 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Portfolio Value</p>
                <h3 className="text-2xl font-bold">{symbol}{totalInvestment.toLocaleString()}</h3>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+8.2%</span>
              <span className="text-muted-foreground ml-1">YTD</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-lavender-50 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Annual Return</p>
                <h3 className="text-2xl font-bold">{overallReturn.toFixed(1)}%</h3>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+2.5%</span>
              <span className="text-muted-foreground ml-1">vs. market average</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-lavender-50 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Contribution</p>
                <h3 className="text-2xl font-bold">{symbol}500</h3>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">Auto-investment active</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-white to-lavender-50 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Asset Diversity</p>
                <h3 className="text-2xl font-bold">Good</h3>
              </div>
              <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                <PieChart className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">4 asset classes</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Portfolio Performance
              </CardTitle>
              <CardDescription>How your investments have grown over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 bg-muted rounded-md flex items-center justify-center">
                <LineChart className="h-10 w-10 text-muted-foreground opacity-50" />
              </div>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {investmentHistory.slice(-4).map((data, index) => (
                  <div key={index} className="border rounded-md p-3">
                    <h3 className="text-sm font-medium mb-1">{data.month}</h3>
                    <div className="text-lg font-bold">{symbol}{data.value.toLocaleString()}</div>
                    {index > 0 && (
                      <div className="flex items-center mt-1 text-xs">
                        {data.value > investmentHistory[investmentHistory.length - 5 + index].value ? (
                          <>
                            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-green-500">
                              +{(((data.value - investmentHistory[investmentHistory.length - 5 + index].value) / investmentHistory[investmentHistory.length - 5 + index].value) * 100).toFixed(1)}%
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                            <span className="text-red-500">
                              -{(((investmentHistory[investmentHistory.length - 5 + index].value - data.value) / investmentHistory[investmentHistory.length - 5 + index].value) * 100).toFixed(1)}%
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Investment Details
              </CardTitle>
              <CardDescription>Breakdown of your investment holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((investment) => (
                  <div className="p-4 border rounded-md" key={investment.id}>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${investment.color}20` }}>
                          <div className="h-4 w-4" style={{ backgroundColor: investment.color, borderRadius: "50%" }}></div>
                        </div>
                        <h3 className="font-medium">{investment.name}</h3>
                      </div>
                      <Badge className={investment.return > 0 ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"}>
                        {investment.return > 0 ? "+" : ""}{investment.return}%
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Value</span>
                      <span className="font-medium">{symbol}{investment.amount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Allocation</span>
                      <span className="font-medium">{investment.allocation}%</span>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between text-xs">
                        <span>0%</span>
                        <span>Target: {investment.allocation}%</span>
                        <span>100%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full mt-1 relative">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${investment.allocation}%`, backgroundColor: investment.color }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Asset Allocation
              </CardTitle>
              <CardDescription>Your current investment mix</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square flex items-center justify-center mb-4">
                <PieChart className="h-32 w-32 text-muted-foreground opacity-50" />
              </div>
              
              <div className="space-y-3">
                {investments.map((investment) => (
                  <div className="flex items-center justify-between" key={investment.id}>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: investment.color }}></div>
                      <span className="text-sm">{investment.name}</span>
                    </div>
                    <span className="text-sm font-medium">{investment.allocation}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-lavender-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Investment Suggestion</CardTitle>
              <CardDescription>Based on your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-white rounded-md border mb-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-1">Rebalance Opportunity</h3>
                    <p className="text-xs text-muted-foreground">
                      Your bond allocation is slightly below target. Consider adding {symbol}500 to bonds on your next contribution.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-md border">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <Info className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-1">Risk Assessment</h3>
                    <p className="text-xs text-muted-foreground">
                      Your portfolio has a moderate risk level, suitable for medium to long-term goals (5+ years).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Investment Actions</CardTitle>
              <CardDescription>Quick actions for your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" /> Add New Investment
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <RefreshCw className="h-4 w-4" /> Rebalance Portfolio
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="h-4 w-4" /> Set Auto-Invest Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Investment Summary</CardTitle>
              <CardDescription>
                Your overall investment position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-1">Initial Investment</h3>
                    <div className="text-2xl font-bold">{symbol}{(totalInvestment * 0.924).toFixed(0).toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Principal amount</div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-1">Total Return</h3>
                    <div className="text-2xl font-bold text-green-600">+{symbol}{(totalInvestment * 0.076).toFixed(0).toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Profit/loss</div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="text-sm font-medium mb-1">Time Invested</h3>
                    <div className="text-2xl font-bold">11 Months</div>
                    <div className="text-sm text-muted-foreground">Since first investment</div>
                  </div>
                </div>
                
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-md">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center mt-1">
                      <AlertCircle className="h-4 w-4 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Investment Note</h3>
                      <p className="text-sm text-muted-foreground">
                        Past performance doesn't guarantee future returns. Consider consulting a financial advisor for personalized investment advice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="returns">
          <Card>
            <CardHeader>
              <CardTitle>Investment Returns</CardTitle>
              <CardDescription>
                Detailed analysis of your investment performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 bg-muted rounded-md flex items-center justify-center mb-6">
                <LineChart className="h-10 w-10 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground ml-2">Return history chart will appear here</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Return Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">YTD Return</p>
                    <p className="font-medium text-green-600">+8.2%</p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">1 Month</p>
                    <p className="font-medium text-green-600">+1.4%</p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">3 Months</p>
                    <p className="font-medium text-green-600">+3.2%</p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">6 Months</p>
                    <p className="font-medium text-green-600">+5.7%</p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">Best Month</p>
                    <p className="font-medium">Apr (+4.7%)</p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">Worst Month</p>
                    <p className="font-medium text-red-600">Mar (-2.3%)</p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">Benchmark</p>
                    <p className="font-medium">S&P 500 (+7.1%)</p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">vs Benchmark</p>
                    <p className="font-medium text-green-600">+1.1%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projections">
          <Card>
            <CardHeader>
              <CardTitle>Investment Projections</CardTitle>
              <CardDescription>
                See where your investments could go in the future
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 bg-muted rounded-md flex items-center justify-center mb-6">
                <LineChart className="h-10 w-10 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground ml-2">Projection chart will appear here</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Growth Scenarios</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Conservative (4%)</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">1 Year</span>
                        <span className="font-medium">{symbol}{(totalInvestment * 1.04 + 6000).toFixed(0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">5 Years</span>
                        <span className="font-medium">{symbol}{(totalInvestment * 1.22 + 30000).toFixed(0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">10 Years</span>
                        <span className="font-medium">{symbol}{(totalInvestment * 1.48 + 60000).toFixed(0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-2 border-primary/20 rounded-md bg-lavender-50">
                    <h4 className="font-medium mb-2">Moderate (7%)</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">1 Year</span>
                        <span className="font-medium">{symbol}{(totalInvestment * 1.07 + 6000).toFixed(0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">5 Years</span>
                        <span className="font-medium">{symbol}{(totalInvestment * 1.40 + 30000).toFixed(0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">10 Years</span>
                        <span className="font-medium">{symbol}{(totalInvestment * 1.97 + 60000).toFixed(0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Aggressive (10%)</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">1 Year</span>
                        <span className="font-medium">{symbol}{(totalInvestment * 1.10 + 6000).toFixed(0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">5 Years</span>
                        <span className="font-medium">{symbol}{(totalInvestment * 1.61 + 30000).toFixed(0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">10 Years</span>
                        <span className="font-medium">{symbol}{(totalInvestment * 2.59 + 60000).toFixed(0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-md mt-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                      <Info className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">About Projections</h3>
                      <p className="text-sm text-muted-foreground">
                        These projections assume you continue your {symbol}500 monthly contribution. Actual returns may vary based on market conditions, asset allocation changes, and other factors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentTracker;
