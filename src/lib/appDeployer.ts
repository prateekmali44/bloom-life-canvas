
/**
 * App deployment utilities
 * Used to help with the deployment and mobile app building process
 */

import { toast } from "@/components/ui/use-toast";

/**
 * Initialize the app with required local storage data
 * This ensures the app can run properly when first loaded
 */
export const initializeAppData = () => {
  // Check if user data exists in local storage
  if (!localStorage.getItem("userData")) {
    console.log("Initializing default user data...");
    
    // Create default user data
    const defaultUserData = {
      onboardingCompleted: true, // Skip onboarding for testing
      enabledModules: {
        professional: { enabled: true, onboarded: true },
        health: { enabled: false, onboarded: false },
        financial: { enabled: false, onboarded: false },
        educational: { enabled: false, onboarded: false },
        spiritual: { enabled: false, onboarded: false },
        personal: { enabled: false, onboarded: false },
      }
    };
    
    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(defaultUserData));
    localStorage.setItem("onboardingCompleted", "true");
    
    console.log("User data initialized successfully");
    return true; // Initialization performed
  }
  
  console.log("User data already exists, no initialization needed");
  return false; // No initialization needed
};

/**
 * Quick setup function for development and testing
 */
export const setupDevEnvironment = () => {
  const initialized = initializeAppData();
  
  if (initialized) {
    toast({
      title: "Development environment initialized",
      description: "Default user data has been created for testing.",
    });
    console.log("Development environment initialized successfully");
  }
  
  return initialized;
};

/**
 * Helper function to verify Capacitor configuration
 * Useful for debugging mobile deployment issues
 */
export const verifyCapacitorConfig = () => {
  console.log("Verifying Capacitor configuration...");
  
  // Check if running in web or mobile context
  const isMobileApp = document.URL.includes('capacitor://') || 
                      document.URL.includes('localhost') ||
                      document.URL.includes('ionic://');
                      
  console.log(`Running in ${isMobileApp ? 'mobile app' : 'web browser'} context`);
  
  return {
    isMobileApp,
    platform: isMobileApp ? 'mobile' : 'web',
    userAgent: navigator.userAgent
  };
};

