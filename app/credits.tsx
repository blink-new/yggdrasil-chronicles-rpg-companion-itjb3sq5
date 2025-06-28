import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FantasyHeader } from '@/components';
import { BookOpen } from 'lucide-react-native';

export default function CreditsScreen() {
  return (
    <View style={styles.container}>
      <FantasyHeader title="Credits" icon={BookOpen} />
      <View style={styles.content}>
        <Text style={styles.title}>Yggdrasil Chronicles</Text>
        <Text style={styles.subtitle}>The Shattered Realms</Text>
        <Text style={styles.creditText}>Developed by: Your Studio Name</Text>
        <Text style={styles.creditText}>Powered by: Blink Engine</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d15',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#d4af37',
    fontSize: 18,
    marginBottom: 40,
  },
  creditText: {
    color: '#a0a0a0',
    fontSize: 16,
    marginBottom: 12,
  },
});