import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      'wise-ui': fileURLToPath(new URL('./src/index.ts', import.meta.url)),
    },
  },
  root: fileURLToPath(new URL('./dev', import.meta.url)),
  server: {
    host: '0.0.0.0',
    fs: {
      allow: [fileURLToPath(new URL('.', import.meta.url))],
    },
  },
})
