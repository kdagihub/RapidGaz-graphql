import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import Colors from '@/constants/Colors';

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  // Handle loading state
  if (isLoading) {
    return null;
  }

  // If not authenticated, redirect to auth flow
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    />
  );
}