<template>
    <v-text-field v-model="product['name']" label="Name"></v-text-field>
    <v-text-field v-model="product['description']" label="Description"></v-text-field>
    <v-text-field v-model="product['price']" label="Price" type="number"></v-text-field>
    <v-text-field v-model="product['quantity']" label="Initial Stock" type="number"></v-text-field>
    <v-text-field v-model="product['category']" label="Product Category"></v-text-field>
</template>

<script lang="ts">
    import ProductAPI from '@/services/api/products.service'
export default {
    emits: ['confirm'],
    data() {
        return {
            product: {}
        }
    },
    async beforeUnmount() {
        if (this.product) {
            try {
                this.product = await ProductAPI.createProducts(this.product)
                console.log(this.product);
                
            } catch (error) {
                throw new Error(error);
            }
        }
        
        this.$emit('confirm', this.product)
    }
}
</script>