<template>
    <v-text-field v-model="searched" label="Search" append-inner-icon="mdi-magnify"></v-text-field>
</template>

<script>
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