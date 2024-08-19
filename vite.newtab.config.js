import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { CRX_NEWTAB_OUTDIR } from './globalConfig'

export default defineConfig({
  build: {
    outDir: CRX_NEWTAB_OUTDIR,
    lib: {
      entry: [resolve(__dirname, 'newtab.html')],
      formats: ['cjs'],
      fileName: () => {
        return 'newtab.js'
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: () => {
          return 'newtab.css'
        }
      }
    }
  },
  server: {
    open: '/newtab.html'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  define: {
    'process.env.NODE_ENV': null
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, 'src/common/assets/svgs')]
    })
  ]
})
