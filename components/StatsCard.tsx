import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  onPress?: () => void;
  delay?: number;
  gradientColors?: string[];
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  iconColor = '#d4af37',
  onPress,
  delay = 0,
  gradientColors = ['#1a1625', '#2d2438']
}: StatsCardProps) {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <Animated.View entering={FadeInDown.duration(600).delay(delay)}>
      <CardComponent style={styles.container} onPress={onPress}>
        <LinearGradient colors={gradientColors} style={styles.gradient}>
          <View style={styles.iconContainer}>
            <Icon color={iconColor} size={24} />
          </View>
          
          <View style={styles.content}>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.title}>{title}</Text>
            {subtitle && (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}
          </View>
        </LinearGradient>
      </CardComponent>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  gradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#2d2438',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2d2438',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  value: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  title: {
    color: '#d4af37',
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    color: '#a0a0a0',
    fontSize: 12,
    marginTop: 2,
  },
});