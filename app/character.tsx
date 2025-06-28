import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Sword, Shield, Zap, Heart, Crown, Plus } from 'lucide-react-native';
import { ProgressBar, ActionButton } from '@/components';

export default function CharacterScreen() {
  const character = {
    name: 'Arden the Wanderer',
    level: 47,
    class: 'Spellsword',
    health: 1250,
    maxHealth: 1250,
    mana: 890,
    maxMana: 890,
    experience: 7840,
    experienceToNext: 2160,
    stats: {
      strength: 28,
      dexterity: 24,
      intelligence: 32,
      faith: 18,
      vitality: 30,
      endurance: 26,
    },
    equipment: {
      weapon: 'Moonlight Greatsword +5',
      armor: 'Night\'s Cavalry Set',
      talisman: 'Radagon\'s Scarseal',
    }
  };

  const StatBar = ({ label, current, max, color, icon: Icon }: any) => (
    <ProgressBar
      label={label}
      current={current}
      max={max}
      color={color}
      icon={Icon}
      delay={200}
    />
  );

  const AttributeStat = ({ label, value }: any) => (
    <View style={styles.attributeItem}>
      <Text style={styles.attributeLabel}>{label}</Text>
      <Text style={styles.attributeValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#2d1b69', '#1a1625']}
        style={styles.headerGradient}
      >
        <Animated.View style={styles.characterHeader} entering={FadeInUp.duration(800)}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Crown color="#d4af37" size={32} />
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{character.level}</Text>
            </View>
          </View>
          
          <View style={styles.characterInfo}>
            <Text style={styles.characterName}>{character.name}</Text>
            <Text style={styles.characterClass}>{character.class}</Text>
            
            <View style={styles.experienceContainer}>
              <Text style={styles.experienceLabel}>Experience</Text>
              <View style={styles.experienceBar}>
                <View style={[styles.experienceProgress, { width: `${(character.experience / (character.experience + character.experienceToNext)) * 100}%` }]} />
              </View>
              <Text style={styles.experienceText}>{character.experience} / {character.experience + character.experienceToNext}</Text>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View style={styles.section} entering={FadeInDown.duration(600).delay(100)}>
          <Text style={styles.sectionTitle}>Vital Stats</Text>
          <StatBar 
            label="Health" 
            current={character.health} 
            max={character.maxHealth} 
            color="#e74c3c"
            icon={Heart}
          />
          <StatBar 
            label="Mana" 
            current={character.mana} 
            max={character.maxMana} 
            color="#3498db"
            icon={Zap}
          />
        </Animated.View>

        <Animated.View style={styles.section} entering={FadeInDown.duration(600).delay(300)}>
          <Text style={styles.sectionTitle}>Attributes</Text>
          <View style={styles.attributesGrid}>
            <AttributeStat label="STR" value={character.stats.strength} />
            <AttributeStat label="DEX" value={character.stats.dexterity} />
            <AttributeStat label="INT" value={character.stats.intelligence} />
            <AttributeStat label="FAI" value={character.stats.faith} />
            <AttributeStat label="VIT" value={character.stats.vitality} />
            <AttributeStat label="END" value={character.stats.endurance} />
          </View>
        </Animated.View>

        <Animated.View style={styles.section} entering={FadeInDown.duration(600).delay(400)}>
          <Text style={styles.sectionTitle}>Equipment</Text>
          
          <TouchableOpacity style={styles.equipmentSlot}>
            <Sword color="#d4af37" size={20} />
            <View style={styles.equipmentInfo}>
              <Text style={styles.equipmentName}>{character.equipment.weapon}</Text>
              <Text style={styles.equipmentType}>Main Hand</Text>
            </View>
            <Plus color="#6b5b95" size={16} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.equipmentSlot}>
            <Shield color="#d4af37" size={20} />
            <View style={styles.equipmentInfo}>
              <Text style={styles.equipmentName}>{character.equipment.armor}</Text>
              <Text style={styles.equipmentType}>Armor Set</Text>
            </View>
            <Plus color="#6b5b95" size={16} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.equipmentSlot}>
            <Crown color="#d4af37" size={20} />
            <View style={styles.equipmentInfo}>
              <Text style={styles.equipmentName}>{character.equipment.talisman}</Text>
              <Text style={styles.equipmentType}>Talisman</Text>
            </View>
            <Plus color="#6b5b95" size={16} />
          </TouchableOpacity>
        </Animated.View>

        <ActionButton
          title="Level Up"
          onPress={() => {}}
          variant="primary"
          size="large"
          icon={Crown}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0d15',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
  },
  characterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2d2438',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#d4af37',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#d4af37',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    color: '#1a1625',
    fontSize: 12,
    fontWeight: 'bold',
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  characterClass: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  experienceContainer: {
    marginTop: 8,
  },
  experienceLabel: {
    color: '#a0a0a0',
    fontSize: 12,
    marginBottom: 4,
  },
  experienceBar: {
    height: 6,
    backgroundColor: '#2d2438',
    borderRadius: 3,
    marginBottom: 4,
  },
  experienceProgress: {
    height: 6,
    backgroundColor: '#d4af37',
    borderRadius: 3,
  },
  experienceText: {
    color: '#a0a0a0',
    fontSize: 11,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    backgroundColor: '#1a1625',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  attributeItem: {
    width: '30%',
    backgroundColor: '#2d2438',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  attributeLabel: {
    color: '#a0a0a0',
    fontSize: 12,
    marginBottom: 4,
  },
  attributeValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  equipmentSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2438',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  equipmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  equipmentName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  equipmentType: {
    color: '#a0a0a0',
    fontSize: 12,
    marginTop: 2,
  },
});