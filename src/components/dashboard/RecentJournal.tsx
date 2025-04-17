
import React from "react";
import { JournalEntry, LifeAreaKey } from "@/types";
import { lifeAreas } from "@/services/mockData";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RecentJournalProps {
  entries: JournalEntry[];
}

export const RecentJournal: React.FC<RecentJournalProps> = ({ entries }) => {
  const formatContent = (content: string) => {
    if (content.length > 150) {
      return content.substring(0, 150) + "...";
    }
    return content;
  };

  return (
    <div className="bg-white border border-border rounded-xl shadow-sm h-full flex flex-col">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold">Recent Journal Entries</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {entries.length === 0 ? (
            <div className="px-5 py-6 text-center text-muted-foreground">
              No journal entries found
            </div>
          ) : (
            entries.map((entry) => {
              const entryDate = new Date(entry.createdAt);
              
              return (
                <div key={entry.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{entry.title}</h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {format(entryDate, "MMM d, yyyy")}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {formatContent(entry.content)}
                  </p>
                  
                  <div className="flex items-center flex-wrap gap-1.5">
                    <Badge variant="outline" className="bg-gray-50">
                      {entry.mood.primary}
                    </Badge>
                    
                    {entry.areaKeys.map((areaKey) => {
                      const area = lifeAreas[areaKey as LifeAreaKey];
                      return (
                        <Badge
                          key={areaKey}
                          style={{ backgroundColor: area.color }}
                          className="text-white text-xs"
                        >
                          {area.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
