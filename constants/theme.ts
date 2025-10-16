/**
 * Below are the colors that are used in the app.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Primary Colors
const PRIMARY = '#23B0A2'; // Turquoise green from logo
const ACCENT = '#9BC13D'; // Lime green dot in logo
const DARK_TEXT = '#2E3439'; // Dark gray used in logo text

// Background & Surfaces
const BACKGROUND = '#F9FAFB'; // Light almost-white background
const SURFACE = '#FFFFFF'; // Pure white for cards and panels
const BORDER = '#E2E8F0'; // Discrete line color (light blue-gray tone)
const MUTED_TEXT = '#6B7280'; // Gray secondary text

// State Colors
const SUCCESS = '#32D296'; // Harmonious green
const WARNING = '#F4A259'; // Soft orange for warnings
const ERROR = '#E24C4B'; // Red for errors and alarms
const INFO = '#2BAAE2'; // Cool blue for information messages

export const Colors = {
  // Primary colors
  primary: PRIMARY,
  accent: ACCENT,
  darkText: DARK_TEXT,
  
  // Background & surfaces
  background: BACKGROUND,
  surface: SURFACE,
  border: BORDER,
  mutedText: MUTED_TEXT,
  
  // State colors
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  info: INFO,
  
  // Legacy mappings for compatibility
  text: DARK_TEXT,
  tint: PRIMARY,
  icon: MUTED_TEXT,
  tabIconDefault: MUTED_TEXT,
  tabIconSelected: PRIMARY,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
