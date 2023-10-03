<template>
    <v-form ref="form" validate-on="blur">
        <v-text-field v-model="product['name']" label="Name"
            :rules="[(v: string) => !!v || 'Product name is Required', (v: string) => v.length > 4 || 'Product name must be greater than 4']">
        </v-text-field>
        <v-text-field v-model="product['description']" label="Description"></v-text-field>
        <v-text-field v-model="product['price']" label="Price" type="number" :rules="productPriceRules"></v-text-field>
        <v-text-field v-model="product['quantity']" label="Initial Stock" type="number"
            :rules="productInitialStockRules"></v-text-field>
        <v-text-field v-model="product['category']" label="Product Category"
            :rules="[(v: string) => !!v || 'Product Category is Required']"></v-text-field>
        <v-card-actions class="d-flex justify-space-around">
            <v-btn color="primaryDeep" @click="closeModal">Close</v-btn>
            <v-btn color="primaryDeep" @click="sendStoredData">Save</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script lang="ts">
import store from '@/store'
export default {
    emits: ['confirm', 'close'],
    data() {
        return {
            product: {},
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
                        const productToSubmit = { ...this.product }
                        productToSubmit['price'] = Number(this.product['price'])
                        productToSubmit['quantity'] = Number(this.product['quantity'])
                        this.product = await store.dispatch('product/saveProduct', productToSubmit)
                    } catch (error) {
                        throw new Error(error);
                    }
                }
            }
            this.$emit('confirm', this.product)
        },
        closeModal() {
            this.$emit('close')
        }
    },
}
</script>