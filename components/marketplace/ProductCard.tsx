import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24;

interface ProductCardProps {
  id: string;
  title: string;
  imageUrl: string;
  divPrice: number;
  dovPrice: number;
  category: string;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function ProductCard({
  id,
  title,
  imageUrl,
  divPrice,
  dovPrice,
  category,
}: ProductCardProps) {
  const router = useRouter();
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    router.push(`/marketplace/${id}`);
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchable
      style={[styles.container, animatedStyle]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        
        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <View style={[styles.tokenBadge, styles.divBadge]}>
              <Text style={styles.tokenText}>DIV</Text>
            </View>
            <Text style={styles.priceText}>{divPrice}</Text>
          </View>
          
          {dovPrice > 0 && (
            <View style={styles.priceRow}>
              <View style={[styles.tokenBadge, styles.dovBadge]}>
                <Text style={styles.tokenText}>DOV</Text>
              </View>
              <Text style={styles.priceText}>{dovPrice}</Text>
            </View>
          )}
        </View>
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  detailsContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  priceContainer: {
    gap: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tokenBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  divBadge: {
    backgroundColor: Colors.light.dive + '30',
  },
  dovBadge: {
    backgroundColor: Colors.light.dove + '30',
  },
  tokenText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.light.text,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
});