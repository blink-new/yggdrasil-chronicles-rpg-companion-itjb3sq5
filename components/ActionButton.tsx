import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  icon?: LucideIcon;
  disabled?: boolean;
  loading?: boolean;
}

export function ActionButton({ 
  title, 
  onPress, 
  variant = 'primary',
  size = 'medium',
  icon: Icon,
  disabled = false,
  loading = false
}: ActionButtonProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          colors: ['#d4af37', '#b8941f'],
          textColor: '#1a1625',
          borderColor: '#d4af37',
        };
      case 'secondary':
        return {
          colors: ['#2d2438', '#1a1625'],
          textColor: '#d4af37',
          borderColor: '#2d2438',
        };
      case 'danger':
        return {
          colors: ['#e74c3c', '#c0392b'],
          textColor: '#ffffff',
          borderColor: '#e74c3c',
        };
      default:
        return {
          colors: ['#d4af37', '#b8941f'],
          textColor: '#1a1625',
          borderColor: '#d4af37',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: 8,
          fontSize: 12,
          iconSize: 14,
        };
      case 'medium':
        return {
          padding: 12,
          fontSize: 14,
          iconSize: 16,
        };
      case 'large':
        return {
          padding: 16,
          fontSize: 16,
          iconSize: 20,
        };
      default:
        return {
          padding: 12,
          fontSize: 14,
          iconSize: 16,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[
          styles.container,
          disabled && styles.disabledContainer
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={disabled ? ['#6b5b95', '#4a4458'] : variantStyles.colors}
          style={[
            styles.gradient,
            { padding: sizeStyles.padding },
            { borderColor: disabled ? '#6b5b95' : variantStyles.borderColor }
          ]}
        >
          <View style={styles.content}>
            {Icon && !loading && (
              <Icon 
                color={disabled ? '#a0a0a0' : variantStyles.textColor} 
                size={sizeStyles.iconSize} 
                style={styles.icon}
              />
            )}
            
            {loading && (
              <View style={styles.loadingContainer}>
                <Text style={[
                  styles.text,
                  { 
                    color: disabled ? '#a0a0a0' : variantStyles.textColor,
                    fontSize: sizeStyles.fontSize
                  }
                ]}>
                  Loading...
                </Text>
              </View>
            )}
            
            {!loading && (
              <Text style={[
                styles.text,
                { 
                  color: disabled ? '#a0a0a0' : variantStyles.textColor,
                  fontSize: sizeStyles.fontSize
                }
              ]}>
                {title}
              </Text>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  disabledContainer: {
    opacity: 0.6,
  },
  gradient: {
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});