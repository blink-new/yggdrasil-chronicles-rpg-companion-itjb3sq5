import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FantasyHeader, GlowingCard, ProgressBar } from '@/components';
import { Map, Globe, Mountain, Shield, Skull, Star, Lock, CheckCircle, Trees, Castle, Home, Tent } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { BiomeDetailModal } from '@/components/BiomeDetailModal';
import { SettlementDetailModal } from '@/components/SettlementDetailModal';

const worldData = {
  continents: [
    { 
      name: 'Asgard', 
      description: 'The celestial realm of the gods, floating among the stars.',
      icon: Globe,
      regions: [
        { 
          name: 'Valhalla', 
          zones: 5, 
          completed: true, 
          biome: 'Celestial Citadel', 
          icon: Castle,
          locations: [ { name: 'The Great Hall', type: 'City' }, { name: 'Heimdall\'s Observatory', type: 'Landmark' } ]
        },
        { 
          name: 'Bifrost Bridge', 
          zones: 2, 
          completed: true, 
          biome: 'Cosmic Pathway', 
          icon: Star,
          locations: []
        },
        { 
          name: 'Yggdrasil\'s Canopy', 
          zones: 8, 
          completed: false, 
          active: true, 
          biome: 'World Tree Summit', 
          icon: Trees,
          locations: [ { name: 'Mimir\'s Well', type: 'Landmark' } ]
        },
      ]
    },
    { 
      name: 'Midgard', 
      description: 'The realm of mortals, teeming with diverse kingdoms and untamed wilderness.', 
      icon: Mountain,
      regions: [
        { 
          name: 'The Shattered Realms', 
          zones: 12, 
          completed: false, 
          active: true, 
          biome: 'Plains & Ruins', 
          icon: Shield,
          locations: [ { name: 'Stormgate', type: 'City' }, { name: 'Limgrave Outpost', type: 'Village' } ]
        },
        { 
          name: 'Ironwood Forest', 
          zones: 9, 
          completed: false, 
          biome: 'Ancient Forest', 
          icon: Trees,
          locations: [ { name: 'Elvenwood', type: 'Village' } ]
        },
        { 
          name: 'The Sunken City', 
          zones: 6, 
          locked: true, 
          biome: 'Aquatic Ruins', 
          icon: Skull,
          locations: []
        },
      ]
    },
  ],
  worldTiers: [
    { tier: 1, name: 'Adventurer', recommendedLevel: '1-50', unlocked: true },
    { tier: 2, name: 'Veteran', recommendedLevel: '50-70', unlocked: true },
    { tier: 3, name: 'Nightmare', recommendedLevel: '70-90', unlocked: false },
    { tier: 4, name: 'Torment', recommendedLevel: '90+', unlocked: false },
  ]
};

const LocationIcon = ({ type }: { type: string }) => {
    switch(type) {
        case 'City': return <Castle color="#a0a0a0" size={14} />;
        case 'Village': return <Home color="#a0a0a0" size={14} />;
        case 'Landmark': return <MapPin color="#a0a0a0" size={14} />;
        default: return <Tent color="#a0a0a0" size={14} />;
    }
}

