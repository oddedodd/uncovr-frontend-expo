import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={Colors.background}
      headerImage={
        <IconSymbol
          size={150}
          color={Colors.primary}
          name="person.circle.fill"
          style={styles.headerImage}
        />
      }>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>User Information</Text>
        <Text style={styles.text}>Profile functionality coming soon!</Text>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.subtitle}>Features to implement:</Text>
          <Text style={styles.text}>• User authentication</Text>
          <Text style={styles.text}>• Profile settings</Text>
          <Text style={styles.text}>• User preferences</Text>
          <Text style={styles.text}>• Account management</Text>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    alignSelf: 'center',
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  contentContainer: {
    gap: 16,
  },
  sectionContainer: {
    gap: 8,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkText,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: Colors.darkText,
    lineHeight: 24,
  },
});