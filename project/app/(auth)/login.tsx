import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router, useLocalSearchParams } from 'expo-router';
import { Mail, Lock, ChevronLeft, UserCircle2, Building } from 'lucide-react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';

export default function LoginScreen() {
  const { login } = useAuth();
  const params = useLocalSearchParams<{ type?: string }>();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'customer' | 'vendor'>(
    params.type === 'vendor' ? 'vendor' : 'customer'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password, userType);
      
      if (success) {
        router.replace('/(app)/(tabs)');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
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
            <Text style={styles.title}>Connexion</Text>
            <Text style={styles.subtitle}>Entrez vos identifiants pour continuer</Text>
          </View>

          <View style={styles.userTypeContainer}>
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'customer' && styles.activeUserType
              ]}
              onPress={() => setUserType('customer')}
            >
              <UserCircle2 
                size={20} 
                color={userType === 'customer' ? Colors.primary : Colors.textSecondary} 
              />
              <Text 
                style={[
                  styles.userTypeText,
                  userType === 'customer' && styles.activeUserTypeText
                ]}
              >
                Client
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'vendor' && styles.activeUserType
              ]}
              onPress={() => setUserType('vendor')}
            >
              <Building 
                size={20} 
                color={userType === 'vendor' ? Colors.primary : Colors.textSecondary} 
              />
              <Text 
                style={[
                  styles.userTypeText,
                  userType === 'vendor' && styles.activeUserTypeText
                ]}
              >
                Vendeur
              </Text>
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.form}>
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
              label="Mot de passe"
              placeholder="Votre mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon={<Lock size={20} color={Colors.textSecondary} />}
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Mot de passe oublié?</Text>
            </TouchableOpacity>

            <Button
              title="Se connecter"
              onPress={handleLogin}
              loading={isLoading}
              fullWidth
              style={styles.loginButton}
            />
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Vous n'avez pas de compte?</Text>
            <TouchableOpacity 
              onPress={() => router.push({ 
                pathname: '/(auth)/register',
                params: { type: userType } 
              })}
            >
              <Text style={styles.registerLink}>S'inscrire</Text>
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
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  userTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeUserType: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight + '20', // 20% opacity
  },
  userTypeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  activeUserTypeText: {
    color: Colors.primary,
  },
  form: {
    marginBottom: 24,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.primary,
  },
  loginButton: {
    marginTop: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  registerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  registerLink: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 4,
  },
});