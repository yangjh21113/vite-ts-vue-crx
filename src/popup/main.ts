import { createApp } from 'vue'
// 全局样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Popup from '@/popup/popup.vue'
import router from './router'
import 'virtual:svg-icons-register'

const a: number = 1
console.log(a)
const app = createApp(Popup)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)
app.mount('#app')
