import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import Colors from '@/constants/Colors';
import { Search, MapPin, Bell, Filter, TrendingUp } from 'lucide-react-native';
import { router } from 'expo-router';
import Button from '@/components/ui/Button';

// Mock data for demonstration
const MOCK_VENDORS = [
  {
    id: '1',
    name: 'Gas Express',
    image: 'https://images.pexels.com/photos/5025656/pexels-photo-5025656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    deliveryTime: '30-45',
    distance: '1.2',
  },
  {
    id: '2',
    name: 'Quick Gaz',
    image: 'https://images.pexels.com/photos/3856440/pexels-photo-3856440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    deliveryTime: '25-40',
    distance: '0.8',
  },
  {
    id: '3',
    name: 'Gaz & Co',
    image: 'https://images.pexels.com/photos/5767768/pexels-photo-5767768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.3,
    deliveryTime: '35-50',
    distance: '1.5',
  },
];

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Bouteille 12.5kg',
    image: 'https://images.pexels.com/photos/3494806/pexels-photo-3494806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 25.99,
    size: '12.5kg',
    brand: 'TotalEnergies',
  },
  {
    id: '2',
    name: 'Bouteille 6kg',
    image: 'https://images.pexels.com/photos/5767768/pexels-photo-5767768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 15.49,
    size: '6kg',
    brand: 'Ultragaz',
  },
  {
    id: '3',
    name: 'Bouteille 3kg',
    image: 'https://images.pexels.com/photos/5769247/pexels-photo-5769247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 10.99,
    size: '3kg',
    brand: 'GazPlus',
  },
];

