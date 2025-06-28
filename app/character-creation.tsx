import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FantasyHeader } from '@/components';
import { UserPlus } from 'lucide-react-native';

export default function CharacterCreationScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FantasyHeader
        title="Create Your Hero"
        subtitle="Forge a new legend in the Shattered Realms"
        icon={UserPlus}
      />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Race</Text>
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>Race selection will appear here.</Text>
        </View>

        <Text style={styles.sectionTitle}>Class</Text>
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>Class selection will appear here.</Text>
        </View>

        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>Appearance customization will appear here.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d15',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 24,
  },
  placeholderCard: {
    backgroundColor: '#1a1625',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  placeholderText: {
    color: '#a0a0a0',
    fontSize: 16,
    textAlign: 'center',
  },
});