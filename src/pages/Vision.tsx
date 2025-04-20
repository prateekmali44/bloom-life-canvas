import React, { useState } from "react";
import { mockVisionItems, lifeAreas } from "@/services/mockData";
import { LifeAreaKey, VisionItem as BaseVisionItem } from "@/types";
import { 
  Calendar, 
  Plus, 
  CalendarClock, 
  CalendarIcon, 
  Compass, 
  Star, 
  Wand, 
  Calendar as CalendarCheck,
  Image,
  PlusCircle,
  Layers,
  ArrowRight,
  Heart,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

type VisionTimeframe = "annual" | "lifetime";
type VisionType = "board" | "mission";

// Extending the base VisionItem interface to include the required timeframe field
interface VisionItem extends BaseVisionItem {
  timeframe: VisionTimeframe;
  deadline?: string;
  progress?: number;
  why?: string;
  values?: string[];
}

// Sample data for life pillars
const lifePillars = [
  { id: "health", name: "Health & Vitality", icon: Heart, color: "#10b981" },
  { id: "relationships", name: "Relationships", icon: Heart, color: "#ec4899" },
  { id: "career", name: "Career & Purpose", icon: Star, color: "#6366f1" },
  { id: "finance", name: "Financial Freedom", icon: Star, color: "#f59e0b" },
  { id: "spirituality", name: "Spirituality", icon: Wand, color: "#8b5cf6" },
  { id: "legacy", name: "Legacy & Impact", icon: Compass, color: "#3b82f6" },
];

// Extended vision items
const extendedVisionItems: VisionItem[] = [
  ...mockVisionItems.map(item => ({...item, timeframe: "annual" as VisionTimeframe})),
  {
    id: "lifetime-1",
    title: "Build a Dream Home",
    description: "Create a sustainable, modern home with a garden and space for creativity",
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
    areaKey: "professional",
    timeframe: "lifetime",
    why: "To create a sanctuary that represents my values and gives me peace",
    values: ["Security", "Creativity", "Sustainability"],
    createdAt: new Date().toISOString()
  },
  {
    id: "lifetime-2",
    title: "Master Meditation",
    description: "Achieve a consistent daily practice and attend a 10-day silent retreat",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    areaKey: "spiritual",
    timeframe: "lifetime",
    why: "To cultivate inner peace and clarity that will benefit all areas of my life",
    values: ["Peace", "Growth", "Mindfulness"],
    createdAt: new Date().toISOString()
  },
  {
    id: "annual-1",
    title: "Read 24 Books",
    description: "Expand knowledge through consistent reading across diverse topics",
    imageUrl: "https://images.unsplash.com/photo-1526243741027-444d633d7365",
    areaKey: "educational",
    timeframe: "annual",
    deadline: "2024-12-31",
    progress: 8,
    why: "To expand my mind and grow intellectually",
    values: ["Learning", "Curiosity"],
    createdAt: new Date().toISOString()
  },
  {
    id: "annual-2",
    title: "Complete Half Marathon",
    description: "Train consistently and complete my first half marathon",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    areaKey: "health",
    timeframe: "annual",
    deadline: "2024-10-15",
    progress: 65,
    why: "To push my physical limits and prove to myself I can do hard things",
    values: ["Discipline", "Health", "Persistence"],
    createdAt: new Date().toISOString()
  }
];

const VisionPage = () => {
  const [visionType, setVisionType] = useState<VisionType>("board");
  const [visionTimeframe, setVisionTimeframe] = useState<VisionTimeframe>("annual");
  const [visionItems, setVisionItems] = useState<VisionItem[]>(extendedVisionItems);
  const [showCompareView, setShowCompareView] = useState(false);
  
  // Current year for annual vision board
  const currentYear = new Date().getFullYear();
  
  const handleAddVisionItem = (data: any) => {
    // This would actually save the vision item
    toast({
      title: "Vision item added",
      description: "Your vision item has been added successfully.",
    });
  };

  const filteredVisionItems = visionItems.filter(item => 
    item.timeframe === visionTimeframe
  );

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
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="gap-1" 
              onClick={() => setShowCompareView(!showCompareView)}
            >
              <Layers className="h-4 w-4" /> 
              {showCompareView ? "Exit Horizon Mode" : "Horizon Mode"}
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" /> Add to Vision Board
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Vision Item</DialogTitle>
                  <DialogDescription>
                    Create a new vision item with clear intent, purpose, and deadline.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-5 py-4">
                  <div className="space-y-2">
                    <Label>Vision Timeframe</Label>
                    <RadioGroup defaultValue="annual" className="flex gap-8">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="annual" id="annual" />
                        <Label htmlFor="annual" className="cursor-pointer">Annual ({currentYear})</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lifetime" id="lifetime" />
                        <Label htmlFor="lifetime" className="cursor-pointer">Lifetime Vision</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="What do you want to achieve?"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your vision in detail"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="why">
                        Your Why <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="why"
                        placeholder="Why is this important to you? What will it mean when you achieve it?"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="area">
                          Life Area
                        </Label>
                        <Select defaultValue="professional">
                          <SelectTrigger id="area">
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
                      
                      <div className="space-y-2">
                        <Label htmlFor="deadline">
                          Deadline
                        </Label>
                        <Input
                          id="deadline"
                          type="date"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Associated Values</Label>
                      <div className="flex flex-wrap gap-2 border rounded-md p-2">
                        {["Growth", "Freedom", "Connection", "Creativity", "Health", "Security", "Joy"].map(value => (
                          <Badge key={value} variant="outline" className="cursor-pointer hover:bg-primary hover:text-white">
                            {value}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="cursor-pointer border-dashed">
                          <PlusCircle className="h-3 w-3 mr-1" /> Add Value
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image">
                        Visualization Image
                      </Label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Drag & drop or click to upload an image that represents your vision
                        </p>
                        <Input
                          id="image"
                          type="file"
                          className="hidden"
                        />
                        <Button variant="outline" size="sm" className="mt-2">
                          Choose Image
                        </Button>
                      </div>
                    </div>
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
      </div>

      <Tabs defaultValue="board" className="w-full" onValueChange={(value) => setVisionType(value as VisionType)}>
        <TabsList className="mb-6 w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="board">Vision Board</TabsTrigger>
          <TabsTrigger value="mission">Mission Statement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="board" className="mt-0">
          {!showCompareView && (
            <div className="mb-6">
              <div className="bg-white rounded-lg p-4 border border-border mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Vision Timeframe</h3>
                </div>
                <div>
                  <ToggleGroup 
                    type="single" 
                    defaultValue="annual" 
                    className="justify-end" 
                    onValueChange={(value) => {
                      if (value) setVisionTimeframe(value as VisionTimeframe);
                    }}
                  >
                    <ToggleGroupItem value="annual" aria-label="Annual Vision">
                      <CalendarCheck className="h-4 w-4 mr-2" />
                      Annual ({currentYear})
                    </ToggleGroupItem>
                    <ToggleGroupItem value="lifetime" aria-label="Lifetime Vision">
                      <Compass className="h-4 w-4 mr-2" />
                      Lifetime Vision
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </div>
          )}
          
          {showCompareView ? (
            // Horizon Mode - Compare Annual and Lifetime views
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="bg-white border-2 border-primary/20 rounded-xl p-6 mb-4">
                  <h2 className="text-xl font-bold flex items-center mb-4">
                    <CalendarCheck className="h-5 w-5 mr-2 text-primary" />
                    Annual Vision ({currentYear})
                  </h2>
                  <Separator className="mb-6" />
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Theme of the Year</h3>
                      <Card className="bg-lavender-50 border-lavender-100">
                        <CardContent className="pt-6">
                          <p className="text-center italic text-lg">"Growth & Expansion"</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Top 3 Priorities</h3>
                      <div className="space-y-3">
                        {extendedVisionItems
                          .filter(item => item.timeframe === "annual")
                          .slice(0, 3)
                          .map((item, index) => (
                            <div key={item.id} className="flex items-center gap-2">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </div>
                              <div className="text-sm font-medium">{item.title}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {extendedVisionItems
                    .filter(item => item.timeframe === "annual")
                    .slice(0, 2)
                    .map(item => (
                      <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-28 bg-cover bg-center" style={{ backgroundImage: `url(${item.imageUrl})` }} />
                        <CardContent className="p-4">
                          <h3 className="font-medium">{item.title}</h3>
                          {item.progress !== undefined && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{item.progress}%</span>
                              </div>
                              <Progress value={item.progress} className="h-1.5" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
              
              <div>
                <div className="bg-white border-2 border-primary/20 rounded-xl p-6 mb-4">
                  <h2 className="text-xl font-bold flex items-center mb-4">
                    <Compass className="h-5 w-5 mr-2 text-primary" />
                    Lifetime Vision
                  </h2>
                  <Separator className="mb-6" />
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">North Star</h3>
                      <Card className="bg-hazel-50 border-hazel-100">
                        <CardContent className="pt-6">
                          <p className="text-center italic text-lg">
                            "To live authentically, create meaningful work, and inspire others through my journey"
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Life Pillars</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {lifePillars.slice(0, 4).map(pillar => (
                          <div 
                            key={pillar.id}
                            className="border rounded-md p-2 flex items-center gap-2"
                            style={{ borderColor: `${pillar.color}40` }}
                          >
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}
                            >
                              <pillar.icon className="h-3.5 w-3.5" />
                            </div>
                            <span className="font-medium">{pillar.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {extendedVisionItems
                    .filter(item => item.timeframe === "lifetime")
                    .slice(0, 2)
                    .map(item => (
                      <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-28 bg-cover bg-center" style={{ backgroundImage: `url(${item.imageUrl})` }} />
                        <CardContent className="p-4">
                          <h3 className="font-medium">{item.title}</h3>
                          {item.values && (
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {item.values.map(value => (
                                <Badge key={value} variant="secondary" className="text-xs">
                                  {value}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
              
              <div className="lg:col-span-2 mt-2 flex justify-center">
                <Button 
                  variant="outline" 
                  className="text-primary" 
                  onClick={() => setShowCompareView(false)}
                >
                  Exit Horizon Mode
                </Button>
              </div>
            </div>
          ) : visionTimeframe === "annual" ? (
            // Annual Vision Board View
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Theme of the Year ({currentYear})</CardTitle>
                      <CardDescription>Define your overarching focus for this year</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-lavender-50 border border-lavender-100 rounded-xl p-6 text-center space-y-4">
                        <h3 className="text-2xl font-bold text-primary italic">
                          "Growth & Expansion"
                        </h3>
                        <p className="text-muted-foreground">
                          This year is about pushing boundaries, exploring new territories, and developing skills that will expand my horizons.
                        </p>
                        <div className="flex justify-center gap-2 pt-2">
                          <Badge className="bg-lavender-100 text-primary hover:bg-lavender-200">Growth</Badge>
                          <Badge className="bg-lavender-100 text-primary hover:bg-lavender-200">Curiosity</Badge>
                          <Badge className="bg-lavender-100 text-primary hover:bg-lavender-200">Courage</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Year-End Promise</CardTitle>
                      <CardDescription>What you'll gift yourself by year's end</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="italic text-muted-foreground">
                          "By staying aligned with my vision, by December 31st I will reward myself with..."
                        </p>
                        <div className="border-2 border-dashed border-primary/30 rounded-lg p-4 text-center">
                          <p className="font-medium text-primary">A two-week solo trip to Bali</p>
                          <p className="text-sm text-muted-foreground mt-1">A time for reflection, celebration and renewal</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2">Edit Promise</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Quarterly Goals ({currentYear})</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {["Q1", "Q2", "Q3", "Q4"].map((quarter, i) => (
                    <Card key={quarter} className={i === 1 ? "border-primary" : ""}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{quarter}</CardTitle>
                        <CardDescription>
                          {i === 0 && "Jan - Mar"}
                          {i === 1 && "Apr - Jun"}
                          {i === 2 && "Jul - Sep"}
                          {i === 3 && "Oct - Dec"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {i === 1 ? (
                            <>
                              <div className="flex items-start gap-2">
                                <div className="p-1 rounded-full bg-green-100 text-green-600 mt-0.5">
                                  <CheckCircle className="h-3 w-3" />
                                </div>
                                <p className="text-sm">Complete website redesign</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="h-4 w-4 rounded-full border-2 border-muted mt-0.5" />
                                <p className="text-sm">Launch new course</p>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="h-4 w-4 rounded-full border-2 border-muted mt-0.5" />
                                <p className="text-sm">Read 6 books</p>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-4">
                              <Button variant="outline" size="sm">
                                <PlusCircle className="h-4 w-4 mr-1" /> Add Goals
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Vision Board ({currentYear})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVisionItems.map((item) => {
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
                          
                          {item.progress !== undefined && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{item.progress}%</span>
                              </div>
                              <Progress value={item.progress} className="h-1.5" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-lg text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                          
                          {item.why && (
                            <div className="bg-hazel-50 border border-hazel-100 rounded-md p-3 mb-3">
                              <p className="text-sm font-medium mb-1">My Why:</p>
                              <p className="text-sm italic text-muted-foreground">{item.why}</p>
                            </div>
                          )}
                          
                          {item.values && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.values.map(value => (
                                <Badge key={value} variant="outline" className="text-xs">
                                  {value}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <CalendarIcon className="h-3 w-3" />
                              <span>
                                {item.deadline 
                                  ? new Date(item.deadline).toLocaleDateString('en-US', { 
                                      month: 'short', day: 'numeric', year: 'numeric' 
                                    }) 
                                  : `Dec 31, ${currentYear}`
                                }
                              </span>
                            </div>
                            <Button variant="ghost" size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="border-2 border-dashed border-border rounded-xl flex items-center justify-center p-8 hover:bg-muted/50 transition-colors cursor-pointer h-64">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-lavender-100 flex items-center justify-center mx-auto mb-4">
                            <PlusCircle className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="font-medium text-lg text-primary mb-1">Add Vision Item</h3>
                          <p className="text-muted-foreground text-sm">
                            Create a new vision for your {visionTimeframe === "annual" ? "year" : "lifetime"}
                          </p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      {/* Add Vision Item Dialog - content is same as the one above */}
                      <DialogHeader>
                        <DialogTitle>Add New Vision Item</DialogTitle>
                        <DialogDescription>
                          Create a new vision item with clear intent, purpose, and deadline.
                        </DialogDescription>
                      </DialogHeader>
                      {/* ...form fields would go here... */}
                      <DialogFooter>
                        <Button type="submit" onClick={() => handleAddVisionItem({})}>
                          Add to Vision Board
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Annual Vision Progress Report ({currentYear})</CardTitle>
                  <CardDescription>Track your progress toward your annual vision goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white border rounded-lg p-4 text-center">
                        <h3 className="text-2xl font-bold text-primary">
                          {filteredVisionItems.length}
                        </h3>
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
                      Generate Quarterly Vision Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Lifetime Vision Board View
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>North Star</CardTitle>
                      <CardDescription>Your guiding purpose in life</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-lavender-50 border border-lavender-100 rounded-xl p-6 text-center space-y-4">
                        <h3 className="text-2xl font-bold text-primary italic">
                          "To live authentically, create meaningful work, and inspire others through my journey"
                        </h3>
                        <Button variant="outline" size="sm">Edit North Star</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Personal Commandments</CardTitle>
                      <CardDescription>Rules to live by</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                            1
                          </div>
                          <p className="text-sm">Always choose growth over comfort</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                            2
                          </div>
                          <p className="text-sm">Show up fully or don't show up at all</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                            3
                          </div>
                          <p className="text-sm">Kindness is never wasted</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2">
                          <PlusCircle className="h-3 w-3 mr-1" /> Add Commandment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Life Pillars</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lifePillars.map(pillar => (
                    <Card key={pillar.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <div>
                          <CardTitle className="text-lg">{pillar.
