import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Release, getReleases } from '@/api';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Colors } from '@/constants/theme';

export default function HomeScreen() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      setLoading(true);
      const releasesData = await getReleases();
      setReleases(releasesData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={Colors.surface}
      headerImage={
        <Image
          source={require('@/assets/images/uncovr-logo.png')}
          style={styles.uncovrLogo}
        />
      }>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Releases</Text>
      </View>

      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <Text>Loading releases...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

      {!loading && !error && releases.length === 0 && (
        <View style={styles.centerContainer}>
          <Text>No releases found</Text>
        </View>
      )}

      {!loading && !error && releases.length > 0 && (
        <View style={styles.releasesContainer}>
          {releases.map((release) => (
            <View key={release.id} style={styles.releaseCard}>
              <Image
                source={{ uri: release.cover_image }}
                style={styles.releaseImage}
                contentFit="cover"
              />
              <Text style={[styles.releaseName, { fontWeight: '600', fontSize: 18 }]}>
                {release.title}
              </Text>
              <Text style={styles.artistName}>
                {release.artist.name}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  uncovrLogo: {
    height: 178,
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
    position: 'relative',
    marginTop: 50,
    marginBottom: 4,
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
  releasesContainer: {
    gap: 16,
  },
  releaseCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  releaseImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  releaseName: {
    marginTop: 8,
    textAlign: 'center',
  },
  artistName: {
    marginTop: 4,
    textAlign: 'center',
    opacity: 0.7,
  },
});
