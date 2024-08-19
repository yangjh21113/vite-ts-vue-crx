import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { CRX_SCREEN_SHOT_OUTDIR } from './globalConfig'

export default defineConfig({
  build: {
    outDir: CRX_SCREEN_SHOT_OUTDIR,
    lib: {
      entry: [resolve(__dirname, 'screenShot.html')],
      formats: ['cjs'],
      fileName: () => {
        return 'screenShot.js'
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: () => {
          return 'screenShot.css'
        }
      }
    }
  },
  server: {
    open: '/screenShot.html'
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
