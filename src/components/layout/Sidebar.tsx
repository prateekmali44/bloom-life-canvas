
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart4, 
  Briefcase, 
  Compass, 
  Database, 
  DollarSign, 
  FilePlus, 
  GraduationCap, 
  Heart, 
  Home, 
  ListTodo, 
  Settings, 
  UserCircle 
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const SidebarLink = ({ to, icon: Icon, label }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-white"
          : "text-gray-700 hover:bg-secondary hover:text-primary"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  return (
    <div className="hidden md:flex bg-white border-r border-border h-screen w-64 flex-col overflow-y-auto custom-scrollbar">
      <div className="px-6 py-5 border-b border-border flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white font-semibold text-lg">R</span>
        </div>
        <h1 className="font-bold text-xl text-primary">Reservoir</h1>
      </div>

      <div className="p-2 flex-1 space-y-1">
        <SidebarLink to="/" icon={Home} label="Dashboard" />
        <SidebarLink to="/goals" icon={Compass} label="Goals" />
        <SidebarLink to="/habits" icon={ListTodo} label="Habits" />
        <SidebarLink to="/journal" icon={FilePlus} label="Journal" />
        <SidebarLink to="/vision" icon={BarChart4} label="Vision Board" />
        <SidebarLink to="/resources" icon={Database} label="Resources" />
        
        <div className="pt-4 pb-2">
          <p className="px-3 text-xs font-medium text-gray-500 uppercase">Life Areas</p>
        </div>
        
        <SidebarLink to="/professional" icon={Briefcase} label="Professional" />
        <SidebarLink to="/health" icon={Heart} label="Health & Fitness" />
        <SidebarLink to="/financial" icon={DollarSign} label="Financial" />
        <SidebarLink to="/educational" icon={GraduationCap} label="Educational" />
        <SidebarLink to="/spiritual" icon={UserCircle} label="Spiritual" />
        <SidebarLink to="/personal" icon={Compass} label="Personal Growth" />
      </div>

      <div className="p-2 border-t border-border">
        <SidebarLink to="/settings" icon={Settings} label="Settings" />
      </div>
    </div>
  );
};
