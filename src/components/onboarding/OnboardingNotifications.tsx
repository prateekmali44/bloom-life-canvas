
import React from "react";
import { OnboardingData } from "./OnboardingLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Bell, Clock } from "lucide-react";

interface OnboardingNotificationsProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onComplete: () => void;
}

export const OnboardingNotifications: React.FC<OnboardingNotificationsProps> = ({ data, updateData }) => {
  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Notification Preferences</h2>
        <p className="text-muted-foreground">
          Set when you'd like to receive reminders and check-ins
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Daily Check-in */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <Label className="text-lg font-medium">Daily Check-in Time</Label>
          </div>
          
          <p className="text-sm text-muted-foreground">
            When would you like to receive your daily habit reminders?
          </p>
          
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="time"
              value={data.notificationTime}
              onChange={(e) => updateData({ notificationTime: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Weekly Review */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <Label className="text-lg font-medium">Weekly Review Day</Label>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Which day would you prefer for your weekly reflection and planning?
          </p>
          
          <RadioGroup
            value={data.weeklyReview}
            onValueChange={(value) => updateData({ weeklyReview: value })}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent">
              <RadioGroupItem value="sunday" id="sunday" />
              <Label htmlFor="sunday" className="cursor-pointer w-full">Sunday</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent">
              <RadioGroupItem value="monday" id="monday" />
              <Label htmlFor="monday" className="cursor-pointer w-full">Monday</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent">
              <RadioGroupItem value="friday" id="friday" />
              <Label htmlFor="friday" className="cursor-pointer w-full">Friday</Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent">
              <RadioGroupItem value="saturday" id="saturday" />
              <Label htmlFor="saturday" className="cursor-pointer w-full">Saturday</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-lavender-50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          You can always change these settings later in your profile preferences.
        </p>
      </div>
    </div>
  );
};