export default function WorldScreen() {
  const [selectedContinent, setSelectedContinent] = useState(worldData.continents[0]);
  const [selectedWorldTier, setSelectedWorldTier] = useState(worldData.worldTiers[1]);
  const [selectedBiome, setSelectedBiome] = useState(null);
  const [biomeModalVisible, setBiomeModalVisible] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [settlementModalVisible, setSettlementModalVisible] = useState(false);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return CheckCircle;
      case 'active':
        return Star;
      case 'locked':
        return Lock;
      default:
        return Tent;
    }
  };

  const BiomeCard = ({ biome, delay }: any) => {
    const StatusIcon = getStatusIcon(biome.biome);
    return (
      <Animated.View entering={FadeInDown.duration(600).delay(delay)}>
        <TouchableOpacity
          style={[styles.biomeCard, biome.status === 'locked' && styles.lockedCard]}
          disabled={biome.status === 'locked'}
          onPress={() => { setSelectedBiome(biome); setBiomeModalVisible(true); }}
        >
          <StatusIcon color="#a0a0a0" size={16} />
          <Text style={styles.biomeName}>{biome.name}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const SettlementCard = ({ settlement, delay }: any) => {
    return (
      <Animated.View entering={FadeInDown.duration(600).delay(delay)}>
        <TouchableOpacity
          style={styles.settlementCard}
          onPress={() => { setSelectedSettlement(settlement); setSettlementModalVisible(true); }}
        >
          <Home color="#a0a0a0" size={16} />
          <Text style={styles.settlementName}>{settlement.name}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FantasyHeader
        title="The Nine Realms"
        subtitle="Explore the vast and shattered world"
        icon={Map}
      />

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>World Tier</Text>
          <View style={styles.worldTierContainer}>
            {worldData.worldTiers.map(tier => (
              <TouchableOpacity 
                key={tier.tier} 
                style={[styles.tierCard, selectedWorldTier.tier === tier.tier && styles.selectedTierCard, tier.unlocked === false && styles.lockedTierCard]}
                onPress={() => tier.unlocked && setSelectedWorldTier(tier)}
                disabled={!tier.unlocked}
              >
                <Text style={[styles.tierName, selectedWorldTier.tier === tier.tier && styles.selectedTierName]}>Tier {tier.tier}: {tier.name}</Text>
                <Text style={styles.tierLevel}>Lvl: {tier.recommendedLevel}</Text>
                {tier.unlocked === false && <Lock color="#a0a0a0" size={16} style={styles.lockIcon} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.continentsList}>
            {worldData.continents.map((continent, index) => (
              <TouchableOpacity key={continent.name} style={[styles.continentCard, selectedContinent.name === continent.name && styles.selectedContinentCard]} onPress={() => setSelectedContinent(continent)}>
                <continent.icon color={selectedContinent.name === continent.name ? '#1a1625' : '#d4af37'} size={24} />
                <Text style={[styles.continentName, selectedContinent.name === continent.name && styles.selectedContinentName]}>{continent.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Animated.View style={styles.section} entering={FadeInUp.duration(500)}>
          <Text style={styles.sectionTitle}>{selectedContinent.name}</Text>
          <Text style={styles.continentDescription}>{selectedContinent.description}</Text>
          
          <View style={styles.regionsList}>
            {selectedContinent.regions.map((region, index) => (
              <GlowingCard key={region.name} delay={index * 100} variant={region.locked ? 'default' : (region.active ? 'premium' : 'default')}>
                <View style={styles.regionCardContent}>
                  <View style={styles.regionHeader}>
                    <Text style={styles.regionName}>{region.name}</Text>
                    <View style={styles.regionStatusIcons}>
                        {region.completed && <CheckCircle color="#27ae60" size={18} />}
                        {region.active && <Star color="#d4af37" size={18} />}
                        {region.locked && <Lock color="#6b5b95" size={18} />}
                    </View>
                  </View>
                  <View style={styles.regionMeta}>
                    <Text style={styles.regionInfoText}>{region.zones} Zones</Text>
                    <Text style={styles.separator}>•</Text>
                    <Text style={styles.regionInfoText}>{region.biome}</Text>
                  </View>
                  <ProgressBar label="Completion" current={region.completed ? 100 : (region.active ? 45 : 0)} max={100} />
                  {region.locations.length > 0 &&
                    <View style={styles.locationsContainer}>
                        <Text style={styles.locationsTitle}>Locations:</Text>
                        {region.locations.map(loc => (
                            <View key={loc.name} style={styles.locationItem}>
                                <LocationIcon type={loc.type} />
                                <Text style={styles.locationName}>{loc.name}</Text>
                            </View>
                        ))}
                    </View>
                  }
                </View>
              </GlowingCard>
            ))}
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d15',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  worldTierContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  tierCard: {
    width: '48%',
    backgroundColor: '#1a1625',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  selectedTierCard: {
    borderColor: '#d4af37',
    backgroundColor: '#d4af3720',
  },
  lockedTierCard: {
    opacity: 0.6,
  },
  tierName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  selectedTierName: {
    color: '#d4af37',
  },
  tierLevel: {
    color: '#a0a0a0',
    fontSize: 12,
    marginTop: 4,
  },
  lockIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  continentsList: {
    flexDirection: 'row',
  },
  continentCard: {
    backgroundColor: '#1a1625',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2d2438',
    minWidth: 120,
  },
  selectedContinentCard: {
    backgroundColor: '#d4af37',
    borderColor: '#d4af37',
  },
  continentName: {
    color: '#d4af37',
    fontWeight: '600',
    marginTop: 8,
  },
  selectedContinentName: {
    color: '#1a1625',
  },
  continentDescription: {
    color: '#a0a0a0',
    fontSize: 14,
    marginBottom: 16,
  },
  regionsList: {
    gap: 16,
  },
  regionCardContent: {
    gap: 12,
  },
  regionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  regionName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  regionStatusIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  regionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  regionInfoText: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  separator: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  locationsContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: '#2d2438',
    paddingTop: 12,
  },
  locationsTitle: {
    color: '#d4af37',
    fontWeight: '600',
    marginBottom: 8,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  locationName: {
    color: '#a0a0a0',
  },
  biomeCard: {
    width: '48%',
    backgroundColor: '#1a1625',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  lockedCard: {
    opacity: 0.6,
  },
  biomeName: {
    color: '#ffffff',
    fontSize: 14,
  },
  settlementCard: {
    width: '48%',
    backgroundColor: '#1a1625',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  settlementName: {
    color: '#ffffff',
    fontSize: 14,
  },
});

const BiomeDetailModal = ({ visible, biome, onClose }) => {
  // ... existing code ...
};

const SettlementDetailModal = ({ visible, settlement, onClose }) => {
  // ... existing code ...
};