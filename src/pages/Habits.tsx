
import React, { useState } from "react";
import { mockHabits, lifeAreas } from "@/services/mockData";
import { Habit, LifeAreaKey } from "@/types";
import { 
  Calendar, 
  ChevronLeft,
  ChevronRight,
  Clock, 
  Plus, 
  Search,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { format, startOfWeek, addDays } from "date-fns";

const HabitsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate week days
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfCurrentWeek, i);
    return {
      date,
      day: format(date, "EEE"),
      dayOfMonth: format(date, "d"),
      isToday: format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"),
    };
  });

  // Filter habits
  const filteredHabits = mockHabits.filter((habit) => {
    const matchesSearch = habit.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesArea = areaFilter ? habit.areaKey === areaFilter : true;
    return matchesSearch && matchesArea;
  });

  // Go to previous week
  const goToPreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  // Go to next week
  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Habits</h1>
            <p className="text-muted-foreground">
              Track daily habits and build healthy routines
            </p>
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> New Habit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-3">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search habits..."
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
        </div>
      </div>

      <div className="bg-white border border-border rounded-xl shadow-sm mb-6">
        <div className="px-5 py-4 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">{format(currentDate, "MMMM yyyy")}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={goToPreviousWeek}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={goToNextWeek}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-border">
          {weekDays.map((day) => (
            <div
              key={day.day}
              className={`flex flex-col items-center py-3 ${
                day.isToday ? "bg-primary/5" : ""
              }`}
            >
              <span className="text-xs text-muted-foreground">{day.day}</span>
              <span
                className={`text-sm font-medium mt-1 h-7 w-7 flex items-center justify-center rounded-full ${
                  day.isToday ? "bg-primary text-white" : ""
                }`}
              >
                {day.dayOfMonth}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-border rounded-xl shadow-sm">
        <div className="divide-y divide-border">
          {filteredHabits.length === 0 ? (
            <div className="px-5 py-8 text-center text-muted-foreground">
              <Zap className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-2" />
              <h3 className="text-lg font-medium mb-1">No habits found</h3>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredHabits.map((habit) => {
              const area = lifeAreas[habit.areaKey as LifeAreaKey];
              
              return (
                <div key={habit.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-medium text-gray-900">{habit.title}</h4>
                        <Badge
                          style={{ backgroundColor: area.color }}
                          className="text-white"
                        >
                          {area.name}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{habit.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Frequency:</span>
                          <span className="font-medium capitalize">{habit.frequency}</span>
                          {habit.timeOfDay && (
                            <span>at {habit.timeOfDay}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          <Zap className="h-4 w-4 text-amber-500" />
                          <span className="font-medium text-amber-600">
                            {habit.streak} day streak
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>

                  <div className="mt-4 grid grid-cols-7 gap-1">
                    {weekDays.map((day, index) => {
                      // Randomly determine if habit was completed on this day (for demo)
                      const completed = Math.random() > 0.4;
                      
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center"
                        >
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center border ${
                              completed
                                ? "bg-green-500 border-green-500 text-white"
                                : day.date < new Date()
                                ? "bg-red-100 border-red-200 text-red-500"
                                : "border-gray-200"
                            }`}
                          >
                            {completed ? "✓" : day.date < new Date() ? "✗" : ""}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitsPage;
