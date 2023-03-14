import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import novaPlugin from './nova.vite.js'

export default defineConfig({
  plugins: [
    vue(),
    novaPlugin({
      name: 'otwell/icons-viewer',
      assets: ['resources/js/tool.js'],
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'resources/js'),
    },
  },
})
