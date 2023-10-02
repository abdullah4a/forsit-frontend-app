
<script lang="ts">
import InventoryAPI from '@/services/api/inventory.service'

import AddProduct from './modal-components/AddProduct.vue'
import { markRaw } from 'vue'
import { getNormalizeHeaders } from '@/helpers/normalizeHeader'
// Data
const componentNonReactive = markRaw({
  addProduct: AddProduct,
})
export default {
  name: 'InventoryView',
  data() {
    return {
      tableHeaders: undefined,
      tableData: undefined,
      tableFilters: undefined,
      modalData: undefined
    }
  },
  created() {
    this.getItemsAndDisplay()
  },
  methods: {
    async getItemsAndDisplay() {
      const inventoryItems = await this.$store.dispatch('product/getInventories')
      this.tableHeaders = getNormalizeHeaders(inventoryItems)
      this.tableData = inventoryItems
      this.tableFilters = {
        sortable: true,
        filter: true,
        flex: 1,
        floatingFilter: true,
      }
    },
    openModal() {
      this.modalData = { title: "Add Product", component: componentNonReactive.addProduct, propData: null, show: true }
    },
    closeModal() {
      this.modalData = { title: "", component: null, propData: null, show: false }
    },
    updateRow(row: Array<Record<string, any>>) {
      console.log(row);
    },
    async confirmItem(item: Record<string, any>) {
      this.$forceUpdate();
      this.getItemsAndDisplay()
      this.closeModal()
    },
  },
}
</script>

<template>
  <AppData title="Inventory" :showSearch="false" :showControls="true">
    <template #app_data:controls>
      <div class="text-right">
        <v-btn text="Add Product" variant="plain" prependIcon="mdi-plus" @click="openModal"></v-btn>
      </div>
    </template>
    <template #content>
      <AppDataTable :items="tableData" :headers="tableHeaders" :defaultColDef="tableFilters" @selected-row="updateRow" />
    </template>
  </AppData>
  <v-dialog v-if="modalData" v-model="modalData.show" width="auto" persistent>
    <v-card width="800px">
      <v-card-title>
        <v-list-item class="w-100">
          <template #prepend>
            <v-avatar color="grey-lighten-3" @click="closeModal()">
              <v-icon icon="mdi-arrow-left"></v-icon>
            </v-avatar>
          </template>

          <v-list-item-title class="text-h6 py-3">
            {{ modalData.title }}
          </v-list-item-title>
          <template #append>
            <slot name="card-append"></slot>
          </template>
        </v-list-item>
      </v-card-title>
      <v-card-item>
        <component :is="modalData.component" v-if="modalData.propData !== null" :model="modalData.propData"
          @confirm="confirmItem" />
        <component :is="modalData.component" v-else @confirm="confirmItem" @close="closeModal" />
      </v-card-item>
    </v-card>
  </v-dialog>
</template>
