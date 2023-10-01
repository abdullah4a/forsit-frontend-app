<template>
  <AppData :showSearch="false" :showControl="false">
    <template #content>
      <v-row>
        <v-col>
          <SalesComponent :chartData="chartData" :chartOption="chartOptions" chartType="bar" />
        </v-col>
        <v-col>
          <OrdersComponent :chartData="chartData" :chartOption="chartOptions" chartType="line" />
        </v-col>
        <v-col>
          <InventoryComponent :chartData="chartData" :chartOption="chartOptions" chartType="bar" />
        </v-col>
        <v-col>
          <ProductsComponent :chartData="chartData" :chartOption="chartOptions" chartType="line" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <RevenueChart />
        </v-col>
      </v-row>
    </template>
  </AppData>
</template>

<script lang="ts">
import SalesComponent from "./components/SalesComponent.vue"
import OrdersComponent from "./components/OrdersComponent.vue"
import InventoryComponent from "./components/InventoryComponent.vue"
import ProductsComponent from "./components/ProductsComponent.vue"
import RevenueChart from "./components/RevenueChart.vue"
import { chartData, chartOptions } from '../../utils/chat-config'
export default {
  name: 'RevenueView',
  components: {
    SalesComponent,
    OrdersComponent,
    InventoryComponent,
    ProductsComponent,
    RevenueChart
  },
  computed: {
    chartData() {
      return chartData
    },
    chartOptions() {
      return chartOptions
    }
  }
}
</script>
