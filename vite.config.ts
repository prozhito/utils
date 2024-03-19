import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: './',
  build: {
    assetsDir: './',
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: path.resolve(__dirname, './src/'),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src/components/'),
      },
    ],
  },
})
