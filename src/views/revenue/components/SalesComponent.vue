<template>
    <v-sheet>
        <v-card>
            <v-card-text class="text-md-center text-sm-left my-16">
                <p class="text-h5">{{ "Total Sales $: " }}</p>
                <p class="text-h5">{{ getTotalSales }}</p>
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import SalesAPI from '@/services/api/sales.service'

export default {
    data() {
        return {
            totalSales: undefined
        }
    },
    computed: {
        getTotalSales() {
            return this.totalSales
        }
    }, created() {
        this.getTotalSalesData()
    },
    methods: {
        async getTotalSalesData() {
            const sales = await SalesAPI.getTotalNumOfSales()
            this.totalSales = sales
        }
    },
}
</script>

<style lang="scss" scoped></style>