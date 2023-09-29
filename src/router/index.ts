import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import defaultRoutes from './default'
import authRoutes from './auth'

const routes = [
 ...defaultRoutes,
 ...authRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
