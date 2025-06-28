import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, FadeInRight } from 'react-native-reanimated';
import { 
  User, Settings, Bell, Shield, Globe, Headphones, 
  Trophy, Star, Crown, Swords, MapPin, Clock, 
  ChevronRight, LogOut, HelpCircle
} from 'lucide-react-native';

export default function ProfileScreen() {
  const playerStats = {
    totalPlayTime: '156h 32m',
    dungeonsCompleted: 47,
    bossesDefeated: 23,
    achievementsUnlocked: 89,
    favoriteRegion: 'Limgrave',
    joinDate: 'March 2024',
  };

  const achievements = [
    { name: 'First Steps', description: 'Complete your first dungeon', unlocked: true },
    { name: 'Dragonslayer', description: 'Defeat an Ancient Dragon', unlocked: true },
    { name: 'Master Explorer', description: 'Discover 50 locations', unlocked: true },
    { name: 'Legendary Hero', description: 'Reach level 100', unlocked: false },
  ];

  const settingsData = {
    notifications: true,
    soundEffects: true,
    backgroundMusic: true,
    voiceChat: false,
    publicProfile: true,
    showOnlineStatus: true,
  };

  const SettingItem = ({ icon: Icon, title, subtitle, hasSwitch = false, value = false, onToggle }: any) => (
    <TouchableOpacity style={styles.settingItem} onPress={!hasSwitch ? undefined : onToggle}>
      <View style={styles.settingIcon}>
        <Icon color="#d4af37" size={20} />
      </View>
      
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        )}
      </View>
      
      {hasSwitch ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#2d2438', true: '#d4af37' }}
          thumbColor={value ? '#ffffff' : '#6b5b95'}
        />
      ) : (
        <ChevronRight color="#6b5b95" size={16} />
      )}
    </TouchableOpacity>
  );

  const StatCard = ({ icon: Icon, value, label, color }: any) => (
    <View style={styles.statCard}>
      <Icon color={color} size={24} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const AchievementItem = ({ achievement }: any) => (
    <View style={[styles.achievementItem, !achievement.unlocked && styles.lockedAchievement]}>
      <View style={styles.achievementIcon}>
        <Trophy 
          color={achievement.unlocked ? "#d4af37" : "#6b5b95"} 
          size={20} 
        />
      </View>
      
      <View style={styles.achievementInfo}>
        <Text style={[
          styles.achievementName,
          !achievement.unlocked && styles.lockedText
        ]}>
          {achievement.name}
        </Text>
        <Text style={[
          styles.achievementDescription,
          !achievement.unlocked && styles.lockedText
        ]}>
          {achievement.description}
        </Text>
      </View>
      
      {achievement.unlocked && (
        <Star color="#d4af37" size={16} />
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#2d1b69', '#1a1625']}
        style={styles.headerGradient}
      >
        <Animated.View style={styles.profileHeader} entering={FadeInUp.duration(800)}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User color="#d4af37" size={40} />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Settings color="#ffffff" size={12} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.playerName}>Arden the Wanderer</Text>
            <Text style={styles.playerTitle}>Spellsword of Yggdrasil</Text>
            <Text style={styles.joinDate}>Tarnished since {playerStats.joinDate}</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View style={styles.statsSection} entering={FadeInDown.duration(600).delay(200)}>
          <Text style={styles.sectionTitle}>Player Statistics</Text>
          
          <View style={styles.statsGrid}>
            <StatCard 
              icon={Clock}
              value={playerStats.totalPlayTime}
              label="Play Time"
              color="#3498db"
            />
            <StatCard 
              icon={Swords}
              value={playerStats.dungeonsCompleted}
              label="Dungeons"
              color="#e74c3c"
            />
            <StatCard 
              icon={Crown}
              value={playerStats.bossesDefeated}
              label="Bosses"
              color="#f39c12"
            />
            <StatCard 
              icon={Trophy}
              value={playerStats.achievementsUnlocked}
              label="Achievements"
              color="#d4af37"
            />
          </View>
          
          <View style={styles.favoriteRegion}>
            <MapPin color="#27ae60" size={16} />
            <Text style={styles.favoriteRegionText}>
              Favorite Region: {playerStats.favoriteRegion}
            </Text>
          </View>
        </Animated.View>

        <Animated.View style={styles.achievementsSection} entering={FadeInRight.duration(600).delay(400)}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          {achievements.map((achievement, index) => (
            <AchievementItem key={index} achievement={achievement} />
          ))}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Achievements</Text>
            <ChevronRight color="#d4af37" size={16} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={styles.settingsSection} entering={FadeInDown.duration(600).delay(600)}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingsGroup}>
            <Text style={styles.settingsGroupTitle}>Notifications</Text>
            <SettingItem
              icon={Bell}
              title="Push Notifications"
              subtitle="Get notified about party invites and events"
              hasSwitch={true}
              value={settingsData.notifications}
              onToggle={() => {}}
            />
          </View>
          
          <View style={styles.settingsGroup}>
            <Text style={styles.settingsGroupTitle}>Audio</Text>
            <SettingItem
              icon={Headphones}
              title="Sound Effects"
              hasSwitch={true}
              value={settingsData.soundEffects}
              onToggle={() => {}}
            />
            <SettingItem
              icon={Headphones}
              title="Background Music"
              hasSwitch={true}
              value={settingsData.backgroundMusic}
              onToggle={() => {}}
            />
            <SettingItem
              icon={Headphones}
              title="Voice Chat"
              hasSwitch={true}
              value={settingsData.voiceChat}
              onToggle={() => {}}
            />
          </View>
          
          <View style={styles.settingsGroup}>
            <Text style={styles.settingsGroupTitle}>Privacy</Text>
            <SettingItem
              icon={Globe}
              title="Public Profile"
              subtitle="Allow others to view your profile"
              hasSwitch={true}
              value={settingsData.publicProfile}
              onToggle={() => {}}
            />
            <SettingItem
              icon={Shield}
              title="Show Online Status"
              hasSwitch={true}
              value={settingsData.showOnlineStatus}
              onToggle={() => {}}
            />
          </View>
          
          <View style={styles.settingsGroup}>
            <Text style={styles.settingsGroupTitle}>Support</Text>
            <SettingItem
              icon={HelpCircle}
              title="Help & Support"
              subtitle="Get help with the app"
            />
            <SettingItem
              icon={Settings}
              title="App Settings"
              subtitle="General app preferences"
            />
          </View>
          
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut color="#e74c3c" size={20} />
            <Text style={styles.logoutText}>Sign Out</Text>
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
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2d2438',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#d4af37',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#d4af37',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  playerName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  playerTitle: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  joinDate: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  statsSection: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1a1625',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  favoriteRegion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1625',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  favoriteRegionText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 8,
  },
  achievementsSection: {
    marginBottom: 24,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1625',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2d2438',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  achievementDescription: {
    color: '#a0a0a0',
    fontSize: 12,
    marginTop: 2,
  },
  lockedText: {
    color: '#6b5b95',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d2438',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  viewAllText: {
    color: '#d4af37',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingsGroup: {
    marginBottom: 24,
  },
  settingsGroupTitle: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1625',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2d2438',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  settingSubtitle: {
    color: '#a0a0a0',
    fontSize: 12,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d2438',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  logoutText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});