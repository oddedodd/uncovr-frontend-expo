import { API_BASE_URL, API_ENDPOINTS } from './config';
import { Release, ReleasesResponse } from './types';

export async function getReleases(): Promise<Release[]> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.releases}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch releases');
  }
  
  const json: ReleasesResponse = await response.json();
  return json.data || [];
}
