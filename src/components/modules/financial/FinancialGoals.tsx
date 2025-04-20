
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, ArrowUpRight, CalendarClock, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

type GoalType = "savings" | "investment" | "debt" | "purchase" | "travel" | "emergency" | "retirement" | "education" | "other";

type Goal = {
  id: string;
  name: string;
  amount: number;
  saved: number;
  deadline: string;
  type: GoalType;
  description?: string;
  priority: "low" | "medium" | "high";
};

// Sample data
const sampleGoals: Goal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    amount: 15000,
    saved: 6500,
    deadline: "2024-12-31",
    type: "emergency",
    description: "Build an emergency fund to cover 3 months of expenses",
    priority: "high"
  },
  {
    id: "2",
    name: "New Laptop",
    amount: 2500,
    saved: 1500,
    deadline: "2024-06-15",
    type: "purchase",
    description: "Save for a new laptop for work and personal projects",
    priority: "medium"
  },
  {
    id: "3",
    name: "Vacation Fund",
    amount: 4000,
    saved: 1200,
    deadline: "2024-08-30",
    type: "travel",
    description: "Save for a summer vacation",
    priority: "low"
  }
];

const getGoalTypeColor = (type: GoalType) => {
  const colorMap: Record<GoalType, string> = {
    savings: "bg-blue-100 text-blue-700",
    investment: "bg-green-100 text-green-700",
    debt: "bg-red-100 text-red-700",
    purchase: "bg-purple-100 text-purple-700",
    travel: "bg-amber-100 text-amber-700",
    emergency: "bg-orange-100 text-orange-700",
    retirement: "bg-teal-100 text-teal-700",
    education: "bg-indigo-100 text-indigo-700",
    other: "bg-gray-100 text-gray-700"
  };

  return colorMap[type];
};

const getPriorityColor = (priority: "low" | "medium" | "high") => {
  const colorMap = {
    low: "bg-blue-50 text-blue-700",
    medium: "bg-amber-50 text-amber-700",
    high: "bg-red-50 text-red-700"
  };

  return colorMap[priority];
};

const monthsBetweenDates = (date1: Date, date2: Date) => {
  const years = date2.getFullYear() - date1.getFullYear();
  const months = date2.getMonth() - date1.getMonth();
  
  return years * 12 + months;
};

const FinancialGoals = () => {
  const [goals, setGoals] = useState<Goal[]>(sampleGoals);
  const [newGoalOpen, setNewGoalOpen] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalSaved, setGoalSaved] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");
  const [goalType, setGoalType] = useState<GoalType>("savings");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalPriority, setGoalPriority] = useState<"low" | "medium" | "high">("medium");

  const handleAddGoal = () => {
    if (!goalName || !goalAmount || !goalDeadline || !goalType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      name: goalName,
      amount: parseFloat(goalAmount),
      saved: parseFloat(goalSaved) || 0,
      deadline: goalDeadline,
      type: goalType,
      description: goalDescription,
      priority: goalPriority
    };

    setGoals([...goals, newGoal]);
    
    toast({
      title: "Goal added",
      description: "Your financial goal has been added successfully",
    });

    // Reset form
    setGoalName("");
    setGoalAmount("");
    setGoalSaved("");
    setGoalDeadline("");
    setGoalType("savings");
    setGoalDescription("");
    setGoalPriority("medium");
    setNewGoalOpen(false);
  };

  const getGoalProgress = (goal: Goal) => {
    return Math.min(Math.round((goal.saved / goal.amount) * 100), 100);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">Financial Goals</h2>
          <p className="text-muted-foreground">Track your progress toward financial freedom</p>
        </div>
        
        <Dialog open={newGoalOpen} onOpenChange={setNewGoalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" /> Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create a New Financial Goal</DialogTitle>
              <DialogDescription>
                Set a clear, achievable goal with a deadline to track your progress
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goalName" className="text-right">
                  Goal Name
                </Label>
                <Input
                  id="goalName"
                  placeholder="Emergency Fund, New Car, etc."
                  className="col-span-3"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goalType" className="text-right">
                  Goal Type
                </Label>
                <Select value={goalType} onValueChange={(value) => setGoalType(value as GoalType)}>
                  <SelectTrigger id="goalType" className="col-span-3">
                    <SelectValue placeholder="Type of goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="debt">Debt Repayment</SelectItem>
                    <SelectItem value="purchase">Major Purchase</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="emergency">Emergency Fund</SelectItem>
                    <SelectItem value="retirement">Retirement</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goalAmount" className="text-right">
                  Target Amount
                </Label>
                <Input
                  id="goalAmount"
                  type="number"
                  placeholder="5000"
                  className="col-span-3"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goalSaved" className="text-right">
                  Current Amount
                </Label>
                <Input
                  id="goalSaved"
                  type="number"
                  placeholder="0"
                  className="col-span-3"
                  value={goalSaved}
                  onChange={(e) => setGoalSaved(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goalDeadline" className="text-right">
                  Target Date
                </Label>
                <Input
                  id="goalDeadline"
                  type="date"
                  className="col-span-3"
                  value={goalDeadline}
                  onChange={(e) => setGoalDeadline(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goalPriority" className="text-right">
                  Priority
                </Label>
                <Select value={goalPriority} onValueChange={(value) => setGoalPriority(value as "low" | "medium" | "high")}>
                  <SelectTrigger id="goalPriority" className="col-span-3">
                    <SelectValue placeholder="Priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goalDescription" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="goalDescription"
                  placeholder="Why is this goal important to you?"
                  className="col-span-3"
                  value={goalDescription}
                  onChange={(e) => setGoalDescription(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={handleAddGoal}>Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = getGoalProgress(goal);
          const now = new Date();
          const deadline = new Date(goal.deadline);
          const monthsLeft = monthsBetweenDates(now, deadline);
          
          // Calculate monthly and weekly savings needed - this is where the TS errors were
          const monthlySavingsNeeded = monthsLeft > 0 ? Number((goal.amount - goal.saved) / monthsLeft).toFixed(2) : "N/A";
          const weeklySavingsNeeded = monthsLeft > 0 ? Number((goal.amount - goal.saved) / (monthsLeft * 4.33)).toFixed(2) : "N/A";
          
          return (
            <Card key={goal.id} className="shadow-sm hover:shadow transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{goal.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {goal.description || `Save ${goal.amount} by ${new Date(goal.deadline).toLocaleDateString()}`}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(goal.priority)}>
                      {goal.priority}
                    </Badge>
                    <Badge className={getGoalTypeColor(goal.type)}>
                      {goal.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Progress: {progress}%</span>
                    <span className="text-sm font-medium">
                      {goal.saved} / {goal.amount}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="border rounded-md p-2">
                    <div className="text-muted-foreground">To save monthly</div>
                    <div className="font-medium">{monthlySavingsNeeded}</div>
                  </div>
                  <div className="border rounded-md p-2">
                    <div className="text-muted-foreground">To save weekly</div>
                    <div className="font-medium">{weeklySavingsNeeded}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarClock className="h-4 w-4 mr-1" />
                  <span>{monthsLeft} months until deadline</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1">
                    Update Progress
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FinancialGoals;
