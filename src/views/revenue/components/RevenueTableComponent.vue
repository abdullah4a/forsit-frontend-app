<template>
    <v-card v-if="tableData && tableHeaders && tableFilters">
        <v-card-title>
            <template #default>
                Revenues
            </template>
        </v-card-title>
        <AppDataTable :items="tableData" :headers="tableHeaders" :defaultColDef="tableFilters" @selected-row="updateRows"
            showConfirmBtnFilter showResetBtnFilter />
    </v-card>
</template>

<script lang="ts">
import { getNormalizeHeaders } from '@/helpers/normalizeHeader'
// import dropdownfilter from '@/components/common/inputs/dropdownfilter.vue'
import RevenueAPI from '@/services/api/revenue.service'
// import { getProductDataInList } from '@/helpers/getProductFildsData'
export default {
    name: 'RevenueTable',
    components:{
        // dropdownfilter
    },
    data() {
        return {
            tableData: undefined,
            tableHeaders: undefined,
            tableFilters: undefined
        }
    },
    created() {
        this.getRevenuesForTable()
    },
    methods: {
        updateRows(rows: Array<Record<string, any>>) {
            console.log(rows)
        },
        async getRevenuesForTable() {
            const items = await RevenueAPI.getRevenueList()
            this.tableHeaders = getNormalizeHeaders(items)
            // const productCategoryList=getProductDataInList('category')
            // this.tableHeaders.map(header=>{
            //     if (header['field']==='category') {
            //         header['filterComponent']= dropdownfilter,
            //         header['props']={
            //             items: productCategoryList,
            //             label: "Categories",
            //             multiple: true
            //         }
            //     }
            //     return header
            // })
            this.tableData = items
            this.tableFilters = {
                sortable: true,
                filter: true,
                flex: 1,
            }
        }
    },
}
</script>

<style scoped></style>