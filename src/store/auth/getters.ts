import {GetterTree} from 'vuex';
import {AuthState} from './types';

export const getters: GetterTree<AuthState, any> = {
    token(state) {
        return state.token;
    },

    user(state) {
        return state.user;
    },

    loggedIn(state) {
        return !!state.token;
    },

    userPermissions(state) {
        return state.user?.permissions;
    },
};
