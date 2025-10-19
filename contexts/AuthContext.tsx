import { changePassword, getMe, login, LoginRequest, logout, register, RegisterRequest, updateProfile, User } from '@/api/auth';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Pick<User, 'name'>>) => Promise<void>;
  changePassword: (data: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      
      // Check if we have a token
      const token = await SecureStore.getItemAsync('auth_token');
      const tokenTimestamp = await SecureStore.getItemAsync('auth_token_timestamp');
      
      if (!token || !tokenTimestamp) {
        setUser(null);
        return;
      }

      // Check if token is older than 24 hours
      const tokenAge = Date.now() - parseInt(tokenTimestamp, 10);
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      if (tokenAge > twentyFourHours) {
        // Token expired, clear it and redirect to login
        await SecureStore.deleteItemAsync('auth_token');
        await SecureStore.deleteItemAsync('auth_token_timestamp');
        setUser(null);
        router.replace('/login');
        return;
      }

      // Try to fetch user data to validate the token
      const userData = await getMe();
      setUser(userData);
    } catch (error) {
      console.error('Auth check failed:', error);
      // Token is invalid, clear it
      await SecureStore.deleteItemAsync('auth_token');
      await SecureStore.deleteItemAsync('auth_token_timestamp');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogin = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      const authResponse = await login(credentials);
      setUser(authResponse.user);
      router.replace('/(tabs)');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true);
      const authResponse = await register(userData);
      setUser(authResponse.user);
      router.replace('/(tabs)');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setUser(null);
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails on server, clear local state
      setUser(null);
      router.replace('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (data: Partial<Pick<User, 'name'>>) => {
    try {
      const updatedUser = await updateProfile(data);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const handleChangePassword = async (data: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }) => {
    try {
      await changePassword(data);
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await getMe();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // If refresh fails, user might be logged out
      await handleLogout();
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    changePassword: handleChangePassword,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
