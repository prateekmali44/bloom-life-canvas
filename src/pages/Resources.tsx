
import React, { useState } from "react";
import { mockResources, lifeAreas } from "@/services/mockData";
import { LifeAreaKey } from "@/types";
import { 
  BookOpen,
  ExternalLink, 
  FileText, 
  Headphones, 
  Plus, 
  Search, 
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [areaFilter, setAreaFilter] = useState<string | null>(null);

  // Filter resources
  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter ? resource.type === typeFilter : true;
    const matchesArea = areaFilter
      ? resource.areaKeys.includes(areaFilter as LifeAreaKey)
      : true;
    return matchesSearch && matchesType && matchesArea;
  });

  // Resource type icons
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "audio":
        return <Headphones className="h-5 w-5" />;
      case "book":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
            <p className="text-muted-foreground">
              Organize and access your learning materials and resources
            </p>
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> Add Resource
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="col-span-1 md:col-span-3">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={typeFilter || ""}
              onChange={(e) => setTypeFilter(e.target.value || null)}
            >
              <option value="">All Types</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="book">Books</option>
              <option value="course">Courses</option>
            </select>
          </div>

          <div>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={areaFilter || ""}
              onChange={(e) => setAreaFilter(e.target.value || null)}
            >
              <option value="">All Areas</option>
              {Object.values(lifeAreas).map((area) => (
                <option key={area.key} value={area.key}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white border border-border rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div
                className="h-10 w-10 rounded-md flex items-center justify-center text-white bg-primary"
              >
                {getResourceIcon(resource.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-gray-900 line-clamp-1">{resource.title}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="outline" className="capitalize">
                    {resource.type}
                  </Badge>
                  
                  {resource.areaKeys.map((areaKey) => {
                    const area = lifeAreas[areaKey as LifeAreaKey];
                    return (
                      <Badge
                        key={areaKey}
                        style={{ backgroundColor: area.color }}
                        className="text-white"
                      >
                        {area.name}
                      </Badge>
                    );
                  })}
                </div>
                
                {resource.url && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary flex items-center gap-1 hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Open resource
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
