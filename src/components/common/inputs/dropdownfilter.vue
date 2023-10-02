<template>
    <div>
        <v-combobox v-model="selectedCategory" :items="items" :label="label" :multiple="multiple"
            @update:model-value="filterData">
            <template v-slot:selection="data">
                <v-chip :key="JSON.stringify(data.item)" v-bind="data['attrs']" size="small">
                    <template v-slot:prepend>
                        <v-avatar class="bg-accent text-uppercase" start>{{ data.item.title.slice(0, 1) }}</v-avatar>
                    </template>
                    {{ data.item.title }}
                </v-chip>
            </template>
        </v-combobox>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProductCategoryDropdownFilter',
    props: {
        items: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        params: {
            type: Object,
            required: true,
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectedCategory: '',
        };
    },
    methods: {
        // Filter the data based on the selectedCategory
        filterData() {
            const data = this.params.data;
            const selectedCategory = this.selectedCategory;

            // Filter the data based on the selectedCategory
            const filteredData = data.filter((row) => row.productCategory === selectedCategory);

            // Apply the filtered data to the grid
            this.params.setFilterValues(filteredData);
        },
    },
});
</script>
  