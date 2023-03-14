import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from 'vite-plugin-commonjs'
import novaPlugin from './nova.vite.js'

export default defineConfig({
  plugins: [
    commonjs(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => true,
        },
      },
    }),
    novaPlugin({
      name: 'otwell/icons-viewer',
      assets: ['resources/js/tool.js'],
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'resources/js/'),
    },
  },
})
