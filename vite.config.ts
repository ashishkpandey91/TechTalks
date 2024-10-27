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
        name: 'TechTalks',
        short_name: 'TechTalks',
        description: 'A blog web app',
        theme_color: '#ffffff',
        background_color: '#8b5cf6',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: './img/192-img.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './img/512-img.png',
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
