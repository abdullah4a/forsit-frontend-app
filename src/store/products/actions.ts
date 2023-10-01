import ProductsAPI from '@/services/api/products.service';
import InventoryAPI from '@/services/api/inventory.service';
import { ActionTree } from 'vuex';
import { AuthState } from './types';
import { UPDATE_INVENTORY, UPDATE_PRODUCT, SAVE_PRODUCT, SAVE_INVENTORY, SAVE_PRODUCTS, SAVE_INVENTORIES } from './mutations';
import moment from 'moment';

export const actions: ActionTree<AuthState, any> = {
  async saveProduct({ commit, dispatch }, payload) {
    const resp = await ProductsAPI.createProducts(payload);
    commit(SAVE_PRODUCT, resp);
    const inventory = {
      "product_id": payload.product_id,
      "warehouse_id": Math.floor(Math.random() * 1000) + 100,
      "batch_number": "batch " + payload.product_id,
      "supplier_id": Math.floor(Math.random() * 1000) + 100,
      "quantity": payload.quantity,
      "date_updated": moment(new Date()).format("YYYY-MM-DD")
    }
    const inventoryItem = await InventoryAPI.createInventory(inventory)
    return resp;
  },

  async updateProduct({ commit, dispatch }, payload) {
    try {
      const resp = await ProductsAPI.updateProducts(payload.product_id, payload);
      commit(UPDATE_PRODUCT, resp);
      const invItem = this.state.inventories.filter(invItem => invItem.product_id === payload.product_id)
      if (invItem.length) {
        for (let index = 0; index < invItem.length; index++) {
          const element = invItem[index];
          const inventoryItem = {
            "inventory_id": element.inventory_id,
            "product_id": payload.product_id,
            "warehouse_id": element.warehouse_id,
            "batch_number": element.batch_number,
            "supplier_id": element.supplier_id,
            "quantity": payload.quantity,
            "date_updated": moment(new Date()).format("YYYY-MM-DD")

          }
        }
      }
      return resp;
    } catch (error: any) {
      return error.response.data;
    }
  },
  async getProducts({ commit, dispatch }) {
    if (!this.state.products) {
      const products = await ProductsAPI.getProductsList()
      commit(SAVE_PRODUCTS, products)
      return new Promise((res) => res(products));
    } else
      return new Promise((res) => res(this.state.products));
  },
  async getInventories({ commit, dispatch }) {
    if (!this.state.inventories) {
      const invItems = await InventoryAPI.getInventoryList()
      commit(SAVE_INVENTORIES, invItems)
      return new Promise((res) => res(invItems));
    } else
      return new Promise((res) => res(this.state.inventories));
  }
};
