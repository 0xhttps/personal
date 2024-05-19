import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  build: {
    outDir: 'dist', // Output directory for the build
  },
  base: '/0xhttps-web3/', // Set base path for GitHub Pages
});
