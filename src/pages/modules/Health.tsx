
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Heart, Plus, LineChart, CalendarDays, Clock, Apple, Dumbbell, Droplet, Moon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Health = () => {
  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health & Fitness</h1>
            <p className="text-muted-foreground">
              Monitor physical wellbeing, exercise, nutrition, and mental health
            </p>
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> New Health Goal
          </Button>
        </div>
      </div>

      {/* Health Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Daily Steps</p>
                <h3 className="text-2xl font-bold">8,462</h3>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">84% of 10,000 goal</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Active Minutes</p>
                <h3 className="text-2xl font-bold">45</h3>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">75% of 60 min goal</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Water Intake</p>
                <h3 className="text-2xl font-bold">1.5L</h3>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Droplet className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">62% of 2.4L goal</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Sleep Duration</p>
                <h3 className="text-2xl font-bold">7.2h</h3>
              </div>
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Moon className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">90% of 8h goal</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="mood">Mood & Mental</TabsTrigger>
          <TabsTrigger value="goals">Health Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Health Metrics</CardTitle>
                  <CardDescription>Your key health indicators over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72 bg-muted rounded-md flex items-center justify-center">
                    <LineChart className="h-10 w-10 text-muted-foreground opacity-50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Today's Activity</CardTitle>
                  <CardDescription>Your physical activity for the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Dumbbell className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">Morning Walk</p>
                          <p className="text-xs text-muted-foreground">30 minutes | 2,500 steps</p>
                        </div>
                      </div>
                      <Badge>Completed</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Dumbbell className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">Strength Training</p>
                          <p className="text-xs text-muted-foreground">45 minutes | Upper Body</p>
                        </div>
                      </div>
                      <Badge>Completed</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <Dumbbell className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">Evening Yoga</p>
                          <p className="text-xs text-muted-foreground">20 minutes | Stress Relief</p>
                        </div>
                      </div>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Add Activity</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Nutrition</CardTitle>
                  <CardDescription>Your meals and nutrients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Apple className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Breakfast</span>
                      </div>
                      <span className="text-sm font-medium">420 cal</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Apple className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Lunch</span>
                      </div>
                      <span className="text-sm font-medium">580 cal</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Apple className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">Dinner</span>
                      </div>
                      <span className="text-sm font-medium">Not logged</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Apple className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Snacks</span>
                      </div>
                      <span className="text-sm font-medium">250 cal</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Total Calories</span>
                      <span className="text-sm font-medium">1,250 / 2,100</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Log Meal</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Mood Tracker</CardTitle>
                  <CardDescription>How are you feeling today?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    <Button variant="outline" className="flex flex-col p-2 h-auto">
                      <span className="text-2xl">😊</span>
                      <span className="text-xs mt-1">Great</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col p-2 h-auto">
                      <span className="text-2xl">🙂</span>
                      <span className="text-xs mt-1">Good</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col p-2 h-auto bg-muted">
                      <span className="text-2xl">😐</span>
                      <span className="text-xs mt-1">Okay</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col p-2 h-auto">
                      <span className="text-2xl">🙁</span>
                      <span className="text-xs mt-1">Low</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col p-2 h-auto">
                      <span className="text-2xl">😞</span>
                      <span className="text-xs mt-1">Bad</span>
                    </Button>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">Add Note</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="goals" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Run 5K Under 30 Minutes
                </CardTitle>
                <CardDescription>Target by November 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Current Best</span>
                    <span className="font-medium">33:45</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Training Plan</span>
                      <Badge variant="outline">3x Weekly</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Recent Progress</span>
                      <span className="text-sm font-medium text-green-500">-45 sec</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Lose 5kg
                </CardTitle>
                <CardDescription>Target by December 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">2.5kg / 5kg</span>
                  </div>
                  <Progress value={50} className="h-2" />
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Starting Weight</span>
                      <span className="text-sm font-medium">75kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Weight</span>
                      <span className="text-sm font-medium">72.5kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Target Weight</span>
                      <span className="text-sm font-medium">70kg</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <Button variant="ghost" className="gap-1">
                  <Plus className="h-5 w-5" />
                  Add New Health Goal
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Set targets for your physical wellbeing
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activities" className="mt-0">
          {/* Activities content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Tracker</CardTitle>
              <CardDescription>Log and track your physical activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the activities tab will be implemented here.</p>
                <Button className="mt-4">Log Activity</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nutrition" className="mt-0">
          {/* Nutrition content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Tracker</CardTitle>
              <CardDescription>Track your meals and nutrients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the nutrition tab will be implemented here.</p>
                <Button className="mt-4">Log Meal</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sleep" className="mt-0">
          {/* Sleep content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Sleep Tracker</CardTitle>
              <CardDescription>Monitor your sleep patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the sleep tab will be implemented here.</p>
                <Button className="mt-4">Log Sleep</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mood" className="mt-0">
          {/* Mood content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Mood & Mental Wellness</CardTitle>
              <CardDescription>Track your emotional wellbeing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the mood and mental wellness tab will be implemented here.</p>
                <Button className="mt-4">Log Mood</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Health;
