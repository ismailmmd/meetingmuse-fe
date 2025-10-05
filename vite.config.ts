import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  
  // Environment-specific configuration
  const config = {
    local: {
      apiUrl: 'http://localhost:8000/api/v1',
      wsUrl: 'ws://localhost:8000/api/v1',
    },
    production: {
      apiUrl: 'https://meetingmuse.onrender.com/api/v1',
      wsUrl: 'wss://meetingmuse.onrender.com/api/v1',
    }
  }
  
  const env = isProduction ? config.production : config.local
  
  return {
    plugins: [react()],
    
    // Development server (only applies when running dev server)
    server: {
      port: 3000,
      proxy: {
        '/ws': {
          target: env.wsUrl,
          ws: true,
          changeOrigin: true
        },
        '/api': {
          target: env.apiUrl,
          changeOrigin: true
        }
      }
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      minify: isProduction,
    },
    
    // Define environment variables accessible in your React app
    define: {
      __VITE_API_URL__: JSON.stringify(env.apiUrl),
      __VITE_WS_URL__: JSON.stringify(env.wsUrl),
    },
    
    // Base path
    base: '/',
  }
})