import { generalStorage } from '@/storages/generalStorage';
import { MutationTree } from 'vuex';
import { AuthState } from './types';
import { localStorageKeys } from '@/utils/enum/localStorageKeys.enum';

export const SAVE_USER = 'SAVE_USER';
export const SAVE_COMPANY = 'SAVE_COMPANY';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const LOGOUT = 'LOGOUT';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const SET_UPLOADING = 'SET_UPLOADING';

export const mutations: MutationTree<AuthState> = {

  [SAVE_USER](state, user) {
    state.user = user;
  },

  [LOGOUT](state) {
    state.user = null;
    state.token = null;
    generalStorage.deleteLocalItem(localStorageKeys.TOKEN);
  },

  [SAVE_TOKEN](state, token) {
    state.token = token;
    generalStorage.setLocalItem(localStorageKeys.TOKEN,token);
  },

  [DELETE_TOKEN](state) {
    state.token = null;
    generalStorage.deleteLocalItem(localStorageKeys.TOKEN);
  },

  [SET_UPLOADING](state, uploading) {
    state.uploading = uploading;
  }
};
