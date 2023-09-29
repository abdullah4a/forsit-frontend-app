import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import defaultRoutes from './default'

const routes = [
 ...defaultRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
