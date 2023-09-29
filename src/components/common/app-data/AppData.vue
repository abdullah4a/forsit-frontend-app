<template>
    <v-main>
        <v-card>
            <AppDataControlBar :search-able="false"></AppDataControlBar>
            <v-card-title>{{ title }}</v-card-title>
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
        }
    },
    components: { AppDataControlBar }
}
</script>

<style scoped></style>