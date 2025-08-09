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
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pl27377848.profitableratecpm.com https://*.profitableratecpm.com;"
    }
  },
  build: {
    rollupOptions: {
      external: [
        /^https:\/\/.*\.profitableratecpm\.com\/.*$/
      ]
    }
  }
});
