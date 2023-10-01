<template>
    <v-sheet>
        <v-card>
            <v-card-text class="text-md-center text-sm-left my-16">
                <p class="text-h6">{{ "Total Orders $: " }}</p>
                <p class="text-h6">{{ getTotalOrders }}</p>
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import OrdersAPI from '@/services/api/orders.service'
export default {
    data() {
        return {
            totalOrders: undefined
        }
    },
    computed: {
        getTotalOrders() {
            return this.totalOrders
        }
    },
    created() {
        this.getTotalOrdersData()
    },
    methods: {
        async getTotalOrdersData() {
            const orders = await OrdersAPI.getTotalNumOfOrders()
            this.totalOrders = orders
        }
    },
}
</script>

<style lang="scss" scoped></style>