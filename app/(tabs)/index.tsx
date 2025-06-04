import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { TokenBalance } from '@/components/tokens/TokenBalance';
import { TransactionItem } from '@/components/tokens/TransactionItem';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from 'react-native-reanimated';

export default function HomeScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.header, animatedStyle]}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>Alex</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.balanceSection, animatedStyle]}>
          <Text style={styles.sectionTitle}>Your Tokens</Text>
          
          <View style={styles.tokenCards}>
            <TokenBalance 
              type="DOV"
              amount={750}
              symbol="D"
              label="Earned Rewards"
            />
            <TokenBalance 
              type="DIV"
              amount={35}
              symbol="D"
              label="Purchased Tokens"
            />
          </View>

          <View style={styles.actions}>
            <Button 
              title="Buy DIV"
              onPress={() => router.push('/wallet/buy')}
              style={styles.actionButton}
            />
            <Button
              title="Claim Rewards"
              variant="outline"
              onPress={() => {}}
              style={styles.actionButton}
            />
          </View>
        </Animated.View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScroll}
          >
            <TouchableOpacity style={styles.featuredItem} onPress={() => router.push('/marketplace/1')}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/584399/living-room-couch-interior-room-584399.jpeg' }} 
                style={styles.featuredImage} 
              />
              <View style={styles.featuredOverlay}>
                <Text style={styles.featuredTitle}>Modern Furniture</Text>
                <View style={styles.featuredPriceContainer}>
                  <Text style={styles.featuredPrice}>5 DIV + 50 DOV</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featuredItem} onPress={() => router.push('/marketplace/2')}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/2506990/pexels-photo-2506990.jpeg' }} 
                style={styles.featuredImage} 
              />
              <View style={styles.featuredOverlay}>
                <Text style={styles.featuredTitle}>Studio Session</Text>
                <View style={styles.featuredPriceContainer}>
                  <Text style={styles.featuredPrice}>10 DIV</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featuredItem} onPress={() => router.push('/marketplace/3')}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg' }} 
                style={styles.featuredImage} 
              />
              <View style={styles.featuredOverlay}>
                <Text style={styles.featuredTitle}>Hotel Stay</Text>
                <View style={styles.featuredPriceContainer}>
                  <Text style={styles.featuredPrice}>15 DIV + 100 DOV</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <Link href="/wallet" asChild>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          <TransactionItem
            type="reward"
            tokenType="DOV"
            amount={100}
            title="Referral Bonus"
            date="Today, 2:30 PM"
          />
          
          <TransactionItem
            type="purchase"
            tokenType="DIV"
            amount={5}
            title="Studio Session"
            date="Yesterday, 5:45 PM"
          />
          
          <TransactionItem
            type="send"
            tokenType="DOV"
            amount={25}
            title="Token Transfer"
            date="July 10, 2023"
            recipient="Maria Lopez"
          />
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 16,
    color: Colors.light.tabIconDefault,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
  },
  balanceSection: {
    padding: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 16,
  },
  tokenCards: {
    flexDirection: 'row',
    gap: 12,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  featuredSection: {
    padding: 20,
    marginBottom: 8,
  },
  featuredScroll: {
    paddingRight: 20,
  },
  featuredItem: {
    width: 280,
    height: 180,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  featuredTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  featuredPriceContainer: {
    marginTop: 4,
  },
  featuredPrice: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  recentSection: {
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: Colors.light.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});