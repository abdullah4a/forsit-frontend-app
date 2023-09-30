import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import defaultRoutes from './default'
import authRoutes from './auth'
import revenueRoutes from './revenue'
import inventoryRoutes from './inventory'
// import { generalStorage } from '@/storages/generalStorage'
// import { localStorageKeys } from '@/utils/enum/localStorageKeys.enum'
// import store from '@/store'

const routes = [
 ...defaultRoutes,
 ...authRoutes,
 ...revenueRoutes,
 ...inventoryRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach(async (to, from, next) => {
//   to.meta!.referer = from;

//   const guest = !!to.meta!.guest;
//   const hasToken = await store.getters['auth/token'];
//   const storedToken = generalStorage.getLocalItem(localStorageKeys.TOKEN);
//   if (storedToken !== null) {
//     return next();
//   }
//   if (guest && hasToken) {
//     return next({name: 'Home'});
//   }

//   // Unguarded routes for auth.
//   if (guest) {
//     return next();
//   }

//   // If there is a JWT check if it's valid. auth/validate checks current user
//   // and sets store data or kicks them out if invalid.
//   if (hasToken) {
//     const validUser =
//       await store.dispatch('auth/validate');
//     if (validUser) {
//       // Permissions Validations will go here if company have their own permissions and roles.
//       return next();

//     }
//   }
//     redirectToLogin();
    
//     function redirectToLogin() {
//       // Redirect the user to the last attempted page if it wasn't auth/~ish
//       const returnPath = to.fullPath.indexOf('auth/') === 1 ? null : to.fullPath;
//       next({name: 'Login', query: {next: returnPath}});
//     }
//   })

export default router
