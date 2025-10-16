# Uncovr 🎵

A modern music discovery app built with React Native and Expo, designed to help users discover new music releases and artists.

## Features

### 🏠 Home Screen
- **Featured Releases Carousel**: Full-width swipeable carousel showcasing featured music releases
- **Latest Releases Grid**: 2-column grid displaying the 21 most recent releases
- **Clean Header**: Branded header with Uncovr logo
- **Responsive Design**: Optimized for mobile devices with proper image scaling

### 🎨 UI Components
- **FeaturedReleasesCarousel**: Reusable horizontal carousel component with snap-to-position
- **LatestReleasesGrid**: Reusable 2-column grid component for displaying releases
- **Modern Design**: Clean, minimalist interface with thin typography
- **Loading States**: Proper loading indicators and error handling

### 🔌 API Integration
- **Public Endpoints**: Fetches data from Uncovr backend API
- **Featured Releases**: `/api/v1/releases/featured` endpoint
- **Latest Releases**: `/api/v1/releases` endpoint with limit support
- **Error Handling**: Comprehensive error states and fallbacks

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **Styling**: React Native StyleSheet
- **Images**: Expo Image with optimized loading
- **TypeScript**: Full type safety throughout the app

## Project Structure

```
app/
├── (tabs)/
│   ├── _layout.tsx          # Tab navigation with header
│   ├── index.tsx            # Home screen
│   ├── explore.tsx          # Explore tab
│   ├── search.tsx           # Search tab
│   ├── profile.tsx          # Profile tab
│   └── login.tsx            # Login tab
├── _layout.tsx              # Root layout
└── modal.tsx                # Modal screen

api/
├── config.ts                # API configuration
├── releases.ts              # Release API functions
├── types.ts                 # TypeScript interfaces
└── index.ts                 # API exports

components/
├── featured-releases-carousel.tsx  # Featured releases component
├── latest-releases-grid.tsx        # Latest releases component
├── haptic-tab.tsx                  # Haptic feedback tab
├── parallax-scroll-view.tsx        # Parallax scroll component
└── ui/                             # UI components
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npx expo start
   ```

3. **Run on your device**
   - Scan the QR code with Expo Go (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## API Configuration

The app connects to the Uncovr backend API. Update the API configuration in `api/config.ts`:

```typescript
export const API_BASE_URL = 'https://uncovr-backend-laravel-main-kbqgut.laravel.cloud/api/v1';
```

## Development

### Key Features Implemented
- ✅ Featured releases carousel with full-width swipeable cards
- ✅ Latest releases grid with 2-column layout
- ✅ Reusable component architecture
- ✅ Proper loading and error states
- ✅ Responsive design with proper image scaling
- ✅ Clean header with branded logo
- ✅ TypeScript throughout the application

## Contributing

This project uses Expo's file-based routing system. Main development happens in the `app/` directory where each file represents a route.

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
