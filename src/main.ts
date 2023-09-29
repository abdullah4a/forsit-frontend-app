import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// Layout imports
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import NotFoundLayout from '@/layouts/NotFoundLayout.vue';

// Components imports
import SideNavigationBar from "@/components/common/nav/SideNavigationBar.vue";

const app = createApp(App)

// Global Layouts declaration
app.component('DefaultLayout', DefaultLayout)
.component('NotFoundLayout',NotFoundLayout)
// Global Components declaration
app.component('SideNavigationBar',SideNavigationBar)

app.use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
