import { RouteRecordRaw } from 'vue-router';


const routes:Array<RouteRecordRaw>=[
  {
    path: '/revenue',
    name: 'Revenue',
    component: () => import('@/views/revenue/RevenueView.vue')
  }
]


export default routes;