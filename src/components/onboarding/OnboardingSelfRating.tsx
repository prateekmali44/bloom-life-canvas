
import React from "react";
import { OnboardingData } from "./OnboardingLayout";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";

interface OnboardingSelfRatingProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onComplete: () => void;
}

interface RatingDimension {
  key: keyof OnboardingData['selfRatings'];
  label: string;
  description: string;
  color: string;
}

export const OnboardingSelfRating: React.FC<OnboardingSelfRatingProps> = ({ data, updateData }) => {
  const dimensions: RatingDimension[] = [
    {
      key: "professional",
      label: "Professional",
      description: "Career, work relationships, skills",
      color: "bg-hazel-300",
    },
    {
      key: "health",
      label: "Health & Fitness",
      description: "Physical wellbeing, exercise, nutrition",
      color: "bg-lavender-300",
    },
    {
      key: "financial",
      label: "Financial",
      description: "Income, savings, investments, security",
      color: "bg-hazel-300",
    },
    {
      key: "educational",
      label: "Educational & Learning",
      description: "Knowledge acquisition, skills development",
      color: "bg-lavender-300",
    },
    {
      key: "spiritual",
      label: "Spiritual & Emotional",
      description: "Inner peace, emotional balance, meaning",
      color: "bg-hazel-300",
    },
    {
      key: "personal",
      label: "Life Progression",
      description: "Personal relationships, hobbies, balance",
      color: "bg-lavender-300",
    },
  ];

  const handleRatingChange = (dimension: keyof OnboardingData['selfRatings'], value: number[]) => {
    updateData({
      selfRatings: {
        ...data.selfRatings,
        [dimension]: value[0]
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Rate Your Life Dimensions</h2>
        <p className="text-muted-foreground mb-2">
          How satisfied are you with each area of your life right now?
        </p>
        <div className="flex items-center justify-center gap-2 text-sm">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Slide each dimension from 1 (needs work) to 10 (excellent)</span>
        </div>
      </div>
      
      <div className="space-y-8">
        {dimensions.map((dimension) => (
          <div key={dimension.key} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label className="text-base font-medium">{dimension.label}</Label>
                <span className="text-lg font-bold">{data.selfRatings[dimension.key]}</span>
              </div>
              <p className="text-sm text-muted-foreground">{dimension.description}</p>
            </div>
            
            <div className="px-2">
              <Slider
                value={[data.selfRatings[dimension.key]]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => handleRatingChange(dimension.key, value)}
                className="w-full"
              />
              
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Needs Improvement</span>
                <span>Excellent</span>
              </div>
            </div>
            
            <div 
              className={`h-1 mt-1 rounded-full ${dimension.color}`} 
              style={{ width: `${data.selfRatings[dimension.key] * 10}%` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
