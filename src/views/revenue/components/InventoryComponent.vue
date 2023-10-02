<template>
    <v-sheet>
        <v-card>
            <v-card-text class="text-md-center text-sm-left my-16">
                <p class="text-h5">{{ "Products in Inventory: " }}</p>
                <p class="text-h5">{{ getTotalNumOfInventoryItems }}</p>
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

<script lang="ts">
import InventoryAPI from '@/services/api/inventory.service'

export default {
    data() {
        return {
            totalNumProductsInInventory: undefined
        }
    },
    computed: {
        getTotalNumOfInventoryItems() {
            return this.totalNumProductsInInventory
        }
    }, created() {
        this.getTotalNumOfProductsInInventory()
    },
    methods: {
        async getTotalNumOfProductsInInventory() {
            const numOfInventoryItems = await InventoryAPI.getTotalNumOfProductsInInventory()
            this.totalNumProductsInInventory = numOfInventoryItems
        }
    },
}
</script>

<style lang="scss" scoped></style>