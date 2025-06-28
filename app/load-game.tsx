import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FantasyHeader } from '@/components';
import { Users } from 'lucide-react-native';

export default function LoadGameScreen() {
  return (
    <View style={styles.container}>
      <FantasyHeader title="Load Game" icon={Users} />
      <View style={styles.content}>
        <Text style={styles.text}>Load Game Screen</Text>
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