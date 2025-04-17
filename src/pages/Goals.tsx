
import React, { useState } from "react";
import { mockGoals, lifeAreas } from "@/services/mockData";
import { Goal, LifeAreaKey } from "@/types";
import { 
  BarChart4,
  CheckCircle2,
  ChevronDownIcon, 
  Clock, 
  Plus, 
  Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

const GoalsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [areaFilter, setAreaFilter] = useState<string | null>(null);

  // Filter goals
  const filteredGoals = mockGoals.filter((goal) => {
    const matchesSearch = goal.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? goal.status === statusFilter : true;
    const matchesArea = areaFilter ? goal.areaKey === areaFilter : true;
    return matchesSearch && matchesStatus && matchesArea;
  });

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Goals</h1>
            <p className="text-muted-foreground">
              Set, track, and achieve your goals across all life areas
            </p>
          </div>
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> New Goal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search goals..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={statusFilter || ""}
              onChange={(e) => setStatusFilter(e.target.value || null)}
            >
              <option value="">All Statuses</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
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
        </div>
      </div>

      <div className="bg-white border border-border rounded-xl shadow-sm">
        <div className="divide-y divide-border">
          {filteredGoals.length === 0 ? (
            <div className="px-5 py-8 text-center text-muted-foreground">
              <BarChart4 className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-2" />
              <h3 className="text-lg font-medium mb-1">No goals found</h3>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredGoals.map((goal) => {
              const area = lifeAreas[goal.areaKey as LifeAreaKey];
              const deadline = goal.deadline ? new Date(goal.deadline) : null;
              const formattedDeadline = deadline
                ? format(deadline, "MMM d, yyyy")
                : "No deadline";
              const startDate = new Date(goal.createdAt);
              const formattedStartDate = format(startDate, "MMM d, yyyy");

              return (
                <div key={goal.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-medium text-gray-900">{goal.title}</h4>
                        <Badge
                          style={{ backgroundColor: area.color }}
                          className="text-white"
                        >
                          {area.name}
                        </Badge>
                        {goal.status === "completed" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50">
                            In Progress
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{goal.description}</p>
                    </div>

                    <Button variant="ghost" size="sm" className="gap-1">
                      Edit <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between mb-3 gap-y-2">
                    <div className="flex items-center gap-5">
                      <div className="text-sm flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Started:</span>
                        <span className="font-medium">{formattedStartDate}</span>
                      </div>
                      {deadline && (
                        <div className="text-sm flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Due:</span>
                          <span className="font-medium">{formattedDeadline}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{goal.progress}%</span>
                      <Progress
                        value={goal.progress}
                        className="h-2 w-24"
                        style={{
                          backgroundColor: `${area.color}20`,
                          "--progress-color": area.color,
                        } as React.CSSProperties}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <h5 className="text-sm font-medium mb-2">Subtasks</h5>
                    <div className="space-y-1">
                      {goal.subTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div
                            className={`h-4 w-4 rounded-full flex items-center justify-center ${
                              task.completed
                                ? "bg-green-500 text-white"
                                : "border border-gray-300"
                            }`}
                          >
                            {task.completed && (
                              <CheckCircle2 className="h-3 w-3" />
                            )}
                          </div>
                          <span
                            className={
                              task.completed ? "line-through text-muted-foreground" : ""
                            }
                          >
                            {task.title}
                          </span>
                        </div>
                      ))}
                    </div>
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

export default GoalsPage;
