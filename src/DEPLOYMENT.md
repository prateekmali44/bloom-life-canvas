
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
  - Node.js v14+ and npm

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

1. Ensure your web build is successful and the `dist` directory exists
2. Run `npx cap sync` after any changes to the web code
3. Check that all required Capacitor plugins are installed
4. For Android, verify that the minimum SDK version is set correctly in your config
5. For iOS, make sure you have a valid development team set in Xcode

## Accessing the Deployed App

### Web Version
- Access via the URL provided by your hosting platform
- If using Lovable's publishing, access via the Lovable subdomain

### Mobile Version
- Install from App Store or Google Play (once published)
- During development, install directly from Xcode or Android Studio to your device

## Troubleshooting

If you encounter issues:
1. Make sure all dependencies are installed (`npm install`)
2. Verify the build was successful before syncing to mobile
3. Check Capacitor logs for any errors
4. For platform-specific issues, refer to the respective IDE's error messages
5. Check the console logs for initialization messages from the app

