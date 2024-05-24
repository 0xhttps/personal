import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const base = isGithubActions ? '/personal/' : '/';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  base,
});