
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Plus, CheckCircle, Clock, Calendar, LineChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Professional = () => {
  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Professional</h1>
            <p className="text-muted-foreground">
              Track career goals, work achievements, and professional growth
            </p>
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> New Professional Goal
          </Button>
        </div>
      </div>

      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="logs">Work Logs</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Briefcase className="h-5 w-5 mr-2 text-primary" />
                  Get Promoted to Senior Developer
                </CardTitle>
                <CardDescription>Target by December 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Complete React certification</p>
                        <p className="text-sm text-muted-foreground">Finished May 15</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Lead team project</p>
                        <p className="text-sm text-muted-foreground">Q2 project completed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Deliver presentation to leadership</p>
                        <p className="text-sm text-muted-foreground">Scheduled for September</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Briefcase className="h-5 w-5 mr-2 text-primary" />
                  Complete AWS Certification
                </CardTitle>
                <CardDescription>Target by October 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Register for exam</p>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Complete first 3 modules</p>
                        <p className="text-sm text-muted-foreground">1 of 3 completed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Take practice exams</p>
                        <p className="text-sm text-muted-foreground">Not started</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <Button variant="ghost" className="gap-1">
                  <Plus className="h-5 w-5" />
                  Add New Professional Goal
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Track your career aspirations and professional development
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="logs" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Work Activity Log</CardTitle>
              <CardDescription>
                Track your professional activities and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">Did you work today?</h3>
                    <p className="text-sm text-muted-foreground">Log your professional activities</p>
                  </div>
                  <Button>Log Work Day</Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Recent Work Logs</h3>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">Team meeting and project planning</p>
                        <p className="text-sm text-muted-foreground">Today</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Discussed new project timeline and assigned tasks to team members.</p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">Completed API documentation</p>
                        <p className="text-sm text-muted-foreground">Yesterday</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Finished documentation for new API endpoints.</p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">Client presentation</p>
                        <p className="text-sm text-muted-foreground">2 days ago</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Presented project progress to client, received positive feedback.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Professional Growth Metrics</CardTitle>
              <CardDescription>
                Track your professional development over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Skills Development</h3>
                    <span className="text-sm font-medium text-green-500">+3 this year</span>
                  </div>
                  <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                    <LineChart className="h-8 w-8 text-muted-foreground opacity-50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Productivity</h3>
                    <span className="text-sm font-medium text-green-500">↑ 12%</span>
                  </div>
                  <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                    <LineChart className="h-8 w-8 text-muted-foreground opacity-50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Goal Completion</h3>
                    <span className="text-sm font-medium text-amber-500">4/10</span>
                  </div>
                  <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                    <LineChart className="h-8 w-8 text-muted-foreground opacity-50" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Professional Reports</CardTitle>
              <CardDescription>
                Generate reports to analyze your professional growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-10 w-10 text-primary p-1.5 bg-primary/10 rounded-md" />
                    <div>
                      <h3 className="font-medium">Quarterly Progress Report</h3>
                      <p className="text-sm text-muted-foreground mb-3">Generate a summary of your professional achievements for the past quarter</p>
                      <Button variant="outline" size="sm">Generate Report</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-10 w-10 text-primary p-1.5 bg-primary/10 rounded-md" />
                    <div>
                      <h3 className="font-medium">Skills Assessment</h3>
                      <p className="text-sm text-muted-foreground mb-3">Evaluate your professional skills and identify growth opportunities</p>
                      <Button variant="outline" size="sm">Generate Report</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-10 w-10 text-primary p-1.5 bg-primary/10 rounded-md" />
                    <div>
                      <h3 className="font-medium">Annual Career Review</h3>
                      <p className="text-sm text-muted-foreground mb-3">Comprehensive report of yearly professional growth</p>
                      <Button variant="outline" size="sm">Generate Report</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-10 w-10 text-primary p-1.5 bg-primary/10 rounded-md" />
                    <div>
                      <h3 className="font-medium">Next Year Planning</h3>
                      <p className="text-sm text-muted-foreground mb-3">Create a strategic plan for next year's professional goals</p>
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

export default Professional;
