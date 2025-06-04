import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

type PaymentMethod = 'card' | 'paypal' | 'crypto';

export default function BuyTokensScreen() {
  const [amount, setAmount] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleAmountChange = (value: string) => {
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleBuy = () => {
    setLoading(true);
    // Simulate purchase
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 2000);
  };

  // Calculate MXN value
  const mxnValue = parseInt(amount || '0') * 20;

  const divValue = useSharedValue(1);
  const mxnScale = useSharedValue(1);
  
  const handleIncrement = () => {
    const newAmount = parseInt(amount || '0') + 1;
    setAmount(newAmount.toString());
    divValue.value = withTiming(1.2, { duration: 150 }, () => {
      divValue.value = withTiming(1, { duration: 150 });
    });
  };

  const handleDecrement = () => {
    const newAmount = Math.max(1, parseInt(amount || '0') - 1);
    setAmount(newAmount.toString());
    mxnScale.value = withTiming(1.2, { duration: 150 }, () => {
      mxnScale.value = withTiming(1, { duration: 150 });
    });
  };

  const divAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: divValue.value }],
    };
  });

  const mxnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: mxnScale.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Buy DIV Tokens</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>About DIV Tokens</Text>
          <Text style={styles.infoText}>
            DIV is a purchased token that can be used within the Grail ecosystem to pay for products and services.
            Each DIV token is worth 20 Mexican pesos.
          </Text>
        </View>

        <View style={styles.amountSection}>
          <Text style={styles.sectionTitle}>Amount to Buy</Text>
          
          <View style={styles.amountContainer}>
            <TouchableOpacity 
              style={styles.amountButton}
              onPress={handleDecrement}
              disabled={parseInt(amount) <= 1}
            >
              <Ionicons name="remove" size={24} color={parseInt(amount) <= 1 ? Colors.light.tabIconDefault : Colors.light.text} />
            </TouchableOpacity>
            
            <View style={styles.amountInputContainer}>
              <Input
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="number-pad"
                style={styles.amountInput}
              />
              <Animated.Text style={[styles.amountSuffix, divAnimatedStyle]}>DIV</Animated.Text>
            </View>
            
            <TouchableOpacity style={styles.amountButton} onPress={handleIncrement}>
              <Ionicons name="add" size={24} color={Colors.light.text} />
            </TouchableOpacity>
          </View>
          
          <Animated.Text style={[styles.mxnValue, mxnAnimatedStyle]}>
            = {mxnValue} MXN
          </Animated.Text>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <View style={styles.paymentOptions}>
            <TouchableOpacity 
              style={[
                styles.paymentOption, 
                paymentMethod === 'card' && styles.selectedPaymentOption
              ]}
              onPress={() => setPaymentMethod('card')}
            >
              <Ionicons 
                name="card" 
                size={24} 
                color={paymentMethod === 'card' ? Colors.light.primary : Colors.light.text} 
              />
              <Text 
                style={[
                  styles.paymentText, 
                  paymentMethod === 'card' && styles.selectedPaymentText
                ]}
              >
                Credit Card
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.paymentOption, 
                paymentMethod === 'paypal' && styles.selectedPaymentOption
              ]}
              onPress={() => setPaymentMethod('paypal')}
            >
              <Image 
                source={{ uri: 'https://i.imgur.com/i2Zj1XT.png' }} 
                style={styles.paypalIcon} 
              />
              <Text 
                style={[
                  styles.paymentText, 
                  paymentMethod === 'paypal' && styles.selectedPaymentText
                ]}
              >
                PayPal
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.paymentOption, 
                paymentMethod === 'crypto' && styles.selectedPaymentOption
              ]}
              onPress={() => setPaymentMethod('crypto')}
            >
              <Ionicons 
                name="logo-bitcoin" 
                size={24} 
                color={paymentMethod === 'crypto' ? Colors.light.primary : Colors.light.text} 
              />
              <Text 
                style={[
                  styles.paymentText, 
                  paymentMethod === 'crypto' && styles.selectedPaymentText
                ]}
              >
                Crypto
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>DIV Tokens</Text>
            <Text style={styles.summaryValue}>{amount} DIV</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price per DIV</Text>
            <Text style={styles.summaryValue}>20 MXN</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{mxnValue} MXN</Text>
          </View>
        </View>

        <Button 
          title={`Buy ${amount} DIV for ${mxnValue} MXN`}
          onPress={handleBuy}
          loading={loading}
          style={styles.buyButton}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  backButton: {
    padding: 4,
  },
  placeholder: {
    width: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  infoCard: {
    backgroundColor: Colors.light.primary + '15',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.text,
  },
  amountSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  amountButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  amountInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  amountSuffix: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.dive,
    position: 'absolute',
    right: 16,
  },
  mxnValue: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.light.tabIconDefault,
    marginTop: 8,
  },
  paymentSection: {
    marginBottom: 24,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentOption: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedPaymentOption: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.primary + '10',
  },
  paymentText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.light.text,
  },
  selectedPaymentText: {
    color: Colors.light.primary,
    fontWeight: '500',
  },
  paypalIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  summarySection: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  buyButton: {
    marginTop: 8,
  },
});