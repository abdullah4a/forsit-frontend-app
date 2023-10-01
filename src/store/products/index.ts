// import AuthStorage from '@/services/auth-storage';
import {Module} from 'vuex';
import {AuthState} from './types';
import {getters} from './getters';
import {actions} from './actions';
import {mutations} from './mutations';

// STATE
const state: AuthState = {
  products: [],
  uploading: false,
  inventories: []
};

// STORE
const ProductStore: Module<AuthState, any> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default ProductStore;
