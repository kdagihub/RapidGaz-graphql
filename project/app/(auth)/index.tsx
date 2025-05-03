import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Play } from 'lucide-react-native';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/3811830/pexels-photo-3811830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.logo}>Rapide Gaz</Text>
        <Text style={styles.tagline}>Livraison de gaz à domicile</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue sur Rapide Gaz</Text>
        <Text style={styles.description}>
          La plateforme qui connecte les distributeurs de gaz avec les clients pour une livraison rapide et efficace.
        </Text>
        
        <TouchableOpacity style={styles.videoButton}>
          <Play size={24} color={Colors.textInverse} />
          <Text style={styles.videoButtonText}>Voir comment ça marche</Text>
        </TouchableOpacity>
        
        <View style={styles.buttonsContainer}>
          <Button 
            title="Commencer" 
            variant="primary" 
            size="large" 
            fullWidth
            onPress={() => router.push('/(auth)/login')}
          />
          
          <View style={styles.registerButtonsContainer}>
            <Button 
              title="Créer un compte client" 
              variant="outline" 
              style={styles.registerButton}
              onPress={() => router.push({ pathname: '/(auth)/register', params: { type: 'customer' } })}
            />
            <Button 
              title="Créer un compte vendeur" 
              variant="outline" 
              style={styles.registerButton}
              onPress={() => router.push({ pathname: '/(auth)/register', params: { type: 'vendor' } })}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logo: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.textInverse,
    zIndex: 1,
  },
  tagline: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.textInverse,
    marginTop: 8,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  videoButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textInverse,
    marginLeft: 8,
  },
  buttonsContainer: {
    marginTop: 'auto',
    marginBottom: 32,
  },
  registerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  registerButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});