import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

const prod = 'https://cyclic-api-demo.cyclic.cloud';
const local = 'http://localhost:3000';

console.log('PROCE => ', process.env.LOCAL_URI);

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
