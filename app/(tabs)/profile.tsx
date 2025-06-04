import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/Colors';

const MENU_ITEMS = [
  {
    title: 'Account Settings',
    icon: 'person-circle',
  },
  {
    title: 'Payment Methods',
    icon: 'card',
  },
  {
    title: 'Transaction History',
    icon: 'receipt',
  },
  {
    title: 'Rewards & Referrals',
    icon: 'gift',
  },
  {
    title: 'Notifications',
    icon: 'notifications',
  },
  {
    title: 'Help & Support',
    icon: 'help-circle',
  },
  {
    title: 'About Grail',
    icon: 'information-circle',
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic here
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={Colors.light.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>Alex Johnson</Text>
              <Text style={styles.profileEmail}>alex.johnson@example.com</Text>
              <View style={styles.tokenStatus}>
                <View style={styles.tokenStatusItem}>
                  <Text style={styles.tokenStatusValue}>750</Text>
                  <Text style={styles.tokenStatusLabel}>DOV</Text>
                </View>
                <View style={styles.tokenStatusDivider} />
                <View style={styles.tokenStatusItem}>
                  <Text style={styles.tokenStatusValue}>35</Text>
                  <Text style={styles.tokenStatusLabel}>DIV</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.membershipBadge}>
            <Text style={styles.membershipText}>Gold Member</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon as any} size={24} color={Colors.light.primary} />
              </View>
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.light.tabIconDefault} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.referralCard}>
          <View style={styles.referralContent}>
            <View style={styles.referralIconContainer}>
              <Ionicons name="people" size={28} color={Colors.light.primary} />
            </View>
            <View style={styles.referralTextContainer}>
              <Text style={styles.referralTitle}>Invite Friends</Text>
              <Text style={styles.referralDescription}>
                Earn 50 DOV for each friend that joins Grail!
              </Text>
            </View>
          </View>
          <Button
            title="Share Invite"
            variant="outline"
            onPress={() => {}}
            style={styles.referralButton}
          />
        </View>

        <Button
          title="Logout"
          variant="outline"
          onPress={handleLogout}
          style={styles.logoutButton}
          textStyle={{ color: Colors.light.error }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    margin: 20,
    padding: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileDetails: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginBottom: 8,
  },
  tokenStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenStatusItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  tokenStatusValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    marginRight: 4,
  },
  tokenStatusLabel: {
    fontSize: 12,
    color: Colors.light.tabIconDefault,
  },
  tokenStatusDivider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.light.border,
    marginHorizontal: 12,
  },
  membershipBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  membershipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menuContainer: {
    backgroundColor: Colors.light.card,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
  referralCard: {
    margin: 20,
    padding: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  referralContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  referralIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  referralTextContainer: {
    flex: 1,
  },
  referralTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  referralDescription: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  referralButton: {
    
  },
  logoutButton: {
    marginHorizontal: 20,
    marginBottom: 40,
    borderColor: Colors.light.error,
  },
});