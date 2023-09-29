import { RouteRecordRaw } from 'vue-router';
import NotFound from "@/views/notFound/NotFound.vue"
const routes:Array<RouteRecordRaw>=[
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta:{layout: "NotFoundLayout"}
  }
]


export default routes;