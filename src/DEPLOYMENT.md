
# Deployment Instructions for Bloom Life Canvas

## Web App Deployment

### 1. Build the Web App
```bash
npm run build
```

This creates a `dist` folder with your built application.

### 2. Deploy to Web

#### Option A: Deploy with Lovable
1. Click on "Share" in the top right corner of the Lovable interface
2. Click "Publish"
3. Your app will be deployed to a Lovable subdomain

#### Option B: Deploy to any static hosting
Upload the contents of the `dist` folder to any static hosting provider like:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

## Mobile App Deployment

### Prerequisites
- Make sure you have installed:
  - For iOS: Xcode 14+ (macOS only)
  - For Android: Android Studio with Android SDK 31+
  - Node.js v16+ and npm

### Required Dependencies
Ensure your project has these dependencies:
```bash
npm install @capacitor/core @capacitor/ios @capacitor/android @ionic/pwa-elements
npm install -D @capacitor/cli
```

### 1. Build the Web App First
```bash
npm run build
```

### 2. Add Platforms (if not already added)
```bash
# For iOS
npx cap add ios

# For Android
npx cap add android
```

### 3. Sync Web Code to Mobile Projects
```bash
npx cap sync
```

This crucial step copies your built web assets to the native platforms.

### 4. Open in Native IDEs

#### For iOS (macOS only)
```bash
npx cap open ios
```
This will open the project in Xcode where you can build and run on simulators or real devices.

#### For Android
```bash
npx cap open android
```
This will open the project in Android Studio where you can build and run on emulators or real devices.

### 5. Building for Production

#### iOS
1. In Xcode, select Product > Archive
2. Follow the steps to upload to App Store Connect or export for distribution

#### Android
1. In Android Studio, select Build > Generate Signed Bundle/APK
2. Choose whether to build an APK or App Bundle
3. Follow the steps to sign your app
4. Upload the resulting file to Google Play Console

## Mobile-Specific Features

Our app leverages several Capacitor plugins to enhance the mobile experience:

1. **Storage**: Data is persisted using localStorage, optimized for mobile devices
2. **Notifications**: Local notifications for reminders and alerts
3. **Splash Screen**: Customized app loading experience
4. **Mobile UI Optimization**: Touch-friendly interfaces and adaptive layouts

## Troubleshooting Mobile Deployment

If you encounter issues with mobile deployment:

### General Issues

1. **Web Build Issues**: 
   - Ensure your web build is successful and the `dist` directory exists
   - Check console for any build errors

2. **Sync Issues**:
   - After any changes to the web code, always run `npm run build` followed by `npx cap sync`
   - If changes aren't appearing, try cleaning the Capacitor cache with `npx cap clean android` or `npx cap clean ios`

3. **Build Errors**:
   - Make sure all dependencies are correctly installed
   - Look for syntax errors in your code
   - Check that all imports are correct

### Android-Specific Issues

1. **SDK Issues**:
   - Verify that the minimum SDK version is set correctly in your config (22 or higher recommended)
   - Make sure you have the latest Android SDK tools installed

2. **WebView Issues**:
   - If you encounter WebView issues, update your device's Android System WebView app from the Play Store
   - For development devices, enable USB debugging and development options

3. **Performance Issues**:
   - Use Android Studio's profiler to identify performance bottlenecks
   - Consider enabling hardware acceleration in WebView

### iOS-Specific Issues

1. **Certificate Issues**:
   - Ensure you have a valid development team set in Xcode
   - Check that your Apple Developer account has the necessary certificates and profiles

2. **Simulator Issues**:
   - Clear the simulator by selecting Simulator > Reset Content and Settings
   - Ensure you're using a compatible iOS version

3. **Device Testing**:
   - iOS requires a physical device to test certain features like notifications
   - Make sure your device is properly registered in your Apple Developer account

### Data and Storage Issues

1. **Data Not Persisting**:
   - Check that localStorage is being used correctly
   - Verify that the app has proper permissions
   - Test with small amounts of data first

2. **App Crashes on Startup**:
   - Clear app data and cache
   - Uninstall and reinstall the app
   - Check for initialization errors in the console

## Performance Optimization for Mobile

1. **Reduce Bundle Size**:
   - Use code splitting to load only necessary components
   - Optimize images and media files

2. **Optimize Rendering**:
   - Minimize DOM operations
   - Use efficient list rendering with virtualization for long lists

3. **Handle Network Conditions**:
   - Implement offline support
   - Add retry mechanisms for network requests

## Testing on Physical Devices

1. Connect your device via USB
2. Enable developer options and USB debugging (Android) or trust your computer (iOS)
3. Run the app directly to your device:

```bash
# For Android
npx cap run android

# For iOS
npx cap run ios
```

## App Updates Process

1. **Make code changes** to your application
2. **Build the web application**: `npm run build`
3. **Sync with Capacitor**: `npx cap sync`
4. **Test thoroughly** on both web and mobile platforms
5. **Deploy** the web version to your hosting platform
6. **Submit mobile app updates** to respective app stores

Remember to increment your version numbers in both `package.json` and platform-specific configuration files before submitting updates.
