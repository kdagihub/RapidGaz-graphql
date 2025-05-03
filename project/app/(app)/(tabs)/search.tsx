import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Search as SearchIcon, MapPin, Filter, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

// Mock data for demonstration
const MOCK_VENDORS = [
  {
    id: '1',
    name: 'Gas Express',
    image: 'https://images.pexels.com/photos/5025656/pexels-photo-5025656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    deliveryTime: '30-45',
    distance: '1.2',
    address: '123 Gas Street, Ville',
    isOpen: true,
  },
  {
    id: '2',
    name: 'Quick Gaz',
    image: 'https://images.pexels.com/photos/3856440/pexels-photo-3856440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    deliveryTime: '25-40',
    distance: '0.8',
    address: '456 Avenue du Gaz, Ville',
    isOpen: true,
  },
  {
    id: '3',
    name: 'Gaz & Co',
    image: 'https://images.pexels.com/photos/5767768/pexels-photo-5767768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.3,
    deliveryTime: '35-50',
    distance: '1.5',
    address: '789 Boulevard Énergie, Ville',
    isOpen: false,
  },
  {
    id: '4',
    name: 'Total Énergie',
    image: 'https://images.pexels.com/photos/8090834/pexels-photo-8090834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    deliveryTime: '20-35',
    distance: '2.0',
    address: '101 Rue Principale, Ville',
    isOpen: true,
  },
  {
    id: '5',
    name: 'Gaz Premium',
    image: 'https://images.pexels.com/photos/3662770/pexels-photo-3662770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.2,
    deliveryTime: '40-55',
    distance: '2.5',
    address: '202 Avenue Centre, Ville',
    isOpen: true,
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Filtered vendors based on search query
  const filteredVendors = MOCK_VENDORS.filter(vendor => 
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const renderFilterOptions = () => (
    <View style={styles.filterContainer}>
      <View style={styles.filterHeader}>
        <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
          <ArrowLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.filterTitle}>Filtres</Text>
        <TouchableOpacity>
          <Text style={styles.resetText}>Réinitialiser</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.filterSectionTitle}>Trier par</Text>
      <View style={styles.filterOptions}>
        {['Distance', 'Évaluation', 'Temps de livraison'].map(option => (
          <TouchableOpacity 
            key={option}
            style={[
              styles.filterOption,
              filter === option && styles.activeFilterOption
            ]}
            onPress={() => setFilter(option)}
          >
            <Text 
              style={[
                styles.filterOptionText,
                filter === option && styles.activeFilterOptionText
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.filterSectionTitle}>Distance</Text>
      <View style={styles.rangeContainer}>
        {/* Range slider placeholder */}
        <View style={styles.rangeSlider} />
        <View style={styles.rangeLabels}>
          <Text style={styles.rangeLabel}>0.5 km</Text>
          <Text style={styles.rangeLabel}>5 km</Text>
        </View>
      </View>
      
      <Text style={styles.filterSectionTitle}>Autres filtres</Text>
      <View style={styles.filterOptions}>
        {['Ouvert maintenant', 'Offres spéciales', 'Nouveau'].map(option => (
          <TouchableOpacity 
            key={option}
            style={[
              styles.filterOption,
              filter === option && styles.activeFilterOption
            ]}
            onPress={() => setFilter(option === filter ? null : option)}
          >
            <Text 
              style={[
                styles.filterOptionText,
                filter === option && styles.activeFilterOptionText
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.applyButton}
        onPress={() => setIsFilterVisible(false)}
      >
        <Text style={styles.applyButtonText}>Appliquer les filtres</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderSearchResults = () => (
    <>
      <View style={styles.searchHeader}>
        <View style={styles.searchInputContainer}>
          <SearchIcon size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher des vendeurs de gaz..."
            placeholderTextColor={Colors.textDisabled}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setIsFilterVisible(true)}
        >
          <Filter size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.resultsCountText}>
        {filteredVendors.length} résultats trouvés
      </Text>
      
      <FlatList
        data={filteredVendors}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.vendorsList}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.vendorCard}
            onPress={() => router.push(`/vendor/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.vendorImage} />
            
            <View style={styles.vendorContent}>
              <View style={styles.vendorHeader}>
                <Text style={styles.vendorName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>★ {item.rating}</Text>
                </View>
              </View>
              
              <View style={styles.vendorInfoContainer}>
                <View style={styles.vendorInfo}>
                  <Text style={styles.infoText}>{item.deliveryTime} min</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.infoText}>{item.distance} km</Text>
                </View>
                
                <View style={styles.statusContainer}>
                  <View 
                    style={[
                      styles.statusIndicator, 
                      item.isOpen ? styles.openStatus : styles.closedStatus
                    ]} 
                  />
                  <Text 
                    style={[
                      styles.statusText,
                      item.isOpen ? styles.openStatusText : styles.closedStatusText
                    ]}
                  >
                    {item.isOpen ? 'Ouvert' : 'Fermé'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.addressContainer}>
                <MapPin size={14} color={Colors.textSecondary} />
                <Text style={styles.addressText} numberOfLines={1}>
                  {item.address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
  
  return (
    <View style={styles.container}>
      {isFilterVisible ? renderFilterOptions() : renderSearchResults()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInputContainer: {
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
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 8,
    padding: 0,
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
  resultsCountText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  vendorsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  vendorCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vendorImage: {
    width: '100%',
    height: 150,
  },
  vendorContent: {
    padding: 16,
  },
  vendorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vendorName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  ratingContainer: {
    backgroundColor: Colors.primary + '15', // 15% opacity
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  vendorInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  dot: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginHorizontal: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  openStatus: {
    backgroundColor: Colors.available,
  },
  closedStatus: {
    backgroundColor: Colors.error,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  openStatusText: {
    color: Colors.available,
  },
  closedStatusText: {
    color: Colors.error,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  
  // Filter styles
  filterContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 16,
  },
  filterTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  resetText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  filterSectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginVertical: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterOption: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeFilterOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterOptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeFilterOptionText: {
    color: Colors.textInverse,
  },
  rangeContainer: {
    marginBottom: 16,
  },
  rangeSlider: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    marginBottom: 8,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 24,
  },
  applyButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.textInverse,
  },
});