import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { CRX_SIDEPANEL_OUTDIR } from './globalConfig'

export default defineConfig({
  build: {
    // 输出目录
    outDir: CRX_SIDEPANEL_OUTDIR,
    lib: {
      entry: [resolve(__dirname, 'sidePanel.html')],
      formats: ['cjs'],
      fileName: () => {
        return 'sidePanel.js'
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: () => {
          return 'sidePanel.css'
        }
      }
    }
  },
  server: {
    open: '/sidePanel.html'
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
