<template>
    <v-sheet>
        <v-row>
            <v-col cols="2">
                <v-combobox v-model="chartForVal" :items="chartFor" label="Chart Of" :multiple="false"
                    @update:model-value="checkChartFor">
                </v-combobox>
            </v-col>
            <v-col cols="7">

            </v-col>
            <v-col cols="2">
                <v-combobox v-model="chartDate" :items="getDateFilters" label="Date" :multiple="false"
                    @update:model-value="evaluateDateAndGet">
                </v-combobox>
            </v-col>
            <v-col cols="1">
                <v-combobox v-model="chartType" :items="getChartTypes" label="Chart Type" :multiple="false" />
            </v-col>
        </v-row>
        <v-card v-if="chartData">
            <component :is="getChart" :points="dataPoints" :chartOption="chartOptions" />
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import { getDynamicColorByValue } from "@/helpers/getDynamicColorByValue";
import BarChartComponent from "../../../components/common/charts/BarChartComponent.vue"
import LineChartComponent from "../../../components/common/charts/LineChartComponent.vue"
import PieChartComponent from "../../../components/common/charts/PieChartComponent.vue"
import SalesAPI from "@/services/api/sales.service"
import OrdersAPI from "@/services/api/orders.service"
import { formatEndDate, formatStartDate } from "@/utils/formattedDates";


export default {
    data() {
        return {
            showChart: false,
            chartData: undefined,
            chartOption: undefined,
            chartFor: ['orders', 'sales'],
            chartType: 'bar',
            chartForVal: 'orders',
            chartDate: "day",
        }
    },
    computed: {
        dataPoints() {
            return this.chartData
        },
        chartOptions() {
            return this.chartOption
        },
        getChart() {
            const charts = { bar: BarChartComponent, line: LineChartComponent, pie: PieChartComponent }
            return charts[this.chartType]
        },
        getDateFilters() {
            return ['day', 'week', 'month', 'year']
        },
        getChartTypes() {
            return ['bar', 'line']
        }
    },
    created() {
        this.evaluateDateAndGet()
    },
    methods: {
        updateChart(labels: Array<string>, data: Array<number>) {
            this.chartData = {
                labels: labels,
                datasets: [
                    {
                        label: "",
                        backgroundColor: [],
                        data: data,
                    }
                ],
            }
            for (let index = 0; index < this.chartData.datasets.length; index++) {
                data.forEach((val) => {
                    this.chartData.datasets[index].backgroundColor.push(getDynamicColorByValue(val))
                })
            }
            this.chartOption = { responsive: true }
        },
        async getDataForChart(params?: Record<string, any>) {
            if (this.chartForVal === 'orders') {
                await this.getOrdersAndGenerateChart(params)
            }
            if (this.chartForVal === 'sales') {
                await this.getSalesAndGenerateChart(params)
            }
        },
        async getOrdersAndGenerateChart(params?: Record<string, any>) {
            const dataAndDate = await OrdersAPI.getLabeledDataForChart(params)
            const labels = Object.keys(dataAndDate);
            const data = labels.map(date => dataAndDate[date]);
            this.updateChart(labels, data)
        },
        async getSalesAndGenerateChart(params?: Record<string, any>) {
            const unParsedData = await SalesAPI.getLabeledDataForChart(params)
            const labels = Object.keys(unParsedData);
            const data = labels.map(date => unParsedData[date]);
            this.updateChart(labels, data)
        },
        checkChartFor() {
            this.getDataForChart()
        },
        evaluateDateAndGet() {
            const params = {}
            const date = new Date().toLocaleDateString()
            params['startDate'] = formatStartDate(date, this.chartDate)
            params['endDate'] = formatEndDate(date, this.chartDate)
            this.getDataForChart(params)
        }
    }
}
</script>

<style lang="scss" scoped></style>