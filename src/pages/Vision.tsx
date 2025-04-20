
import React, { useState } from "react";
import { mockVisionItems, lifeAreas } from "@/services/mockData";
import { LifeAreaKey } from "@/types";
import { Calendar, Plus, CalendarClock, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

const VisionPage = () => {
  const [visionType, setVisionType] = useState("board");
  const [visionTimeframe, setVisionTimeframe] = useState("lifetime");
  
  // Current year for annual vision board
  const currentYear = new Date().getFullYear();
  
  const handleAddVisionItem = (data: any) => {
    // This would actually save the vision item
    toast({
      title: "Vision item added",
      description: "Your vision item has been added successfully.",
    });
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vision Board</h1>
            <p className="text-muted-foreground">
              Visualize your aspirations and define your path forward
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> Add to Vision Board
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Vision Item</DialogTitle>
                <DialogDescription>
                  Create a new vision item with clear intent, purpose, and deadline.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="What do you want to achieve?"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Why is this important to you?"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deadline" className="text-right">
                    Deadline
                  </Label>
                  <div className="col-span-3 flex items-center gap-2">
                    <Input
                      id="deadline"
                      type="date"
                      className="flex-1"
                    />
                    <Select defaultValue="lifetime">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual ({currentYear})</SelectItem>
                        <SelectItem value="lifetime">Lifetime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="area" className="text-right">
                    Life Area
                  </Label>
                  <Select defaultValue="professional">
                    <SelectTrigger id="area" className="col-span-3">
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(lifeAreas).map((area) => (
                        <SelectItem key={area.key} value={area.key}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="image"
                    placeholder="https://example.com/image.jpg"
                    className="col-span-3"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" onClick={() => handleAddVisionItem({})}>
                  Add to Vision Board
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="board" className="w-full" onValueChange={setVisionType}>
        <TabsList className="mb-6 w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="board">Vision Board</TabsTrigger>
          <TabsTrigger value="mission">Mission Statement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="board" className="mt-0">
          <div className="mb-6">
            <div className="bg-white rounded-lg p-4 border border-border mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Timeframe</h3>
              </div>
              <div>
                <Tabs defaultValue="lifetime" className="w-full" onValueChange={setVisionTimeframe}>
                  <TabsList className="grid w-[300px] grid-cols-2">
                    <TabsTrigger value="annual">Annual ({currentYear})</TabsTrigger>
                    <TabsTrigger value="lifetime">Lifetime Vision</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVisionItems.map((item) => {
              const area = item.areaKey ? lifeAreas[item.areaKey as LifeAreaKey] : null;
              
              return (
                <div 
                  key={item.id} 
                  className="group bg-white border border-border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {area && (
                      <Badge
                        style={{ backgroundColor: area.color }}
                        className="absolute top-3 right-3 text-white"
                      >
                        {area.name}
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CalendarIcon className="h-3 w-3" />
                        <span>Dec 31, {currentYear}</span>
                      </div>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="mission" className="mt-0">
          <div className="bg-white border border-border rounded-xl shadow-sm p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-1">My Mission Statement</h2>
              <p className="text-muted-foreground">
                Define your purpose and the principles you want to live by
              </p>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-lg">
                To live each day with intention and purpose, continually growing in all dimensions of life. 
                I strive to maintain balance between professional achievement and personal well-being, 
                while making a positive impact on the lives of others.
              </p>
              
              <h3 className="mt-8 mb-4">Core Values</h3>
              
              <ul className="space-y-2">
                <li><strong>Integrity:</strong> Being honest and true to myself and others in all that I do</li>
                <li><strong>Growth:</strong> Embracing challenges as opportunities to learn and develop</li>
                <li><strong>Balance:</strong> Nurturing all areas of my life without sacrificing one for another</li>
                <li><strong>Connection:</strong> Building meaningful relationships and fostering community</li>
                <li><strong>Contribution:</strong> Adding value to the world through my unique skills and talents</li>
              </ul>
              
              <div className="bg-muted p-5 rounded-lg mt-8">
                <h3 className="mt-0 mb-2">One Year Vision</h3>
                <p>
                  By this time next year, I will have completed my professional certification, 
                  established a consistent exercise routine, and developed deeper connections with my loved ones.
                  I will have also built my emergency fund and started a new learning project that expands my skills.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button>Edit Mission Statement</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {visionType === 'board' && visionTimeframe === 'annual' && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Annual Vision Progress Report ({currentYear})</CardTitle>
            <CardDescription>Track your progress toward your annual vision goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold text-primary">7</h3>
                  <p className="text-sm text-muted-foreground">Total Vision Items</p>
                </div>
                <div className="bg-white border rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold text-green-500">3</h3>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="bg-white border rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold text-amber-500">3</h3>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div className="bg-white border rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold text-red-500">1</h3>
                  <p className="text-sm text-muted-foreground">Not Started</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                <Calendar className="h-4 w-4 mr-2" />
                Generate Year-End Vision Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VisionPage;
