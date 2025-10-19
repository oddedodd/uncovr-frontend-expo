import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function SearchScreen() {
  const { isAuthenticated, isLoading } = useProtectedRoute();

  // Don't render content if not authenticated
  if (isLoading || !isAuthenticated) {
    return null;
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={Colors.border}
      headerImage={
        <IconSymbol
          size={310}
          color={Colors.mutedText}
          name="magnifyingglass"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Search
        </ThemedText>
      </ThemedView>
      <ThemedText>Search functionality coming soon!</ThemedText>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Features to implement:</ThemedText>
        <ThemedText>• Text search input</ThemedText>
        <ThemedText>• Real-time search results</ThemedText>
        <ThemedText>• Search filters</ThemedText>
        <ThemedText>• Search history</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: Colors.mutedText,
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row' as const,
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});

