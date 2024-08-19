import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@/common/assets/styles/global.scss'
import '@/common/assets/styles/reset.scss'
import '@/content/element-plus.scss'
import Content from '@/content/content.vue'
import 'virtual:svg-icons-register'

// 创建id为CRX-container的div
const crxApp = document.createElement('div')
crxApp.id = 'CRX-container'
// 将刚创建的div插入body最后
document.body.appendChild(crxApp)

// 创建Vue APP
const app = createApp(Content)
// 集成Element Plus
app.use(ElementPlus)
// 将Vue APP插入刚创建的div
app.mount('#CRX-container')

// 向目标页面驻入js
try {
  const insertScript = document.createElement('script')
  insertScript.setAttribute('type', 'text/javascript')
  insertScript.src = window.chrome.runtime.getURL('insert.js')
  document.body.appendChild(insertScript)
} catch (err) {}
