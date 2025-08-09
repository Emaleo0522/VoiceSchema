import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.profitableratecpm.com https://*.profitablerevenue.com data: 'sha256-*';"
    }
  },
  build: {
    rollupOptions: {
      external: [
        /^https:\/\/.*\.profitableratecpm\.com\/.*$/,
        /^https:\/\/.*\.profitablerevenue\.com\/.*$/
      ]
    }
  }
});
