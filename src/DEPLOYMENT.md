
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
  - For iOS: Xcode (macOS only)
  - For Android: Android Studio
  - Node.js v16+ and npm

### 1. Build the Web App First
```bash
npm run build
```

### 2. Verify Capacitor Configuration
Ensure your `capacitor.config.json` file exists and is configured correctly with:
- Proper appId and appName
- Correct webDir ("dist")
- Any required plugins

### 3. Add Platforms (if not already added)
```bash
# For iOS
npx cap add ios

# For Android
npx cap add android
```

### 4. Sync Web Code to Mobile Projects
```bash
npx cap sync
```

This crucial step copies your built web assets to the native platforms.

### 5. Open in Native IDEs

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

### 6. Building for Production

#### iOS
1. In Xcode, select Product > Archive
2. Follow the steps to upload to App Store Connect or export for distribution

#### Android
1. In Android Studio, select Build > Generate Signed Bundle/APK
2. Choose whether to build an APK or App Bundle
3. Follow the steps to sign your app
4. Upload the resulting file to Google Play Console

## Troubleshooting Mobile Deployment

If you encounter issues with mobile deployment:

1. **Web Build Issues**: 
   - Ensure your web build is successful and the `dist` directory exists
   - Check console for any build errors

2. **Sync Issues**:
   - After any changes to the web code, always run `npm run build` followed by `npx cap sync`
   - If changes aren't appearing, try cleaning the Capacitor cache with `npx cap clean android` or `npx cap clean ios`

3. **Android-Specific Issues**:
   - Verify that the minimum SDK version is set correctly in your config (22 or higher recommended)
   - Make sure you have the latest Android SDK tools installed
   - If you encounter WebView issues, update your device's Android System WebView app from the Play Store

4. **iOS-Specific Issues**:
   - Ensure you have a valid development team set in Xcode
   - iOS requires a physical device to test certain features like notifications

5. **App Not Working Correctly on Device**:
   - Enable Chrome remote debugging for Android or Safari Web Inspector for iOS to view console logs
   - Check that all required plugins are installed and configured correctly
   - Verify network connectivity if the app requires internet access

6. **Capacitor Plugin Issues**:
   - If using native plugins (like camera), ensure they are properly installed and configured
   - Run `npx cap doctor` to check for common issues with your setup

### Common Android Commands
```bash
# Build and run on Android
npx cap run android

# Live reload for development (requires capacitor-live-reload plugin)
npx cap run android --livereload --external

# Build a release APK
cd android && ./gradlew assembleRelease
```

### Common iOS Commands
```bash
# Build and run on iOS
npx cap run ios

# Specify a device
npx cap run ios --target="iPhone 14 Pro"
```

## Accessing the Deployed App

### Web Version
- Access via the URL provided by your hosting platform
- If using Lovable's publishing, access via the Lovable subdomain

### Mobile Version
- Install from App Store or Google Play (once published)
- During development, install directly from Xcode or Android Studio to your device
