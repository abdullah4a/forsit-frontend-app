<template>
  <AppData title="Dashboard">
    <template #content>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, fuga facilis? Voluptatem tenetur nemo labore totam facilis dolor excepturi quis ab, nisi sit numquam nihil laborum quas consequatur blanditiis suscipit.
      </div>
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
