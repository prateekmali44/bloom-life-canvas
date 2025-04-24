
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
