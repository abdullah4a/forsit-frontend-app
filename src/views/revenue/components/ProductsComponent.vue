<template>
    <v-sheet>
        <v-card>
            <v-card-text class="text-md-center text-sm-left my-16">
                <p class="text-h5">{{ "Total Products: " }}</p>
                <p class="text-h5">{{ getTotalProducts }}</p>
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import ProductsAPI from '@/services/api/products.service'

export default {
    data() {
        return {
            totalNumProducts: undefined
        }
    },
    computed: {
        getTotalProducts() {
            return this.totalNumProducts
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