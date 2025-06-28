import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';

interface FantasyHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  backgroundImage?: string;
  gradientColors?: string[];
}

export function FantasyHeader({ 
  title, 
  subtitle, 
  icon: Icon,
  gradientColors = ['#2d1b69', '#1a1625']
}: FantasyHeaderProps) {
  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.headerGradient}
    >
      <Animated.View style={styles.header} entering={FadeInUp.duration(800)}>
        {Icon && (
          <View style={styles.iconContainer}>
            <Icon color="#d4af37" size={32} />
          </View>
        )}
        
        <Text style={styles.headerTitle}>{title}</Text>
        
        {subtitle && (
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        )}
        
        {/* Decorative elements */}
        <View style={styles.decorativeElements}>
          <View style={styles.ornament} />
          <View style={[styles.ornament, styles.ornamentCenter]} />
          <View style={styles.ornament} />
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2d2438',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#d4af37',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    color: '#a0a0a0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  decorativeElements: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ornament: {
    width: 20,
    height: 2,
    backgroundColor: '#d4af37',
    marginHorizontal: 8,
  },
  ornamentCenter: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d4af37',
  },
});