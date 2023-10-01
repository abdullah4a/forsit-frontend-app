import {GetterTree} from 'vuex';
import {AuthState} from './types';

export const getters: GetterTree<AuthState, any> = {
    getAllProducts(state) {
        return state.products;
    },

    getAllInventories(state) {
        return state.inventories;
    }
};
