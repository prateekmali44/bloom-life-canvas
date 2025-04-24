
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.02ce2bd625854b8b8d590a5d38d12e3d',
  appName: 'bloom-life-canvas',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  android: {
    buildOptions: {
      gradleArgs: ['-PcdvMinSdkVersion=22']
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    }
  }
};

export default config;
