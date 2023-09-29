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
import AppData from "@/components/common/app-data/AppData.vue";
import BarChartComponent from "./components/common/charts/BarChartComponent.vue"
import LineChartComponent from "./components/common/charts/LineChartComponent.vue"
import PieChartComponent from "./components/common/charts/PieChartComponent.vue"

const app = createApp(App)

// Global Layouts declaration
app.component('DefaultLayout', DefaultLayout)
  .component('NotFoundLayout', NotFoundLayout)
// Global Components declaration
app.component('SideNavigationBar', SideNavigationBar)
  .component('AppData', AppData)
  .component("BarChart", BarChartComponent)
  .component("LineChart", LineChartComponent)
  .component("PieChart", PieChartComponent)

app.use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
