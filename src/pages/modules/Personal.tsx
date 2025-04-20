
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Plus, LineChart, Target, Calendar, Clock, Users, Music } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Personal = () => {
  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Personal Growth</h1>
            <p className="text-muted-foreground">
              Monitor personal growth, life goals, relationships, and hobbies
            </p>
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> New Personal Goal
          </Button>
        </div>
      </div>

      {/* Personal Growth Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Personal Goals</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">2 in progress, 3 completed</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Life Balance Score</p>
                <h3 className="text-2xl font-bold">7.5/10</h3>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Compass className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">Up from 6.8 last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Hobby Time</p>
                <h3 className="text-2xl font-bold">8.5 hrs</h3>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Music className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">This week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Relationship Events</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">Planned this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="goals">Personal Goals</TabsTrigger>
          <TabsTrigger value="habits">Life Habits</TabsTrigger>
          <TabsTrigger value="hobbies">Hobbies & Interests</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
          <TabsTrigger value="balance">Life Balance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Learn to Play Piano
                </CardTitle>
                <CardDescription>Long-term hobby goal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weekly practice</span>
                      <Badge>3 hours/week</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current milestone</span>
                      <span className="text-sm font-medium">Basic scales</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Take Photography Course
                </CardTitle>
                <CardDescription>Target by September 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Course selected</span>
                      <Badge variant="outline" className="bg-green-50">Yes</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Start date</span>
                      <span className="text-sm font-medium">August 5, 2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <Button variant="ghost" className="gap-1">
                  <Plus className="h-5 w-5" />
                  Add New Personal Goal
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Set targets for your personal development
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="habits" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Life Habits</CardTitle>
              <CardDescription>Track daily habits that support your personal growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the life habits tab will be implemented here.</p>
                <Button className="mt-4">Set New Habit</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hobbies" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Hobbies & Interests</CardTitle>
              <CardDescription>Pursue activities that bring you joy and fulfillment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the hobbies & interests tab will be implemented here.</p>
                <Button className="mt-4">Add New Hobby</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="relationships" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Relationships</CardTitle>
              <CardDescription>Nurture meaningful connections with others</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the relationships tab will be implemented here.</p>
                <Button className="mt-4">Add Relationship Goal</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="balance" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Life Balance</CardTitle>
              <CardDescription>Maintain harmony across all areas of your life</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the life balance tab will be implemented here.</p>
                <Button className="mt-4">Evaluate Life Balance</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Personal;
