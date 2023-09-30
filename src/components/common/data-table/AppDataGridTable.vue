<template>
  <ag-grid-vue :class="!isDarkTheme ? 'ag-theme-alpine' : 'ag-theme-alpine-dark'" style="height: 500px"
    :columnDefs="dataTableHeaders" :rowData="dataTableData" :defaultColDef="dataTableFilters" rowSelection="single"
    animateRows="true" @grid-ready="onGridReady" @cell-clicked="cellWasClicked">
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

export default {
  name: "AppDataGridTable",
  components: {
    AgGridVue,
  },
  computed: {
    isDarkTheme() {
      return generalStorage.getLocalItem(localStorageKeys.CURRENT_THEME) === 'dark'
    },
    dataTableData() {
      return this.items
    },
    dataTableHeaders() {
      return this.headers
    },
    dataTableFilters() {
      const defaultColDef=this.defaultColDef
      if(defaultColDef){
        const filterParams={buttons:[]}
       if(this.showConfirmBtnFiler){
        filterParams['buttons'].push('apply')
       }
       if(this.showClearBtnFiler){
        filterParams['buttons'].push('clear')
       }
       defaultColDef['filterParams']=filterParams
      }
      return defaultColDef

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
    showConfirmBtnFiler:{
      type: Boolean,
    },
    showClearBtnFiler:{
      type: Boolean,
    }
  },
  data() {
    return {
      gridApi: null,
      gridColumnApi: null,
    }
  }, methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    cellWasClicked(event: any) {
      const { value } = event
      this.$emit('cell-clicked', value)
    },
    rowSelection() {
      const selectedRows = this.gridApi.getSelectedRows();
      this.$emit('selected-row', selectedRows)
    }
  },
};
</script>
  
<style lang="scss"></style>