import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

type TransactionType = 'receive' | 'send' | 'purchase' | 'reward';

interface TransactionItemProps {
  type: TransactionType;
  tokenType: 'DOV' | 'DIV';
  amount: number;
  title: string;
  date: string;
  recipient?: string;
}

export function TransactionItem({ 
  type, 
  tokenType, 
  amount, 
  title, 
  date,
  recipient 
}: TransactionItemProps) {
  const getIcon = () => {
    switch (type) {
      case 'receive':
        return <Ionicons name="arrow-down" size={18} color={Colors.light.success} />;
      case 'send':
        return <Ionicons name="arrow-up" size={18} color={Colors.light.error} />;
      case 'purchase':
        return <Ionicons name="cart" size={18} color={Colors.light.warning} />;
      case 'reward':
        return <Ionicons name="gift" size={18} color={Colors.light.primary} />;
      default:
        return null;
    }
  };

  const getAmountColor = () => {
    switch (type) {
      case 'receive':
      case 'reward':
        return Colors.light.success;
      case 'send':
      case 'purchase':
        return Colors.light.error;
      default:
        return Colors.light.text;
    }
  };

  const getAmountPrefix = () => {
    switch (type) {
      case 'receive':
      case 'reward':
        return '+';
      case 'send':
      case 'purchase':
        return '-';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: type === 'reward' ? Colors.light.primary + '20' : Colors.light[tokenType === 'DOV' ? 'dove' : 'dive'] + '20' }]}>
        {getIcon()}
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        {recipient && <Text style={styles.recipient}>To: {recipient}</Text>}
        <Text style={styles.date}>{date}</Text>
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: getAmountColor() }]}>
          {getAmountPrefix()}{amount} {tokenType}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 2,
  },
  recipient: {
    fontSize: 13,
    color: Colors.light.tabIconDefault,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: Colors.light.tabIconDefault,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
});