<template>
    <v-form ref="form" validate-on="blur">
        <div v-if="!imageUploaded">
            <v-file-input :rules="imageRules" show-size accept="image/png, image/jpeg, image/bmp, image/jpg,"
                placeholder="Product image" prepend-icon="" prepend-inner-icon="mdi-camera" label="Product image"
                @update:model-value="fileChanged" />
        </div>
        <div v-else>
            <v-avatar class="mx-3">
                <v-img :src="this.product.avatar" alt="image"></v-img>
            </v-avatar>
            <v-btn icon="mdi-refresh" variant="plain" :ripple="false" @click="imageUploaded=!imageUploaded"></v-btn>
        </div>
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
import { toBase64 } from '@/helpers/blobToBase64';
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
            imageRules: [
                v => {
                    return !v || !v.length || v[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
                },
            ],
            imageUploaded: false
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
        },
        fileChanged(files: Array<Record<string, any>>) {
            files.forEach(async file => {
                this.product.avatar = await toBase64(file);
                this.imageUploaded = true
            })
        }
    },
}
</script>