
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPin, User } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { timezones } from "@/utils/timezones";
import { OnboardingData } from "./OnboardingLayout";

interface OnboardingProfileProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onComplete: () => void;
}

export const OnboardingProfile: React.FC<OnboardingProfileProps> = ({ data, updateData }) => {
  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
        <p className="text-muted-foreground">
          Your basic information helps personalize your experience
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <div className="relative">
            <Input
              id="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
              className="pl-10"
            />
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        {/* Age Field */}
        <div className="space-y-2">
          <Label htmlFor="age">Your Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={data.age || ""}
            onChange={(e) => updateData({ age: parseInt(e.target.value) || null })}
          />
        </div>
        
        {/* Birthday Field */}
        <div className="space-y-2">
          <Label htmlFor="birthday">Your Birthday</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.birthday ? format(data.birthday, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.birthday || undefined}
                onSelect={(date) => updateData({ birthday: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Location Field */}
        <div className="space-y-2">
          <Label htmlFor="location">Your Location</Label>
          <div className="relative">
            <Input
              id="location"
              placeholder="City, Country"
              value={data.location}
              onChange={(e) => updateData({ location: e.target.value })}
              className="pl-10"
            />
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        {/* Timezone Field */}
        <div className="space-y-2">
          <Label htmlFor="timezone">Your Timezone</Label>
          <Select 
            value={data.timezone} 
            onValueChange={(value) => updateData({ timezone: value })}
          >
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {[
                "America/New_York",
                "America/Chicago",
                "America/Denver",
                "America/Los_Angeles",
                "Europe/London",
                "Europe/Paris",
                "Asia/Tokyo",
                "Asia/Kolkata",
                "Australia/Sydney",
                "Pacific/Auckland"
              ].map((zone) => (
                <SelectItem key={zone} value={zone}>
                  {zone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
