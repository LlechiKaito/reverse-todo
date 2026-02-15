import axios from 'axios';

const isServer = typeof window === 'undefined';

function getBaseURL(): string {
  if (!isServer) return '';
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not set');
  }
  return process.env.NEXT_PUBLIC_API_URL;
}

export const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
  config.baseURL = getBaseURL();
  return config;
});
