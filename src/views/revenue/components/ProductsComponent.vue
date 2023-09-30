<template>
    <v-sheet>
        <v-card>
            <v-card-text class="text-md-center text-sm-left">
                <p class="text-h5">{{ "Total Products: " }}</p>
                <p class="text-h5">{{ getTotalProducts }}</p>
                <v-btn :text="showChart ? 'hide chart' : 'show chart'" variant="plain" @click="showChart = !showChart" />
            </v-card-text>
            <v-card-item v-if="showChart">
                <component :is="getChart" :points="dataPoints" :chartOption="chartOptions" />
            </v-card-item>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import BarChartComponent from "../../../components/common/charts/BarChartComponent.vue"
import LineChartComponent from "../../../components/common/charts/LineChartComponent.vue"
import PieChartComponent from "../../../components/common/charts/PieChartComponent.vue"
import ProductsAPI from '@/services/api/products.service'

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
            showChart: false,
            totalNumProducts: undefined
        }
    },
    computed: {
        dataPoints() {
            return this.chartData
        },
        chartOptions() {
            return this.chartOption
        },
        getTotalProducts() {
            return this.totalNumProducts
        },
        getChart() {
            const charts = { bar: BarChartComponent, line: LineChartComponent, pie: PieChartComponent }
            return charts[this.chartType]
        }
    }, created() {
        this.getTotalNumOfProducts()
    }, methods: {
        async getTotalNumOfProducts() {
            const numOfInventoryItems = await ProductsAPI.getQuantityOfProducts()
            this.totalNumProducts = numOfInventoryItems
        }
    },
}
</script>

<style lang="scss" scoped></style>