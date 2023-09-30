<template>
    <v-sheet>
        <v-card>
            <v-card-text class="text-md-center text-sm-left">
                <p class="text-h6">{{ "Total Orders $: " }}</p>
                <p class="text-h6">{{ getTotalOrders }}</p>
                <v-btn :text="showChart ? 'hide chart' : 'show chart'" variant="plain" @click="showChart = !showChart" />
                <!-- <v-btn :text="showTable ? 'hide table' : 'show table'" variant="plain" @click="showTable = !showTable" /> -->
            </v-card-text>
            <v-card-item v-if="showChart">
                <component :is="getChart" :points="dataPoints" :chartOption="chartOptions" />
            </v-card-item>
        </v-card>
        <div class="pt-16" v-if="showTable">
            <div class="d-flex flex-wrap justify-space-between">
                <div class="text-h6">
                    Orders Table
                </div>
            </div>
            <div>
                <AppDataTable :items="getTableData" :headers="getTableHeaders" :defaultColDef="getTableFilters"
                    showConfirmBtnFiler showClearBtnFiler />
            </div>
        </div>
    </v-sheet>
</template>

<script lang="ts">
import BarChartComponent from "../../../components/common/charts/BarChartComponent.vue"
import LineChartComponent from "../../../components/common/charts/LineChartComponent.vue"
import PieChartComponent from "../../../components/common/charts/PieChartComponent.vue"
import OrdersAPI from '@/services/api/orders.service'
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
            showTable: false,
            tableHeaders: undefined,
            tableData: undefined,
            tableFilters: undefined,
            totalOrders: undefined
        }
    },
    computed: {
        dataPoints() {
            return this.chartData
        },
        chartOptions() {
            return this.chartOption
        },
        getTotalOrders() {
            return this.totalOrders
        },
        getChart() {
            const charts = { bar: BarChartComponent, line: LineChartComponent, pie: PieChartComponent }
            return charts[this.chartType]
        },
        getTableHeaders() {
            return this.tableHeaders
        },
        getTableData() {
            return this.tableData
        },
        getTableFilters() {
            return this.tableFilters
        }
    },
    created() {
        this.getTotalOrdersData()
    }, methods: {
        async getOrdersAndDisplay() {
            const orders = await OrdersAPI.getOrderList()
            this.tableHeaders=this.getNormalizeOrderHeaders(orders)
            this.tableData=orders
            this.tableFilters={
                sortable: true,
                filter: true,
                flex: 1
            }
        },
        async getTotalOrdersData() {
            const orders = await OrdersAPI.getTotalNumOfOrders()
            this.totalOrders=orders
        },
        getNormalizeOrderHeaders(orders){
            const orderKeys = orders.flatMap(item => Object.keys(item))
            const headers = [...new Set(orderKeys)]
            return headers.map(header => ({ field: header }))
        }
    },
}
</script>

<style lang="scss" scoped></style>