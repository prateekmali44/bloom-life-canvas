
import React, { FC } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BadgeDollarSign, BarChart3, TrendingUp } from "lucide-react";
import { Badge } from '@/components/ui/badge';

export interface FinancialGoalsProps {
  currency?: string;
  reportingStyle?: string;
}

const FinancialGoals: FC<FinancialGoalsProps> = ({ currency = "USD", reportingStyle = "summary" }) => {
  // Set currency symbol based on currency prop
  const currencySymbol = currency === "USD" ? "$" : "€";

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Financial Goals</CardTitle>
            <CardDescription>Track your progress towards financial freedom</CardDescription>
          </div>
          <Button size="sm" variant="outline">Add Goal</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BadgeDollarSign className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Emergency Fund</h3>
                  <p className="text-sm text-muted-foreground">Target: {currencySymbol}10,000</p>
                </div>
              </div>
              <Badge>High Priority</Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span>Progress</span>
                <span className="font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div className="mt-3 flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{currencySymbol}6,500 saved of {currencySymbol}10,000</span>
              <span className="text-muted-foreground">Due: Dec 2023</span>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-cyan-100 p-2 rounded-full">
                  <TrendingUp className="h-4 w-4 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-medium">Retirement Fund</h3>
                  <p className="text-sm text-muted-foreground">Target: {currencySymbol}100,000</p>
                </div>
              </div>
              <Badge variant="outline">Medium Priority</Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span>Progress</span>
                <span className="font-medium">23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
            <div className="mt-3 flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{currencySymbol}23,000 saved of {currencySymbol}100,000</span>
              <span className="text-muted-foreground">Due: Dec 2030</span>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-amber-100 p-2 rounded-full">
                  <BarChart3 className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium">New Car Fund</h3>
                  <p className="text-sm text-muted-foreground">Target: {currencySymbol}25,000</p>
                </div>
              </div>
              <Badge variant="outline">Low Priority</Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span>Progress</span>
                <span className="font-medium">12%</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
            <div className="mt-3 flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{currencySymbol}3,000 saved of {currencySymbol}25,000</span>
              <span className="text-muted-foreground">Due: Jun 2025</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Financial Goals</Button>
      </CardFooter>
    </Card>
  );
};

export default FinancialGoals;
