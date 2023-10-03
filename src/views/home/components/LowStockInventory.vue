<template>
    <v-card height="200" v-if="product" variant="tonal"
        :class="getLowerTrendingProduct.quantity > 25 ? 'text-teal-darken-1' : 'text-red-lighten-1'">
        <v-card-title class="d-flex  justify-space-between ">
            <div>
                {{ 'Product with Lowest Quantity' }}
            </div>
            <div>
                Last updated: {{ getLowerTrendingProduct.date_updated }}
            </div>
        </v-card-title>
        <template #append>
            <div>
                {{ getLowerTrendingProduct.quantity > 25 ? 'Better' : 'Bad' }}
                <v-btn :icon="getLowerTrendingProduct.quantity > 25 ? 'mdi-arrow-up' : 'mdi-arrow-down'" size="small"
                    variant="plain" :ripple="false"></v-btn>
            </div>
        </template>
        <v-card-item class="text-center">
            <div class="text-h6">Name: {{ product.name }}</div>
            <div class="text-subtitle-1">
                Quantity: {{ getLowerTrendingProduct.quantity }}
            </div>
        </v-card-item>
    </v-card>
</template>
  
<script lang="ts">
import { getProductWithLowStacks } from '@/helpers/checkStocks'
import ProductsAPI from '@/services/api/products.service'
export default {
    name: 'LowStockCard',
    computed: {
        getLowerTrendingProduct() {
            const lowestStock = getProductWithLowStacks()
            return lowestStock
        }
    },
    methods: {
        async getProductDetails() {
            const product_id = this.getLowerTrendingProduct.product_id
            this.product = await ProductsAPI.getProductById(product_id)
        },
        getInsightsRepeatedly() {
            this.interval = setInterval(() => {
                this.getProductDetails()
            }, 10000)
        }
    },
    data() {
        return {
            product: undefined,
            interval: 1 * 1000
        }
    },
    created() {
        this.getProductDetails()
        this.getInsightsRepeatedly()
    },
    beforeUnmount() {
        clearInterval(this.interval)
    },
}
</script>
  