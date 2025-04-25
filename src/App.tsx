
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { OnboardingLayout } from "./components/onboarding/OnboardingLayout";
import Index from "./pages/Index";
import Goals from "./pages/Goals";
import Habits from "./pages/Habits";
import Journal from "./pages/Journal";
import Vision from "./pages/Vision";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { 
  initializeAppData, 
  verifyCapacitorConfig,
  applyMobileSpecificStyling
} from "./lib/appDeployer";

// Import module pages
import Professional from "./pages/modules/Professional";
import Health from "./pages/modules/Health";
import Financial from "./pages/modules/Financial";
import Educational from "./pages/modules/Educational";
import Spiritual from "./pages/modules/Spiritual";
import Personal from "./pages/modules/Personal";

// Import data manager
import { dataStore } from "./lib/dataManager";

const queryClient = new QueryClient();

const App = () => {
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);
  const [appInitialized, setAppInitialized] = useState(false);
  
  useEffect(() => {
    // Initialize app for mobile if applicable
    applyMobileSpecificStyling();
    
    // Initialize app data if needed
    initializeAppData();
    
    // Initialize data store
    dataStore.initializeDataStore();
    
    // Add sample data for development (comment out in production)
    // dataStore.addSampleData();
    
    // Verify Capacitor configuration for debugging
    const configInfo = verifyCapacitorConfig();
    console.log("App environment info:", configInfo);
    
    // Check if the user has completed onboarding
    const completed = localStorage.getItem("onboardingCompleted") === "true";
    setOnboardingCompleted(completed);
    setAppInitialized(true);
    
    console.log("App initialized, onboarding status:", completed);
  }, []);
  
  // Show loading state until we've checked onboarding status
  if (onboardingCompleted === null || !appInitialized) {
    return (
      <div className="h-screen flex items-center justify-center bg-hazel-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading your life canvas...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect to onboarding if not completed */}
            {!onboardingCompleted && (
              <>
                <Route path="/onboarding" element={<OnboardingLayout />} />
                <Route path="*" element={<Navigate to="/onboarding" replace />} />
              </>
            )}
            
            {/* Normal app routes if onboarding completed */}
            {onboardingCompleted && (
              <>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Index />} />
                  <Route path="goals" element={<Goals />} />
                  <Route path="habits" element={<Habits />} />
                  <Route path="journal" element={<Journal />} />
                  <Route path="vision" element={<Vision />} />
                  <Route path="resources" element={<Resources />} />
                  <Route path="settings" element={<Settings />} />
                  
                  {/* Module routes */}
                  <Route path="professional" element={<Professional />} />
                  <Route path="health" element={<Health />} />
                  <Route path="financial" element={<Financial />} />
                  <Route path="educational" element={<Educational />} />
                  <Route path="spiritual" element={<Spiritual />} />
                  <Route path="personal" element={<Personal />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
