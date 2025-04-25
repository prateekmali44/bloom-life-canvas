
/**
 * App deployment utilities
 * Used to help with the deployment and mobile app building process
 */

import { toast } from "@/components/ui/use-toast";
import { Capacitor } from '@capacitor/core';
import { dataStore } from "./dataManager";

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
      name: "Demo User",
      email: "demo@example.com",
      enabledModules: {
        professional: { enabled: true, onboarded: true },
        health: { enabled: true, onboarded: true },
        financial: { enabled: true, onboarded: true },
        educational: { enabled: true, onboarded: true },
        spiritual: { enabled: false, onboarded: false },
        personal: { enabled: false, onboarded: false },
      }
    };
    
    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(defaultUserData));
    localStorage.setItem("onboardingCompleted", "true");
    
    // Initialize data store and add sample data for quick testing
    dataStore.initializeDataStore();
    dataStore.addSampleData();
    
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
    
    // Add mobile-specific CSS
    const style = document.createElement('style');
    style.innerHTML = `
      /* Mobile-specific styles */
      .mobile-device {
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Add some padding for iOS safe areas */
      .platform-ios {
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
      }
      
      /* Adjust buttons to be more touch-friendly */
      .mobile-device button {
        min-height: 44px;
      }
      
      /* Disable pull-to-refresh */
      html, body {
        overscroll-behavior-y: contain;
      }
    `;
    document.head.appendChild(style);
    
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
      navigator.userAgent.match(/AppleWebKit\/([0-9.]+)/)?.[1],
    isCapacitorInitialized: Capacitor.isPluginAvailable('App'),
    availablePlugins: {
      App: Capacitor.isPluginAvailable('App'),
      Device: Capacitor.isPluginAvailable('Device'),
      SplashScreen: Capacitor.isPluginAvailable('SplashScreen'),
      LocalNotifications: Capacitor.isPluginAvailable('LocalNotifications'),
    }
  };
  
  console.log("Device info:", deviceInfo);
  return deviceInfo;
};

/**
 * Check if the app needs to update local storage schema
 * This is used when app versions change storage structure
 */
export const checkAndUpdateStorageSchema = () => {
  const schemaVersion = localStorage.getItem('schemaVersion');
  const currentVersion = "1.0";
  
  if (schemaVersion !== currentVersion) {
    console.log(`Updating storage schema from ${schemaVersion || 'none'} to ${currentVersion}`);
    
    // Run any migration logic here
    
    localStorage.setItem('schemaVersion', currentVersion);
    return true;
  }
  
  return false;
};
