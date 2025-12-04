import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Generate static HTML for better SEO
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  preview: {
    allowedHosts: [
      'homico-landing.onrender.com',
      'homico.ge',
      'www.homico.ge',
      'localhost',
    ],
  },
})
