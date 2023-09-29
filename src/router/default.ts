import { RouteRecordRaw } from 'vue-router';
import HomeView from "@/views/HomeView.vue"


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

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  }
]


export default routes;