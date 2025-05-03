import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserType } from '@/types';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, userType: UserType) => Promise<boolean>;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  userType: UserType | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
  userType: null,
});

// Mock data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    name: 'Customer Demo',
    email: 'customer@example.com',
    phone: '+1234567890',
    userType: 'customer' as UserType,
    address: '123 Customer St'
  },
  {
    id: '2',
    name: 'Vendor Demo',
    email: 'vendor@example.com',
    phone: '+0987654321',
    userType: 'vendor' as UserType,
    businessName: 'Gas Express',
    businessAddress: '456 Vendor Ave',
    description: 'Premier gas cylinder supplier',
    rating: 4.8,
    deliveryFee: 2.5,
    minDeliveryTime: 30,
    maxDeliveryTime: 60,
    isOpen: true,
    coordinates: {
      latitude: 4.0510,
      longitude: 9.7678
    }
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem('@user');
        if (userJson) {
          setUser(JSON.parse(userJson));
        }
      } catch (error) {
        console.error('Failed to load user from storage', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string, userType: UserType): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be a backend call
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.userType === userType
      );
      
      if (foundUser) {
        await AsyncStorage.setItem('@user', JSON.stringify(foundUser));
        setUser(foundUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would create a new user in the backend
      const newUser = {
        id: `user_${Date.now()}`,
        ...userData
      } as User;
      
      await AsyncStorage.setItem('@user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('@user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        userType: user?.userType || null
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);