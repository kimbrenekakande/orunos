# Orunos Mobile

The official mobile application for Orunos — Your Academic Copilot. Access and manage your academic documents on the go with a native iOS and Android experience.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Navigation](#navigation)
- [State Management](#state-management)
- [Styling](#styling)
- [Troubleshooting](#troubleshooting)

---

## Overview

Orunos Mobile is a cross-platform mobile application built with Expo and React Native. It provides seamless access to the Orunos platform, allowing users to:

- View and manage academic documents
- Authenticate with the Orunos platform
- Access documents offline
- Sync with the web application
- Receive notifications (future)

The app shares authentication and API infrastructure with the web application, ensuring a consistent experience across all platforms.

---

## Features

### Current Features

- **User Authentication**
  - Email/password login and signup
  - Session persistence with secure storage
  - Biometric authentication support (future)

- **Document Management**
  - View all user documents
  - Document metadata and status
  - Real-time sync with server

- **Navigation**
  - Tab-based navigation (Expo Router)
  - Native stack navigation
  - Deep linking support

- **User Interface**
  - Dark/light mode support
  - Responsive design for phones and tablets
  - Native iOS and Android components
  - Gesture-based interactions

### Planned Features

- Document editing on mobile
- Offline document access
- Push notifications
- Document sharing
- Voice-to-text input
- PDF viewer
- Citation management

---

## Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Expo | 54.0.33 |
| **Navigation** | Expo Router | 6.0.23 |
| **UI Library** | React Native | 0.81.5 |
| **Styling** | Uniwind (Tailwind for RN) | Latest |
| **UI Components** | HeroUI Native | 1.0.0-rc.1 |
| **Authentication** | Better Auth Expo | 1.4.18 |
| **Secure Storage** | Expo SecureStore | 15.0.8 |
| **Navigation Library** | React Navigation | 7.x |
| **Gestures** | React Native Gesture Handler | 2.28.0 |
| **Animations** | React Native Reanimated | 4.1.1 |
| **Icons** | @expo/vector-icons | 15.0.3 |
| **Bottom Sheets** | @gorhom/bottom-sheet | 5.x |
| **HTTP Client** | Axios | 1.13.5 |
| **State Management** | React Context + Hooks | Built-in |

---

## Project Structure

```
apps/mobile/
├── app/                          # Expo Router app directory
│   ├── (auth)/                   # Auth stack (unauthenticated routes)
│   │   ├── _layout.tsx           # Auth layout
│   │   ├── login.tsx             # Login screen
│   │   └── signup.tsx            # Signup screen
│   ├── (tabs)/                   # Main tab navigation
│   │   ├── _layout.tsx           # Tab bar layout
│   │   ├── index.tsx             # Home screen (documents feed)
│   │   ├── documents.tsx         # Documents list
│   │   └── settings.tsx          # User settings
│   └── _layout.tsx               # Root layout with providers
│
├── components/                   # Reusable components
│   └── ui/                       # UI components
│       ├── icon-symbol.ios.tsx   # iOS-specific icons
│       └── icon-symbol.tsx       # Cross-platform icons
│
├── hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts       # System color scheme detection
│   ├── use-color-scheme.web.ts   # Web fallback
│   └── use-theme-color.ts        # Theme color utilities
│
├── lib/                          # Core libraries and utilities
│   ├── auth-client.ts            # Better Auth client configuration
│   ├── next-url.ts               # API base URL configuration
│   └── theme.ts                  # Theme and color definitions
│
├── scripts/                      # Build and utility scripts
│   └── reset-project.js          # Project reset script
│
├── assets/                       # Static assets
│   ├── images/                   # Images and icons
│   └── fonts/                    # Custom fonts (if any)
│
├── global.css                    # Global styles (Uniwind)
├── metro.config.js               # Metro bundler configuration
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
└── eslint.config.js              # ESLint configuration
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **Bun** 1.3.3+
- **Expo CLI** (optional, recommended)
- **Xcode** (for iOS development on macOS)
- **Android Studio** (for Android development)

### Installation

1. **Navigate to the mobile directory**

   ```bash
   cd apps/mobile
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `apps/mobile` directory:

   ```bash
   # apps/mobile/.env
   API_URL="http://localhost:3000"
   ```

   For physical devices, use your machine's IP address:

   ```bash
   API_URL="http://192.168.1.100:3000"
   ```

4. **Start the development server**

   ```bash
   bun dev
   ```

5. **Run on a device or emulator**

   - Press `i` to open iOS simulator
   - Press `a` to open Android emulator
   - Scan QR code with Expo Go app on physical device

---

## Development

### Available Scripts

```bash
# Start development server
bun dev

# Start with web support
bun start

# Run on iOS simulator
bun ios

# Run on Android emulator
bun android

# Run linting
bun lint

# Reset project (removes example code)
bun run reset-project
```

### Running on Devices

#### iOS Simulator (macOS only)

```bash
bun ios
```

#### Android Emulator

```bash
bun android
```

#### Physical Device

1. Install **Expo Go** app from:
   - [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the development server:

   ```bash
   bun dev
   ```

3. Scan the QR code displayed in the terminal

### Connecting to the API

The mobile app connects to the Next.js backend via the `API_URL` environment variable.

**Development:**
- iOS Simulator: `http://localhost:3000`
- Android Emulator: `http://10.0.2.2:3000`
- Physical Device: `http://YOUR_IP:3000`

**Production:**
- Set to your production URL: `https://orunos.netlify.app`

---

## Building for Production

### Prerequisites

- **EAS Build** account (free tier available)
- Apple Developer account (for iOS)
- Google Play Console account (for Android)

### Configure EAS

1. **Install EAS CLI**

   ```bash
   bun add -g eas-cli
   ```

2. **Login to EAS**

   ```bash
   eas login
   ```

3. **Configure EAS**

   ```bash
   eas build:configure
   ```

### Build for iOS

```bash
# Build for iOS App Store
eas build --platform ios

# Build for iOS simulator (testing)
eas build --platform ios --profile simulator
```

### Build for Android

```bash
# Build for Google Play Store (AAB)
eas build --platform android

# Build APK (sideloading)
eas build --platform android --profile preview
```

### Submit to Stores

```bash
# Submit to App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android
```

---

## Navigation

The app uses **Expo Router** for file-based navigation.

### Navigation Structure

```
app/
├── _layout.tsx           # Root layout (providers)
├── (auth)/               # Auth stack
│   ├── _layout.tsx
│   ├── login.tsx
│   └── signup.tsx
└── (tabs)/               # Main tab navigation
    ├── _layout.tsx
    ├── index.tsx         # Home tab
    ├── documents.tsx     # Documents tab
    └── settings.tsx      # Settings tab
```

### Programmatic Navigation

```typescript
import { useRouter } from "expo-router";

export default function MyComponent() {
  const router = useRouter();

  // Navigate to a screen
  router.push("/(tabs)/documents");

  // Navigate to auth screen
  router.push("/(auth)/login");

  // Replace current screen
  router.replace("/(tabs)/index");
}
```

---

## State Management

### Authentication State

Authentication is managed by **Better Auth** with Expo integration:

```typescript
import { authClient } from "@/lib/auth-client";

export default function MyComponent() {
  const { data: session } = authClient.useSession();

  if (!session) {
    // Redirect to login
    router.replace("/(auth)/login");
  }

  return <View>{/* Protected content */}</View>;
}
```

### Secure Storage

The app uses **Expo SecureStore** for persisting authentication tokens:

- iOS: Keychain
- Android: Encrypted SharedPreferences

---

## Styling

### Uniwind (Tailwind for React Native)

The app uses **Uniwind** for Tailwind-style styling:

```typescript
import { View, Text } from "react-native";

export default function MyComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-lg font-bold text-black dark:text-white">
        Hello World
      </Text>
    </View>
  );
}
```

### Theme System

Colors are defined in `lib/theme.ts`:

```typescript
import { Colors } from "@/lib/theme";

const colorScheme = useColorScheme();
const colors = Colors[colorScheme ?? "light"];

// Access theme colors
colors.text
colors.background
colors.tint
colors.icon
```

### Global Styles

Global styles are defined in `global.css`:

```css
@import "tailwindcss";
@import "uniwind";
```

---

## Authentication

### Login

```typescript
import { authClient } from "@/lib/auth-client";

await authClient.signIn.email({
  email: "user@example.com",
  password: "password123"
});
```

### Signup

```typescript
import { authClient } from "@/lib/auth-client";

await authClient.signUp.email({
  email: "user@example.com",
  password: "password123",
  name: "User Name"
});
```

### Session Management

```typescript
import { authClient } from "@/lib/auth-client";

const { data: session } = authClient.useSession();

// Access user data
session?.user.email
session?.user.name
session?.user.id
```

### Logout

```typescript
await authClient.signOut();
```

---

## Troubleshooting

### Common Issues

**App won't start:**

```bash
# Clear Metro cache
bun start --clear

# Reinstall dependencies
rm -rf node_modules
bun install
```

**Can't connect to API:**

1. Ensure the web server is running (`bun dev` in `apps/web`)
2. Check `API_URL` in `.env`
3. For Android emulator, use `http://10.0.2.2:3000`
4. For physical devices, use your machine's IP address

**Build errors:**

```bash
# Clear Expo cache
rm -rf .expo

# Reinstall Expo
bun add expo
```

**TypeScript errors:**

```bash
# Regenerate types
bun expo install --fix
```

**Metro bundler issues:**

```bash
# Watchman (macOS)
watchman watch-del-all

# Clear all caches
rm -rf node_modules/.cache
```

### Debugging

#### React DevTools

```bash
# Install React DevTools
bun add -g react-devtools

# Start React DevTools
react-devtools

# Then run the app
bun dev
```

#### Flipper (Facebook Debugger)

```bash
# Install Flipper
brew install --cask flipper

# Run app with Flipper support
bun dev
```

### Platform-Specific Issues

#### iOS

```bash
# Clear iOS build
cd ios
rm -rf build
rm -rf Pods
pod install
cd ..

# Rebuild
bun ios
```

#### Android

```bash
# Clear Android build
cd android
./gradlew clean
cd ..

# Rebuild
bun android
```

---

## Testing

### Running Tests

```bash
# Run tests (when configured)
bun test
```

### Testing on Real Devices

1. **iOS**: Use TestFlight for beta testing
2. **Android**: Use Google Play Internal Testing

---

## Contributing

When contributing to the mobile app:

1. Follow React Native best practices
2. Test on both iOS and Android
3. Ensure accessibility compliance
4. Update documentation
5. Add tests for new features

---

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://expo.github.io/router/docs/)
- [HeroUI Native](https://heroui-native.com/)
- [Better Auth Expo](https://www.better-auth.com/docs/integrations/expo)
- [Uniwind Documentation](https://uniwind.dev/)

---

## License

Proprietary. All rights reserved.

---

*Last updated: February 2026*
