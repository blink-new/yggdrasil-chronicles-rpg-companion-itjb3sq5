import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FantasyHeader } from '@/components';
import { Settings } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <FantasyHeader title="Settings" icon={Settings} />
      <View style={styles.content}>
        <Text style={styles.text}>Settings Screen</Text>
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
  text: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});