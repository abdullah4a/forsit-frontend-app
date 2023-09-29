<template>
  <line_chart :data="chartData" :options="options"/>
</template>

<script>
import {Line} from 'vue-chartjs'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'BarChart',
  components: {
    line_chart:Line
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