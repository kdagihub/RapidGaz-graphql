import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Plus, Search, Edit, Trash2, MoreVertical } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';

// Mock data for demonstration
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Bouteille de gaz 12.5kg',
    price: 25.99,
    image: 'https://images.pexels.com/photos/3494806/pexels-photo-3494806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 15,
    size: '12.5kg',
    brand: 'TotalEnergies',
  },
  {
    id: '2',
    name: 'Bouteille de gaz 6kg',
    price: 15.49,
    image: 'https://images.pexels.com/photos/5767768/pexels-photo-5767768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 8,
    size: '6kg',
    brand: 'Ultragaz',
  },
  {
    id: '3',
    name: 'Bouteille de gaz 3kg',
    price: 10.99,
    image: 'https://images.pexels.com/photos/5769247/pexels-photo-5769247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 5,
    size: '3kg',
    brand: 'GazPlus',
  },
  {
    id: '4',
    name: 'Bouteille de gaz 35kg',
    price: 65.99,
    image: 'https://images.pexels.com/photos/127073/pexels-photo-127073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stock: 3,
    size: '35kg',
    brand: 'TotalEnergies',
  },
];

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);
  
  const filteredProducts = MOCK_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.size.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleMenu = (productId: string) => {
    if (isMenuOpen === productId) {
      setIsMenuOpen(null);
    } else {
      setIsMenuOpen(productId);
    }
  };
  
  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productContent}>
        <View style={styles.productHeader}>
          <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => toggleMenu(item.id)}
            >
              <MoreVertical size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
            
            {isMenuOpen === item.id && (
              <View style={styles.menuDropdown}>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    toggleMenu(item.id);
                    router.push(`/product-edit/${item.id}`);
                  }}
                >
                  <Edit size={16} color={Colors.primary} />
                  <Text style={styles.menuItemText}>Modifier</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.menuItem}>
                  <Trash2 size={16} color={Colors.error} />
                  <Text style={[styles.menuItemText, styles.deleteText]}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.productDetails}>
          <Text style={styles.productBrand}>{item.brand}</Text>
          <Text style={styles.productSize}>{item.size}</Text>
        </View>
        
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>{item.price.toFixed(2)} €</Text>
          <View 
            style={[
              styles.stockBadge,
              item.stock > 10 ? styles.inStockBadge : 
              item.stock > 0 ? styles.lowStockBadge : styles.outOfStockBadge
            ]}
          >
            <Text 
              style={[
                styles.stockText,
                item.stock > 10 ? styles.inStockText : 
                item.stock > 0 ? styles.lowStockText : styles.outOfStockText
              ]}
            >
              {item.stock > 10 ? 'En stock' : 
               item.stock > 0 ? 'Stock bas' : 'Rupture'}
            </Text>
          </View>
        </View>
        
        <View style={styles.stockCounter}>
          <Text style={styles.stockCounterText}>Quantité: {item.stock}</Text>
        </View>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Produits</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/product-add')}
        >
          <Plus size={24} color={Colors.textInverse} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher des produits..."
            placeholderTextColor={Colors.textDisabled}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{MOCK_PRODUCTS.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {MOCK_PRODUCTS.filter(p => p.stock > 0).length}
          </Text>
          <Text style={styles.statLabel}>En stock</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {MOCK_PRODUCTS.filter(p => p.stock <= 0).length}
          </Text>
          <Text style={styles.statLabel}>Épuisés</Text>
        </View>
      </View>
      
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Aucun produit trouvé. Ajoutez des produits à votre catalogue.
          </Text>
          <Button 
            title="Ajouter un produit" 
            icon={<Plus size={20} color={Colors.textInverse} />}
            style={styles.emptyAddButton}
            onPress={() => router.push('/product-add')}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 8,
    padding: 0,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  productsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  productCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
  },
  productImage: {
    width: 100,
    height: '100%',
    resizeMode: 'cover',
  },
  productContent: {
    flex: 1,
    padding: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    flex: 1,
  },
  menuContainer: {
    position: 'relative',
  },
  menuButton: {
    padding: 4,
  },
  menuDropdown: {
    position: 'absolute',
    top: 32,
    right: 0,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 8,
    elevation: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    zIndex: 100,
    width: 120,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  menuItemText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  deleteText: {
    color: Colors.error,
  },
  productDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  productBrand: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  productSize: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.primary,
  },
  stockBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  inStockBadge: {
    backgroundColor: Colors.available + '20', // 20% opacity
  },
  lowStockBadge: {
    backgroundColor: Colors.warning + '20', // 20% opacity
  },
  outOfStockBadge: {
    backgroundColor: Colors.error + '20', // 20% opacity
  },
  stockText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  inStockText: {
    color: Colors.available,
  },
  lowStockText: {
    color: Colors.warning,
  },
  outOfStockText: {
    color: Colors.error,
  },
  stockCounter: {
    backgroundColor: Colors.background,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  stockCounterText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyAddButton: {
    width: 200,
  },
});