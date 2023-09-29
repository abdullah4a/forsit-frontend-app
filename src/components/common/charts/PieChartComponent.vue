<template>
  <pie_chart :data="chartData" :options="options"/>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)
export default {
  name: 'BarChart',
  components: {
    pie_chart:Pie
  },
  props: {
    points: Object,
    chartOption: Object
  },
  computed: {
    chartData(){
      return this.points
    },
    options(){
      return this.chartOption
    }
  }
}
</script>