import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, FadeInRight } from 'react-native-reanimated';
import { Swords, Users, Clock, Trophy, Star, Zap, Shield, Crown, Lock } from 'lucide-react-native';

export default function DungeonsScreen() {
  const dungeons = [
    {
      id: 1,
      name: 'Stormveil Catacombs',
      type: 'Dungeon',
      difficulty: 'Normal',
      recommendedLevel: '25-30',
      duration: '45 mins',
      maxPlayers: 4,
      rewards: ['Rare Weapons', 'Runes', 'Materials'],
      status: 'available',
      completed: true,
      difficultyColor: '#27ae60',
    },
    {
      id: 2,
      name: 'Academy Gate Town',
      type: 'Raid',
      difficulty: 'Hard',
      recommendedLevel: '40-50',
      duration: '2 hours',
      maxPlayers: 8,
      rewards: ['Legendary Gear', 'Memory Stones', 'Golden Runes'],
      status: 'available',
      completed: false,
      difficultyColor: '#f39c12',
    },
    {
      id: 3,
      name: 'Caelid Dragonbarrow',
      type: 'Elite Dungeon',
      difficulty: 'Extreme',
      recommendedLevel: '60+',
      duration: '3+ hours',
      maxPlayers: 6,
      rewards: ['Ancient Artifacts', 'Dragon Hearts', 'Unique Spells'],
      status: 'available',
      completed: false,
      difficultyColor: '#e74c3c',
    },
    {
      id: 4,
      name: 'Haligtree Sanctuary',
      type: 'Mythic Raid',
      difficulty: 'Mythic',
      recommendedLevel: '80+',
      duration: '4+ hours',
      maxPlayers: 12,
      rewards: ['Divine Weapons', 'Sacred Tears', 'Legendary Talismans'],
      status: 'locked',
      completed: false,
      difficultyColor: '#9b59b6',
    },
  ];

  const weeklyChallenge = {
    name: 'Crucible Knights Trial',
    description: 'Defeat 3 Crucible Knights without using summons',
    progress: 2,
    total: 3,
    timeLeft: '4d 12h',
    reward: 'Crucible Set + 50,000 Runes',
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Normal':
        return Shield;
      case 'Hard':
        return Swords;
      case 'Extreme':
        return Zap;
      case 'Mythic':
        return Crown;
      default:
        return Shield;
    }
  };

  const DungeonCard = ({ dungeon, delay }: any) => {
    const DifficultyIcon = getDifficultyIcon(dungeon.difficulty);
    
    return (
      <Animated.View entering={FadeInDown.duration(600).delay(delay)}>
        <TouchableOpacity 
          style={[
            styles.dungeonCard,
            dungeon.status === 'locked' && styles.lockedCard
          ]}
          disabled={dungeon.status === 'locked'}
        >
          <LinearGradient
            colors={dungeon.status === 'locked' ? ['#2d2438', '#1a1625'] : ['#1a1625', '#2d2438']}
            style={styles.dungeonGradient}
          >
            <View style={styles.dungeonHeader}>
              <View style={styles.dungeonInfo}>
                <Text style={[
                  styles.dungeonName,
                  dungeon.status === 'locked' && styles.lockedText
                ]}>
                  {dungeon.name}
                </Text>
                <View style={styles.dungeonMeta}>
                  <Text style={[
                    styles.dungeonType,
                    { color: dungeon.difficultyColor }
                  ]}>
                    {dungeon.type}
                  </Text>
                  <Text style={styles.separator}>•</Text>
                  <Text style={[
                    styles.dungeonDifficulty,
                    { color: dungeon.difficultyColor }
                  ]}>
                    {dungeon.difficulty}
                  </Text>
                </View>
              </View>
              
              <View style={styles.dungeonStatus}>
                {dungeon.status === 'locked' ? (
                  <Lock color="#6b5b95" size={20} />
                ) : dungeon.completed ? (
                  <Trophy color="#d4af37" size={20} />
                ) : (
                  <DifficultyIcon color={dungeon.difficultyColor} size={20} />
                )}
              </View>
            </View>

            <View style={styles.dungeonDetails}>
              <View style={styles.detailItem}>
                <Crown color="#a0a0a0" size={14} />
                <Text style={styles.detailText}>Level {dungeon.recommendedLevel}</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock color="#a0a0a0" size={14} />
                <Text style={styles.detailText}>{dungeon.duration}</Text>
              </View>
              <View style={styles.detailItem}>
                <Users color="#a0a0a0" size={14} />
                <Text style={styles.detailText}>{dungeon.maxPlayers} players</Text>
              </View>
            </View>

            <View style={styles.rewardsContainer}>
              <Text style={styles.rewardsLabel}>Rewards:</Text>
              <View style={styles.rewardsList}>
                {dungeon.rewards.map((reward: string, index: number) => (
                  <View key={index} style={styles.rewardChip}>
                    <Text style={styles.rewardText}>{reward}</Text>
                  </View>
                ))}
              </View>
            </View>

            {dungeon.status !== 'locked' && (
              <TouchableOpacity style={[
                styles.actionButton,
                dungeon.completed && styles.completedButton
              ]}>
                <Text style={[
                  styles.actionButtonText,
                  dungeon.completed && styles.completedButtonText
                ]}>
                  {dungeon.completed ? 'Replay' : 'Enter Dungeon'}
                </Text>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#2d1b69', '#1a1625']}
        style={styles.headerGradient}
      >
        <Animated.View style={styles.header} entering={FadeInUp.duration(800)}>
          <Text style={styles.headerTitle}>Dungeons & Raids</Text>
          <Text style={styles.headerSubtitle}>Challenge the depths of Yggdrasil</Text>
        </Animated.View>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View 
          style={styles.weeklyChallenge} 
          entering={FadeInRight.duration(600).delay(200)}
        >
          <LinearGradient
            colors={['#d4af37', '#b8941f']}
            style={styles.challengeGradient}
          >
            <View style={styles.challengeHeader}>
              <Star color="#1a1625" size={20} />
              <Text style={styles.challengeTitle}>Weekly Challenge</Text>
              <Text style={styles.challengeTimer}>{weeklyChallenge.timeLeft}</Text>
            </View>
            
            <Text style={styles.challengeName}>{weeklyChallenge.name}</Text>
            <Text style={styles.challengeDescription}>{weeklyChallenge.description}</Text>
            
            <View style={styles.challengeProgress}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressLabel}>Progress</Text>
                <Text style={styles.progressValue}>
                  {weeklyChallenge.progress}/{weeklyChallenge.total}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[
                  styles.progressFill,
                  { width: `${(weeklyChallenge.progress / weeklyChallenge.total) * 100}%` }
                ]} />
              </View>
            </View>
            
            <Text style={styles.challengeReward}>Reward: {weeklyChallenge.reward}</Text>
          </LinearGradient>
        </Animated.View>

        <View style={styles.dungeonsSection}>
          <Text style={styles.sectionTitle}>Available Dungeons</Text>
          {dungeons.map((dungeon, index) => (
            <DungeonCard 
              key={dungeon.id} 
              dungeon={dungeon} 
              delay={index * 150 + 400}
            />
          ))}
        </View>

        <Animated.View 
          style={styles.quickActions}
          entering={FadeInDown.duration(600).delay(800)}
        >
          <TouchableOpacity style={styles.quickActionButton}>
            <Users color="#d4af37" size={20} />
            <Text style={styles.quickActionText}>Find Party</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <Swords color="#d4af37" size={20} />
            <Text style={styles.quickActionText}>Quick Match</Text>
          </TouchableOpacity>
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
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#a0a0a0',
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  weeklyChallenge: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  challengeGradient: {
    padding: 16,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeTitle: {
    color: '#1a1625',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
  },
  challengeTimer: {
    color: '#1a1625',
    fontSize: 12,
    fontWeight: '600',
  },
  challengeName: {
    color: '#1a1625',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  challengeDescription: {
    color: '#2d2438',
    fontSize: 14,
    marginBottom: 12,
  },
  challengeProgress: {
    marginBottom: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    color: '#2d2438',
    fontSize: 12,
  },
  progressValue: {
    color: '#1a1625',
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#2d2438',
    borderRadius: 3,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#1a1625',
    borderRadius: 3,
  },
  challengeReward: {
    color: '#1a1625',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dungeonsSection: {
    marginBottom: 24,
  },
  dungeonCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  lockedCard: {
    opacity: 0.6,
  },
  dungeonGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  dungeonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dungeonInfo: {
    flex: 1,
  },
  dungeonName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dungeonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dungeonType: {
    fontSize: 14,
    fontWeight: '600',
  },
  separator: {
    color: '#a0a0a0',
    marginHorizontal: 8,
  },
  dungeonDifficulty: {
    fontSize: 14,
    fontWeight: '600',
  },
  dungeonStatus: {
    padding: 4,
  },
  lockedText: {
    color: '#6b5b95',
  },
  dungeonDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    color: '#a0a0a0',
    fontSize: 12,
    marginLeft: 4,
  },
  rewardsContainer: {
    marginBottom: 12,
  },
  rewardsLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  rewardsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rewardChip: {
    backgroundColor: '#2d2438',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  rewardText: {
    color: '#d4af37',
    fontSize: 11,
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#d4af37',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#2d2438',
  },
  actionButtonText: {
    color: '#1a1625',
    fontSize: 14,
    fontWeight: 'bold',
  },
  completedButtonText: {
    color: '#d4af37',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#1a1625',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  quickActionText: {
    color: '#d4af37',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
});