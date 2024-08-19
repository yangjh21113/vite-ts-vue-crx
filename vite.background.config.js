import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { CRX_BACKGROUND_OUTDIR } from './globalConfig'

export default defineConfig({
  build: {
    // 输出目录
    outDir: CRX_BACKGROUND_OUTDIR,
    lib: {
      entry: [resolve(__dirname, 'src/background/index.ts')],
      formats: ['cjs'],
      fileName: () => {
        return 'background.js'
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
