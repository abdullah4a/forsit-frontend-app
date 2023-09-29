import { createStore } from 'vuex'
import AuthStore from './auth'
export default createStore({
  modules: {
    auth: AuthStore,
  }
})