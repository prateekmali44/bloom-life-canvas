
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { DollarSign, Plus, PieChart, ArrowUp, ArrowDown, Calculator, Calendar, Landmark, LineChart, CreditCard, Wallet, BellRing } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Financial = () => {
  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial</h1>
            <p className="text-muted-foreground">
              Track finances, budgets, investments, and financial goals
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-1" variant="outline">
              <Plus className="h-4 w-4" /> Add Transaction
            </Button>
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> New Financial Goal
            </Button>
          </div>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Net Worth</p>
                <h3 className="text-2xl font-bold">$42,500</h3>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12%</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <h3 className="text-2xl font-bold">$6,250</h3>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">5%</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                <h3 className="text-2xl font-bold">$3,840</h3>
              </div>
              <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                <ArrowDown className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">3%</span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Savings Rate</p>
                <h3 className="text-2xl font-bold">38.5%</h3>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calculator className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">5%</span>
              <span className="text-muted-foreground ml-1">vs target</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="debt">Debt</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Income vs. Expenses</CardTitle>
                  <CardDescription>Monthly breakdown for the current year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72 bg-muted rounded-md flex items-center justify-center">
                    <LineChart className="h-10 w-10 text-muted-foreground opacity-50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                          <ArrowDown className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium">Grocery Shopping</p>
                          <p className="text-xs text-muted-foreground">Jul 20, 2024</p>
                        </div>
                      </div>
                      <p className="font-medium text-red-500">-$120.50</p>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                          <ArrowDown className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium">Utilities</p>
                          <p className="text-xs text-muted-foreground">Jul 18, 2024</p>
                        </div>
                      </div>
                      <p className="font-medium text-red-500">-$85.20</p>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                          <ArrowUp className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">Salary Deposit</p>
                          <p className="text-xs text-muted-foreground">Jul 15, 2024</p>
                        </div>
                      </div>
                      <p className="font-medium text-green-500">+$3,125.00</p>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                          <ArrowDown className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium">Rent Payment</p>
                          <p className="text-xs text-muted-foreground">Jul 2, 2024</p>
                        </div>
                      </div>
                      <p className="font-medium text-red-500">-$1,500.00</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">View All Transactions</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Spending Breakdown</CardTitle>
                  <CardDescription>Where your money is going</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square flex items-center justify-center mb-4">
                    <PieChart className="h-32 w-32 text-muted-foreground opacity-50" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="block h-3 w-3 rounded-full bg-primary"></span>
                        <span className="text-sm">Housing</span>
                      </div>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="block h-3 w-3 rounded-full bg-green-500"></span>
                        <span className="text-sm">Food</span>
                      </div>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="block h-3 w-3 rounded-full bg-amber-500"></span>
                        <span className="text-sm">Transportation</span>
                      </div>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="block h-3 w-3 rounded-full bg-blue-500"></span>
                        <span className="text-sm">Utilities</span>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="block h-3 w-3 rounded-full bg-red-500"></span>
                        <span className="text-sm">Others</span>
                      </div>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bills</CardTitle>
                  <CardDescription>Don't miss these payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <BellRing className="h-4 w-4 text-red-500" />
                        <div>
                          <p className="font-medium">Credit Card Payment</p>
                          <p className="text-xs text-muted-foreground">July 27</p>
                        </div>
                      </div>
                      <Badge>$650</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <BellRing className="h-4 w-4 text-amber-500" />
                        <div>
                          <p className="font-medium">Internet Bill</p>
                          <p className="text-xs text-muted-foreground">July 30</p>
                        </div>
                      </div>
                      <Badge>$75</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <BellRing className="h-4 w-4 text-amber-500" />
                        <div>
                          <p className="font-medium">Electricity Bill</p>
                          <p className="text-xs text-muted-foreground">August 2</p>
                        </div>
                      </div>
                      <Badge>$120</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="goals" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <DollarSign className="h-5 w-5 mr-2 text-primary" />
                  Emergency Fund
                </CardTitle>
                <CardDescription>Target: $15,000 by December 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">$9,000 / $15,000</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Contribution</span>
                    <span className="font-medium">$750</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Completion</span>
                    <span className="font-medium">Dec 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <DollarSign className="h-5 w-5 mr-2 text-primary" />
                  Down Payment for House
                </CardTitle>
                <CardDescription>Target: $60,000 by June 2026</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">$12,000 / $60,000</span>
                  </div>
                  <Progress value={20} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Contribution</span>
                    <span className="font-medium">$1,500</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Completion</span>
                    <span className="font-medium">June 2026</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <Button variant="ghost" className="gap-1">
                  <Plus className="h-5 w-5" />
                  Add New Financial Goal
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Set targets for your financial future
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="budgets" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Budget</CardTitle>
              <CardDescription>
                Track your spending against planned budget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Housing</h3>
                    <div className="text-sm">
                      <span className="font-medium">$1,500</span>
                      <span className="text-muted-foreground"> / $1,600</span>
                    </div>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Food & Groceries</h3>
                    <div className="text-sm">
                      <span className="font-medium">$550</span>
                      <span className="text-muted-foreground"> / $600</span>
                    </div>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Transportation</h3>
                    <div className="text-sm">
                      <span className="font-medium text-red-500">$320</span>
                      <span className="text-muted-foreground"> / $300</span>
                    </div>
                  </div>
                  <Progress value={107} className="h-2 bg-red-100" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Entertainment</h3>
                    <div className="text-sm">
                      <span className="font-medium">$120</span>
                      <span className="text-muted-foreground"> / $200</span>
                    </div>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                
                <div className="flex justify-center">
                  <Button>Edit Budget</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="investments" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Investment Portfolio</CardTitle>
              <CardDescription>
                Track your investment performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">$32,500</h3>
                    <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold text-green-500">+8.2%</h3>
                    <p className="text-sm text-muted-foreground">YTD Return</p>
                  </div>
                </div>
                
                <div className="h-60 bg-muted rounded-md flex items-center justify-center mb-4">
                  <LineChart className="h-10 w-10 text-muted-foreground opacity-50" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between p-2 border-b">
                    <div>
                      <p className="font-medium">Stocks (VTI)</p>
                      <p className="text-xs text-muted-foreground">60% allocation</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$19,500</p>
                      <p className="text-xs text-green-500">+10.2%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between p-2 border-b">
                    <div>
                      <p className="font-medium">Bonds (BND)</p>
                      <p className="text-xs text-muted-foreground">25% allocation</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$8,125</p>
                      <p className="text-xs text-green-500">+4.5%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between p-2 border-b">
                    <div>
                      <p className="font-medium">Cash</p>
                      <p className="text-xs text-muted-foreground">15% allocation</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$4,875</p>
                      <p className="text-xs text-green-500">+1.8%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="debt" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Debt Management</CardTitle>
              <CardDescription>
                Track and manage your liabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">$18,650</h3>
                    <p className="text-sm text-muted-foreground">Total Debt</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold text-green-500">-15.3%</h3>
                    <p className="text-sm text-muted-foreground">YTD Reduction</p>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Student Loan</h4>
                        <p className="text-xs text-muted-foreground">4.5% interest rate</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$12,400</p>
                        <p className="text-xs text-muted-foreground">$180 monthly payment</p>
                      </div>
                    </div>
                    <Progress value={40} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Payoff date: May 2027</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Credit Card</h4>
                        <p className="text-xs text-muted-foreground">16.9% interest rate</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$3,250</p>
                        <p className="text-xs text-muted-foreground">$300 monthly payment</p>
                      </div>
                    </div>
                    <Progress value={35} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Payoff date: January 2025</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Car Loan</h4>
                        <p className="text-xs text-muted-foreground">3.9% interest rate</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$3,000</p>
                        <p className="text-xs text-muted-foreground">$250 monthly payment</p>
                      </div>
                    </div>
                    <Progress value={80} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Payoff date: November 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Generate reports to analyze your financial health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-10 w-10 text-primary p-1.5 bg-primary/10 rounded-md" />
                    <div>
                      <h3 className="font-medium">Monthly Financial Report</h3>
                      <p className="text-sm text-muted-foreground mb-3">Generate a comprehensive report of income, expenses, and savings</p>
                      <Button variant="outline" size="sm">Generate Report</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-10 w-10 text-primary p-1.5 bg-primary/10 rounded-md" />
                    <div>
                      <h3 className="font-medium">Net Worth Statement</h3>
                      <p className="text-sm text-muted-foreground mb-3">Generate a statement of assets, liabilities, and net worth</p>
                      <Button variant="outline" size="sm">Generate Report</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-10 w-10 text-primary p-1.5 bg-primary/10 rounded-md" />
                    <div>
                      <h3 className="font-medium">Budget Analysis</h3>
                      <p className="text-sm text-muted-foreground mb-3">Compare actual spending with budgeted amounts</p>
                      <Button variant="outline" size="sm">Generate Report</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-10 w-10 text-primary p-1.5 bg-primary/10 rounded-md" />
                    <div>
                      <h3 className="font-medium">Annual Financial Review</h3>
                      <p className="text-sm text-muted-foreground mb-3">Comprehensive yearly financial analysis</p>
                      <Button variant="outline" size="sm">Generate Report</Button>
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

export default Financial;
