<template>
    <v-card>
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
import RevenueAPI from '@/services/api/revenue.service'
export default {
    name: 'RevenueTable',
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