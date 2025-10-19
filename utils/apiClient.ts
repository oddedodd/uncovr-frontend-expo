import { API_BASE_URL } from '@/api/config';
import * as SecureStore from 'expo-secure-store';

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  [key: string]: any; // Allow additional properties
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async getToken(): Promise<string | null> {
    try {
      const token = await SecureStore.getItemAsync('auth_token');
      const tokenTimestamp = await SecureStore.getItemAsync('auth_token_timestamp');
      
      if (!token || !tokenTimestamp) {
        return null;
      }

      // Check if token is older than 24 hours
      const tokenAge = Date.now() - parseInt(tokenTimestamp, 10);
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (tokenAge > twentyFourHours) {
        // Token expired, remove it
        await SecureStore.deleteItemAsync('auth_token');
        await SecureStore.deleteItemAsync('auth_token_timestamp');
        return null;
      }

      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Add Authorization header if we have a valid token
    const token = await this.getToken();
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        // If unauthorized, clear the token
        if (response.status === 401) {
          await this.clearToken();
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' });
  }

  async clearToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync('auth_token');
      await SecureStore.deleteItemAsync('auth_token_timestamp');
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  }

  async setToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync('auth_token', token);
      await SecureStore.setItemAsync('auth_token_timestamp', Date.now().toString());
    } catch (error) {
      console.error('Error setting token:', error);
      throw new Error('Failed to save authentication token');
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
