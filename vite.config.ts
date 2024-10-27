import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa';

 
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'My Vite PWA',
        short_name: 'VitePWA',
        description: 'A React app with PWA support using Vite',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: './img/20241022_215643.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './img/20241022_215643.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    })
    
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
