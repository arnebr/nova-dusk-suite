import path from 'path'
import vue from '@vitejs/plugin-vue'
import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'

const defaultAliases = {
  'laravel-nova': path.join(
    __dirname,
    '../../vendor/laravel/nova/resources/js/mixins/packages.js'
  ),
}

export default function novaPlugin({ name, assets }) {
  return {
    name: 'laravel-nova',
    enforce: 'pre',
    config: (userConfig, { command, mode }) => {
      return {
        resolve: {
          alias: Array.isArray(userConfig.resolve?.alias)
            ? [
                ...userConfig.resolve?.alias ?? [],
                ...Object.keys(defaultAliases).map(alias => ({
                    find: alias,
                    replacement: defaultAliases[alias]
                }))
            ]
            : {
                ...defaultAliases,
                ...userConfig.resolve?.alias,
            },
          extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
        css: {
          postcss: {
            plugins: [postcssImport(), tailwindcss('./tailwind.config.js')],
          },
        },
        build: {
          outDir: 'dist',
          manifest: true,
          rollupOptions: {
            external: ['vue'],
            input: assets,
            output: {
              name,
              manualChunks: undefined,
              globals: {
                vue: 'Vue',
              },
              entryFileNames: `assets/[name].js`,
              chunkFileNames: `assets/[name].js`,
              assetFileNames: `assets/[name].[ext]`
            },
          },
          assetsInlineLimit: 0,
        },
      }
    }
  }
}
