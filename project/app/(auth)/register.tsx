import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Mail, Lock, User, Phone, ChevronLeft, MapPin } from 'lucide-react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import Colors from '@/constants/Colors';
import { UserType } from '@/types';

export default function RegisterScreen() {
  const { register } = useAuth();
  const params = useLocalSearchParams<{ type?: string }>();
  
  const [userType] = useState<UserType>(
    params.type === 'vendor' ? 'vendor' : 'customer'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    // Basic validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (userType === 'vendor' && (!businessName || !businessAddress)) {
      setError('Veuillez remplir les informations de votre entreprise');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const userData = {
        name,
        email,
        phone,
        userType,
        address: address || undefined,
        ...(userType === 'vendor' && {
          businessName,
          businessAddress,
          description: 'Fournisseur de gaz',
          rating: 0,
          deliveryFee: 2.0,
          minDeliveryTime: 30,
          maxDeliveryTime: 60,
          isOpen: true,
          coordinates: {
            latitude: 4.0510,
            longitude: 9.7678
          }
        })
      };

      const success = await register(userData, password);
      
      if (success) {
        router.replace('/(app)/(tabs)');
      } else {
        setError('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={styles.keyboardAvoid}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>
              {userType === 'customer' ? 'Créer un compte client' : 'Créer un compte vendeur'}
            </Text>
            <Text style={styles.subtitle}>
              {userType === 'customer' 
                ? 'Inscrivez-vous pour commander du gaz' 
                : 'Inscrivez-vous pour vendre vos produits'}
            </Text>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.form}>
            <Input
              label="Nom complet"
              placeholder="Votre nom complet"
              value={name}
              onChangeText={setName}
              leftIcon={<User size={20} color={Colors.textSecondary} />}
            />

            <Input
              label="Email"
              placeholder="Votre email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={Colors.textSecondary} />}
            />

            <Input
              label="Téléphone"
              placeholder="Votre numéro de téléphone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              leftIcon={<Phone size={20} color={Colors.textSecondary} />}
            />

            <Input
              label="Adresse"
              placeholder="Votre adresse"
              value={address}
              onChangeText={setAddress}
              leftIcon={<MapPin size={20} color={Colors.textSecondary} />}
            />

            {userType === 'vendor' && (
              <>
                <Input
                  label="Nom de l'entreprise"
                  placeholder="Nom de votre entreprise"
                  value={businessName}
                  onChangeText={setBusinessName}
                />

                <Input
                  label="Adresse de l'entreprise"
                  placeholder="Adresse de votre entreprise"
                  value={businessAddress}
                  onChangeText={setBusinessAddress}
                  leftIcon={<MapPin size={20} color={Colors.textSecondary} />}
                />
              </>
            )}

            <Input
              label="Mot de passe"
              placeholder="Créez un mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon={<Lock size={20} color={Colors.textSecondary} />}
            />

            <Input
              label="Confirmer le mot de passe"
              placeholder="Confirmez votre mot de passe"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              leftIcon={<Lock size={20} color={Colors.textSecondary} />}
            />

            <Button
              title="S'inscrire"
              onPress={handleRegister}
              loading={isLoading}
              fullWidth
              style={styles.registerButton}
            />
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Vous avez déjà un compte?</Text>
            <TouchableOpacity 
              onPress={() => router.push({ 
                pathname: '/(auth)/login',
                params: { type: userType } 
              })}
            >
              <Text style={styles.loginLink}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.background,
  },
  backButton: {
    marginBottom: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  registerButton: {
    marginTop: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  loginText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 4,
  },
});