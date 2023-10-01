import { generalStorage } from '@/storages/generalStorage';
import { MutationTree } from 'vuex';
import { AuthState } from './types';

export const SAVE_PRODUCT = 'SAVE_PRODUCT';
export const SAVE_INVENTORY = 'SAVE_INVENTORY';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_INVENTORY = 'UPDATE_INVENTORY';
export const SAVE_PRODUCTS = 'SAVE_PRODUCTS';
export const SAVE_INVENTORIES = 'SAVE_INVENTORIES';

export const mutations: MutationTree<AuthState> = {

  [SAVE_PRODUCT](state, product) {
    state.products.push(product);
  },
  [SAVE_INVENTORY](state, invItem) {
    state.inventories.push(invItem);
  },
  [SAVE_PRODUCTS](state, products) {
    state.products = products;
  },
  [SAVE_INVENTORIES](state, invItems) {
    state.inventories = invItems;
  },
  [UPDATE_INVENTORY](state, invItem) {
    const index = state.inventories.findIndex((inventoryItem) => inventoryItem.inventory_id === invItem.inventory_id);
    state.inventories[index] = invItem
  },
  [UPDATE_PRODUCT](state, product) {
    const index = state.products.findIndex((prod) => prod.product_id === product.product_id);
    state.inventories[index] = product
  },
};
