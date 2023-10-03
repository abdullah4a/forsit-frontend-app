<template>
        <v-sheet>
            <v-card-title class="mt-6 text-h5">{{ getTitle }}</v-card-title>
            <AppDataControlBar :search-able="showSearch" :show-controls="showControls" @search:input="searched">
                <template #controls>
                    <slot name="app_data:controls" />
                </template>
            </AppDataControlBar>
            <v-card-text>
                <slot name="content"></slot>
            </v-card-text>
        </v-sheet>
</template>

<script lang="ts">
import AppDataControlBar from './AppDataControlBar.vue';

export default {
    props: {
        title: {
            type: String,
            default: '',
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
    computed: {
        getTitle() {
            const pathName = this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1);
            return this.title || pathName
        }
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