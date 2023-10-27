import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const uri = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cyclic-api-demo.cyclic.cloud/';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
