import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/sidePanel/views/home.vue'

const routes = [
  {
    path: '/',
    component: Home,
    children: [{ path: '/:pathMatch(.*)', redirect: '/' }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
