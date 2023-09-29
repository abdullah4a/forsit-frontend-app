import { RouteRecordRaw } from 'vue-router';
import HomeView from "@/views/home/HomeView.vue"


const routes:Array<RouteRecordRaw>=[
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/AboutView.vue')
  }
]


export default routes;