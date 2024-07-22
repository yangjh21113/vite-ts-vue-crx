import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import '@/common/assets/styles/global.scss'
import '@/common/assets/styles/reset.scss'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Popup from '@/popup/popup.vue'
import router from './router'
import 'virtual:svg-icons-register'

const app = createApp(Popup)
app.use(createPinia())
app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)
app.mount('#app')
