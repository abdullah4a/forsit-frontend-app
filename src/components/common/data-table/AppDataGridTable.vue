<template>
  <v-row>
    <v-col cols="12" md="1">
      <v-combobox v-model="paginationPageSize" :items="getPageSizes" label="Items per Page" :multiple="false" />
    </v-col>
    <v-col class="text-right" cols="12" md="11">
      <v-btn v-if="showRowUpdate" prepend-icon="mdi-pencil" text="update row" @click="rowSelection" variant="plain" />
    </v-col>
  </v-row>
  <ag-grid-vue ref="agGrid" :class="!isDarkTheme ? 'ag-theme-alpine' : 'ag-theme-alpine-dark'" style="height: 500px"
    :columnDefs="dataTableHeaders" :rowData="dataTableData" :defaultColDef="dataTableFilters" rowSelection="single"
    animateRows="true" @grid-ready="onGridReady" @cell-clicked="cellWasClicked" :pagination="true"
    :paginationPageSize="paginationPageSize">
    <!-- @getSelectedRow="rowSelection" -->
  </ag-grid-vue>
</template>
  
<script lang="ts">
// CSS Import for data Grid
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// the AG Grid Vue Component aka DataGridTable
import { AgGridVue } from "ag-grid-vue3";
// other imports
import { localStorageKeys } from "@/utils/enum/localStorageKeys.enum";
import { generalStorage } from "@/storages/generalStorage";
import { pageSizes } from "@/utils/tablePageSizes";

export default {
  name: "AppDataGridTable",
  components: {
    AgGridVue,
  },
  emits: ['selected-row', 'cell-clicked'],
  computed: {
    isDarkTheme() {
      return generalStorage.getLocalItem(localStorageKeys.CURRENT_THEME) === 'dark'
    },
    dataTableData() {
      return this.rowData
    },
    dataTableHeaders() {
      return this.headers
    },
    dataTableFilters() {
      const defaultColDef = this.defaultColDef
      if (defaultColDef) {
        const filterParams = { buttons: [] }
        if (this.showConfirmBtnFilter) {
          filterParams['buttons'].push('apply')
        }
        if (this.showClearBtnFilter) {
          filterParams['buttons'].push('clear')
        }
        if (this.showResetBtnFilter) {
          filterParams['buttons'].push('reset')
        }
        defaultColDef['filterParams'] = filterParams
      }
      return defaultColDef
    },
    getPageSizes() {
      return pageSizes
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    defaultColDef: {
      type: Object,
      required: true
    },
    showConfirmBtnFilter: {
      type: Boolean,
    },
    showClearBtnFilter: {
      type: Boolean,
    },
    showResetBtnFilter: {
      type: Boolean,
    }
  },
  data() {
    return {
      gridApi: null,
      gridColumnApi: null,
      paginationPageSize: 10,
      showRowUpdate: false,
      rowData: []
    }
  }, methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      params.api.refreshCells()
      this.gridColumnApi = params.columnApi;
    },
    cellWasClicked(event: any) {
      const { value } = event
      this.$emit('cell-clicked', value)
      this.showRowUpdate = true
    },
    rowSelection() {
      const selectedRows = this.gridApi.getSelectedRows();
      this.$emit('selected-row', selectedRows)
    }
  },
  watch: {
    'items': function (newVal) {
      this.rowData = newVal
      if (this.gridApi) {
        this.gridApi.refreshCells()
      }
    },
    'gridApi': function (newVal) {
      if (newVal) {
        this.gridApi.refreshCells()
      }
    }
  },
  mounted() {
    this.gridApi = this.$refs.agGrid.api;
  },
}
</script>
  
<style lang="scss"></style>