<template>
    <v-main>
        
        <v-card>
            <AppDataControlBar :search-able="showSearch" :show-controls="showControls" @search:input="searched">
                <template #controls>
                    <slot name="app_data:controls" />
                </template>
            </AppDataControlBar>
            <v-card-title class="my-6">{{ title }}</v-card-title>
            <v-card-text>
                <slot name="content"></slot>
            </v-card-text>
        </v-card>
    </v-main>
</template>

<script lang="ts">
import AppDataControlBar from './AppDataControlBar.vue';

export default {
    props: {
        title: {
            type: String,
            default: '',
            required: true
        },
        showSearch: {
            type: Boolean,
            default: false
        },
        showControls: {
            type: Boolean,
            default: false
        },
    },
    components: { AppDataControlBar },
    methods: {
        searched(query) {
            console.log(query);

        }
    },
}
</script>

<style scoped></style>