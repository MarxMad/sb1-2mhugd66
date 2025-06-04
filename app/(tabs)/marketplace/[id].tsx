import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  runOnJS
} from 'react-native-reanimated';

// Sample product data
const PRODUCTS = {
  '1': {
    id: '1',
    title: 'Modern Sofa',
    description: 'A beautiful modern sofa for your living room. Made with premium materials and designed for comfort and style.',
    imageUrl: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',
    divPrice: 25,
    dovPrice: 200,
    category: 'Furniture',
    features: [
      'Premium fabric upholstery',
      'Solid wood frame',
      'Comfortable cushions',
      'Modern design',
    ],
    dimensions: {
      width: '200 cm',
      height: '85 cm',
      depth: '90 cm',
    },
  },
  '2': {
    id: '2',
    title: 'Recording Studio - 2hr',
    description: 'Professional recording studio session for 2 hours. Includes engineer assistance and equipment.',
    imageUrl: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg',
    divPrice: 10,
    dovPrice: 50,
    category: 'Studios',
    features: [
      'Professional equipment',
      'Sound engineer assistance',
      'Acoustic treatment',
      'Mixing included',
    ],
    location: 'Mexico City, Downtown',
    availability: 'Monday to Saturday, 10am - 10pm',
  },
  '3': {
    id: '3',
    title: 'Luxury Hotel - 1 Night',
    description: 'Enjoy a luxurious night at one of our partner hotels. Includes breakfast and access to amenities.',
    imageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    divPrice: 30,
    dovPrice: 300,
    category: 'Hotels',
    features: [
      'King size bed',
      'Ocean view',
      'Complimentary breakfast',
      'Access to pool and spa',
    ],
    location: 'Cancun, Mexico',
    checkIn: '3:00 PM',
    checkOut: '12:00 PM',
  },
};

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const id = typeof params.id === 'string' ? params.id : '1';
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);
  
  const product = PRODUCTS[id as keyof typeof PRODUCTS];
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  
  const handlePurchase = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setPurchased(true);
      
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSequence(
        withTiming(1.2, { duration: 300 }),
        withTiming(1, { duration: 300 }, () => {
          setTimeout(() => {
            runOnJS(handleComplete)();
          }, 1000);
        })
      );
    }, 1500);
  };
  
  const handleComplete = () => {
    router.back();
  };
  
  const successAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product.title}</Text>
          
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <View style={styles.priceTag}>
                <Text style={styles.priceLabel}>DIV</Text>
                <Text style={styles.price}>{product.divPrice}</Text>
              </View>
              
              {product.dovPrice > 0 && (
                <View style={styles.priceTag}>
                  <Text style={styles.priceLabel}>DOV</Text>
                  <Text style={styles.price}>{product.dovPrice}</Text>
                </View>
              )}
              
              <Text style={styles.equivalentPrice}>
                = {product.divPrice * 20} MXN
              </Text>
            </View>
          </View>
          
          <Text style={styles.description}>{product.description}</Text>
          
          <View style={styles.featureContainer}>
            <Text style={styles.featureTitle}>Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={18} color={Colors.light.primary} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
          
          {'dimensions' in product && (
            <View style={styles.specContainer}>
              <Text style={styles.specTitle}>Dimensions</Text>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Width:</Text>
                <Text style={styles.specValue}>{product.dimensions.width}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Height:</Text>
                <Text style={styles.specValue}>{product.dimensions.height}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Depth:</Text>
                <Text style={styles.specValue}>{product.dimensions.depth}</Text>
              </View>
            </View>
          )}
          
          {'location' in product && (
            <View style={styles.specContainer}>
              <Text style={styles.specTitle}>Location</Text>
              <Text style={styles.locationText}>{product.location}</Text>
              
              {'availability' in product && (
                <View style={styles.availabilityContainer}>
                  <Text style={styles.specLabel}>Availability:</Text>
                  <Text style={styles.availabilityText}>{product.availability}</Text>
                </View>
              )}
              
              {'checkIn' in product && 'checkOut' in product && (
                <View>
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Check-in:</Text>
                    <Text style={styles.specValue}>{product.checkIn}</Text>
                  </View>
                  <View style={styles.specRow}>
                    <Text style={styles.specLabel}>Check-out:</Text>
                    <Text style={styles.specValue}>{product.checkOut}</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title={
            purchased 
              ? "Purchase Complete!" 
              : `Purchase for ${product.divPrice} DIV + ${product.dovPrice} DOV`
          }
          onPress={handlePurchase}
          loading={loading}
          disabled={purchased}
        />
      </View>
      
      {purchased && (
        <View style={styles.successOverlay}>
          <Animated.View style={[styles.successContent, successAnimatedStyle]}>
            <Ionicons name="checkmark-circle" size={80} color={Colors.light.primary} />
            <Text style={styles.successTitle}>Purchase Complete!</Text>
            <Text style={styles.successText}>Your purchase has been successfully completed.</Text>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  categoryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 16,
  },
  priceContainer: {
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  priceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginRight: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  equivalentPrice: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
    marginBottom: 24,
  },
  featureContainer: {
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 15,
    color: Colors.light.text,
  },
  specContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
  },
  specTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  specLabel: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  specValue: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
  },
  locationText: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 8,
  },
  availabilityContainer: {
    marginTop: 8,
  },
  availabilityText: {
    fontSize: 14,
    color: Colors.light.text,
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  successContent: {
    alignItems: 'center',
    padding: 40,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginTop: 20,
    marginBottom: 8,
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.tabIconDefault,
    maxWidth: '80%',
  },
});