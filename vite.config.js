import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Incident-Management-Dashboard/', 
  optimizeDeps: {
    exclude: ['lucide-react'],
    
  },
});