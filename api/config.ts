export const API_BASE_URL = 'https://uncovr-backend-laravel-main-kbqgut.laravel.cloud/api/v1';

export const API_ENDPOINTS = {
  releases: '/releases',
  featuredReleases: '/releases/featured',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/me',
  },
} as const;
