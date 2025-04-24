
/**
 * App deployment utilities
 * Used to help with the deployment and mobile app building process
 */

import { toast } from "@/components/ui/use-toast";
import { Capacitor } from '@capacitor/core';

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
 * Check if the app is running on a mobile device
 * @returns {boolean} true if the app is running on a mobile device
 */
export const isMobileDevice = () => {
  return Capacitor.isNativePlatform();
};

/**
 * Get the platform information
 * @returns {string} 'android', 'ios', or 'web'
 */
export const getPlatform = () => {
  if (!Capacitor.isPluginAvailable('Device')) {
    return 'web';
  }
  return Capacitor.getPlatform();
};

/**
 * Apply mobile-specific styling to the app
 * This is called on app initialization to adapt the UI for mobile
 */
export const applyMobileSpecificStyling = () => {
  if (isMobileDevice()) {
    const rootElement = document.documentElement;
    
    // Add a CSS class to the root element to allow mobile-specific styling
    rootElement.classList.add('mobile-device');
    
    // Apply platform-specific class
    const platform = getPlatform();
    rootElement.classList.add(`platform-${platform}`);
    
    // Adjust viewport for mobile
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 
        'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no');
    }
    
    console.log(`Applied mobile styling for ${platform} platform`);
    return true;
  }
  
  return false;
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
  const isMobileApp = Capacitor.isNativePlatform() || 
                      document.URL.includes('capacitor://') || 
                      document.URL.includes('localhost') ||
                      document.URL.includes('ionic://');
                      
  console.log(`Running in ${isMobileApp ? 'mobile app' : 'web browser'} context`);
  
  const deviceInfo = {
    isMobileApp,
    platform: isMobileApp ? getPlatform() : 'web',
    userAgent: navigator.userAgent,
    isNative: Capacitor.isNativePlatform(),
    webViewVersion: Capacitor.getPlatform() === 'android' ? 
      navigator.userAgent.match(/Chrome\/([0-9.]+)/)?.[1] : 
      navigator.userAgent.match(/AppleWebKit\/([0-9.]+)/)?.[1]
  };
  
  console.log("Device info:", deviceInfo);
  return deviceInfo;
};
