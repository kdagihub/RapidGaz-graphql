import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { Settings, CreditCard, MapPin, Bell, ShoppingBag, HelpCircle, LogOut, User as UserIcon, Building } from 'lucide-react-native';
import Button from '@/components/ui/Button';

export default function ProfileScreen() {
  const { user, userType, logout } = useAuth();
  const isVendor = userType === 'vendor';

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/');
  };

  const profilePicture = isVendor
    ? 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <Image
          source={{ uri: profilePicture }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileType}>
            {isVendor ? 'Compte Vendeur' : 'Compte Client'}
          </Text>
          <Button
            title="Modifier le profil"
            variant="outline"
            size="small"
            style={styles.editButton}
          />
        </View>
      </View>

      {isVendor && (
        <View style={styles.businessInfoCard}>
          <Text style={styles.sectionTitle}>Informations commerciales</Text>
          <View style={styles.businessInfoRow}>
            <Text style={styles.businessInfoLabel}>Nom de l'entreprise:</Text>
            <Text style={styles.businessInfoValue}>
              {(user as any)?.businessName || 'Gas Express'}
            </Text>
          </View>
          <View style={styles.businessInfoRow}>
            <Text style={styles.businessInfoLabel}>Adresse:</Text>
            <Text style={styles.businessInfoValue}>
              {(user as any)?.businessAddress || '123 Business Ave'}
            </Text>
          </View>
          <View style={styles.businessInfoRow}>
            <Text style={styles.businessInfoLabel}>Statut:</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Ouvert</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Compte</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            {isVendor ? (
              <Building size={20} color={Colors.primary} />
            ) : (
              <UserIcon size={20} color={Colors.primary} />
            )}
          </View>
          <Text style={styles.menuText}>Informations personnelles</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <CreditCard size={20} color={Colors.primary} />
          </View>
          <Text style={styles.menuText}>Méthodes de paiement</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <MapPin size={20} color={Colors.primary} />
          </View>
          <Text style={styles.menuText}>Adresses</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Bell size={20} color={Colors.primary} />
          </View>
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Activité</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <ShoppingBag size={20} color={Colors.secondary} />
          </View>
          <Text style={styles.menuText}>
            {isVendor ? 'Historique des ventes' : 'Historique des commandes'}
          </Text>
        </TouchableOpacity>
        
        {isVendor && (
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Building size={20} color={Colors.secondary} />
            </View>
            <Text style={styles.menuText}>Gérer les produits</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <HelpCircle size={20} color={Colors.accent} />
          </View>
          <Text style={styles.menuText}>Centre d'aide</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={handleLogout}
        >
          <View style={[styles.menuIconContainer, styles.logoutIcon]}>
            <LogOut size={20} color={Colors.error} />
          </View>
          <Text style={[styles.menuText, styles.logoutText]}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
  },
  settingsButton: {
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  profileType: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  businessInfoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  businessInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  businessInfoLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  businessInfoValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textPrimary,
    maxWidth: '60%',
    textAlign: 'right',
  },
  statusBadge: {
    backgroundColor: Colors.available + '20', // 20% opacity
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.available,
  },
  sectionContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary + '10', // 10% opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  logoutIcon: {
    backgroundColor: Colors.error + '10', // 10% opacity
  },
  logoutText: {
    color: Colors.error,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.textDisabled,
  },
});