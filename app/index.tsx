import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Check authentication status from AsyncStorage or Context
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Placeholder for auth check
      // const token = await AsyncStorage.getItem('userToken');
      // setIsAuthenticated(!!token);
      setIsAuthenticated(false); // Default to not authenticated
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or a splash screen component
  }

  // Redirect based on auth status
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}
