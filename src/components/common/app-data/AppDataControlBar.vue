<template>
    <v-card v-if="controlAble||searchAble">
        <v-row class="ma-1">
            <v-col v-if="searchAble">
                <AppDataSearchBar :search="searched" @searched:input="search"></AppDataSearchBar>
            </v-col>
            <v-col>
                <slot name="controls"></slot>
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts">
import AppDataSearchBar from './AppDataSearchBar.vue';

export default {
    computed:{
        controlAble(){
            return this.showControls
        }
    },
    components: { AppDataSearchBar },
    props: {
        searchAble: {
            type: Boolean,
            default: false
        },
        searchQuery: {
            type: String,
            default: ''
        },
        showControls: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            searched: ""
        }
    },
    methods: {
        search(query: string) {
            this.searched = query
            this.$emit('search:input', query)
        }
    },
}
</script>

<style lang="scss" scoped></style>