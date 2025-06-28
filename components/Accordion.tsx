import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ChevronDown, LucideIcon } from 'lucide-react-native';

interface AccordionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ title, icon: Icon, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const rotation = useSharedValue(defaultOpen ? 180 : 0);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const toggleAccordion = () => {
    rotation.value = withTiming(isOpen ? 0 : 180);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion} activeOpacity={0.8}>
        <View style={styles.titleContainer}>
            <Icon color="#d4af37" size={22} />
            <Text style={styles.title}>{title}</Text>
        </View>
        <Animated.View style={iconStyle}>
          <ChevronDown color="#d4af37" size={24} />
        </Animated.View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
            {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1625',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2d2438',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
});
