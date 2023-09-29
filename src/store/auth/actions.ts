// import AuthAPI from '@/services/api/auth.service';
import { ActionTree } from 'vuex';
import { AuthState } from './types';
import { DELETE_TOKEN, LOGOUT, SAVE_TOKEN, SAVE_USER, SET_UPLOADING, } from './mutations';

export const actions: ActionTree<AuthState, any> = {
  async login({ commit, dispatch }, credentials) {
    try {
      const user = await dispatch('getUser');
      if (user.email === credentials.username) {
        const resp = {
          data: {
            access_token: user.email
          }
        }
        commit(SAVE_TOKEN, resp.data.access_token);
        return user
      } else
        return null
      // const resp = await AuthAPI.login(credentials);
      // commit(SAVE_TOKEN, resp.data.access_token);
      // return await dispatch('getUser');
    } catch (error: any) {
      commit(LOGOUT);
      commit(DELETE_TOKEN);
      return error.message;
    }
  },

  async signUp({ commit, dispatch }, credentials) {
    try {
      const user = await dispatch('getUser');
      if (user.email !== credentials.username) {
        const resp = {
          data: {
            access_token: user.email
          }
        }
        commit(SAVE_TOKEN, resp.data.access_token);
        return user
      }
      // return await AuthAPI.signup(credentials);
    } catch (error: any) {
      return error.response.data;
    }
  },

  logout({ commit }) {
    commit(LOGOUT);
    return true
    // return AuthAPI.logout();
  },

  async sendPasswordReset(context, data) {
    try {
      // const resp = await AuthAPI.sendPasswordReset(data);
      const { data } = { data: {} }
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  },

  async resetPassword({ commit }, data) {
    commit(SET_UPLOADING, true);
    // const successful = await AuthAPI.resetPassword(data).then(
    //   () => true,
    //   () => false,
    // );
    const successful = true;
    commit(SET_UPLOADING, false);
    return successful;
  },

  async getUser({ commit }) {
    try {
      if (!this.state.user) {
        // const data = await AuthAPI.me();
        const { data } = { data: {} }
        commit(SAVE_USER, data);
        return data;
      } else {
        return this.state.user
      }
    } catch (error: any) {
      commit(LOGOUT);
      commit(DELETE_TOKEN);
      throw error.response ? error.response.data : error.message;
    }
  },
  // eslint-disable-next-line
  validate({ dispatch, state }) {
    return Promise.resolve(true);
    // if (!state.token) {
    //   return Promise.resolve(false);
    // }
    // if (!state.user) {
    //   return dispatch('getUser');
    // }
  },
};
