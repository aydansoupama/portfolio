import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        robots: 'public/robots.txt',
        sitemap: 'public/sitemap.xml',
      },
    },
  },
  plugins: [react()],
  assetsInclude: ['**/*.xml'], 
})