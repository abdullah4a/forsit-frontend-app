<template>
    <v-sheet>
        <v-card>
            <v-card-text class="text-md-center text-sm-left">
                <p class="text-h5">{{ "Quantity of Products in Inventory: " }}</p>
                <p class="text-h5">{{ getTotalNumOfInventoryItems }}</p>
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
import InventoryAPI from '@/services/api/inventory.service'

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
            totalNumProductsInInventory: undefined
        }
    },
    computed: {
        dataPoints() {
            return this.chartData
        },
        chartOptions() {
            return this.chartOption
        },
        getTotalNumOfInventoryItems() {
            return this.totalNumProductsInInventory
        },
        getChart() {
            const charts = { bar: BarChartComponent, line: LineChartComponent, pie: PieChartComponent }
            return charts[this.chartType]
        }
    }, created() {
        this.getTotalNumOfProductsInInventory()
    }, methods: {
        async getTotalNumOfProductsInInventory() {
            const numOfInventoryItems = await InventoryAPI.getTotalNumOfProductsInInventory()
            this.totalNumProductsInInventory = numOfInventoryItems
        }
    },
}
</script>

<style lang="scss" scoped></style>