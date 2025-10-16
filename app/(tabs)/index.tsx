import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Release, getFeaturedReleases, getReleases } from '@/api';
import { FeaturedReleasesCarousel } from '@/components/featured-releases-carousel';
import { LatestReleasesGrid } from '@/components/latest-releases-grid';
import { Colors } from '@/constants/theme';

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


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.titleContainer}>
        <Text style={styles.featuredHeaderText}>Featured</Text>
      </View>

      {/* Featured Releases Section - Full Width */}
      <FeaturedReleasesCarousel 
        releases={featuredReleases}
        loading={featuredLoading}
        error={error}
      />

      {/* Latest Releases Section */}
      <View style={styles.sectionTitle}>
        <Text style={styles.latestHeaderText}>Latest Releases</Text>
      </View>

      <LatestReleasesGrid 
        releases={latestReleases}
        loading={latestLoading}
        error={error}
      />
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
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
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
});
