<template>
    <v-sheet>
        <v-card>
            <v-card-text class="text-md-center text-sm-left">
                <p class="text-h5">{{ "Total Sales $: " }}</p>
                <p class="text-h5">{{ getTotalSales }}</p>
                <v-btn :text="showChart ? 'hide chart' : 'show chart'" variant="plain" @click="showChart = !showChart" />
            </v-card-text>
            <v-card-item v-if="showChart">
                <component :is="getChart" :points="dataPoints" :chartOption="chartOptions" />
            </v-card-item>
        </v-card>
        <div class="pt-16">
            <div class="d-flex flex-wrap justify-space-between">
                <div class="text-h5">
                    Table
                </div>
                <div class="text-h5">
                    filter
                </div>
            </div>
        </div>
    </v-sheet>
</template>

<script lang="ts">
import BarChartComponent from "../../../components/common/charts/BarChartComponent.vue"
import LineChartComponent from "../../../components/common/charts/LineChartComponent.vue"
import PieChartComponent from "../../../components/common/charts/PieChartComponent.vue"
export default {
    props: {
        chartData: {
            type: Object,
            required: true,
        },
        chartOption: {
            type: Object,
            required: true
        },
        chartType: {
            type: String,
            default: 'bar',
            required: true
        }
    },
    data() {
        return {
            showChart: false
        }
    },
    computed: {
        dataPoints() {
            return this.chartData
        },
        chartOptions() {
            return this.chartOption
        },
        getTotalSales() {
            return 110
        },
        getChart() {
            const charts = { bar: BarChartComponent, line: LineChartComponent, pie: PieChartComponent }
            return charts[this.chartType]
        }
    }
}
</script>

<style lang="scss" scoped></style>