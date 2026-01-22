import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/webApp/', 
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      includeAssets: [
        'favicon.ico',           
        'apple-touch-icon.png',  
        'mask-icon.svg',       
      ],
      manifest: {
        name: 'Muscle Max Gym Journal', 
        short_name: 'MuscleMax',        
        description: 'A gym journal where you can track your workouts, upload and compare progress pictures, keep a log of past workouts and time rests in between exercises.',
        theme_color: '#D56809',        
        start_url: '/webApp/',         
        display: 'standalone',       
        background_color: '#FFFFFF',   
        icons: [
          {
            src: '/webApp/pwa-192x192.png',   
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/webApp/pwa-512x512.png',   
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/webApp/pwa-maskable-192x192.png',   
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/webApp/pwa-maskable-512x512.png',  
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
