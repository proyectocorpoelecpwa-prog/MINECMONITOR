import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', '404.html', '.nojekyll'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,webmanifest}'],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024 // 6MB
      },
      manifest: {
        name: 'MINEC Monitor',
        short_name: 'MINEC Monitor',
        description: 'Sistema de Información y Gestión Ecosocialista Territorial',
        theme_color: '#116321',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  build: {
    // Compatibilidad universal con navegadores (Chrome, Safari iOS/macOS, Opera, Edge, Firefox)
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('zustand')) {
              return 'vendor-core';
            }
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'vendor-maps';
            }
            if (id.includes('@turf')) {
              return 'vendor-turf';
            }
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor-utils';
          }
        }
      }
    }
  },
  base: './' // Soporta GitHub Pages y cualquier servidor web relativo
});
