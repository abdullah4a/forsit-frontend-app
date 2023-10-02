
<script lang="ts" setup>

import AddProduct from './modal-components/AddProductAndInventory.vue'
import UpdateProductAndInventory from './modal-components/UpdateProductAndInventory.vue'
import { markRaw, ref } from 'vue'
import { getNormalizeHeaders } from '@/helpers/normalizeHeader'
import { useStore } from 'vuex';
// Data
const store = useStore()
const componentNonReactive = markRaw({
  AddProduct,
  UpdateProductAndInventory
})
const tableHeaders = ref([])
const tableData = ref([])
const show = ref(false)
const tableFilters = ref({})
const modalData = {
  title: "",
  component: null,
  propData: null,
}
const getItemsAndDisplay = async () => {
  const inventoryItems = await store.dispatch('product/getInventories')
  tableHeaders.value = getNormalizeHeaders(inventoryItems)
  tableData.value = inventoryItems
  tableFilters.value = {
    sortable: true,
    filter: true,
    flex: 1,
    floatingFilter: true,
  }
}
getItemsAndDisplay()
const openModal = () => {
  show.value = true
  modalData.title = "Add Product"
  modalData.component = componentNonReactive.AddProduct
}
const closeModal = () => {
  show.value = false
  modalData.title = ""
  modalData.component = null
  modalData.propData = null
}

const updateRow = (row: Array<Record<string, any>>) => {
  modalData.propData = row
  show.value = true
  modalData.title = "Update Product"
  modalData.component = componentNonReactive.UpdateProductAndInventory
}
const confirmItem = (item: Record<string, any>) => {
  getItemsAndDisplay()
  closeModal()
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
      <v-card v-if="tableData && tableHeaders && tableFilters">
        <AppDataTable :items="tableData" :headers="tableHeaders" :defaultColDef="tableFilters"
          @selected-row="updateRow" />
      </v-card>
    </template>
  </AppData>
  <v-dialog v-if="modalData" v-model="show" width="auto" persistent>
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
      <v-card-item v-if="modalData.propData !== null">
        <component :is="modalData.component" :model="modalData.propData" @confirm="confirmItem" />
      </v-card-item>
      <v-card-item v-else>
        <component :is="modalData.component" @confirm="confirmItem" @close="closeModal" />
      </v-card-item>
    </v-card>
  </v-dialog>
</template>
