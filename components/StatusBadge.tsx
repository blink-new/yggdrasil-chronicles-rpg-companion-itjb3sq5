import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface StatusBadgeProps {
  status: 'online' | 'away' | 'offline' | 'active' | 'completed' | 'locked' | 'available';
  text?: string;
  icon?: LucideIcon;
  size?: 'small' | 'medium' | 'large';
}

export function StatusBadge({ 
  status, 
  text, 
  icon: Icon,
  size = 'medium'
}: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          color: '#27ae60',
          backgroundColor: '#27ae6020',
          text: text || 'Online',
        };
      case 'away':
        return {
          color: '#f39c12',
          backgroundColor: '#f39c1220',
          text: text || 'Away',
        };
      case 'offline':
        return {
          color: '#95a5a6',
          backgroundColor: '#95a5a620',
          text: text || 'Offline',
        };
      case 'active':
        return {
          color: '#d4af37',
          backgroundColor: '#d4af3720',
          text: text || 'Active',
        };
      case 'completed':
        return {
          color: '#27ae60',
          backgroundColor: '#27ae6020',
          text: text || 'Completed',
        };
      case 'locked':
        return {
          color: '#6b5b95',
          backgroundColor: '#6b5b9520',
          text: text || 'Locked',
        };
      case 'available':
        return {
          color: '#3498db',
          backgroundColor: '#3498db20',
          text: text || 'Available',
        };
      default:
        return {
          color: '#a0a0a0',
          backgroundColor: '#a0a0a020',
          text: text || status,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: 6,
          paddingVertical: 2,
          fontSize: 10,
          iconSize: 10,
          dotSize: 6,
        };
      case 'medium':
        return {
          paddingHorizontal: 8,
          paddingVertical: 4,
          fontSize: 12,
          iconSize: 12,
          dotSize: 8,
        };
      case 'large':
        return {
          paddingHorizontal: 12,
          paddingVertical: 6,
          fontSize: 14,
          iconSize: 16,
          dotSize: 10,
        };
      default:
        return {
          paddingHorizontal: 8,
          paddingVertical: 4,
          fontSize: 12,
          iconSize: 12,
          dotSize: 8,
        };
    }
  };

  const statusConfig = getStatusConfig();
  const sizeStyles = getSizeStyles();

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: statusConfig.backgroundColor,
        paddingHorizontal: sizeStyles.paddingHorizontal,
        paddingVertical: sizeStyles.paddingVertical,
      }
    ]}>
      {Icon ? (
        <Icon 
          color={statusConfig.color} 
          size={sizeStyles.iconSize} 
          style={styles.icon}
        />
      ) : (
        <View style={[
          styles.dot,
          {
            backgroundColor: statusConfig.color,
            width: sizeStyles.dotSize,
            height: sizeStyles.dotSize,
            borderRadius: sizeStyles.dotSize / 2,
          }
        ]} />
      )}
      
      <Text style={[
        styles.text,
        {
          color: statusConfig.color,
          fontSize: sizeStyles.fontSize,
        }
      ]}>
        {statusConfig.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
  dot: {
    marginRight: 6,
  },
  text: {
    fontWeight: '600',
  },
});