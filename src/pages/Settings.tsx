
import React, { useEffect, useState } from "react";
import { ModuleSelection } from "@/components/shared/ModuleSelection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { LifeModule, ModulesData } from "@/types/modules";
import { Settings as SettingsIcon, Save } from "lucide-react";

const Settings = () => {
  const [userData, setUserData] = useState<any>(null);
  const [selectedModules, setSelectedModules] = useState<LifeModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      
      // Extract enabled modules
      const enabledModules = Object.keys(parsedData.enabledModules || {})
        .filter(key => parsedData.enabledModules[key].enabled) as LifeModule[];
      
      setSelectedModules(enabledModules);
    }
    setIsLoading(false);
  }, []);

  const handleModuleChange = (modules: LifeModule[]) => {
    setSelectedModules(modules);
  };

  const handleSaveModules = () => {
    if (!userData) return;

    // Create updated modules data structure
    const updatedModulesData: ModulesData = {};
    
    // Preserve existing module data if it exists
    Object.keys(userData.enabledModules || {}).forEach(moduleId => {
      const isEnabled = selectedModules.includes(moduleId as LifeModule);
      updatedModulesData[moduleId] = {
        ...userData.enabledModules[moduleId],
        enabled: isEnabled
      };
    });
    
    // Add any newly enabled modules
    selectedModules.forEach(moduleId => {
      if (!updatedModulesData[moduleId]) {
        updatedModulesData[moduleId] = {
          enabled: true,
          onboarded: false
        };
      }
    });

    // Update user data
    const updatedUserData = {
      ...userData,
      enabledModules: updatedModulesData
    };
    
    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
    
    // Show success message
    toast({
      title: "Settings saved",
      description: "Your module preferences have been updated successfully.",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and application settings</p>
        </div>
      </div>
      
      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="modules">Life Modules</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="modules">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Life Modules
              </CardTitle>
              <CardDescription>
                Customize which life dimensions you want to focus on. Disabled modules will preserve your data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ModuleSelection 
                selectedModules={selectedModules}
                onChange={handleModuleChange}
              />
              
              <div className="pt-4 border-t">
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveModules}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your personal information and profile settings
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <p className="text-muted-foreground">Profile settings coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <p className="text-muted-foreground">Notification settings coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
