import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      },
      external: ['react', 'react-dom']
    },
    assetsDir: 'assets',
    manifest: true,
    minify: true,
    sourcemap: true
  },
  publicDir: 'public'
})