export default function HomeScreen() {
  const { user, userType } = useAuth();
  const isVendor = userType === 'vendor';
  const [activeCategory, setActiveCategory] = useState('Tous');

  // Render customer home screen
  const renderCustomerHome = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => router.push('/search')}
        >
          <Search size={20} color={Colors.textSecondary} />
          <Text style={styles.searchText}>Rechercher des vendeurs de gaz...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.locationContainer}>
        <MapPin size={16} color={Colors.primary} />
        <Text style={styles.locationText}>Livraison à: </Text>
        <Text style={styles.locationAddress} numberOfLines={1}>
          {user?.address || 'Définir l\'adresse de livraison'}
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Vendeurs populaires</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Voir tous</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_VENDORS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.vendorsList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.vendorCard}
            onPress={() => router.push(`/vendor/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.vendorImage} />
            <View style={styles.vendorInfo}>
              <Text style={styles.vendorName}>{item.name}</Text>
              <View style={styles.vendorMetaContainer}>
                <Text style={styles.vendorMeta}>★ {item.rating}</Text>
                <Text style={styles.vendorMeta}>{item.deliveryTime} min</Text>
                <Text style={styles.vendorMeta}>{item.distance} km</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Produits populaires</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Voir tous</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        {['Tous', '12.5kg', '6kg', '3kg'].map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              activeCategory === category && styles.activeCategoryButton
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text 
              style={[
                styles.categoryButtonText,
                activeCategory === category && styles.activeCategoryButtonText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.productGrid}>
        {MOCK_PRODUCTS.map(product => (
          <TouchableOpacity 
            key={product.id} 
            style={styles.productCard}
            onPress={() => router.push(`/product/${product.id}`)}
          >
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productBrand}>{product.brand}</Text>
              <Text style={styles.productPrice}>{product.price} €</Text>
              <Button 
                title="Ajouter" 
                size="small"
                style={styles.addButton}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  // Render vendor home screen (dashboard)
  const renderVendorHome = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.dashboardHeader}>
        <Text style={styles.dashboardTitle}>Tableau de bord</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Commandes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Évaluation</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>785€</Text>
            <Text style={styles.statLabel}>Revenus</Text>
          </View>
        </View>
        
        <View style={styles.orderSummary}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Commandes récentes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir toutes</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.orderCards}>
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>#ORD-1234</Text>
                <View style={styles.orderStatusBadge}>
                  <Text style={styles.orderStatusText}>En cours</Text>
                </View>
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderCustomer}>Jean Dupont</Text>
                <Text style={styles.orderDate}>Aujourd'hui, 14:30</Text>
              </View>
              <View style={styles.orderItemsContainer}>
                <Text style={styles.orderItemsText}>2 x Bouteille 12.5kg</Text>
              </View>
              <View style={styles.orderActions}>
                <Button 
                  title="Détails" 
                  variant="outline" 
                  size="small" 
                  style={styles.orderActionButton}
                  onPress={() => router.push('/order/1234')}
                />
                <Button 
                  title="Accepter" 
                  size="small" 
                  style={styles.orderActionButton}
                />
              </View>
            </View>
            
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>#ORD-1233</Text>
                <View style={[styles.orderStatusBadge, styles.deliveryStatusBadge]}>
                  <Text style={styles.orderStatusText}>Livraison</Text>
                </View>
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderCustomer}>Marie Martin</Text>
                <Text style={styles.orderDate}>Aujourd'hui, 13:15</Text>
              </View>
              <View style={styles.orderItemsContainer}>
                <Text style={styles.orderItemsText}>1 x Bouteille 6kg</Text>
              </View>
              <View style={styles.orderActions}>
                <Button 
                  title="Détails" 
                  variant="outline" 
                  size="small" 
                  style={styles.orderActionButton}
                  onPress={() => router.push('/order/1233')}
                />
                <Button 
                  title="Terminé" 
                  size="small" 
                  style={styles.orderActionButton}
                />
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.analyticsSummary}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Aperçu des ventes</Text>
            <TouchableOpacity>
              <TrendingUp size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>Graphique des ventes</Text>
          </View>
          
          <View style={styles.productSummary}>
            <Text style={styles.productSummaryTitle}>Produits populaires</Text>
            <View style={styles.popularProductItem}>
              <Text style={styles.popularProductName}>Bouteille 12.5kg</Text>
              <Text style={styles.popularProductSales}>65 ventes</Text>
            </View>
            <View style={styles.popularProductItem}>
              <Text style={styles.popularProductName}>Bouteille 6kg</Text>
              <Text style={styles.popularProductSales}>42 ventes</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour,</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={Colors.textPrimary} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>
      
      {isVendor ? renderVendorHome() : renderCustomerHome()}
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
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.textPrimary,
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.error,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textDisabled,
    marginLeft: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  locationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  locationAddress: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  vendorsList: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  vendorCard: {
    width: 240,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vendorImage: {
    width: '100%',
    height: 130,
  },
  vendorInfo: {
    padding: 12,
  },
  vendorName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  vendorMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vendorMeta: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeCategoryButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeCategoryButtonText: {
    color: Colors.textInverse,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  productCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  productBrand: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  productPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 8,
  },
  addButton: {
    height: 32,
  },
  
  // Vendor dashboard styles
  dashboardHeader: {
    paddingHorizontal: 24,
  },
  dashboardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
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
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  orderSummary: {
    marginBottom: 24,
  },
  orderCards: {
    marginTop: 8,
  },
  orderCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  orderStatusBadge: {
    backgroundColor: Colors.primary + '20', // 20% opacity
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  deliveryStatusBadge: {
    backgroundColor: Colors.secondary + '20', // 20% opacity
  },
  orderStatusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.primary,
  },
  orderInfo: {
    marginBottom: 8,
  },
  orderCustomer: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  orderDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  orderItemsContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 8,
    marginBottom: 12,
  },
  orderItemsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  orderActionButton: {
    marginLeft: 8,
    minWidth: 100,
  },
  analyticsSummary: {
    marginBottom: 24,
  },
  chartPlaceholder: {
    height: 160,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartPlaceholderText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textDisabled,
  },
  productSummary: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  productSummaryTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  popularProductItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  popularProductName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  popularProductSales: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
});