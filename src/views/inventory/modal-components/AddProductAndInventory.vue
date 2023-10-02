<template>
    <v-text-field v-model="product['name']" label="Name"></v-text-field>
    <v-text-field v-model="product['description']" label="Description"></v-text-field>
    <v-text-field v-model="product['price']" label="Price" type="number"></v-text-field>
    <v-text-field v-model="product['quantity']" label="Initial Stock" type="number"></v-text-field>
    <v-text-field v-model="product['category']" label="Product Category"></v-text-field>
    <v-card-actions class="d-flex justify-space-around">
        <v-btn color="primaryDeep" @click="closeModal">Close</v-btn>
        <v-btn color="primaryDeep" @click="sendStoredData">Save</v-btn>
      </v-card-actions>
</template>

<script lang="ts">
import store from '@/store'
export default {
    emits: ['confirm', 'close'],
    data() {
        return {
            product: {}
        }
    },
    methods: {
        async sendStoredData() {
            if (this.product) {
                try {
                    const productToSubmit = { ...this.product }
                    productToSubmit['price'] = Number(this.product['price'])
                    productToSubmit['quantity'] = Number(this.product['quantity'])
                    this.product = await store.dispatch('product/saveProduct', productToSubmit)
                } catch (error) {
                    throw new Error(error);
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