import { Image } from 'expo-image';
import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

import { Release } from '@/api';
import { Colors } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');

interface LatestReleasesGridProps {
  releases: Release[];
  loading: boolean;
  error: string | null;
}

export function LatestReleasesGrid({ releases, loading, error }: LatestReleasesGridProps) {
  const renderLatestItem = ({ item }: { item: Release }) => (
    <View style={styles.latestCard}>
      <Image
        source={{ uri: item.cover_image }}
        style={styles.latestImage}
        contentFit="cover"
      />
      <Text style={styles.latestTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.latestArtist} numberOfLines={1}>
        {item.artist.name}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading latest releases...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (releases.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text>No latest releases found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={releases}
      renderItem={renderLatestItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.latestRow}
      contentContainerStyle={styles.latestContainer}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  errorText: {
    color: Colors.error,
  },
  latestContainer: {
    paddingHorizontal: 16,
  },
  latestRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  latestCard: {
    width: (screenWidth - 48) / 2, // 2 columns with 16px padding and gaps
    marginBottom: 4,
  },
  latestImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  latestTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  latestArtist: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
});
