import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, FadeInLeft } from 'react-native-reanimated';
import { Users, UserPlus, MessageCircle, Crown, Swords, Shield, Zap, Search, Filter } from 'lucide-react-native';

export default function PartyScreen() {
  const currentParty = {
    name: 'Erdtree Explorers',
    leader: 'KnightOfGrace',
    members: [
      { name: 'KnightOfGrace', class: 'Paladin', level: 52, role: 'Tank', status: 'online' },
      { name: 'ShadowMage', class: 'Sorcerer', level: 48, role: 'DPS', status: 'online' },
      { name: 'HealerOfLight', class: 'Prophet', level: 46, role: 'Healer', status: 'away' },
      { name: 'You', class: 'Spellsword', level: 47, role: 'DPS', status: 'online' },
    ],
    maxMembers: 6,
    activity: 'Exploring Caelid',
  };

  const availableParties = [
    {
      id: 1,
      name: 'Stormveil Raiders',
      leader: 'StormKing99',
      activity: 'Legacy Dungeon Run',
      members: 3,
      maxMembers: 4,
      difficulty: 'Hard',
      requirements: 'Level 30+, Voice Chat',
      language: 'English',
      region: 'NA East',
    },
    {
      id: 2,
      name: 'Moonlight Covenant',
      leader: 'LunarMystic',
      activity: 'Raya Lucaria Academy',
      members: 6,
      maxMembers: 8,
      difficulty: 'Extreme',
      requirements: 'Level 45+, Experienced',
      language: 'English',
      region: 'EU West',
    },
    {
      id: 3,
      name: 'Dragon Hunters',
      leader: 'DragonSlayer',
      activity: 'World Boss Farming',
      members: 2,
      maxMembers: 4,
      difficulty: 'Normal',
      requirements: 'Level 25+, Casual',
      language: 'English',
      region: 'NA West',
    },
  ];

  const roleIcons = {
    Tank: Shield,
    DPS: Swords,
    Healer: Zap,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return '#27ae60';
      case 'away':
        return '#f39c12';
      case 'offline':
        return '#95a5a6';
      default:
        return '#95a5a6';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Tank':
        return '#3498db';
      case 'DPS':
        return '#e74c3c';
      case 'Healer':
        return '#27ae60';
      default:
        return '#a0a0a0';
    }
  };

  const MemberCard = ({ member, isLeader = false }: any) => {
    const RoleIcon = roleIcons[member.role as keyof typeof roleIcons];
    
    return (
      <View style={styles.memberCard}>
        <View style={styles.memberInfo}>
          <View style={styles.memberHeader}>
            <View style={styles.memberNameContainer}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(member.status) }]} />
              <Text style={styles.memberName}>{member.name}</Text>
              {isLeader && <Crown color="#d4af37" size={14} />}
            </View>
            <Text style={styles.memberLevel}>Lv.{member.level}</Text>
          </View>
          
          <View style={styles.memberDetails}>
            <Text style={styles.memberClass}>{member.class}</Text>
            <View style={styles.roleContainer}>
              <RoleIcon color={getRoleColor(member.role)} size={14} />
              <Text style={[styles.memberRole, { color: getRoleColor(member.role) }]}>
                {member.role}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.memberAction}>
          <MessageCircle color="#6b5b95" size={16} />
        </TouchableOpacity>
      </View>
    );
  };

  const PartyListItem = ({ party }: any) => (
    <TouchableOpacity style={styles.partyListItem}>
      <View style={styles.partyHeader}>
        <Text style={styles.partyName}>{party.name}</Text>
        <Text style={styles.partyMembers}>{party.members}/{party.maxMembers}</Text>
      </View>
      
      <Text style={styles.partyActivity}>{party.activity}</Text>
      <Text style={styles.partyLeader}>Leader: {party.leader}</Text>
      
      <View style={styles.partyMeta}>
        <View style={styles.partyTag}>
          <Text style={styles.partyTagText}>{party.difficulty}</Text>
        </View>
        <View style={styles.partyTag}>
          <Text style={styles.partyTagText}>{party.region}</Text>
        </View>
        <View style={styles.partyTag}>
          <Text style={styles.partyTagText}>{party.language}</Text>
        </View>
      </View>
      
      <Text style={styles.partyRequirements}>{party.requirements}</Text>
      
      <TouchableOpacity style={styles.joinButton}>
        <UserPlus color="#1a1625" size={16} />
        <Text style={styles.joinButtonText}>Request to Join</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#2d1b69', '#1a1625']}
        style={styles.headerGradient}
      >
        <Animated.View style={styles.header} entering={FadeInUp.duration(800)}>
          <Text style={styles.headerTitle}>Party & Groups</Text>
          <Text style={styles.headerSubtitle}>Find allies for your adventures</Text>
        </Animated.View>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View style={styles.currentPartySection} entering={FadeInDown.duration(600)}>
          <Text style={styles.sectionTitle}>Current Party</Text>
          
          <View style={styles.partyCard}>
            <LinearGradient
              colors={['#1a1625', '#2d2438']}
              style={styles.partyGradient}
            >
              <View style={styles.partyInfo}>
                <Text style={styles.currentPartyName}>{currentParty.name}</Text>
                <Text style={styles.currentPartyActivity}>{currentParty.activity}</Text>
                <Text style={styles.partyMembersCount}>
                  {currentParty.members.length}/{currentParty.maxMembers} members
                </Text>
              </View>
              
              <View style={styles.membersContainer}>
                {currentParty.members.map((member, index) => (
                  <MemberCard 
                    key={index} 
                    member={member} 
                    isLeader={member.name === currentParty.leader}
                  />
                ))}
              </View>
              
              <View style={styles.partyActions}>
                <TouchableOpacity style={styles.partyActionButton}>
                  <UserPlus color="#d4af37" size={16} />
                  <Text style={styles.partyActionText}>Invite Player</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.partyActionButton}>
                  <MessageCircle color="#d4af37" size={16} />
                  <Text style={styles.partyActionText}>Group Chat</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </Animated.View>

        <Animated.View style={styles.findPartySection} entering={FadeInLeft.duration(600).delay(300)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Find Party</Text>
            <View style={styles.searchActions}>
              <TouchableOpacity style={styles.searchButton}>
                <Search color="#d4af37" size={18} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Filter color="#d4af37" size={18} />
              </TouchableOpacity>
            </View>
          </View>
          
          {availableParties.map((party, index) => (
            <Animated.View 
              key={party.id}
              entering={FadeInDown.duration(600).delay(index * 100 + 500)}
            >
              <PartyListItem party={party} />
            </Animated.View>
          ))}
        </Animated.View>

        <Animated.View style={styles.quickActions} entering={FadeInDown.duration(600).delay(800)}>
          <TouchableOpacity style={styles.createPartyButton}>
            <Users color="#1a1625" size={20} />
            <Text style={styles.createPartyText}>Create New Party</Text>
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
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  currentPartySection: {
    marginBottom: 24,
  },
  partyCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  partyGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  partyInfo: {
    marginBottom: 16,
  },
  currentPartyName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  currentPartyActivity: {
    color: '#d4af37',
    fontSize: 14,
    marginBottom: 4,
  },
  partyMembersCount: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  membersContainer: {
    marginBottom: 16,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2438',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  memberInfo: {
    flex: 1,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  memberNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  memberName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  memberLevel: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  memberDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberClass: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberRole: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  memberAction: {
    padding: 8,
  },
  partyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  partyActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d2438',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  partyActionText: {
    color: '#d4af37',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  findPartySection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchActions: {
    flexDirection: 'row',
  },
  searchButton: {
    padding: 8,
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
  },
  partyListItem: {
    backgroundColor: '#1a1625',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2d2438',
  },
  partyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  partyName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  partyMembers: {
    color: '#d4af37',
    fontSize: 14,
    fontWeight: '600',
  },
  partyActivity: {
    color: '#a0a0a0',
    fontSize: 14,
    marginBottom: 4,
  },
  partyLeader: {
    color: '#a0a0a0',
    fontSize: 12,
    marginBottom: 8,
  },
  partyMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  partyTag: {
    backgroundColor: '#2d2438',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
  },
  partyTagText: {
    color: '#d4af37',
    fontSize: 10,
    fontWeight: '500',
  },
  partyRequirements: {
    color: '#a0a0a0',
    fontSize: 12,
    marginBottom: 12,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d4af37',
    borderRadius: 8,
    padding: 10,
  },
  joinButtonText: {
    color: '#1a1625',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  quickActions: {
    marginBottom: 24,
  },
  createPartyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d4af37',
    borderRadius: 12,
    padding: 16,
  },
  createPartyText: {
    color: '#1a1625',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});