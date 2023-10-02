<template>
<v-card height="200" v-if="minSold" variant="tonal" :class="'text-red-lighten-1'">
    <v-card-title>
        <template #default>
            {{ 'Products Insights' }}
        </template>
    </v-card-title>
    <template #append>
        <div>
            Min Sold: {{ minSold.name}}
            <v-btn :icon="'mdi-arrow-down'" size="small" variant="plain" :ripple="false"></v-btn>
        </div>
    </template>
    <v-card-item class="text-center">
        <div class="text-h6">Name: {{ minSold.name }}</div>
        <div class="text-subtitle-1">
            Quantity in Stock: {{ minSold.quantity }}
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
        minSold: undefined
    }
},
methods:{
    async getProductInsights(){
        const {minSold}=await getMaxAndMinSoldProducts()
        this.minSold=minSold            
    }
},
created () {
    this.getProductInsights()
},
}
</script>
