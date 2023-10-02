<template>
    <v-form ref="form" v-if="product" validate-on="blur">
        <v-text-field v-model="product.name" label="Name"
            :rules="[(v: string) => !!v || 'Product name is Required', (v: string) => v.length > 4 || 'Product name must be greater than 4']">
        </v-text-field>
        <v-text-field v-model="product.description" label="Description"></v-text-field>
        <v-text-field v-model="product.price" label="Price" type="number" :rules="productPriceRules"></v-text-field>
        <v-text-field v-model="product.quantity" label="Initial Stock" type="number"
            :rules="productInitialStockRules"></v-text-field>
        <v-text-field v-model="product.category" label="Product Category"
            :rules="[(v: string) => !!v || 'Product Category is Required']"></v-text-field>
        <v-card-actions class="d-flex justify-space-around">
            <v-btn color="primaryDeep" @click="sendStoredData">Save</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script lang="ts">
import ProductsAPI from '@/services/api/products.service'
import store from '@/store'
import moment from 'moment'
export default {
    emits: ['confirm'],
    props: {
        model: {
            type: Array,
        }
    },
    data() {
        return {
            product: undefined,
            inventory: undefined,
            productPriceRules: [
                (v: number) => !!v || "Product initial price is required",
                (v: number) => v > 0 || "Product price must need to be valid",
            ],
            productInitialStockRules: [
                (v: number) => !!v || "Product initial price is required",
                (v: number) => v > 0 || "Product price must need to be valid",
            ],
        }
    },
    methods: {
        async sendStoredData() {
            if (this.product) {
                const result = await this.$refs["form"].validate();
                if (result) {
                    try {
                        this.product.price = Number(this.product.price)
                        this.product.quantity = Number(this.product.quantity)
                        this.inventory.quantity = this.product.quantity
                        this.inventory.date_updated = moment(new Date()).format("YYYY-MM-DD")
                        const productToSubmit = { product: this.product, inventory: this.inventory }
                        this.product = await store.dispatch('product/updateProduct', productToSubmit)
                    } catch (error) {
                        throw new Error(error);
                    }
                }
            }
            this.$emit('confirm', this.product)
        },
        async getProductById(id: number) {
            this.product = await ProductsAPI.getProductById(id)
        }
    },
    async created() {
        this.inventory = this.model[0]
        await this.getProductById(this.inventory.product_id)
    },
}
</script>