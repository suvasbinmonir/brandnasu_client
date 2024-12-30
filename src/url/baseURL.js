export const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  console.error("API base URL is not defined. Check VITE_API_URL in your .env file.");
}
