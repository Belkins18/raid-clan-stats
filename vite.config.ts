import path from 'path'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr'

import { version } from './package.json';

// https://vite.dev/config/
export default defineConfig({
   define: {
    __APP_VERSION__: JSON.stringify(version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [react(), svgr(), tailwindcss()],
   resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
