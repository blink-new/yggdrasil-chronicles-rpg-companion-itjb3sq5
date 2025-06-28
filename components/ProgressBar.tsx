import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';

interface ProgressBarProps {
  label: string;
  current: number;
  max: number;
  color?: string;
  icon?: LucideIcon;
  delay?: number;
  animated?: boolean;
}

export function ProgressBar({ 
  label, 
  current, 
  max, 
  color = '#d4af37',
  icon: Icon,
  delay = 0,
  animated = true
}: ProgressBarProps) {
  const progress = Math.min((current / max) * 100, 100);
  const progressValue = useSharedValue(0);

  React.useEffect(() => {
    if (animated) {
      progressValue.value = withTiming(progress, { duration: 1000 });
    } else {
      progressValue.value = progress;
    }
  }, [progress, animated]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }));

  return (
    <Animated.View 
      style={styles.container} 
      entering={FadeInDown.duration(600).delay(delay)}
    >
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          {Icon && (
            <Icon color={color} size={16} style={styles.icon} />
          )}
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.value}>{current}/{max}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressFill, 
            { backgroundColor: color },
            animatedStyle
          ]} 
        />
      </View>
      
      <Text style={styles.percentage}>{Math.round(progress)}%</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  value: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#2d2438',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: 10,
    borderRadius: 5,
  },
  percentage: {
    color: '#a0a0a0',
    fontSize: 12,
    textAlign: 'right',
  },
});