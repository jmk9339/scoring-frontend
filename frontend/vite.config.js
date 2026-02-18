import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // ADD THE SERVER BLOCK HERE
  server: {
    host: '0.0.0.0', // Keeps the host setting you had in package.json
    port: 5173,      // Keeps the port setting you had in package.json
    proxy: {
      // Configuration for the proxy
      '/scores': {
        target: 'http://localhost:5000', // The address of your Flask backend
        changeOrigin: true,              // Needed for proper routing
        secure: false,                   // Use false for local development
      },
    },
  },
})