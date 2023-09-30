import { RouteRecordRaw } from 'vue-router';


const routes:Array<RouteRecordRaw>=[
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('@/views/inventory/InventoryView.vue')
  }

]


export default routes;