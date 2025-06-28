import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolateColor
} from 'react-native-reanimated';

interface GlowingCardProps {
  children: React.ReactNode;
  glowColor?: string;
  onPress?: () => void;
  delay?: number;
  disabled?: boolean;
  variant?: 'default' | 'premium' | 'legendary' | 'mythic';
}

export function GlowingCard({ 
  children, 
  glowColor,
  onPress,
  delay = 0,
  disabled = false,
  variant = 'default'
}: GlowingCardProps) {
  const scale = useSharedValue(1);
  const glowIntensity = useSharedValue(0);

  const getVariantColors = () => {
    switch (variant) {
      case 'premium':
        return {
          gradient: ['#1a1625', '#2d2438'],
          border: '#d4af37',
          glow: glowColor || '#d4af37',
        };
      case 'legendary':
        return {
          gradient: ['#2d1b69', '#1a1625'],
          border: '#9b59b6',
          glow: glowColor || '#9b59b6',
        };
      case 'mythic':
        return {
          gradient: ['#e74c3c', '#c0392b'],
          border: '#e74c3c',
          glow: glowColor || '#e74c3c',
        };
      default:
        return {
          gradient: ['#1a1625', '#2d2438'],
          border: '#2d2438',
          glow: glowColor || '#d4af37',
        };
    }
  };

  const colors = getVariantColors();

  const handlePressIn = () => {
    if (onPress && !disabled) {
      scale.value = withTiming(0.98, { duration: 100 });
      glowIntensity.value = withTiming(1, { duration: 200 });
    }
  };

  const handlePressOut = () => {
    if (onPress && !disabled) {
      scale.value = withTiming(1, { duration: 100 });
      glowIntensity.value = withTiming(0, { duration: 300 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    shadowColor: colors.glow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowIntensity.value * 0.8,
    shadowRadius: glowIntensity.value * 20,
    elevation: glowIntensity.value * 10,
  }));

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <Animated.View 
      entering={FadeInDown.duration(600).delay(delay)}
      style={[animatedStyle, glowStyle]}
    >
      <CardComponent
        style={[
          styles.container,
          disabled && styles.disabled
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={colors.gradient}
          style={[
            styles.gradient,
            { borderColor: colors.border }
          ]}
        >
          {children}
        </LinearGradient>
      </CardComponent>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.6,
  },
  gradient: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
  },
});