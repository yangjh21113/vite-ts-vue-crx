import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { CRX_POPUP_OUTFIR } from './globalConfig'

export default defineConfig({
  build: {
    outDir: CRX_POPUP_OUTFIR
  },
  server: {
    port: 3000,
    open: '/',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1/',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, 'src/common/assets/svgs')]
    })
  ]
})
