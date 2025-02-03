import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['ec0f-87-116-167-201.ngrok-free.app', 'localhost'],
  },
  plugins: [react()],
})
