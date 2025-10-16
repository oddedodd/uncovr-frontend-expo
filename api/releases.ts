import { API_BASE_URL, API_ENDPOINTS } from './config';
import { Release, ReleasesResponse } from './types';

export async function getReleases(limit?: number): Promise<Release[]> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.releases}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch releases');
  }
  
  const json: ReleasesResponse = await response.json();
  const releases = json.data || [];
  
  // Apply limit if specified
  if (limit && limit > 0) {
    return releases.slice(0, limit);
  }
  
  return releases;
}

export async function getFeaturedReleases(): Promise<Release[]> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.featuredReleases}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch featured releases');
  }
  
  const json: ReleasesResponse = await response.json();
  return json.data || [];
}
