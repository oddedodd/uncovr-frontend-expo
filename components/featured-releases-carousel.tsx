import { Image } from 'expo-image';
import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

import { Release } from '@/api';
import { Colors } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');

interface FeaturedReleasesCarouselProps {
  releases: Release[];
  loading: boolean;
  error: string | null;
}

export function FeaturedReleasesCarousel({ releases, loading, error }: FeaturedReleasesCarouselProps) {
  const renderFeaturedItem = ({ item }: { item: Release }) => (
    <View style={styles.featuredCard}>
      <Image
        source={{ uri: item.cover_image }}
        style={styles.featuredImage}
        contentFit="cover"
        contentPosition="center"
      />
      <View style={styles.featuredOverlay}>
        <Text style={styles.featuredTitle}>{item.title}</Text>
        <Text style={styles.featuredArtist}>{item.artist.name}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading featured releases...</Text>
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
        <Text>No featured releases found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={releases}
      renderItem={renderFeaturedItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToInterval={screenWidth}
      snapToAlignment="start"
      decelerationRate="fast"
      contentContainerStyle={styles.featuredContainer}
      scrollEnabled={true}
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
  featuredContainer: {
    paddingHorizontal: 0,
  },
  featuredCard: {
    width: screenWidth,
    height: 300,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    width: screenWidth,
    height: 300,
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  featuredTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredArtist: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
});
