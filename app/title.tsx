import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Crown, Settings, Users, BookOpen } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function TitleScreen() {
  const menuItems = [
    { title: 'New Game', icon: Crown, route: '/character-creation' },
    { title: 'Load Game', icon: Users, route: '/load-game' },
    { title: 'Settings', icon: Settings, route: '/settings' },
    { title: 'Credits', icon: BookOpen, route: '/credits' },
  ];

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.duration(1000)} style={styles.titleContainer}>
        <Text style={styles.gameTitle}>Yggdrasil Chronicles</Text>
        <Text style={styles.gameSubtitle}>The Shattered Realms</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(1000).delay(500)} style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={item.title} 
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <item.icon color="#d4af37" size={20} />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  gameTitle: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: '#d4af37',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  gameSubtitle: {
    color: '#d4af37',
    fontSize: 18,
    marginTop: 8,
  },
  menuContainer: {
    width: '80%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1625',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  menuItemText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
});
