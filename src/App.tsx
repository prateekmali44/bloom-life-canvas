
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
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if the user has completed onboarding
    const completed = localStorage.getItem("onboardingCompleted") === "true";
    setOnboardingCompleted(completed);
  }, []);
  
  // Show loading state until we've checked onboarding status
  if (onboardingCompleted === null) {
    return (
      <div className="h-screen flex items-center justify-center bg-hazel-50">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
