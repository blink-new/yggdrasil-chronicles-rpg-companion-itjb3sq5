import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Anvil, Sword, Shield, Gem, Scroll, Dices, Star } from 'lucide-react-native';
import { FantasyHeader, GlowingCard, ActionButton, ProgressBar } from '@/components';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const craftingProfessions = [
  { name: 'Blacksmithing', icon: Anvil, description: 'Forge weapons and armor from metal.' },
  { name: 'Enchanting', icon: Gem, description: 'Imbue items with magical properties.', locked: true },
  { name: 'Alchemy', icon: Dices, description: 'Brew powerful potions and elixirs.', locked: true },
  { name: 'Inscription', icon: Scroll, description: 'Create magical scrolls and glyphs.', locked: true },
];

const blacksmithingCategories = [
  { name: 'Weapons', icon: Sword },
  { name: 'Armor', icon: Shield },
];

const craftableItems = {
  Weapons: [
    { name: 'Iron Longsword', level: 10, rarity: 'common', materials: [{ name: 'Iron Ore', count: 10 }, { name: 'Oak Wood', count: 5 }] },
    { name: 'Steel Greatsword', level: 25, rarity: 'uncommon', materials: [{ name: 'Steel Ingot', count: 8 }, { name: 'Treated Leather', count: 3 }] },
    { name: 'Moonlight Blade', level: 50, rarity: 'rare', materials: [{ name: 'Moonstone', count: 5 }, { name: 'Silver Ingot', count: 12 }, { name: 'Starlight Essence', count: 2 }] },
  ],
  Armor: [
    { name: 'Iron Helmet', level: 12, rarity: 'common', materials: [{ name: 'Iron Ore', count: 8 }, { name: 'Leather Scraps', count: 4 }] },
    { name: 'Steel Platebody', level: 28, rarity: 'uncommon', materials: [{ name: 'Steel Ingot', count: 15 }, { name: 'Chainmail Links', count: 10 }] },
    { name: 'Dragonscale Gauntlets', level: 55, rarity: 'rare', materials: [{ name: 'Dragon Scale', count: 6 }, { name: 'Hardened Leather', count: 4 }, { name: 'Fire Ruby', count: 1 }] },
  ],
};

const playerSkills = {
  Blacksmithing: 45,
};

export default function CraftingScreen() {
  const [selectedProfession, setSelectedProfession] = useState(craftingProfessions[0]);
  const [selectedCategory, setSelectedCategory] = useState(blacksmithingCategories[0]);

  const getRarityVariant = (rarity: string) => {
    switch (rarity) {
      case 'rare': return 'premium';
      case 'legendary': return 'legendary';
      case 'mythic': return 'mythic';
      default: return 'default';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FantasyHeader
        title="Crafting"
        subtitle="Forge your legend"
        icon={selectedProfession.icon}
      />

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.professionsList}>
            {craftingProfessions.map((prof, index) => (
              <Animated.View key={prof.name} entering={FadeInDown.duration(500).delay(index * 100)}>
                <TouchableOpacity 
                  style={[styles.professionCard, selectedProfession.name === prof.name && styles.selectedProfessionCard, prof.locked && styles.lockedProfessionCard]}
                  onPress={() => !prof.locked && setSelectedProfession(prof)}
                  disabled={prof.locked}
                >
                  <prof.icon color={selectedProfession.name === prof.name ? '#1a1625' : '#d4af37'} size={24} />
                  <Text style={[styles.professionName, selectedProfession.name === prof.name && styles.selectedProfessionName]}>{prof.name}</Text>
                  {prof.locked && <Text style={styles.lockedText}>Locked</Text>}
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        <Animated.View style={styles.section} entering={FadeInUp.duration(500).delay(200)}>
          <Text style={styles.sectionTitle}>{selectedProfession.name}</Text>
          <ProgressBar 
            label="Skill Level"
            current={playerSkills.Blacksmithing}
            max={100}
            icon={Star}
          />
        </Animated.View>

        {selectedProfession.name === 'Blacksmithing' && (
          <Animated.View entering={FadeInUp.duration(500).delay(300)}>
            <View style={styles.categoryTabs}>
              {blacksmithingCategories.map(cat => (
                <TouchableOpacity 
                  key={cat.name} 
                  style={[styles.categoryTab, selectedCategory.name === cat.name && styles.selectedCategoryTab]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <cat.icon color={selectedCategory.name === cat.name ? '#1a1625' : '#d4af37'} size={16} />
                  <Text style={[styles.categoryName, selectedCategory.name === cat.name && styles.selectedCategoryName]}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.itemList}>
              {craftableItems[selectedCategory.name as keyof typeof craftableItems].map((item, index) => (
                <GlowingCard key={item.name} delay={index * 100} variant={getRarityVariant(item.rarity)}>
                  <View style={styles.itemCardContent}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemLevel}>Lvl. {item.level}</Text>
                    </View>
                    <Text style={[styles.itemRarity, { color: getRarityVariant(item.rarity) === 'premium' ? '#d4af37' : '#a0a0a0' }]}>{item.rarity}</Text>
                    
                    <View style={styles.materialsSection}>
                      <Text style={styles.materialsTitle}>Materials:</Text>
                      {item.materials.map(mat => (
                        <Text key={mat.name} style={styles.materialText}>- {mat.name} x{mat.count}</Text>
                      ))}
                    </View>

                    <ActionButton title="Forge Item" onPress={() => {}} size="small" variant="secondary" />
                  </View>
                </GlowingCard>
              ))}
            </View>
          </Animated.View>
        )}
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
  professionsList: {
    flexDirection: 'row',
  },
  professionCard: {
    backgroundColor: '#1a1625',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2d2438',
    minWidth: 120,
  },
  selectedProfessionCard: {
    backgroundColor: '#d4af37',
    borderColor: '#d4af37',
  },
  lockedProfessionCard: {
    opacity: 0.5,
  },
  professionName: {
    color: '#d4af37',
    fontWeight: '600',
    marginTop: 8,
  },
  selectedProfessionName: {
    color: '#1a1625',
  },
  lockedText: {
    color: '#a0a0a0',
    fontSize: 12,
    marginTop: 4,
  },
  categoryTabs: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#1a1625',
    borderRadius: 12,
    padding: 4,
  },
  categoryTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
  },
  selectedCategoryTab: {
    backgroundColor: '#d4af37',
  },
  categoryName: {
    color: '#d4af37',
    fontWeight: '600',
    marginLeft: 8,
  },
  selectedCategoryName: {
    color: '#1a1625',
  },
  itemList: {
    gap: 16,
  },
  itemCardContent: {
    gap: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemLevel: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  itemRarity: {
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  materialsSection: {},
  materialsTitle: {
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 4,
  },
  materialText: {
    color: '#a0a0a0',
  },
});