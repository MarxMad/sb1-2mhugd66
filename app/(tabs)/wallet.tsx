import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TokenBalance } from '@/components/tokens/TokenBalance';
import { TransactionItem } from '@/components/tokens/TransactionItem';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/Colors';

type Filter = 'all' | 'DOV' | 'DIV';

export default function WalletScreen() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const router = useRouter();

  const filterTransactions = (filter: Filter) => {
    setActiveFilter(filter);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Wallet</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.balances}>
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
            title="Send Tokens"
            variant="outline"
            onPress={() => {}}
            style={styles.actionButton}
          />
        </View>

        <View style={styles.transactionSection}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          
          <View style={styles.filters}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === 'all' && styles.activeFilter
              ]}
              onPress={() => filterTransactions('all')}
            >
              <Text style={[
                styles.filterText,
                activeFilter === 'all' && styles.activeFilterText
              ]}>All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === 'DOV' && styles.activeFilter
              ]}
              onPress={() => filterTransactions('DOV')}
            >
              <Text style={[
                styles.filterText,
                activeFilter === 'DOV' && styles.activeFilterText
              ]}>DOV</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === 'DIV' && styles.activeFilter
              ]}
              onPress={() => filterTransactions('DIV')}
            >
              <Text style={[
                styles.filterText,
                activeFilter === 'DIV' && styles.activeFilterText
              ]}>DIV</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactions}>
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

            <TransactionItem
              type="receive"
              tokenType="DIV"
              amount={10}
              title="Token Received"
              date="July 8, 2023"
            />

            <TransactionItem
              type="purchase"
              tokenType="DIV"
              amount={8}
              title="Lifestyle Product"
              date="July 5, 2023"
            />

            <TransactionItem
              type="reward"
              tokenType="DOV"
              amount={50}
              title="Participation Reward"
              date="July 3, 2023"
            />
          </View>
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
    padding: 20,
    backgroundColor: Colors.light.background,
    borderBottomColor: Colors.light.border,
    borderBottomWidth: Platform.OS === 'ios' ? 0 : 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
  },
  content: {
    padding: 20,
    paddingTop: 8,
  },
  balances: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  transactionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  activeFilter: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  filterText: {
    color: Colors.light.text,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  transactions: {
    gap: 8,
  },
});