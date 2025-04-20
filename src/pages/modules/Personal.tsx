
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Compass, 
  Plus, 
  LineChart, 
  Target, 
  Calendar, 
  Clock, 
  Users, 
  Music,
  Heart,
  BarChart,
  BookOpen,
  PlusCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import DimensionGoals from "@/components/shared/DimensionGoals";

// Sample goals data
const personalGoals = [
  { 
    id: 'p1', 
    title: 'Learn to Play Piano', 
    description: 'Master basic scales and chords', 
    progress: 30, 
    deadline: 'Dec 2025', 
    priority: 'medium' as const,
    color: '#ec4899'
  },
  { 
    id: 'p2', 
    title: 'Take Photography Course', 
    description: 'Learn digital photography fundamentals', 
    progress: 20, 
    deadline: 'Sep 2025', 
    priority: 'low' as const,
    color: '#ec4899'
  },
  { 
    id: 'p3', 
    title: 'Travel to Japan', 
    description: 'Experience Japanese culture', 
    progress: 15, 
    deadline: 'May 2026', 
    priority: 'high' as const,
    color: '#ec4899'
  }
];

const Personal = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="container mx-auto animate-fade-in pb-20 md:pb-8">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Personal Growth</h1>
            <p className="text-muted-foreground">
              Monitor personal growth, life goals, relationships, and hobbies
            </p>
          </div>
          <Button className="gap-1 md:w-auto w-full">
            <PlusCircle className="h-4 w-4" /> New Personal Goal
          </Button>
        </div>
      </div>

      {/* Personal Growth Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Personal Goals</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
              <div className="h-10 w-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-pink-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">2 in progress, 3 completed</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Life Balance Score</p>
                <h3 className="text-2xl font-bold">7.5/10</h3>
              </div>
              <div className="h-10 w-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Compass className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-green-600">↑ from 6.8 last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Hobby Time</p>
                <h3 className="text-2xl font-bold">8.5 hrs</h3>
              </div>
              <div className="h-10 w-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Music className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">This week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Relationship Events</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <div className="h-10 w-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center">
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
      <Tabs 
        defaultValue="dashboard" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className={`mb-6 ${isMobile ? 'grid grid-cols-2 lg:grid-cols-5' : ''}`}>
          <TabsTrigger value="dashboard" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-1">
            <Target className="h-4 w-4" /> Goals
          </TabsTrigger>
          <TabsTrigger value="habits" className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> Habits
          </TabsTrigger>
          <TabsTrigger value="hobbies" className="flex items-center gap-1">
            <Music className="h-4 w-4" /> Hobbies
          </TabsTrigger>
          <TabsTrigger value="relationships" className="flex items-center gap-1">
            <Heart className="h-4 w-4" /> Relationships
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-0 space-y-6">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Life Balance</CardTitle>
                  <CardDescription>Rating of different life areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Health & Fitness</label>
                        <span className="text-sm">8.5/10</span>
                      </div>
                      <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Relationships</label>
                        <span className="text-sm">7.0/10</span>
                      </div>
                      <div className="h-2 w-full bg-pink-100 rounded-full overflow-hidden">
                        <div className="h-full bg-pink-500 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Career</label>
                        <span className="text-sm">6.5/10</span>
                      </div>
                      <div className="h-2 w-full bg-purple-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Personal Growth</label>
                        <span className="text-sm">7.5/10</span>
                      </div>
                      <div className="h-2 w-full bg-amber-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">Overall Balance</label>
                        <span className="text-sm font-medium">7.5/10</span>
                      </div>
                      <div className="h-3 w-full bg-gradient-to-r from-red-100 via-amber-100 to-green-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-green-500 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Current Reads</CardTitle>
                  <CardDescription>Books in progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Atomic Habits</h4>
                        <p className="text-xs text-muted-foreground">James Clear</p>
                        <div className="flex items-center mt-1">
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                          <span className="text-xs ml-2">65%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">The Psychology of Money</h4>
                        <p className="text-xs text-muted-foreground">Morgan Housel</p>
                        <div className="flex items-center mt-1">
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                          <span className="text-xs ml-2">40%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full gap-1">
                    <PlusCircle className="h-4 w-4" /> Add Book
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="goals" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DimensionGoals
                title="Personal Goals"
                description="Track your progress towards personal growth"
                goals={personalGoals}
                dimensionColor="#ec4899"
              />
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Goal Categories</CardTitle>
                  <CardDescription>Personal goals by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-pink-500"></div>
                        <span className="text-sm">Hobbies</span>
                      </div>
                      <span className="text-sm font-medium">3 goals</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm">Travel</span>
                      </div>
                      <span className="text-sm font-medium">1 goal</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm">Learning</span>
                      </div>
                      <span className="text-sm font-medium">2 goals</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Relationships</span>
                      </div>
                      <span className="text-sm font-medium">2 goals</span>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full mt-2 gap-1">
                        <PlusCircle className="h-4 w-4" /> Add Category
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
      </Tabs>
    </div>
  );
};

export default Personal;
