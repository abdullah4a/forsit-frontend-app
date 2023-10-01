<template>
  <AppData title="Inventory" :showSearch="false" :showControls="true">
    <template #app_data:controls>
      <div class="text-right">
        <v-btn text="Add Product" variant="plain" prependIcon="mdi-plus" @click="openModal"></v-btn>
      </div>
    </template>
    <template #content>
      <AppDataTable :items="getTableData" :headers="getTableHeaders" :defaultColDef="getTableFilters" showConfirmBtnFiler
        showClearBtnFiler />
    </template>
  </AppData>
  <teleport v-if="modalData && modalData['show']" to='body'>
    <modal :modalItem="modalData" @close="closeModal" @confirm="saveItem" />
  </teleport>
</template>

<script lang="ts">
import InventoryAPI from '@/services/api/inventory.service'

import AddProduct from './modal-components/AddProduct.vue'
import { markRaw } from 'vue'
// Data
const componentNonReactive = markRaw({
  addProduct: AddProduct,
})
export default {
  name: 'InventoryView',
  computed: {
    getTableHeaders() {
      return this.tableHeaders
    },
    getTableData() {
      return this.tableData
    },
    getTableFilters() {
      return this.tableFilters
    }
  },
  data() {
    return {
      tableHeaders: undefined,
      tableData: undefined,
      tableFilters: undefined,
      modalData: undefined
    }
  },
  mounted() {
    this.getItemsAndDisplay()
  },
  methods: {
    async getItemsAndDisplay() {
      const inventoryItems = await InventoryAPI.getInventoryList()
      this.tableHeaders = this.getNormalizeHeaders(inventoryItems)
      this.tableData = inventoryItems
      this.tableFilters = {
        sortable: true,
        filter: true,
        flex: 1
      }
    },
    getNormalizeHeaders(inventoryItems) {
      const keys = inventoryItems.flatMap(item => Object.keys(item))
      const headers = [...new Set(keys)]
      return headers.map((header: string) => ({ headerName: header.split("_").join(" ").toLocaleUpperCase(), field: header }))
    },
    openModal() {
      this.modalData = { title: "Add Product", component: componentNonReactive.addProduct, propData: null, show: true }
    },
    closeModal() {
      this.modalData = { title: "", component: null, propData: null, show: false }
    },
    async saveItem(item: Record<string, any>) {
      await this.getItemsAndDisplay()

      console.log("Item ", item);

      this.modalData = { title: "", component: null, propData: null, show: false }
    }
  },
}
</script>
