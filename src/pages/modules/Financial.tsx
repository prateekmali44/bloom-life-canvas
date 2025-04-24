
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BudgetOverview from "@/components/modules/financial/BudgetOverview";
import ExpenseTracker from "@/components/modules/financial/ExpenseTracker";
import FinancialGoals from "@/components/modules/financial/FinancialGoals";
import FinancialInsights from "@/components/modules/financial/FinancialInsights";
import InvestmentTracker from "@/components/modules/financial/InvestmentTracker";
import { 
  LayoutDashboard, 
  Target, 
  LineChart, 
  PieChart, 
  DollarSign, 
  Wallet, 
  BadgeDollarSign,
  PlusCircle
} from "lucide-react";
import DimensionGoals from "@/components/shared/DimensionGoals";

// Sample goals data
const financialGoals = [
  { 
    id: 'f1', 
    title: 'Emergency Fund', 
    description: 'Save 6 months of expenses', 
    progress: 65, 
    deadline: 'Dec 2025', 
    priority: 'high' as const,
    color: '#f59e0b'
  },
  { 
    id: 'f2', 
    title: 'Investment Portfolio', 
    description: 'Diversify investments', 
    progress: 20, 
    deadline: 'Nov 2025', 
    priority: 'medium' as const,
    color: '#f59e0b'
  },
  { 
    id: 'f3', 
    title: 'Pay off Student Loan', 
    description: 'Clear debt completely', 
    progress: 40, 
    deadline: 'Aug 2026', 
    priority: 'high' as const,
    color: '#f59e0b'
  }
];

const Financial = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="container mx-auto animate-fade-in pb-20 md:pb-8">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Freedom</h1>
            <p className="text-muted-foreground">
              Monitor your finances, budget, investments, and financial goals
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <DollarSign className="h-4 w-4" /> Quick Expense
            </Button>
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" /> New Financial Goal
            </Button>
          </div>
        </div>
      </div>

      <Tabs 
        defaultValue="dashboard" 
        className="w-full" 
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className={`mb-6 ${isMobile ? 'grid grid-cols-4' : ''}`}>
          <TabsTrigger value="dashboard" className="flex gap-1 items-center">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex gap-1 items-center">
            <Wallet className="h-4 w-4" /> Budget
          </TabsTrigger>
          <TabsTrigger value="investments" className="flex gap-1 items-center">
            <LineChart className="h-4 w-4" /> Investments
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex gap-1 items-center">
            <Target className="h-4 w-4" /> Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Budget</p>
                    <h3 className="text-2xl font-bold">$5,800</h3>
                  </div>
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-1 text-sm">
                  <span className="text-green-600">$1,240 remaining</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Savings</p>
                    <h3 className="text-2xl font-bold">$24,350</h3>
                  </div>
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <BadgeDollarSign className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-1 text-sm">
                  <span className="text-green-600">↑ $1,200 from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Investments</p>
                    <h3 className="text-2xl font-bold">$67,490</h3>
                  </div>
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <LineChart className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-1 text-sm">
                  <span className="text-green-600">↑ 5.2% this month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Debt</p>
                    <h3 className="text-2xl font-bold">$12,500</h3>
                  </div>
                  <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                    <PieChart className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div className="flex items-center mt-1 text-sm">
                  <span className="text-green-600">↓ $350 from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <BudgetOverview />
              <ExpenseTracker />
            </div>
            
            <div className="space-y-6">
              <FinancialInsights />
              <DimensionGoals
                title="Financial Goals"
                description="Track your financial goals progress"
                goals={financialGoals.slice(0, 2)}
                dimensionColor="#f59e0b"
                compact={true}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="budget" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BudgetOverview />
            </div>
            <div>
              <ExpenseTracker />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <InvestmentTracker />
            </div>
            <div>
              <FinancialInsights />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DimensionGoals
                title="Financial Goals"
                description="Track your progress towards financial freedom"
                goals={financialGoals}
                dimensionColor="#f59e0b"
              />
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Goal Progress</CardTitle>
                  <CardDescription>Overall progress toward financial goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span>Emergency Fund</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-amber-100">
                        <div
                          className="h-full rounded-full bg-amber-500"
                          style={{ width: '65%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span>Investment Portfolio</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-amber-100">
                        <div
                          className="h-full rounded-full bg-amber-500"
                          style={{ width: '20%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span>Pay off Student Loan</span>
                        <span className="font-medium">40%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-amber-100">
                        <div
                          className="h-full rounded-full bg-amber-500"
                          style={{ width: '40%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-amber-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                          style={{ width: '42%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Financial;
