import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ProductCard } from '@/components/marketplace/ProductCard';
import Colors from '@/constants/Colors';

// Sample data for the marketplace
const CATEGORIES = [
  'All',
  'Furniture',
  'Hotels',
  'Studios',
  'Decor',
  'Lifestyle',
];

const PRODUCTS = [
  {
    id: '1',
    title: 'Modern Sofa',
    imageUrl: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',
    divPrice: 25,
    dovPrice: 200,
    category: 'Furniture',
  },
  {
    id: '2',
    title: 'Recording Studio - 2hr',
    imageUrl: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg',
    divPrice: 10,
    dovPrice: 50,
    category: 'Studios',
  },
  {
    id: '3',
    title: 'Luxury Hotel - 1 Night',
    imageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    divPrice: 30,
    dovPrice: 300,
    category: 'Hotels',
  },
  {
    id: '4',
    title: 'Ceramic Vase',
    imageUrl: 'https://images.pexels.com/photos/2789545/pexels-photo-2789545.jpeg',
    divPrice: 5,
    dovPrice: 75,
    category: 'Decor',
  },
  {
    id: '5',
    title: 'Desk Chair',
    imageUrl: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg',
    divPrice: 15,
    dovPrice: 150,
    category: 'Furniture',
  },
  {
    id: '6',
    title: 'Premium Headphones',
    imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    divPrice: 8,
    dovPrice: 120,
    category: 'Lifestyle',
  },
];

export default function MarketplaceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Marketplace</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.light.tabIconDefault} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.light.tabIconDefault}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.light.tabIconDefault} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                activeCategory === item && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === item && styles.activeCategoryText
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard {...item} />}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color={Colors.light.tabIconDefault} />
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />
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
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: Colors.light.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 8,
    fontSize: 16,
    color: Colors.light.text,
  },
  categoriesContainer: {
    height: 48,
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  activeCategoryButton: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  categoryText: {
    color: Colors.light.text,
    fontSize: 14,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  productsGrid: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginTop: 8,
    textAlign: 'center',
  },
});