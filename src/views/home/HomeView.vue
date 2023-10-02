<script lang="ts" setup>
import LowStockCard from './components/LowStockInventory.vue'
import ForecastingHighestSale from './components/ForecastingHighestSale.vue'
import ForecastingLowestSale from './components/ForecastingLowestSale.vue'
</script>
<template>
  <AppData title="Dashboard">
    <template #content>
      <v-row>
        <v-col>
          <LowStockCard />
        </v-col>
        <v-col>
          <ForecastingHighestSale />
        </v-col>
        <v-col>
          <ForecastingLowestSale />
        </v-col>
      </v-row>
    </template>
  </AppData>
</template>
