
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { GraduationCap, Plus, Book, LineChart, Calendar, BookOpen, Clock, FileText, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Educational = () => {
  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Learning & Education</h1>
            <p className="text-muted-foreground">
              Track knowledge acquisition, skills development, and learning goals
            </p>
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> New Learning Goal
          </Button>
        </div>
      </div>

      {/* Learning Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">2 due this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Study Hours</p>
                <h3 className="text-2xl font-bold">42</h3>
              </div>
              <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-500" />
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
                <p className="text-sm text-muted-foreground">Books Reading</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">3 completed this year</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Skills Added</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className="text-muted-foreground">This year</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="books">Reading</TabsTrigger>
          <TabsTrigger value="notes">Study Notes</TabsTrigger>
          <TabsTrigger value="goals">Learning Goals</TabsTrigger>
          <TabsTrigger value="tracking">Time Tracking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>
                  <Badge variant="outline">Online Course</Badge>
                </div>
                <CardTitle className="text-lg mt-2">
                  React Advanced Patterns
                </CardTitle>
                <CardDescription>Frontend Masters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Estimated completion</span>
                    <span className="font-medium">Aug 15, 2024</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Details</Button>
                <Button size="sm">Continue</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Just Started</Badge>
                  <Badge variant="outline">Video Course</Badge>
                </div>
                <CardTitle className="text-lg mt-2">
                  Machine Learning Basics
                </CardTitle>
                <CardDescription>Coursera</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                  
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Estimated completion</span>
                    <span className="font-medium">Oct 30, 2024</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Details</Button>
                <Button size="sm">Continue</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Almost Done</Badge>
                  <Badge variant="outline">Certificate Course</Badge>
                </div>
                <CardTitle className="text-lg mt-2">
                  AWS Cloud Practitioner
                </CardTitle>
                <CardDescription>Amazon Web Services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Estimated completion</span>
                    <span className="font-medium">Aug 5, 2024</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Details</Button>
                <Button size="sm">Continue</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="flex justify-center">
            <Button variant="outline" className="gap-1">
              <Plus className="h-4 w-4" /> Add New Course
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Skills Portfolio</CardTitle>
              <CardDescription>
                Track your skills and expertise levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-5">
                  <h3 className="font-medium">Technical Skills</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">JavaScript</span>
                        <span className="text-sm text-muted-foreground">Advanced</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">React</span>
                        <span className="text-sm text-muted-foreground">Intermediate</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Python</span>
                        <span className="text-sm text-muted-foreground">Beginner</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <h3 className="font-medium">Soft Skills</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Communication</span>
                        <span className="text-sm text-muted-foreground">Advanced</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Leadership</span>
                        <span className="text-sm text-muted-foreground">Intermediate</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Time Management</span>
                        <span className="text-sm text-muted-foreground">Advanced</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <h3 className="font-medium">Languages</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">English</span>
                        <span className="text-sm text-muted-foreground">Native</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Spanish</span>
                        <span className="text-sm text-muted-foreground">Intermediate</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">French</span>
                        <span className="text-sm text-muted-foreground">Beginner</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="gap-1">
                  <Plus className="h-4 w-4" /> Add New Skill
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="books" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-3">
                  <div className="h-32 w-24 bg-muted flex items-center justify-center rounded-md">
                    <BookOpen className="h-10 w-10 text-muted-foreground opacity-50" />
                  </div>
                </div>
                <CardTitle className="text-lg text-center">
                  Atomic Habits
                </CardTitle>
                <CardDescription className="text-center">James Clear</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  
                  <div className="flex justify-center pt-2">
                    <Badge variant="outline">Currently Reading</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button size="sm">Update Progress</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-3">
                  <div className="h-32 w-24 bg-muted flex items-center justify-center rounded-md">
                    <BookOpen className="h-10 w-10 text-muted-foreground opacity-50" />
                  </div>
                </div>
                <CardTitle className="text-lg text-center">
                  Deep Work
                </CardTitle>
                <CardDescription className="text-center">Cal Newport</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                  
                  <div className="flex justify-center pt-2">
                    <Badge variant="outline">Currently Reading</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button size="sm">Update Progress</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-3">
                  <div className="h-32 w-24 bg-muted flex items-center justify-center rounded-md">
                    <BookOpen className="h-10 w-10 text-muted-foreground opacity-50" />
                  </div>
                </div>
                <CardTitle className="text-lg text-center">
                  The Pragmatic Programmer
                </CardTitle>
                <CardDescription className="text-center">Andrew Hunt & David Thomas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex justify-center pt-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button size="sm" variant="outline">Add Notes</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <Button variant="ghost" className="gap-1">
                  <Plus className="h-5 w-5" />
                  Add New Book
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Track your reading progress
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Study Notes & Knowledge Base</CardTitle>
              <CardDescription>Capture and organize your learning notes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the study notes tab will be implemented here.</p>
                <Button className="mt-4">Add New Note</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                  Complete AWS Certification
                </CardTitle>
                <CardDescription>Target by October 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Study Hours Logged</span>
                      <span className="text-sm font-medium">24 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Practice Tests</span>
                      <span className="text-sm font-medium">2 / 5 completed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                  Read 12 Books This Year
                </CardTitle>
                <CardDescription>Target by December 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">5 / 12 books</span>
                  </div>
                  <Progress value={42} className="h-2" />
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Currently Reading</span>
                      <span className="text-sm font-medium">2 books</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Completed</span>
                      <span className="text-sm font-medium">5 books</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <Button variant="ghost" className="gap-1">
                  <Plus className="h-5 w-5" />
                  Add New Learning Goal
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Set targets for your education and learning
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tracking" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Study Time Tracking</CardTitle>
              <CardDescription>Monitor your learning hours and productivity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Content for the time tracking tab will be implemented here.</p>
                <Button className="mt-4">Start Study Session</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Educational;
