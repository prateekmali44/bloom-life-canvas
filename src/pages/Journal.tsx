
import React, { useState } from "react";
import { mockJournalEntries, lifeAreas } from "@/services/mockData";
import { JournalEntry, LifeAreaKey } from "@/types";
import { 
  Book, 
  Calendar,
  FilePlus, 
  Plus, 
  Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { format, parseISO } from "date-fns";

const JournalPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState<string | null>(null);
  const [moodFilter, setMoodFilter] = useState<string | null>(null);

  // Get unique moods from journal entries
  const uniqueMoods = Array.from(
    new Set(mockJournalEntries.map((entry) => entry.mood.primary))
  );

  // Filter journal entries
  const filteredEntries = mockJournalEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = areaFilter
      ? entry.areaKeys.includes(areaFilter as LifeAreaKey)
      : true;
    const matchesMood = moodFilter ? entry.mood.primary === moodFilter : true;
    return matchesSearch && matchesArea && matchesMood;
  });

  // Group entries by date
  const entriesByDate = filteredEntries.reduce((groups, entry) => {
    const date = format(parseISO(entry.createdAt), "yyyy-MM-dd");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {} as Record<string, JournalEntry[]>);

  // Sort dates in descending order
  const sortedDates = Object.keys(entriesByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const formatContent = (content: string, maxLength = 200) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Journal</h1>
            <p className="text-muted-foreground">
              Track your thoughts, feelings, and reflections
            </p>
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> New Entry
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="col-span-1 md:col-span-3">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search journal..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
              value={moodFilter || ""}
              onChange={(e) => setMoodFilter(e.target.value || null)}
            >
              <option value="">All Moods</option>
              {uniqueMoods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Input
              type="date"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="bg-white border border-border rounded-xl shadow-sm p-10 text-center text-muted-foreground">
          <Book className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-2" />
          <h3 className="text-lg font-medium mb-1">No journal entries found</h3>
          <p className="text-sm mb-4">Get started by creating your first entry</p>
          <Button className="mx-auto gap-1">
            <FilePlus className="h-4 w-4" /> New Journal Entry
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((date) => {
            const entries = entriesByDate[date];
            const formattedDate = format(new Date(date), "EEEE, MMMM d, yyyy");
            
            return (
              <div key={date}>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">{formattedDate}</h3>
                </div>
                
                <div className="space-y-4">
                  {entries.map((entry) => {
                    const entryTime = format(parseISO(entry.createdAt), "h:mm a");
                    
                    return (
                      <div 
                        key={entry.id} 
                        className="bg-white border border-border rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{entry.title}</h4>
                            <div className="text-sm text-muted-foreground">{entryTime}</div>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">
                          {formatContent(entry.content)}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="bg-gray-50">
                            {entry.mood.primary}
                          </Badge>
                          
                          {entry.areaKeys.map((areaKey) => {
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
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JournalPage;
