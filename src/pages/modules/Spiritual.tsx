
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, Plus, Heart, Star, Moon, Book, Calendar, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Spiritual = () => {
  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Spiritual & Emotional</h1>
            <p className="text-muted-foreground">
              Track inner peace, emotional balance, meaning, and spiritual practices
            </p>
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> New Spiritual Goal
          </Button>
        </div>
      </div>

      {/* Spiritual Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Meditation Streak</p>
                <h3 className="text-2xl font-bold">12 days</h3>
              </div>
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Moon className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">160 minutes this week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Mood Balance</p>
                <h3 className="text-2xl font-bold">8.2/10</h3>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">7-day average</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Gratitude Entries</p>
                <h3 className="text-2xl font-bold">18</h3>
              </div>
              <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">This month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Spiritual Reading</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Book className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">Books this year</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="practices" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="practices">Daily Practices</TabsTrigger>
          <TabsTrigger value="journal">Spiritual Journal</TabsTrigger>
          <TabsTrigger value="emotions">Emotional Wellbeing</TabsTrigger>
          <TabsTrigger value="goals">Spiritual Goals</TabsTrigger>
          <TabsTrigger value="rituals">Rituals & Routines</TabsTrigger>
        </TabsList>
        
        <TabsContent value="practices" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Spiritual Practice</CardTitle>
                  <CardDescription>Track your mindfulness and spiritual activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Moon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Morning Meditation</p>
                          <p className="text-xs text-muted-foreground">20 minutes | Mindfulness</p>
                        </div>
                      </div>
                      <Button>Complete</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <Star className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">Gratitude Journaling</p>
                          <p className="text-xs text-muted-foreground">5 minutes | Three things I'm grateful for</p>
                        </div>
                      </div>
                      <Button>Complete</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">Mindful Walk</p>
                          <p className="text-xs text-muted-foreground">15 minutes | Nature connection</p>
                        </div>
                      </div>
                      <Button>Complete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Daily Reflection</CardTitle>
                <CardDescription>Take a moment to center yourself</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-md">
                    <p className="italic text-muted-foreground mb-3">
                      "The present moment is the only time over which we have dominion."
                    </p>
                    <p className="text-sm text-right">— Thích Nhất Hạnh</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Question for Today</h3>
                    <p className="text-muted-foreground">
                      What is one thing you can be fully present for today?
                    </p>
                    <Button className="w-full mt-2">Reflect on This</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="journal" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Spiritual Journal</CardTitle>
              <CardDescription>Record your spiritual insights and experiences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the spiritual journal tab will be implemented here.</p>
                <Button className="mt-4">New Journal Entry</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="emotions" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Emotional Wellbeing</CardTitle>
              <CardDescription>Track and nurture your emotional health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the emotional wellbeing tab will be implemented here.</p>
                <Button className="mt-4">Track Emotions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Moon className="h-5 w-5 mr-2 text-purple-600" />
                  Establish Daily Meditation Practice
                </CardTitle>
                <CardDescription>Target: 20 minutes daily</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Current streak</span>
                    <span className="font-medium">12 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Book className="h-5 w-5 mr-2 text-blue-500" />
                  Read 5 Spiritual Books
                </CardTitle>
                <CardDescription>Target by December 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">3/5 books</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Currently reading</span>
                    <span className="font-medium">The Power of Now</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <Button variant="ghost" className="gap-1">
                  <Plus className="h-5 w-5" />
                  Add New Spiritual Goal
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Set targets for your spiritual growth
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="rituals" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Rituals & Routines</CardTitle>
              <CardDescription>Create meaningful practices and ceremonies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the rituals & routines tab will be implemented here.</p>
                <Button className="mt-4">Create New Ritual</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Spiritual;
