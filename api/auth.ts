import { apiClient } from '@/utils/apiClient';
import { API_ENDPOINTS } from './config';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface MeResponse {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    API_ENDPOINTS.auth.login,
    credentials
  );

  if (!response.token) {
    throw new Error(response.message || 'Login failed');
  }

  // Store the token securely
  await apiClient.setToken(response.token);

  return {
    token: response.token,
    user: response.user
  };
}

export async function register(userData: RegisterRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    API_ENDPOINTS.auth.register,
    userData
  );

  if (!response.token) {
    throw new Error(response.message || 'Registration failed');
  }

  // Store the token securely
  await apiClient.setToken(response.token);

  return {
    token: response.token,
    user: response.user
  };
}

export async function logout(): Promise<void> {
  try {
    await apiClient.post(API_ENDPOINTS.auth.logout, {});
  } catch (error) {
    console.error('Logout request failed:', error);
  } finally {
    // Always clear the token locally, even if the server request fails
    await apiClient.clearToken();
  }
}

export async function getMe(): Promise<MeResponse> {
  const response = await apiClient.get<MeResponse>(API_ENDPOINTS.auth.me);

  if (!response.id) {
    throw new Error(response.message || 'Failed to fetch user data');
  }

  return response;
}

export async function updateProfile(data: Partial<Pick<User, 'name'>>): Promise<MeResponse> {
  const response = await apiClient.put<MeResponse>(API_ENDPOINTS.auth.me, data);

  if (!response.id) {
    throw new Error(response.message || 'Failed to update profile');
  }

  return response;
}

export async function changePassword(data: {
  current_password: string;
  password: string;
  password_confirmation: string;
}): Promise<void> {
  const response = await apiClient.put('/auth/password', data);

  if (response.error) {
    throw new Error(response.message || 'Failed to change password');
  }
}
