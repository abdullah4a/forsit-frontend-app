<template>
  <AppData title="Home">
    <template #content>
      <v-row>
        <v-col>
          <v-card height="500">
          <v-card-title>chart</v-card-title>
          <v-card-item>
            <BarChart :points="chartData" :chartOption="chartOptions" />
          </v-card-item>
        </v-card>
        </v-col>
        <v-col>
          <v-card height="500">
          <v-card-title>chart</v-card-title>
          <v-card-text>
            <LineChart :points="chartData" :chartOption="chartOptions" />
          </v-card-text>
        </v-card>
        </v-col>
      </v-row>
    </template>
  </AppData>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { chartData, chartOptions } from '@/utils/chat-config';
export default defineComponent({
  name: 'HomeView',
  computed:{
    chartData(){
      return chartData
    },
    chartOptions(){
      return chartOptions
    }
  }
});
</script>
