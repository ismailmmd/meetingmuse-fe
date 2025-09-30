import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
  define: {
    __VITE_API_URL__: JSON.stringify('http://localhost:8000'),
    __VITE_WS_URL__: JSON.stringify('ws://localhost:8000'),
  },
})