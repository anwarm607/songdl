# SongDL

A React Native application for downloading and managing songs.

# Demo
https://github.com/user-attachments/assets/a1b47e16-1904-4f72-918b-053c8b4908d7

## Prerequisites

Before running the app, ensure you have the following installed:

- **Node.js** (>= 20) - [Download](https://nodejs.org/)
- **Yarn** (v1.22.22) - Package manager
- **React Native CLI** - Development environment
- **Xcode** (for iOS development on macOS) - [Download from App Store](https://apps.apple.com/us/app/xcode/id497799835)
- **Android Studio** (for Android development) - [Download](https://developer.android.com/studio)
- **CocoaPods** (for iOS dependencies) - Installed via Ruby bundler

### Environment Setup

1. **Install React Native dependencies:**
   ```sh
   npm install -g react-native-cli
   ```

2. **For iOS (macOS only):**
   - Install Xcode from the App Store
   - Install Xcode Command Line Tools:
     ```sh
     xcode-select --install
     ```
   - Install CocoaPods:
     ```sh
     sudo gem install cocoapods
     ```

3. **For Android:**
   - Install Android Studio
   - Set up Android SDK and environment variables
   - Create an Android Virtual Device (AVD) or connect a physical device

## Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd SongDL
   ```

2. **Install dependencies:**
   ```sh
   yarn install
   ```

3. **Install iOS dependencies (macOS only):**
   ```sh
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

## Running the App

### Start Metro Bundler

In the root directory, start the Metro bundler:

```sh
yarn start
```

Keep this terminal window open. Metro will automatically reload when you make changes to your code.

### Run on iOS

**First time setup:**
```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

**Run the app:**
```sh
yarn ios
```

This will:
- Build the iOS app
- Launch the iOS Simulator
- Install and run the app

**Note:** Make sure you have an iOS Simulator available or a physical iOS device connected.

### Run on Android

**Prerequisites:**
- Android Studio installed
- Android SDK configured
- An Android emulator running or a physical device connected with USB debugging enabled

**Run the app:**
```sh
yarn android
```

This will:
- Build the Android app
- Install it on the connected device/emulator
- Launch the app

**Note:** Make sure your Android emulator is running or a device is connected before running this command.

## Development Tips

### Fast Refresh

The app supports Fast Refresh, which means changes you make to the code will automatically appear in the app without needing to manually reload.

### Manual Reload

If you need to manually reload the app:

- **Android:**
  - Press `R` twice in the Metro terminal, or
  - Press `Ctrl + M` (Windows/Linux) or `Cmd + M` (macOS) to open Dev Menu, then select "Reload"

- **iOS:**
  - Press `Cmd + R` in the iOS Simulator, or
  - Shake the device and select "Reload"

### Debugging

- **React Native Debugger:** Use React Native Debugger or Chrome DevTools
- **Reactotron:** The app includes Reactotron for debugging (only in development mode)

## Troubleshooting

### Common Issues

1. **Metro bundler cache issues:**
   ```sh
   yarn start --reset-cache
   ```

2. **iOS build issues:**
   ```sh
   cd ios
   rm -rf Pods Podfile.lock
   bundle exec pod install
   cd ..
   ```

3. **Android build issues:**
   ```sh
   cd android
   ./gradlew clean
   cd ..
   ```

4. **Node modules issues:**
   ```sh
   rm -rf node_modules
   yarn install
   ```

5. **iOS Simulator not launching:**
   - Open Xcode → Preferences → Locations → Command Line Tools
   - Ensure the correct Xcode version is selected

6. **Android emulator not found:**
   - Open Android Studio
   - Go to Tools → Device Manager
   - Create a new virtual device or start an existing one

### Clearing All Caches

If you're experiencing persistent issues:

```sh
# Clear Metro cache
yarn start --reset-cache

# Clear watchman (if installed)
watchman watch-del-all

# Clear node modules and reinstall
rm -rf node_modules
yarn install

# For iOS
cd ios
rm -rf Pods Podfile.lock build
bundle exec pod install
cd ..

# For Android
cd android
./gradlew clean
cd ..
```

## Project Structure

```
SongDL/
├── __tests__/                 # Test files
│   └── App.test.tsx          # Main app test
│
├── android/                   # Android native code
│   ├── app/                  # Android app module
│   │   ├── src/              # Android source files
│   │   └── build.gradle      # Android build configuration
│   ├── build.gradle          # Root Android build config
│   ├── gradle/               # Gradle wrapper files
│   └── settings.gradle       # Gradle settings
│
├── ios/                      # iOS native code
│   ├── Pods/                 # CocoaPods dependencies
│   ├── SongDL/               # iOS app source
│   │   ├── AppDelegate.swift # iOS app delegate
│   │   └── Info.plist        # iOS app configuration
│   ├── Podfile               # CocoaPods dependencies file
│   └── SongDL.xcworkspace    # Xcode workspace
│
├── src/                      # Main application source code
│   ├── assets/               # Static assets
│   │   └── icons/            # SVG icon components
│   │       ├── BackIcon.tsx
│   │       ├── DownloadIcon.tsx
│   │       └── FolderIcon.tsx
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Button/           # Button component
│   │   │   ├── Button.tsx
│   │   │   ├── constants.ts
│   │   │   ├── index.ts
│   │   │   └── styles.ts
│   │   ├── Card/             # Card component
│   │   │   ├── Card.tsx
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── DownloadButton/   # Download button component
│   │   │   ├── DownloadButton.tsx
│   │   │   ├── index.ts
│   │   │   └── styles.ts
│   │   ├── Row/              # Row layout component
│   │   │   ├── Row.tsx
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── SongCard/         # Song card component
│   │   │   ├── SongCard.tsx
│   │   │   ├── index.ts
│   │   │   └── styles.ts
│   │   └── Text/             # Text component
│   │       ├── Text.tsx
│   │       └── index.ts
│   │
│   ├── config/               # Configuration files
│   │   ├── api.ts            # API endpoints configuration
│   │   └── queryClient.ts    # React Query client setup
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── queries/          # React Query hooks
│   │   │   ├── useGetAllSongs.ts
│   │   │   └── useGetSongById.ts
│   │   ├── useDownloadSong.ts # Download functionality hook
│   │   ├── useTheme.ts       # Theme management hook
│   │   └── index.ts          # Hooks barrel export
│   │
│   ├── navigation/           # Navigation configuration
│   │   ├── RootNavigator.tsx # Main navigation setup
│   │   ├── InitialNavHeader.tsx # Initial screen header
│   │   ├── styles.ts         # Navigation styles
│   │   ├── types.ts          # Navigation type definitions
│   │   └── index.ts          # Navigation exports
│   │
│   ├── screens/              # Screen components
│   │   ├── SongsList/        # Songs list screen
│   │   │   ├── SongListScreen.tsx
│   │   │   ├── styles.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── SongDetailsScreen/ # Song details screen
│   │   │   ├── SongDetailsScreen.tsx
│   │   │   └── styles.ts
│   │   └── index.ts          # Screens barrel export
│   │
│   ├── shared/               # Shared utilities and constants
│   │   ├── constants/        # Shared constants
│   │   │   └── ui.ts         # UI constants
│   │   ├── types/            # Shared type definitions
│   │   │   └── icon.ts       # Icon type definitions
│   │   └── utils/            # Utility functions
│   │       ├── convertRgba.ts # RGBA color conversion
│   │       ├── downloadManager.ts # Download management
│   │       └── duration.ts   # Duration formatting
│   │
│   ├── store/                # State management (Zustand)
│   │   ├── slices/           # State slices
│   │   │   ├── downloadSlice.ts # Download state management
│   │   │   └── themeSlice.ts # Theme state management
│   │   ├── types.ts          # Store type definitions
│   │   └── index.ts          # Store exports
│   │
│   └── theme/                # Theme configuration
│       ├── colors.ts         # Color definitions
│       ├── typography.ts     # Typography definitions
│       ├── theme.ts          # Theme object
│       └── index.ts          # Theme exports
│
├── App.tsx                   # Root application component
├── index.js                  # Application entry point
├── app.json                  # App configuration
├── babel.config.js           # Babel configuration
├── metro.config.js           # Metro bundler configuration
├── jest.config.js            # Jest test configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Node.js dependencies and scripts
├── yarn.lock                 # Yarn lock file
├── Gemfile                   # Ruby dependencies (for CocoaPods)
├── Gemfile.lock              # Ruby lock file
└── ReactotronConfig.js       # Reactotron debugging configuration
```

## Key Technologies

- **React Native** (0.82.1) - Mobile framework
- **TypeScript** - Type safety
- **React Navigation** - Navigation library
- **Zustand** - State management
- **React Query (TanStack Query)** - Data fetching and caching
- **Axios** - HTTP client
- **React Native Fast Image** - Optimized image loading
- **React Native Blob Util** - File download management
- **React Native Permissions** - Permission handling

## Scripts

- `yarn start` - Start Metro bundler
- `yarn android` - Run on Android
- `yarn ios` - Run on iOS
- `yarn test` - Run tests
- `yarn lint` - Run ESLint
