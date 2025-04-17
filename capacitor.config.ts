
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.02ce2bd625854b8b8d590a5d38d12e3d',
  appName: 'bloom-life-canvas',
  webDir: 'dist',
  server: {
    url: 'https://02ce2bd6-2585-4b8b-8d59-0a5d38d12e3d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      gradleArgs: ['-PcdvMinSdkVersion=22']
    }
  }
};

export default config;
