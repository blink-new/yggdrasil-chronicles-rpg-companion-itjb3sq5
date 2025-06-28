import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';

export function BiomeDetailModal({ visible, biome, onClose }: any) {
  if (!biome) return null;
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X color="#d4af37" size={28} />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.headerRow}>
              <biome.icon color={biome.color} size={36} />
              <Text style={styles.title}>{biome.name}</Text>
            </View>
            <Text style={styles.type}>{biome.type} • {biome.climate}</Text>
            <Text style={styles.description}>{biome.description}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Danger:</Text>
              <Text style={[styles.infoValue, { color: biome.dangerColor }]}>{biome.danger}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Resources:</Text>
              <Text style={styles.infoValue}>{biome.resources.join(', ')}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Progress:</Text>
              <Text style={styles.infoValue}>{biome.progress}% Explored</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notable Features</Text>
              <Text style={styles.sectionText}>{biome.features || 'Ancient trees, hidden ruins, rare wildlife.'}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>World Events</Text>
              <Text style={styles.sectionText}>{biome.events || 'Seasonal festivals, monster hunts, magical storms.'}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10,10,20,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '92%',
    maxHeight: '90%',
    backgroundColor: '#18142a',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
    padding: 6,
  },
  content: {
    paddingTop: 32,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  type: {
    color: '#d4af37',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    color: '#a0a0a0',
    fontSize: 15,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  infoLabel: {
    color: '#d4af37',
    fontWeight: '600',
    marginRight: 8,
    fontSize: 14,
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    color: '#d4af37',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  sectionText: {
    color: '#fff',
    fontSize: 14,
  },
});
