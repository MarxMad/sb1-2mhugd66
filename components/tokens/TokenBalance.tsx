import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

interface TokenBalanceProps {
  type: 'DOV' | 'DIV';
  amount: number;
  symbol: string;
  label: string;
}

export function TokenBalance({ type, amount, symbol, label }: TokenBalanceProps) {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const isDoV = type === 'DOV';
  const backgroundColor = isDoV ? Colors.light.dove : Colors.light.dive;

  return (
    <Animated.View
      style={[styles.container, { backgroundColor }, animatedStyle]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      onTouchCancel={handlePressOut}
    >
      <View style={styles.topRow}>
        <Text style={styles.tokenType}>{type}</Text>
        <View style={styles.symbolContainer}>
          <Text style={styles.symbolText}>{symbol}</Text>
        </View>
      </View>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceAmount}>{amount.toLocaleString()}</Text>
        <Text style={styles.balanceLabel}>{label}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    minHeight: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenType: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  symbolContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    color: 'white',
    fontWeight: '700',
  },
  balanceContainer: {
    marginTop: 20,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 4,
  },
});