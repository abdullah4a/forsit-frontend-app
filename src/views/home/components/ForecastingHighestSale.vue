<template>
    <v-card height="200" v-if="maxSold" variant="tonal" :class="'text-teal-darken-1'">
        <v-card-title>
            <template #default>
                {{ 'Products Insights' }}
            </template>
        </v-card-title>
        <template #append>
            <div>
                Max Sold: {{ maxSold.name}}
                <v-btn :icon="'mdi-arrow-up'" size="small" variant="plain" :ripple="false"></v-btn>
            </div>
        </template>
        <v-card-item class="text-center">
            <div class="text-h6">Name: {{ maxSold.name }}</div>
            <div class="text-subtitle-1">
                Quantity in Stock: {{ maxSold.quantity }}
            </div>
        </v-card-item>
    </v-card>
</template>
  
<script lang="ts">
import {getMaxAndMinSoldProducts} from "@/helpers/getProductInsights"
export default {
    name: 'ForecastingCard',
    data() {
        return {
            maxSold: undefined,
            minSold: undefined
        }
    },
    methods:{
        async getProductInsights(){
            const {maxSold}=await getMaxAndMinSoldProducts()
            this.maxSold=maxSold
        }
    },
    created () {
        this.getProductInsights()
    },
}
</script>
  