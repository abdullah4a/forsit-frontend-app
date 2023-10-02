<template>
    <v-form ref="form" v-if="product">
        <v-text-field v-model="product.name" label="Name"></v-text-field>
        <v-text-field v-model="product.description" label="Description"></v-text-field>
        <v-text-field v-model="product.price" label="Price" type="number"></v-text-field>
        <v-text-field v-model="product.quantity" label="Initial Stock" type="number"></v-text-field>
        <v-text-field v-model="product.category" label="Product Category"></v-text-field>
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
            inventory: undefined
        }
    },
    methods: {
        async sendStoredData() {
            if (this.product) {
                try {
                    this.product.price = Number(this.product.price)
                    this.product.quantity = Number(this.product.quantity)
                    this.inventory.quantity= this.product.quantity
                    this.inventory.date_updated= moment(new Date()).format("YYYY-MM-DD")
                    const productToSubmit = { product: this.product, inventory: this.inventory }
                    this.product = await store.dispatch('product/updateProduct', productToSubmit)
                } catch (error) {
                    throw new Error(error);
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