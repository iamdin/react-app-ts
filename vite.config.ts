import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'work-1-grxfbbjlggkytjsd.prod-runtime.all-hands.dev',
      'work-2-grxfbbjlggkytjsd.prod-runtime.all-hands.dev',
      'localhost',
      '127.0.0.1'
    ],
    cors: true
  }
})
