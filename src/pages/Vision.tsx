
import React from "react";
import { mockVisionItems, lifeAreas } from "@/services/mockData";
import { LifeAreaKey } from "@/types";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VisionPage = () => {
  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vision Board</h1>
            <p className="text-muted-foreground">
              Visualize your aspirations and future goals
            </p>
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> Add to Vision Board
          </Button>
        </div>
      </div>

      <Tabs defaultValue="board" className="w-full">
        <TabsList className="mb-6 w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="board">Vision Board</TabsTrigger>
          <TabsTrigger value="mission">Mission Statement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="board" className="mt-0">
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
                    <p className="text-muted-foreground text-sm">{item.description}</p>
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
    </div>
  );
};

export default VisionPage;
