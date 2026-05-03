export const withApiKey = (params?: Record<string, any>) => ({
  api_key: import.meta.env.VITE_API_KEY,
  ...params,
});