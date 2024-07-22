import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { CRX_BACKGROUND_OUTDIR } from './globalConfig'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // 输出目录
    outDir: CRX_BACKGROUND_OUTDIR,
    lib: {
      entry: [resolve(__dirname, 'src/background/index.ts')],
      // background script不支持ES6，因此不用使用es模式，需要改为cjs模式
      formats: ['cjs'],
      // 设置生成文件的文件名
      fileName: () => {
        // 将文件后缀名强制定为js，否则会生成cjs的后缀名
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
