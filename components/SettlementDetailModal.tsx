import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X, MapPin, Users, Store, Swords } from 'lucide-react-native';

export function SettlementDetailModal({ visible, settlement, onClose }: any) {
  if (!settlement) return null;
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X color="#d4af37" size={28} />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.headerRow}>
              <settlement.icon color={settlement.color} size={36} />
              <Text style={styles.title}>{settlement.name}</Text>
            </View>
            <Text style={styles.type}>{settlement.type} • Pop: {settlement.population}</Text>
            <Text style={styles.description}>{settlement.description}</Text>
            <View style={styles.infoRow}>
              <MapPin color="#d4af37" size={16} />
              <Text style={styles.infoValue}>{settlement.biome}</Text>
            </View>
            <View style={styles.infoRow}>
              <Users color="#d4af37" size={16} />
              <Text style={styles.infoValue}>{settlement.status.charAt(0).toUpperCase() + settlement.status.slice(1)} Faction</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Services</Text>
              <View style={styles.servicesList}>
                {settlement.services.map((service: string, idx: number) => (
                  <View key={idx} style={styles.serviceItem}>
                    <Store color="#d4af37" size={14} />
                    <Text style={styles.serviceText}>{service}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Events & Activities</Text>
              <Text style={styles.sectionText}>{settlement.events || 'Arena tournaments, seasonal markets, guild meetings.'}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notable NPCs</Text>
              <Text style={styles.sectionText}>{settlement.npcs || 'Mayor, Guildmaster, Blacksmith, High Priest.'}</Text>
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
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
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
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2438',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  serviceText: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 4,
  },
});
