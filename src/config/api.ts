export const DEFAULT_BACKEND_URL = 'https://alliver-backend.onrender.com';

export const resolveApiBaseUrl = (configuredUrl?: string): string => {
  const candidate = configuredUrl?.trim();
  if (!candidate) {
    return DEFAULT_BACKEND_URL;
  }
  return candidate.replace(/\/+$/, '');
};

export const API_BASE_URL = resolveApiBaseUrl(import.meta.env?.VITE_API_URL);

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/api/health`,
  leads: `${API_BASE_URL}/api/leads`,
  newsletter: `${API_BASE_URL}/api/newsletter`,
  services: `${API_BASE_URL}/api/services`,
  testimonials: `${API_BASE_URL}/api/testimonials`,
} as const;
