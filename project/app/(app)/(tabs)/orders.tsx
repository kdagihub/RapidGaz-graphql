import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { Filter, Package } from 'lucide-react-native';
import Button from '@/components/ui/Button';

// Mock data for demonstration
const MOCK_ORDERS = [
  {
    id: '1',
    orderNumber: '#ORD001',
    date: '10 Juin 2025',
    status: 'delivered',
    totalAmount: 25.99,
    vendor: {
      name: 'Gas Express',
      image: 'https://images.pexels.com/photos/5025656/pexels-photo-5025656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    items: [
      { name: 'Bouteille 12.5kg', quantity: 1, price: 25.99 }
    ]
  },
  {
    id: '2',
    orderNumber: '#ORD002',
    date: '05 Juin 2025',
    status: 'processing',
    totalAmount: 41.48,
    vendor: {
      name: 'Quick Gaz',
      image: 'https://images.pexels.com/photos/3856440/pexels-photo-3856440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    items: [
      { name: 'Bouteille 12.5kg', quantity: 1, price: 25.99 },
      { name: 'Bouteille 6kg', quantity: 1, price: 15.49 }
    ]
  },
  {
    id: '3',
    orderNumber: '#ORD003',
    date: '02 Juin 2025',
    status: 'cancelled',
    totalAmount: 15.49,
    vendor: {
      name: 'Gaz & Co',
      image: 'https://images.pexels.com/photos/5767768/pexels-photo-5767768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    items: [
      { name: 'Bouteille 6kg', quantity: 1, price: 15.49 }
    ]
  },
  {
    id: '4',
    orderNumber: '#ORD004',
    date: '01 Juin 2025',
    status: 'delivered',
    totalAmount: 25.99,
    vendor: {
      name: 'Total Énergie',
      image: 'https://images.pexels.com/photos/8090834/pexels-photo-8090834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    items: [
      { name: 'Bouteille 12.5kg', quantity: 1, price: 25.99 }
    ]
  }
];

// Status labels and colors
const ORDER_STATUS = {
  processing: {
    label: 'En cours',
    color: Colors.primary
  },
  delivered: {
    label: 'Livré',
    color: Colors.available
  },
  cancelled: {
    label: 'Annulé',
    color: Colors.error
  }
};

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter orders based on active tab
  const filteredOrders = activeTab === 'all' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(order => order.status === activeTab);
  
  const renderOrderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => router.push(`/order/${item.id}`)}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View 
          style={[
            styles.statusBadge, 
            { backgroundColor: ORDER_STATUS[item.status].color + '20' } // 20% opacity
          ]}
        >
          <Text 
            style={[
              styles.statusText,
              { color: ORDER_STATUS[item.status].color }
            ]}
          >
            {ORDER_STATUS[item.status].label}
          </Text>
        </View>
      </View>
      
      <View style={styles.vendorContainer}>
        <Image source={{ uri: item.vendor.image }} style={styles.vendorImage} />
        <Text style={styles.vendorName}>{item.vendor.name}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.itemsContainer}>
        {item.items.map((orderItem, index) => (
          <View key={index} style={styles.orderItem}>
            <View style={styles.itemInfo}>
              <Package size={16} color={Colors.textSecondary} />
              <Text style={styles.itemName}>{orderItem.name}</Text>
            </View>
            <Text style={styles.itemDetails}>
              {orderItem.quantity} x {orderItem.price.toFixed(2)} €
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>{item.totalAmount.toFixed(2)} €</Text>
      </View>
      
      <View style={styles.orderActions}>
        <Button 
          title="Détails" 
          variant="outline" 
          size="small" 
          style={styles.detailsButton}
          onPress={() => router.push(`/order/${item.id}`)}
        />
        {item.status === 'delivered' && (
          <Button 
            title="Recommander" 
            size="small"
          />
        )}
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Commandes</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'all' && styles.activeTab
          ]}
          onPress={() => setActiveTab('all')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'all' && styles.activeTabText
            ]}
          >
            Toutes
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'processing' && styles.activeTab
          ]}
          onPress={() => setActiveTab('processing')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'processing' && styles.activeTabText
            ]}
          >
            En cours
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'delivered' && styles.activeTab
          ]}
          onPress={() => setActiveTab('delivered')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'delivered' && styles.activeTabText
            ]}
          >
            Livrées
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'cancelled' && styles.activeTab
          ]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'cancelled' && styles.activeTabText
            ]}
          >
            Annulées
          </Text>
        </TouchableOpacity>
      </View>
      
      {filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Package size={64} color={Colors.textDisabled} />
          <Text style={styles.emptyText}>
            Aucune commande {activeTab !== 'all' ? `${ORDER_STATUS[activeTab].label.toLowerCase()}` : ''} trouvée
          </Text>
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
  filterButton: {
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  activeTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.textInverse,
  },
  ordersList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  orderDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  vendorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  vendorImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  vendorName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  itemsContainer: {
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  itemDetails: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginBottom: 12,
  },
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  totalAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.primary,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  detailsButton: {
    marginRight: 8,
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
    marginTop: 16,
  },
});