
import React from "react";
import { lifeAreas } from "@/services/mockData";
import { LifeAreaKey } from "@/types";
import { Briefcase, Compass, DollarSign, GraduationCap, Heart, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AreaFilterProps {
  selectedAreas: string[];
  setSelectedAreas: (areas: string[]) => void;
}

// Map of area keys to icons
const areaIcons = {
  professional: Briefcase,
  health: Heart,
  financial: DollarSign,
  educational: GraduationCap,
  spiritual: UserCircle,
  personal: Compass,
};

export const AreaFilter: React.FC<AreaFilterProps> = ({
  selectedAreas,
  setSelectedAreas,
}) => {
  const toggleArea = (areaKey: string) => {
    if (selectedAreas.includes(areaKey)) {
      setSelectedAreas(selectedAreas.filter((area) => area !== areaKey));
    } else {
      setSelectedAreas([...selectedAreas, areaKey]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(lifeAreas).map((area) => {
        const isSelected = selectedAreas.includes(area.key);
        const AreaIcon = areaIcons[area.key as LifeAreaKey];
        
        return (
          <button
            key={area.key}
            onClick={() => toggleArea(area.key)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium flex items-center gap-1.5 transition-colors",
              isSelected 
                ? `text-white bg-${area.key}`
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
            style={isSelected ? { backgroundColor: area.color } : {}}
          >
            <AreaIcon className="h-4 w-4" />
            <span>{area.name}</span>
          </button>
        );
      })}
    </div>
  );
};
