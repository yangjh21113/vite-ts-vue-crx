import { createApp } from 'vue'
import '@/common/assets/styles/global.scss'
import '@/common/assets/styles/reset.scss'
import App from './index.vue'
import router from './router'
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(router)
app.mount('#app')
