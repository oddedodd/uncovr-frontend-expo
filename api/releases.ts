import { apiClient } from '@/utils/apiClient';
import { API_ENDPOINTS } from './config';
import { Release, ReleasesResponse } from './types';

export async function getReleases(limit?: number): Promise<Release[]> {
  const response = await apiClient.get<ReleasesResponse>(API_ENDPOINTS.releases);
  const releases = response.data || [];
  
  // Apply limit if specified
  if (limit && limit > 0) {
    return releases.slice(0, limit);
  }
  
  return releases;
}

export async function getFeaturedReleases(): Promise<Release[]> {
  const response = await apiClient.get<ReleasesResponse>(API_ENDPOINTS.featuredReleases);
  return response.data || [];
}
