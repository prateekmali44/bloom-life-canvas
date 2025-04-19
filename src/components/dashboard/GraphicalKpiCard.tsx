
import React from "react";
import { KpiData, LifeAreaKey } from "@/types";
import { lifeAreas } from "@/services/mockData";
import { ArrowDownIcon, ArrowUpIcon, Minus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface GraphicalKpiCardProps {
  data: KpiData;
}

// Mock data for the chart
const generateChartData = (score: number, trend: "up" | "down" | "neutral") => {
  const baseValue = score - 20;
  return Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    value: baseValue + (trend === "up" ? i * 4 : trend === "down" ? -i * 4 : Math.random() * 5),
  }));
};

export const GraphicalKpiCard: React.FC<GraphicalKpiCardProps> = ({ data }) => {
  const area = lifeAreas[data.areaKey as LifeAreaKey];
  const chartData = generateChartData(data.score, data.trend);
  
  return (
    <Card className="animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{area.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-lg font-semibold text-primary">
                {data.score}%
              </span>
              <div className="flex items-center gap-0.5 text-sm">
                {data.trend === "up" ? (
                  <span className="text-green-600 flex items-center">
                    <ArrowUpIcon className="h-3 w-3" />
                    {data.trendValue}%
                  </span>
                ) : data.trend === "down" ? (
                  <span className="text-red-600 flex items-center">
                    <ArrowDownIcon className="h-3 w-3" />
                    {data.trendValue}%
                  </span>
                ) : (
                  <span className="text-gray-500 flex items-center">
                    <Minus className="h-3 w-3" />
                    0%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-32 mt-2">
          <ChartContainer
            config={{
              area: {
                theme: {
                  light: area.color,
                  dark: area.color,
                },
              },
            }}
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${data.areaKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={area.color} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={area.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" hide />
              <YAxis hide domain={[0, 100]} />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <ChartTooltipContent
                      className="bg-white p-2 shadow-md rounded-md border"
                      payload={payload}
                    />
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={area.color}
                fill={`url(#gradient-${data.areaKey})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs mt-4">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
            <span className="text-muted-foreground">Goals</span>
            <span className="font-medium">
              {data.completedGoals}/{data.completedGoals + data.pendingGoals}
            </span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
            <span className="text-muted-foreground">Habits</span>
            <span className="font-medium">{data.activeHabits}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
            <span className="text-muted-foreground">Streak</span>
            <span className="font-medium">12d</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
