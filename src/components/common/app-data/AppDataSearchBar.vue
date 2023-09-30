<template>
    <v-text-field v-model="searched" rounded label="Search" variant="filled" prepend-inner-icon="mdi-magnify" clearable
        persistent-clear clear-icon="mdi-close" @input="searchedQuery"></v-text-field>
</template>

<script lang="ts">
export default {
    emits: ['searched:input'],
    props: {
        search: {
            type: String,
            default: "",
            required: true
        }
    },
    data() {
        return {
            searched: this.search
        }
    },
    methods: {
        searchedQuery() {
            this.$emit("searched:input", this.searched)
        }
    },
}
</script>

<style lang="scss" scoped></style>