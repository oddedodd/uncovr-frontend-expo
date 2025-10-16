import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Release, getFeaturedReleases, getReleases } from '@/api';
import { Colors } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const [featuredReleases, setFeaturedReleases] = useState<Release[]>([]);
  const [latestReleases, setLatestReleases] = useState<Release[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [latestLoading, setLatestLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError(null);
      
      // Fetch featured releases
      setFeaturedLoading(true);
      const featuredData = await getFeaturedReleases();
      setFeaturedReleases(featuredData);
      setFeaturedLoading(false);
      
      // Fetch latest releases (limit to 21)
      setLatestLoading(true);
      const latestData = await getReleases(21);
      setLatestReleases(latestData);
      setLatestLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setFeaturedLoading(false);
      setLatestLoading(false);
    }
  };

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.titleContainer}>
        <Text style={styles.featuredHeaderText}>Featured</Text>
      </View>

      {/* Featured Releases Section - Full Width */}
      {featuredLoading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <Text>Loading featured releases...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

      {!featuredLoading && !error && featuredReleases.length > 0 && (
        <FlatList
          data={featuredReleases}
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
      )}

      {!featuredLoading && !error && featuredReleases.length === 0 && (
        <View style={styles.centerContainer}>
          <Text>No featured releases found</Text>
        </View>
      )}

      {/* Latest Releases Section */}
      <View style={styles.sectionTitle}>
        <Text style={styles.latestHeaderText}>Latest Releases</Text>
      </View>

      {latestLoading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <Text>Loading latest releases...</Text>
        </View>
      )}

      {!latestLoading && !error && latestReleases.length > 0 && (
        <FlatList
          data={latestReleases}
          renderItem={renderLatestItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.latestRow}
          contentContainerStyle={styles.latestContainer}
          scrollEnabled={false}
        />
      )}

      {!latestLoading && !error && latestReleases.length === 0 && (
        <View style={styles.centerContainer}>
          <Text>No latest releases found</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  errorText: {
    color: Colors.error,
  },
  // Featured releases styles
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
  // Section title
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  featuredHeaderText: {
    fontSize: 20,
    fontWeight: '300',
  },
  latestHeaderText: {
    fontSize: 20,
    fontWeight: '300',
  },
  // Latest releases grid styles
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
